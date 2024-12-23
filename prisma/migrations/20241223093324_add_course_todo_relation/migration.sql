-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "courseId" TEXT;

-- CreateIndex
CREATE INDEX "Todo_courseId_idx" ON "Todo"("courseId");

-- CreateIndex
CREATE INDEX "Todo_userId_idx" ON "Todo"("userId");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
