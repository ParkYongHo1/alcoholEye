create table `users`(
	`uno` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `id` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `birth` VARCHAR(255) NOT NULL,
  `gender` VARCHAR(255) NOT NULL
);