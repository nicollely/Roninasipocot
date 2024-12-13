/*
  Warnings:

  - The `date` column on the `Attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `date` on the `EmployeeSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "EmployeeSchedule" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
