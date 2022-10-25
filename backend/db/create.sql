-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.23-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping structure for table dev.entry
CREATE TABLE IF NOT EXISTS `entry` (
  `EntryID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `EntryDate` datetime DEFAULT NULL,
  `EntryTitle` tinytext DEFAULT NULL,
  `EntryText` text DEFAULT NULL,
  `EntryUrl` varchar(2048) DEFAULT NULL,
  `EntryUrlDomain` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`EntryID`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;

-- Dumping data for table dev.entry: ~10 rows (approximately)
/*!40000 ALTER TABLE `entry` DISABLE KEYS */;
INSERT INTO `entry` (`EntryID`, `UserID`, `EntryDate`, `EntryTitle`, `EntryText`, `EntryUrl`, `EntryUrlDomain`) VALUES
	(1, 47, NULL, 'This is my first entry', 'this is my text', 'https://cnn.com', NULL),
	(2, 47, NULL, 'This i my second entry', '', 'a', NULL),
	(3, 90, NULL, 'I\'m excited to roll out this application for Ron to use', '', 'a', NULL),
	(59, 47, NULL, 'another one here', '', 'a', NULL),
	(63, 90, NULL, 'great article here', '', 'https://github.com/mui/material-ui/tree/v5.10.2/docs/data/material/getting-started/templates/dashboard', NULL),
	(76, 102, NULL, 'this is a post from ron', '', 'ronsurl.com', NULL),
	(77, 47, NULL, 'Research on Psychedelics is Continuing to Ramp Up in the U.S. and Elsewhere', 'This is an example of writing a long text description of the entry.  The pointis to see how it looks in the UI.', 'www.site.com', NULL),
	(87, 47, NULL, 'my entry text', 'my entry text', 'abc.com', NULL),
	(88, 47, NULL, 'post with line break in text', 'my entry text line break', 'abc.com', NULL),
	(89, 47, NULL, 'post with line break in description', 'line 1\nline 2\nline 3', 'abc.com', NULL);
/*!40000 ALTER TABLE `entry` ENABLE KEYS */;

-- Dumping structure for table dev.user
CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(16) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`UserID`) USING BTREE,
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;

-- Dumping data for table dev.user: ~5 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`UserID`, `UserName`, `Password`) VALUES
	(47, 'john', '$2b$10$YR6eoJrumFJPBPDJoQ8Yee2K7hzkLcKnbUTbVkCUQsYpIm7Exl7zq'),
	(90, 'cliff', '$2b$10$rppAP3qOSs1i0FIyKemrTuDiYXYUcpM7D2IupFoO1Euz0TTaEK6PW'),
	(97, 'john3', '$2b$10$FwIafRaYgc.ocUVI7jqQ0OYuHmBRLNgkD32apIf0BUetkZtbQhCUe'),
	(99, 'michael', '$2b$10$MjnD829k3ZWmiROsH3d0veZOroR/DTdAMSnxTmeHhcZ.ARToW2Jj2'),
	(102, 'ron', '$2b$10$XsAt8aOraNP3vlDQ1HzdG.6mPkN8XMMcbGKbi/qR3ehLtKt6sesnK');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
