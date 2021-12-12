-- AlterTable
ALTER TABLE `products` ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `stock_change_events` (
    `id` VARCHAR(191) NOT NULL,
    `stock_keeping_unit_product_id` VARCHAR(191) NOT NULL,
    `change_amount` INTEGER NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `stock_change_events_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock_change_events` ADD CONSTRAINT `stock_change_events_stock_keeping_unit_product_id_fkey` FOREIGN KEY (`stock_keeping_unit_product_id`) REFERENCES `stock_keeping_unit_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
