-- CreateTable
CREATE TABLE "ProductComment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProductComment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProductComment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BlogTagToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BlogTagToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogTag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BlogTagToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ProductComment_productId_idx" ON "ProductComment"("productId");

-- CreateIndex
CREATE INDEX "ProductComment_parentId_idx" ON "ProductComment"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "_BlogTagToProduct_AB_unique" ON "_BlogTagToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogTagToProduct_B_index" ON "_BlogTagToProduct"("B");
