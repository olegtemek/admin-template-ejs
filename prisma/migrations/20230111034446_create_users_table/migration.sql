-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` INTEGER NOT NULL DEFAULT 1,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


INSERT INTO `Users` (`id`, `role`, `email`, `password`) VALUES ('1', '1', 'a@a.a', '$2b$10$QzzByE9D03o94tbFQfWlPuJQIVCMRRdNbzdQJqIJzJr.BLDg3fnSC');