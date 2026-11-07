-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "backgroundColor" TEXT NOT NULL DEFAULT '#F3F4F6',
    "textColor" TEXT NOT NULL DEFAULT '#111827'
);
INSERT INTO "new_BlogCategory" ("icon", "id", "name", "slug") SELECT "icon", "id", "name", "slug" FROM "BlogCategory";
DROP TABLE "BlogCategory";
ALTER TABLE "new_BlogCategory" RENAME TO "BlogCategory";
CREATE UNIQUE INDEX "BlogCategory_slug_key" ON "BlogCategory"("slug");
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT,
    "backgroundColor" TEXT NOT NULL DEFAULT '#F3F4F6',
    "textColor" TEXT NOT NULL DEFAULT '#111827',
    "parentId" TEXT,
    CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Category" ("id", "image", "name", "parentId", "slug") SELECT "id", "image", "name", "parentId", "slug" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
