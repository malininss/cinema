-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Фев 06 2020 г., 21:50
-- Версия сервера: 5.7.27-30
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `u0940621_default`
--

-- --------------------------------------------------------

--
-- Структура таблицы `films`
--

CREATE TABLE IF NOT EXISTS `films` (
  `filmId` int(11) NOT NULL,
  `filmName` text NOT NULL,
  `filmDescription` text NOT NULL,
  `filmDuration` int(10) NOT NULL,
  `filmCountry` varchar(50) NOT NULL,
  `filmImg` varchar(100) DEFAULT NULL,
  `filmSchedule` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `films`
--

INSERT INTO `films` (`filmId`, `filmName`, `filmDescription`, `filmDuration`, `filmCountry`, `filmImg`, `filmSchedule`) VALUES
(65, 'Звёздные войны XXIII: Атака клонированных клонов', 'Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.', 130, 'США', '/assets/i/posters/1580937386-poster1.jpg', '[{"hallId":"179","hallName":"Зал 1","time":["00:00","12:00","05:00","18:00","21:00"]},{"hallId":"180","hallName":"Зал 2","time":["00:00","03:00","06:00"]}]'),
(80, 'Альфа', '20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.', 96, 'Франция', '/assets/i/posters/1581014712-poster2.jpg', '[{"hallId":"179","hallName":"Зал 1","time":["09:00","02:30"]},{"hallId":"180","hallName":"Зал 2","time":["09:00","11:00","13:00"]}]'),
(81, 'Хищник', 'Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.', 101, 'Канада, США', '/assets/i/posters/1581014737-poster1.jpg', '[{"hallId":"179","hallName":"Зал 1","time":["15:00"]},{"hallId":"180","hallName":"Зал 2","time":["15:00","19:00"]}]');

-- --------------------------------------------------------

--
-- Структура таблицы `halls`
--

CREATE TABLE IF NOT EXISTS `halls` (
  `hallId` int(100) NOT NULL,
  `hallName` varchar(100) NOT NULL,
  `hallActivity` tinyint(1) NOT NULL DEFAULT '0',
  `hallConfiguration` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `hallChairPrice` int(100) DEFAULT NULL,
  `hallVipChairPrice` int(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `halls`
--

INSERT INTO `halls` (`hallId`, `hallName`, `hallActivity`, `hallConfiguration`, `hallChairPrice`, `hallVipChairPrice`) VALUES
(179, 'Зал 1', 1, '[[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}]]', 100, 200),
(180, 'Зал 2', 1, '[[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}]]', 300, 600);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `orderId` int(10) NOT NULL,
  `orderReservedCode` varchar(15) NOT NULL,
  `orderPlaces` text NOT NULL,
  `orderTotalPrice` varchar(10) NOT NULL,
  `orderDateOfFilm` timestamp NULL DEFAULT NULL,
  `orderDateOfOrder` timestamp NULL DEFAULT NULL,
  `orderHallId` varchar(10) NOT NULL,
  `orderFilmId` varchar(100) NOT NULL,
  `orderQrImg` text
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`orderId`, `orderReservedCode`, `orderPlaces`, `orderTotalPrice`, `orderDateOfFilm`, `orderDateOfOrder`, `orderHallId`, `orderFilmId`, `orderQrImg`) VALUES
(74, 'f1hz8yn237', '["место 5 / ряд 1","место 6 / ряд 1"]', '200', '2020-02-06 15:00:00', '2020-02-06 18:48:02', '179', '65', 'qr/f1hz8yn237.png'),
(75, '643d3f94d7', '["место 5 / ряд 1","место 6 / ряд 1"]', '200', '2020-02-06 15:00:00', '2020-02-06 18:48:03', '179', '65', 'qr/643d3f94d7.png'),
(76, '47tiihyi3d', '["место 1 / ряд 1","место 10 / ряд 1"]', '600', '2020-02-06 08:00:00', '2020-02-06 18:48:15', '180', '80', 'qr/47tiihyi3d.png');

-- --------------------------------------------------------

--
-- Структура таблицы `reservedHalls`
--

CREATE TABLE IF NOT EXISTS `reservedHalls` (
  `reservedHallsId` int(100) NOT NULL,
  `hallId` int(100) NOT NULL,
  `reservedHallsHall` text NOT NULL,
  `reservedHallsDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `filmId` int(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `reservedHalls`
--

INSERT INTO `reservedHalls` (`reservedHallsId`, `hallId`, `reservedHallsHall`, `reservedHallsDate`, `filmId`) VALUES
(9, 179, '[[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"reserved","type":"simple"},{"status":"reserved","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}]]', '2020-02-06 15:00:00', 65),
(10, 179, '[[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"reserved","type":"simple"},{"status":"reserved","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}]]', '2020-02-06 15:00:00', 65),
(11, 180, '[[{"status":"reserved","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"reserved","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}],[{"status":"free","type":"simple"},{"status":"free","type":"simple"},{"status":"free","type":"disabled"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"vip"},{"status":"free","type":"disabled"},{"status":"free","type":"simple"},{"status":"free","type":"simple"}]]', '2020-02-06 08:00:00', 80);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`filmId`);

--
-- Индексы таблицы `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`hallId`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`);

--
-- Индексы таблицы `reservedHalls`
--
ALTER TABLE `reservedHalls`
  ADD PRIMARY KEY (`reservedHallsId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `films`
--
ALTER TABLE `films`
  MODIFY `filmId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT для таблицы `halls`
--
ALTER TABLE `halls`
  MODIFY `hallId` int(100) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=183;
--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT для таблицы `reservedHalls`
--
ALTER TABLE `reservedHalls`
  MODIFY `reservedHallsId` int(100) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
