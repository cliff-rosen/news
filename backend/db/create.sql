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

-- Dumping structure for table dev.comment
DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `CommentID` int(11) NOT NULL AUTO_INCREMENT,
  `CommentUserID` int(11) NOT NULL,
  `ParentCommentID` int(11) DEFAULT NULL,
  `EntryID` int(11) NOT NULL,
  `DateTimeAdded` datetime NOT NULL,
  `CommentText` text NOT NULL DEFAULT '',
  `VoteCount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`CommentID`),
  KEY `ParentCommentID` (`ParentCommentID`) USING BTREE,
  KEY `EntryID` (`EntryID`) USING BTREE,
  KEY `FK_comment_user` (`CommentUserID`),
  CONSTRAINT `FK_comment_comment` FOREIGN KEY (`ParentCommentID`) REFERENCES `comment` (`CommentID`),
  CONSTRAINT `FK_comment_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`),
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`CommentUserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- Dumping data for table dev.comment: ~1 rows (approximately)
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` (`CommentID`, `CommentUserID`, `ParentCommentID`, `EntryID`, `DateTimeAdded`, `CommentText`, `VoteCount`) VALUES
	(2, 47, NULL, 1, '2022-10-29 21:12:47', 'this is a comment', 0),
	(3, 47, NULL, 1, '2022-10-29 21:34:20', 'this is another comment', 0),
	(4, 90, NULL, 122, '2022-10-30 08:48:31', 'This is my first comment', 0),
	(5, 90, NULL, 122, '2022-10-30 08:49:26', 'This is my second comment', 0),
	(8, 90, NULL, 122, '2022-10-30 09:04:12', 'This my third comment', 0),
	(10, 90, NULL, 1, '2022-10-30 12:40:16', 'this is from me', 0),
	(11, 90, NULL, 122, '2022-10-30 15:18:08', 'This is an example of a longer post to see how a long post will be displayed.\n\nIt is also multiple paragraphs.  Multiple paragraphs are an important feature because something you can\'t say everything in one paragraph.', 0),
	(12, 90, NULL, 122, '2022-10-30 15:38:10', 'another comment', 0),
	(13, 90, NULL, 106, '2022-10-30 15:51:15', 'This is the first comment', 0),
	(14, 90, NULL, 106, '2022-10-30 16:02:02', 'Glad this is at the top. The linked Reddit thread demonstrates a common but fundamental misunderstanding of SIP.\nPort 5060 is used for call control and is very low traffic. At most you may have timed OPTIONS messages but a “standard” SIP deployment is at most a handful of (small) packets per second per call setup and tear down with occasional REGISTER messages on an interval measured in seconds. Very low traffic and very low bandwidth. Obviously with more devices you get multiples of these numbers but still very low. 15 kbps is a pretty significant amount of SIP traffic.\n\nThis is most likely targeting VoIP abuse from tools like sipvicious. In a nutshell they scan the internet looking for open SIP ports. They then try to brute force credentials to place calls.\n\nWhy? Toll fraud. The scam works like this:\n\n1) Setup an international toll charge number in some country. Let’s say it charges $5/min. For those that don’t know calls to these numbers get charged to the person placing the call from their phone company and end up on their phone bill with the amount getting paid out (less a cut) to the operator of the number.\n\n2) Compromise a bunch of random exposed SIP implementations on the internet.\n\n3) Place calls to your (or a partners) toll number.\n\n4) Get paid from the toll charges.\n\n5) Some time later the owner of the compromised system gets a huge bill depending on fraud detection systems at the carrier, how fast you could pump calls, etc.\n\nIt’s gotten so bad many VoIP providers block international calls by default and now (apparently) might be blocking 5060 traffic in some way.\n\nThis isn’t that different to what’s happened with SMTP over the years. To combat spam many last mile ISPs started blocking outbound TCP port 25 so compromised machines couldn’t directly send spam. This is where port 465/587 for SMTP “submission” came from.', 0),
	(15, 47, NULL, 122, '2022-10-30 18:41:49', 'yet another one', 0),
	(16, 90, NULL, 122, '2022-10-30 18:43:41', 'asdf', 0),
	(17, 90, NULL, 122, '2022-10-30 18:47:16', 'asdfasdfasdf', 0),
	(18, 90, NULL, 107, '2022-10-30 18:49:28', 'hey sam', 0),
	(19, 90, NULL, 1, '2022-10-30 19:27:41', 'hey', 0),
	(20, 90, NULL, 1, '2022-10-30 19:31:15', 'Time to make the donuts', 0),
	(21, 90, NULL, 106, '2022-10-30 19:33:05', 'That\'s the ticket', 0),
	(22, 90, NULL, 101, '2022-10-30 19:42:41', 'great article', 0),
	(23, 90, NULL, 101, '2022-10-30 19:43:13', 'what does it have to do with psychedelics?', 0);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- Dumping structure for table dev.entry
DROP TABLE IF EXISTS `entry`;
CREATE TABLE IF NOT EXISTS `entry` (
  `EntryID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `EntryDateTime` datetime DEFAULT NULL,
  `EntryTitle` tinytext DEFAULT NULL,
  `EntryText` text DEFAULT NULL,
  `EntryUrl` varchar(2048) DEFAULT NULL,
  `EntryUrlDomain` varchar(250) DEFAULT NULL,
  `VoteCount` int(11) NOT NULL DEFAULT 0,
  `CommentCount` int(11) NOT NULL,
  PRIMARY KEY (`EntryID`),
  KEY `FK_USER_ID` (`UserID`),
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;

-- Dumping data for table dev.entry: ~11 rows (approximately)
/*!40000 ALTER TABLE `entry` DISABLE KEYS */;
INSERT INTO `entry` (`EntryID`, `UserID`, `EntryDateTime`, `EntryTitle`, `EntryText`, `EntryUrl`, `EntryUrlDomain`, `VoteCount`, `CommentCount`) VALUES
	(1, 47, '2022-10-25 19:50:51', 'This is my first entry', 'this is my text', '', NULL, 1, 5),
	(99, 47, '2022-10-25 19:49:55', 'posting again', '', 'https://www.abc.com/axjs', 'abc.com', 0, 0),
	(100, 47, '2022-10-25 20:06:20', 'posting again 2', 'post without url', '', '', 0, 0),
	(101, 90, '2022-10-25 20:40:57', 'Extract hostname name from string', 'This post has nothing to do with psychedelics', 'https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string', 'stackoverflow.com', 2, 2),
	(102, 90, '2022-10-26 10:21:49', 'psl', '', 'https://www.npmjs.com/package/psl', 'npmjs.com', 0, 0),
	(103, 107, '2022-10-26 17:55:49', 'DialogActions API', '', 'https://mui.com/material-ui/api/dialog-actions/', 'mui.com', 0, 0),
	(104, 47, '2022-10-27 16:59:15', 'Material UI centering', '', 'https://medium.com/@tsubasakondo_36683/4-ways-to-center-a-component-in-material-ui-a4bcafe6688e', 'medium.com', 0, 0),
	(105, 47, '2022-10-27 17:01:59', 'Broken URL', '', 'sdfgsdffg', '', 0, 0),
	(106, 90, '2022-10-28 12:06:28', 'React useState documentation', 'If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value. Here’s an example of a counter component that uses both forms of setState:', 'https://reactjs.org/docs/hooks-reference.html#usestate', 'reactjs.org', 1, 3),
	(107, 107, '2022-10-28 17:17:09', ' Controlling ratios of flex items along the main axis', '', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax#the_flex-grow_property', 'mozilla.org', 0, 1),
	(122, 90, '2022-10-30 08:03:50', 'Forms now have autofocus and submit on enter', '', '', '', 0, 8);
/*!40000 ALTER TABLE `entry` ENABLE KEYS */;

-- Dumping structure for table dev.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(16) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`UserID`) USING BTREE,
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;

-- Dumping data for table dev.user: ~5 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`UserID`, `UserName`, `Password`) VALUES
	(47, 'john', '$2b$10$YR6eoJrumFJPBPDJoQ8Yee2K7hzkLcKnbUTbVkCUQsYpIm7Exl7zq'),
	(90, 'cliff', '$2b$10$rppAP3qOSs1i0FIyKemrTuDiYXYUcpM7D2IupFoO1Euz0TTaEK6PW'),
	(107, 'sam', '$2b$10$puyBx1wsOnxKyuG/wsE6oe2LXU37KFYnYlbsI0Ki5VMGXSlDY9NcO'),
	(127, 'jeff', '$2b$10$p2WgDYIcAuUtTLzyaMRbVOjTwUC9oEUQ0Zfncy6FweTL/3XVjM5Ci'),
	(128, 'jeff2', '$2b$10$WS8hNSzAsEI98TSveUfRyuvlgsSOG05EXzUNzg8FFnaMNVDmsMT3a');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table dev.user_entry_vote
DROP TABLE IF EXISTS `user_entry_vote`;
CREATE TABLE IF NOT EXISTS `user_entry_vote` (
  `UserID` int(11) NOT NULL,
  `EntryID` int(11) NOT NULL,
  `Vote` int(11) NOT NULL,
  UNIQUE KEY `UserID_EntryID` (`UserID`,`EntryID`) USING BTREE,
  KEY `FK_user_entry_vote_entry_2` (`EntryID`),
  CONSTRAINT `FK_user_entry_vote_entry_2` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`),
  CONSTRAINT `FK_user_entry_vote_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table dev.user_entry_vote: ~8 rows (approximately)
/*!40000 ALTER TABLE `user_entry_vote` DISABLE KEYS */;
INSERT INTO `user_entry_vote` (`UserID`, `EntryID`, `Vote`) VALUES
	(47, 1, 1),
	(47, 99, 1),
	(47, 100, 0),
	(47, 101, 1),
	(47, 106, 0),
	(47, 107, 0),
	(90, 1, 0),
	(90, 99, -1),
	(90, 101, 1),
	(90, 106, 1);
/*!40000 ALTER TABLE `user_entry_vote` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
