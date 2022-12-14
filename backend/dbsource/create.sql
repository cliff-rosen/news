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

-- Dumping structure for table dev.api_log
CREATE TABLE IF NOT EXISTS `api_log` (
  `UserID` int(11) DEFAULT NULL,
  `IPAddress` varchar(50) DEFAULT NULL,
  `UserAgent` varchar(200) DEFAULT NULL,
  `DateTimeRequest` timestamp NULL DEFAULT NULL,
  `URL` varchar(250) DEFAULT NULL,
  `Method` varchar(10) DEFAULT NULL,
  `Body` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table dev.comment
CREATE TABLE IF NOT EXISTS `comment` (
  `CommentID` int(11) NOT NULL AUTO_INCREMENT,
  `CommentUserID` int(11) NOT NULL,
  `ParentCommentID` int(11) DEFAULT NULL,
  `EntryID` int(11) NOT NULL,
  `DateTimeAdded` datetime NOT NULL,
  `Path` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `Level` smallint(6) NOT NULL DEFAULT 0,
  `CommentText` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `VoteScore` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`CommentID`),
  KEY `ParentCommentID` (`ParentCommentID`) USING BTREE,
  KEY `EntryID` (`EntryID`) USING BTREE,
  KEY `FK_comment_user` (`CommentUserID`),
  CONSTRAINT `FK_comment_comment` FOREIGN KEY (`ParentCommentID`) REFERENCES `comment` (`CommentID`),
  CONSTRAINT `FK_comment_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`),
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`CommentUserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dev.entry
CREATE TABLE IF NOT EXISTS `entry` (
  `EntryID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `EntryTypeID` tinyint(4) DEFAULT NULL,
  `EntryDateTime` timestamp NULL DEFAULT NULL,
  `Rank` int(11) DEFAULT 0,
  `EntryTitle` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EntryText` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EntryUrl` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EntryUrlDomain` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VoteScoreActual` smallint(6) NOT NULL DEFAULT 0,
  `VoteScoreBias` smallint(6) NOT NULL DEFAULT 0,
  `CommentCount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`EntryID`),
  KEY `FK_USER_ID` (`UserID`),
  KEY `IDX_ENTRY_URL` (`EntryUrl`(768)),
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table dev.entry_health_condition
CREATE TABLE IF NOT EXISTS `entry_health_condition` (
  `EntryID` int(11) NOT NULL,
  `ConditionID` smallint(6) NOT NULL,
  KEY `FK_entry_condition_entry` (`EntryID`) USING BTREE,
  KEY `FK_entry_condition_condition` (`ConditionID`) USING BTREE,
  CONSTRAINT `FK_entry_condition_condition` FOREIGN KEY (`ConditionID`) REFERENCES `health_condition` (`ConditionID`),
  CONSTRAINT `FK_entry_condition_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table dev.entry_substance
CREATE TABLE IF NOT EXISTS `entry_substance` (
  `EntryID` int(11) NOT NULL,
  `SubstanceID` smallint(6) NOT NULL,
  KEY `FK_entry_substance_entry` (`EntryID`),
  KEY `Index 2` (`SubstanceID`),
  CONSTRAINT `FK_entry_substance_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`),
  CONSTRAINT `FK_entry_substance_substance` FOREIGN KEY (`SubstanceID`) REFERENCES `substance` (`SubstanceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table dev.entry_type
CREATE TABLE IF NOT EXISTS `entry_type` (
  `EntryTypeID` tinyint(4) NOT NULL,
  `EntryTypeName` varchar(50) NOT NULL DEFAULT '',
  `RequiresLink` tinyint(1) NOT NULL DEFAULT 0,
  KEY `Index 1` (`EntryTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table dev.feedback
CREATE TABLE IF NOT EXISTS `feedback` (
  `UserID` int(11) DEFAULT NULL,
  `IPAddress` varchar(50) DEFAULT NULL,
  `UserAgent` varchar(200) DEFAULT NULL,
  `DateTimeAdded` timestamp NULL DEFAULT NULL,
  `FeedbackText` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table dev.health_condition
CREATE TABLE IF NOT EXISTS `health_condition` (
  `ConditionID` smallint(6) NOT NULL,
  `ConditionName` varchar(50) NOT NULL,
  KEY `Index 1` (`ConditionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table dev.substance
CREATE TABLE IF NOT EXISTS `substance` (
  `SubstanceID` smallint(6) NOT NULL,
  `SubstanceName` varchar(50) NOT NULL,
  KEY `Index 1` (`SubstanceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table dev.user
CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(16) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`UserID`) USING BTREE,
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table dev.user_comment_vote
CREATE TABLE IF NOT EXISTS `user_comment_vote` (
  `UserID` int(11) NOT NULL,
  `CommentID` int(11) NOT NULL,
  `Vote` int(11) NOT NULL,
  UNIQUE KEY `UserID_CommentID` (`UserID`,`CommentID`) USING BTREE,
  KEY `FK_user_comment_vote_entry_1` (`CommentID`) USING BTREE,
  CONSTRAINT `FK_user_comment_vote_entry_1` FOREIGN KEY (`CommentID`) REFERENCES `comment` (`CommentID`),
  CONSTRAINT `FK_user_comment_vote_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

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

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
