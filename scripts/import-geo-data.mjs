// scripts/import-geo-data.mjs
//
// Imports the full dr5hn/countries-states-cities-database dataset into our
// Country/Province/City tables, straight through Prisma Client (not the API -
// 150k+ rows through individual HTTP requests isn't practical).
//
// 1. Download the file from:
//      https://github.com/dr5hn/countries-states-cities-database/raw/master/json/countries%2Bstates%2Bcities.json
//    (or any release asset named "countries+states+cities.json" / the .gz version, gunzip'd)
// 2. Put it anywhere in your project (e.g. ./data/countries+states+cities.json)
// 3. Run from the project root:   node scripts/import-geo-data.mjs ./data/countries+states+cities.json
//
// Safe to re-run: countries/provinces/cities already in the DB (by code/name)
// are skipped rather than duplicated.

import { PrismaClient } from "@prisma/client";
import { readFile } from "node:fs/promises";

const prisma = new PrismaClient();
const DATA_PATH = process.argv[2];
const CHUNK_SIZE = 2000;

if (!DATA_PATH) {
  console.error("Usage: node scripts/import-geo-data.mjs <path-to-countries+states+cities.json>");
  process.exit(1);
}

async function insertInChunks(label, rows, insertFn) {
  console.log(`Inserting ${rows.length} ${label}...`);
  for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
    const chunk = rows.slice(i, i + CHUNK_SIZE);
    await insertFn(chunk);
    process.stdout.write(`\r  ${Math.min(i + CHUNK_SIZE, rows.length)}/${rows.length}`);
  }
  console.log();
}

async function main() {
  console.log("Reading", DATA_PATH, "...");
  const raw = await readFile(DATA_PATH, "utf-8");
  const countries = JSON.parse(raw);
  console.log(`Loaded ${countries.length} countries from the file`);

  // ---------- 1. Countries ----------
  const existingCountries = await prisma.country.findMany({ select: { code: true } });
  const existingCountryCodes = new Set(existingCountries.map((c) => c.code));

  const seenCodes = new Set();
  const countryRows = [];
  for (const c of countries) {
    const code = c.iso2;
    if (!code || seenCodes.has(code) || existingCountryCodes.has(code)) continue;
    seenCodes.add(code);
    countryRows.push({
      name: c.name,
      code,
      phoneCode: String(c.phone_code ?? c.phonecode ?? "0").replace("+", ""),
    });
  }
  await insertInChunks("new countries", countryRows, (chunk) => prisma.country.createMany({ data: chunk }));

  const allCountries = await prisma.country.findMany({ select: { id: true, code: true } });
  const countryIdByCode = new Map(allCountries.map((c) => [c.code, c.id]));

  // ---------- 2. Provinces (states) ----------
  const existingProvinces = await prisma.province.findMany({ select: { countryId: true, name: true } });
  const existingProvinceKeys = new Set(existingProvinces.map((p) => `${p.countryId}__${p.name}`));

  // also remember each country's states+cities so step 3 doesn't need the
  // source array a second time
  const provinceSources = []; // { key, name, countryId, cities: [...] }
  const seenProvinceKeysThisRun = new Set();
  for (const c of countries) {
    const countryId = countryIdByCode.get(c.iso2);
    if (!countryId) continue;
    for (const s of c.states ?? []) {
      const name = s.name?.trim();
      if (!name) continue;
      const key = `${countryId}__${name}`;
      if (existingProvinceKeys.has(key) || seenProvinceKeysThisRun.has(key)) continue;
      seenProvinceKeysThisRun.add(key);
      provinceSources.push({ key, name, countryId, cities: s.cities ?? [] });
    }
  }
  await insertInChunks("new provinces/states", provinceSources, (chunk) =>
    prisma.province.createMany({ data: chunk.map(({ name, countryId }) => ({ name, countryId })) }),
  );

  const allProvinces = await prisma.province.findMany({ select: { id: true, countryId: true, name: true } });
  const provinceIdByKey = new Map(allProvinces.map((p) => [`${p.countryId}__${p.name}`, p.id]));

  // ---------- 3. Cities ----------
  const existingCities = await prisma.city.findMany({ select: { provinceId: true, name: true } });
  const existingCityKeys = new Set(existingCities.map((c) => `${c.provinceId}__${c.name}`));

  const cityRows = [];
  const seenCityKeysThisRun = new Set();
  for (const p of provinceSources) {
    const provinceId = provinceIdByKey.get(p.key);
    if (!provinceId) continue;
    for (const city of p.cities) {
      const name = city.name?.trim();
      if (!name) continue;
      const key = `${provinceId}__${name}`;
      if (existingCityKeys.has(key) || seenCityKeysThisRun.has(key)) continue;
      seenCityKeysThisRun.add(key);
      cityRows.push({ name, provinceId });
    }
  }
  await insertInChunks("new cities", cityRows, (chunk) => prisma.city.createMany({ data: chunk }));

  console.log("\nDone.");
  console.log(`Countries: ${countryRows.length} added (${allCountries.length} total)`);
  console.log(`Provinces: ${provinceSources.length} added`);
  console.log(`Cities: ${cityRows.length} added`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
