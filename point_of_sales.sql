-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2019 at 02:36 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `point_of_sales`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` varchar(100) NOT NULL,
  `name_category` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name_category`) VALUES
('03654c60-e59c-11e9-916a-79bd779260c7', 'Ice Cream'),
('d8690f50-e5a1-11e9-916a-79bd779260c7', 'Biscuit or Cookies'),
('e05b83a0-e5a1-11e9-916a-79bd779260c7', 'Frozen Desserts'),
('ea176d50-e5a1-11e9-916a-79bd779260c7', 'Chocolates and Candies'),
('feae5400-e59b-11e9-916a-79bd779260c7', 'Cake');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `product` varchar(45) NOT NULL,
  `price` int(55) NOT NULL,
  `amount` int(11) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `product`, `price`, `amount`, `date_created`) VALUES
(1, 'Strawberry Poke Cake', 12, 1, '2019-10-09'),
(2, 'Lemon Cream Cake', 3, 2, '2019-10-09'),
(3, 'Strawberry Poke Cake', 36, 3, '2019-10-09'),
(7, 'Lemon Cream Cake', 12, 4, '2019-10-09'),
(8, 'Frozen Tiramisu', 6, 3, '2019-10-10'),
(9, 'Lemon Cream Cake', 3, 1, '2019-10-10'),
(10, 'Gummy fruit candies', 12, 2, '2019-10-10'),
(11, 'Dessert Sundae', 5, 1, '2019-10-10'),
(12, 'Strawberry Poke Cake', 12, 1, '2019-10-10'),
(13, 'Strawberry Poke Cake', 12, 1, '2019-10-10'),
(14, 'Dessert Sundae', 15, 3, '2019-10-10'),
(15, 'Strawberry Poke Cake', 12, 1, '2019-10-10'),
(16, 'Lemon Cream Cake', 3, 1, '2019-10-10'),
(26, 'Lemon Cream Cake', 9, 3, '2019-10-10'),
(27, 'Strawberry Poke Cake', 12, 1, '2019-10-10'),
(28, 'Strawberry Poke Cake', 12, 1, '2019-10-10'),
(29, 'Lemon Cream Cake', 3, 1, '2019-10-10'),
(30, 'Frozen Tiramisu', 2, 1, '2019-10-10'),
(31, 'Strawberry Poke Cake', 12, 1, '2019-10-11'),
(32, 'Lemon Cream Cake', 6, 2, '2019-10-11'),
(33, 'Frozen Tiramisu', 4, 2, '2019-10-11'),
(34, 'Lemon Cream Cake', 15, 5, '2019-10-11'),
(35, 'Strawberry Poke Cake', 24, 2, '2019-10-11'),
(36, 'Lemon Cream Cake', 3, 1, '2019-10-12'),
(37, 'Strawberry Poke Cake', 12, 1, '2019-10-12');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(100) NOT NULL,
  `name` varchar(40) NOT NULL,
  `description` varchar(200) NOT NULL,
  `image` text NOT NULL,
  `price` int(40) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `count` int(15) NOT NULL,
  `id_category` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `price`, `date_added`, `date_updated`, `count`, `id_category`) VALUES
('0f747e90-e691-11e9-8c9d-0f6180339970', 'Strawberry Poke Cake', 'Red Cake', 'img-1570184631545-8.jpg', 12, '2019-10-04 10:23:51', '2019-10-04 10:23:51', 5, 'feae5400-e59b-11e9-916a-79bd779260c7'),
('18745d10-e977-11e9-8185-7f9349ef3c49', 'Frozen Tiramisu', 'Cold', 'img-1570503333217-10.jpg', 2, '2019-10-08 02:55:33', '2019-10-08 02:55:33', 2, 'e05b83a0-e5a1-11e9-916a-79bd779260c7'),
('394cf360-e64f-11e9-8426-996716a5784a', 'Smore Sandwiches', 'It\'s not a sandwich', 'img-1570501594723-9.jpg', 4, '2019-10-08 02:26:34', '2019-10-08 02:26:34', 5, 'd8690f50-e5a1-11e9-916a-79bd779260c7'),
('52480b40-e60c-11e9-87a7-59fbc329584c', 'Lemon Cream Cake', 'Lemon', 'img-1570259263929-13.jpg', 3, '2019-10-05 07:07:43', '2019-10-05 07:07:43', 2, 'feae5400-e59b-11e9-916a-79bd779260c7'),
('8b224ba0-e73e-11e9-aae5-df04d84f7a1b', 'Chocolate Lasagna', 'Coklat', 'img-1570259141978-6.jpg', 5, '2019-10-05 07:05:41', '2019-10-05 07:05:41', 12, 'ea176d50-e5a1-11e9-916a-79bd779260c7'),
('c5d4dc90-e64e-11e9-8426-996716a5784a', 'Dessert Sundae', 'More like ice cream than a dessert', 'img-1570156161241-8.jpg', 5, '2019-10-04 02:29:21', '2019-10-04 02:29:21', 10, '03654c60-e59c-11e9-916a-79bd779260c7'),
('e9a30ae0-e976-11e9-8185-7f9349ef3c49', 'Gummy fruit candies', 'Gummy Yummy', 'img-1570503254670-10.jpg', 6, '2019-10-08 02:54:14', '2019-10-08 02:54:14', 5, 'ea176d50-e5a1-11e9-916a-79bd779260c7');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
('61e77c60-e73e-11e9-aae5-df04d84f7a1b', 'anggun', '$2b$10$CmBiScZ5d4OAI6Kai/7/ve2Go3eSbFNhbJSHDRFR/Uk.J9XglGQje'),
('6a50b150-e45f-11e9-96da-d7b7ab496eaa', 'pandu', '$2b$10$w6WMKx23MKFdaPvZZQr3NuQ5JwSTt6cAKJn9XupYkAnDcs1C86lS6'),
('9cc2c400-e90c-11e9-a853-6905fa104fac', 'sekar', '$2b$10$0tLq.O298cbw8nB8yNgv3efiOl0RPOREjJQODi3ZZwyJZ/Zl0W5XS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
