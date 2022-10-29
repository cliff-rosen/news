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
  `UserID` int(11) NOT NULL,
  `EntryDateTime` datetime DEFAULT NULL,
  `EntryTitle` tinytext DEFAULT NULL,
  `EntryText` text DEFAULT NULL,
  `EntryUrl` varchar(2048) DEFAULT NULL,
  `EntryUrlDomain` varchar(250) DEFAULT NULL,
  `VoteCount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`EntryID`),
  KEY `FK_USER_ID` (`UserID`),
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=latin1;

-- Dumping data for table dev.entry: ~10 rows (approximately)
/*!40000 ALTER TABLE `entry` DISABLE KEYS */;
INSERT INTO `entry` (`EntryID`, `UserID`, `EntryDateTime`, `EntryTitle`, `EntryText`, `EntryUrl`, `EntryUrlDomain`, `VoteCount`) VALUES
	(1, 47, '2022-10-25 19:50:51', 'This is my first entry', 'this is my text', '', NULL, 1),
	(99, 47, '2022-10-25 19:49:55', 'posting again', '', 'https://www.abc.com/axjs', 'abc.com', 1),
	(100, 47, '2022-10-25 20:06:20', 'posting again 2', 'post without url', '', '', 2),
	(101, 90, '2022-10-25 20:40:57', 'Extract hostname name from string', 'This post has nothing to do with psychedelics', 'https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string', 'stackoverflow.com', 1),
	(102, 90, '2022-10-26 10:21:49', 'psl', '', 'https://www.npmjs.com/package/psl', 'npmjs.com', 3),
	(103, 107, '2022-10-26 17:55:49', 'DialogActions API', '', 'https://mui.com/material-ui/api/dialog-actions/', 'mui.com', 1),
	(104, 47, '2022-10-27 16:59:15', 'Material UI centering', '', 'https://medium.com/@tsubasakondo_36683/4-ways-to-center-a-component-in-material-ui-a4bcafe6688e', 'medium.com', 3),
	(105, 47, '2022-10-27 17:01:59', 'Broken URL', '', 'sdfgsdffg', '', 3),
	(106, 90, '2022-10-28 12:06:28', 'React useState documentation', 'If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value. Here’s an example of a counter component that uses both forms of setState:', 'https://reactjs.org/docs/hooks-reference.html#usestate', 'reactjs.org', 3),
	(107, 107, '2022-10-28 17:17:09', ' Controlling ratios of flex items along the main axis', '', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax#the_flex-grow_property', 'mozilla.org', 0);
/*!40000 ALTER TABLE `entry` ENABLE KEYS */;

-- Dumping structure for table dev.user
CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(16) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`UserID`) USING BTREE,
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;

-- Dumping data for table dev.user: ~15 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`UserID`, `UserName`, `Password`) VALUES
	(47, 'john', '$2b$10$YR6eoJrumFJPBPDJoQ8Yee2K7hzkLcKnbUTbVkCUQsYpIm7Exl7zq'),
	(90, 'cliff', '$2b$10$rppAP3qOSs1i0FIyKemrTuDiYXYUcpM7D2IupFoO1Euz0TTaEK6PW'),
	(97, 'john3', '$2b$10$FwIafRaYgc.ocUVI7jqQ0OYuHmBRLNgkD32apIf0BUetkZtbQhCUe'),
	(99, 'michael', '$2b$10$MjnD829k3ZWmiROsH3d0veZOroR/DTdAMSnxTmeHhcZ.ARToW2Jj2'),
	(102, 'ron', '$2b$10$XsAt8aOraNP3vlDQ1HzdG.6mPkN8XMMcbGKbi/qR3ehLtKt6sesnK'),
	(107, 'sam', '$2b$10$puyBx1wsOnxKyuG/wsE6oe2LXU37KFYnYlbsI0Ki5VMGXSlDY9NcO'),
	(109, '', '$2b$10$fgrojgDHUhlKTyYK4T0UsePzlJuIX0VWrYs1BJ9.4fjuvzA5Yc35.'),
	(111, 'mike', '$2b$10$VzLpypFc1FtaoThig9O0Oe79Q1pJbZEFfGWYSFl4Eh8LD/SS33v7u'),
	(113, 'mike2', '$2b$10$qcXwDgPcsZkniid68FOFIOcFnZpSupLEFzXn9xiNitfozoG/X.e9i'),
	(115, 'sam2', '$2b$10$I2LXNgjnCtQi3KNZreLtZuxgk.4LPtrGBcNifPjczPQGlFtxzvbsm'),
	(118, 'mike3', '$2b$10$uZWmJr4Se3TbhuIO5kC/mO6atzLFr2EVaheCsGhwUGCk.Iaqp.oZu'),
	(120, 'sam23', '$2b$10$aEYDmvPViaijnTgj7HsYde9P6RaCUO1D1kgq.UQ1GGtxfvRzsizVC'),
	(122, 'sam3', '$2b$10$C24.jGQjGQm0jIaVZNasiunaNBBJrOgivVEn.1Zx3Iu6k8WmTvVZa'),
	(123, 'mary', '$2b$10$BAmrSrHXgGndz6/g4aTyu./tjgq180d6mih7Coc75pjSJVD7t3yF.'),
	(125, 'john4', '$2b$10$X1thriL0V2odbQPpylyOz.nY0yayO.Iu1iKB1xg4utj2i35rwvzKK');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table dev.user_entry_vote
CREATE TABLE IF NOT EXISTS `user_entry_vote` (
  `UserID` int(11) NOT NULL,
  `EntryID` int(11) NOT NULL,
  `Vote` int(11) NOT NULL,
  UNIQUE KEY `UserID_EntryID` (`UserID`,`EntryID`) USING BTREE,
  KEY `FK_user_entry_vote_entry_2` (`EntryID`),
  CONSTRAINT `FK_user_entry_vote_entry_2` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`),
  CONSTRAINT `FK_user_entry_vote_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table dev.user_entry_vote: ~36 rows (approximately)
/*!40000 ALTER TABLE `user_entry_vote` DISABLE KEYS */;
INSERT INTO `user_entry_vote` (`UserID`, `EntryID`, `Vote`) VALUES
	(47, 1, -1),
	(47, 99, -1),
	(47, 100, 1),
	(47, 101, -1),
	(47, 102, -1),
	(47, 103, -1),
	(47, 104, 1),
	(47, 105, 1),
	(47, 106, 1),
	(90, 1, 1),
	(90, 99, 1),
	(90, 100, 1),
	(90, 101, 1),
	(90, 102, 1),
	(90, 103, 1),
	(90, 104, 1),
	(90, 105, 0),
	(90, 106, 1),
	(90, 107, 0),
	(107, 1, 1),
	(107, 99, 1),
	(107, 100, 0),
	(107, 101, 1),
	(107, 102, 1),
	(107, 103, 1),
	(107, 104, 1),
	(107, 105, -1),
	(107, 106, 1),
	(107, 107, 1),
	(120, 105, 1),
	(122, 102, 1),
	(122, 105, 1),
	(123, 100, 0),
	(123, 105, 1),
	(123, 106, 0),
	(123, 107, -1);
/*!40000 ALTER TABLE `user_entry_vote` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
