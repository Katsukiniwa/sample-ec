/*
  Warnings:

  - You are about to drop the column `updaetd_at` on the `product_option_values` table. All the data in the column will be lost.
  - You are about to drop the column `updaetd_at` on the `product_options` table. All the data in the column will be lost.
  - You are about to drop the column `updaetd_at` on the `shops` table. All the data in the column will be lost.
  - You are about to drop the column `updaetd_at` on the `stock_keeping_unit_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product_option_values` DROP COLUMN `updaetd_at`,
    ADD COLUMN `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- AlterTable
ALTER TABLE `product_options` DROP COLUMN `updaetd_at`,
    ADD COLUMN `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- AlterTable
ALTER TABLE `shops` DROP COLUMN `updaetd_at`,
    ADD COLUMN `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- AlterTable
ALTER TABLE `stock_keeping_unit_products` DROP COLUMN `updaetd_at`,
    ADD COLUMN `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);
