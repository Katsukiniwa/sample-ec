-- CreateTable
CREATE TABLE `stock_keeping_unit_product_option_values` (
    `id` VARCHAR(191) NOT NULL,
    `stock_keeping_unit_product_id` VARCHAR(191) NOT NULL,
    `product_option_value_id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `stock_keeping_unit_product_option_values_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock_keeping_unit_product_option_values` ADD CONSTRAINT `stock_keeping_unit_product_option_values_stock_keeping_unit_fkey` FOREIGN KEY (`stock_keeping_unit_product_id`) REFERENCES `stock_keeping_unit_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_keeping_unit_product_option_values` ADD CONSTRAINT `stock_keeping_unit_product_option_values_product_option_val_fkey` FOREIGN KEY (`product_option_value_id`) REFERENCES `product_option_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
