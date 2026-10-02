/*
  Warnings:

  - Added the required column `slug` to the `BlogTag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_BlogTag" ("id", "name") SELECT "id", "name" FROM "BlogTag";
DROP TABLE "BlogTag";
ALTER TABLE "new_BlogTag" RENAME TO "BlogTag";
CREATE UNIQUE INDEX "BlogTag_name_key" ON "BlogTag"("name");
CREATE UNIQUE INDEX "BlogTag_slug_key" ON "BlogTag"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
