-- --------------------------------------------------------
-- Host:                         staging-database.cfasmshftc4z.us-east-1.rds.amazonaws.com
-- Server version:               10.6.10-MariaDB-log - managed by https://aws.amazon.com/rds/
-- Server OS:                    Linux
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table news.api_log
DROP TABLE IF EXISTS `api_log`;
CREATE TABLE IF NOT EXISTS `api_log` (
  `UserID` int(11) DEFAULT NULL,
  `IPAddress` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserAgent` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateTimeRequest` timestamp NULL DEFAULT NULL,
  `URL` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Method` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Body` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table news.api_log: ~1,250 rows (approximately)
/*!40000 ALTER TABLE `api_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_log` ENABLE KEYS */;

-- Dumping structure for table news.comment
DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `CommentID` int(11) NOT NULL AUTO_INCREMENT,
  `CommentUserID` int(11) NOT NULL,
  `ParentCommentID` int(11) DEFAULT NULL,
  `EntryID` int(11) NOT NULL,
  `DateTimeAdded` datetime NOT NULL,
  `Path` text NOT NULL DEFAULT '',
  `Level` smallint(6) NOT NULL DEFAULT 0,
  `CommentText` text NOT NULL DEFAULT '',
  `VoteScore` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`CommentID`) USING BTREE,
  KEY `ParentCommentID` (`ParentCommentID`) USING BTREE,
  KEY `EntryID` (`EntryID`) USING BTREE,
  KEY `FK_comment_user` (`CommentUserID`) USING BTREE,
  CONSTRAINT `FK_comment_comment` FOREIGN KEY (`ParentCommentID`) REFERENCES `comment` (`CommentID`),
  CONSTRAINT `FK_comment_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`),
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`CommentUserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=latin1;

-- Dumping data for table news.comment: ~83 rows (approximately)
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` (`CommentID`, `CommentUserID`, `ParentCommentID`, `EntryID`, `DateTimeAdded`, `Path`, `Level`, `CommentText`, `VoteScore`) VALUES
	(93, 115, NULL, 129, '2022-11-08 23:06:41', '0', 0, 'If anyone has seen a study on how long the effects of treatment last, please share it!', 0),
	(96, 115, NULL, 146, '2022-11-10 19:32:25', '0', 0, 'According to the article, Colorado is second only to Oregon in legalizing psilocybin. Psychedelic mushrooms became illegal in the U.S. in 1970 under the Controlled Substances Act. Even with Proposition 122’s passage, psilocybin remains federally classified as a Schedule 1 controlled substance, like heroin, for which there is no current medical use.', 1),
	(97, 90, 96, 146, '2022-11-11 15:33:23', '0:96', 1, 'Does the fed’s classification of Schedule I override the state law?', 0),
	(98, 121, NULL, 157, '2022-11-11 21:46:28', '0', 0, 'This is a very informative interview with the Director of TCRPS at Univesrity of Wisconsin who discusses current research at UW and relates these findings to research being performed at other institutions, like NYU Center for Psychedelic Medicine. This researching going on around the world promises to transform the practice of psychiatry, including treatment-resistant depression.', 1),
	(99, 121, NULL, 158, '2022-11-11 21:53:14', '0', 0, 'Interestingly, this BBC report on a new study of magic mushrooms on depression (published in the NEJM) reports that some patients go from \'What is wrong with me?\' to \'What happened to me?\'"  Some patients in all groups experienced side-effects, such as headaches, nausea, extreme tiredness as well as thoughts about suicide. Although this begs the question as to whether some of the side effects were reported in the placebo-control subjects. One can review the actual study here: https://www.nejm.org/doi/full/10.1056/NEJMoa2206443', 1),
	(100, 90, NULL, 159, '2022-11-12 15:01:36', '0', 0, 'A couple of news articles discussing this trial have been posted on TA:\n\nCNN\nSevere depression eased by single dose of synthetic ‘magic mushroom\nhttps://trippersalmanac.com/post/116\n\nBBC\nMagic-mushroom drug can treat severe depression, trial suggests\nhttps://trippersalmanac.com/post/158', 1),
	(101, 115, NULL, 159, '2022-11-18 16:18:28', '0', 0, 'tag: psilocybin, depression, clinical trial, scientific study', 0),
	(102, 115, NULL, 215, '2022-12-01 18:59:03', '0', 0, 'Looks like nothing happened with it. I\'m told that a "study order" means it\'s essentially dead for now. Plus the presenter (DiZoglio) will have a new role in 2023.', 0),
	(103, 115, NULL, 219, '2022-12-07 21:27:46', '0', 0, 'tag: resource', 0),
	(104, 115, NULL, 209, '2022-12-08 00:30:27', '0', 0, 'tag: Alzheimer\'s', 0),
	(105, 115, NULL, 210, '2022-12-08 00:31:29', '0', 0, 'tag: Alzheimer\'s', 0),
	(106, 115, NULL, 218, '2022-12-08 00:34:19', '0', 0, 'tag: esketamine', 0),
	(107, 115, NULL, 216, '2022-12-08 00:38:01', '0', 0, 'tag: side effects, r&d, various (substances)', 0),
	(108, 115, NULL, 205, '2022-12-08 16:09:32', '0', 0, 'tag: palliative care', 0),
	(109, 115, NULL, 204, '2022-12-08 16:12:02', '0', 0, 'tag: PAT, various substances, various conditions', 0),
	(110, 115, NULL, 203, '2022-12-08 16:13:34', '0', 0, 'tag: movie, celebrities', 0),
	(111, 115, NULL, 198, '2022-12-08 16:18:36', '0', 0, 'tag: regulation', 0),
	(112, 115, NULL, 197, '2022-12-08 16:19:49', '0', 0, 'tag: various substances and conditions, regulation, Canada', 0),
	(113, 115, NULL, 201, '2022-12-08 16:22:45', '0', 0, 'tag: various conditions, investing', 0),
	(114, 115, NULL, 200, '2022-12-08 16:25:43', '0', 0, 'tag: creativity, art', 0),
	(115, 115, NULL, 199, '2022-12-08 16:31:33', '0', 0, 'tag: various substances and conditions', 0),
	(116, 115, NULL, 196, '2022-12-08 16:32:48', '0', 0, 'tag: various substances and conditions, regulation', 0),
	(117, 115, NULL, 195, '2022-12-08 16:34:50', '0', 0, 'tag: various substances and conditions, regulation, research', 0),
	(118, 115, NULL, 194, '2022-12-08 16:38:09', '0', 0, 'tag: resource, course, PAT', 0),
	(119, 115, NULL, 192, '2022-12-08 16:40:21', '0', 0, 'tag: adverse effects', 0),
	(120, 115, NULL, 193, '2022-12-08 16:41:20', '0', 0, 'tag: adverse effects', 0),
	(121, 115, NULL, 191, '2022-12-08 16:42:27', '0', 0, 'tag: adverse effects', 0),
	(122, 115, NULL, 190, '2022-12-08 18:22:39', '0', 0, 'tag: various substances, motherhood', 0),
	(123, 115, NULL, 189, '2022-12-08 18:24:18', '0', 0, 'tag: PAT, various substances, various conditions', 0),
	(124, 115, NULL, 188, '2022-12-08 18:24:55', '0', 0, 'delete this tag', 0),
	(125, 115, NULL, 202, '2022-12-08 18:26:11', '0', 0, 'tag: art, movie list', 0),
	(126, 115, NULL, 187, '2022-12-08 18:28:38', '0', 0, 'tag: neurology', 0),
	(127, 115, NULL, 186, '2022-12-08 18:29:33', '0', 0, 'tag: resource, research facility', 0),
	(128, 115, NULL, 185, '2022-12-08 18:33:23', '0', 0, 'tag: facilitator training', 0),
	(129, 115, NULL, 184, '2022-12-08 18:36:19', '0', 0, 'tag: paralysis', 0),
	(130, 115, NULL, 183, '2022-12-08 18:37:50', '0', 0, 'tag: various substances and conditions, regulation', 0),
	(131, 115, NULL, 178, '2022-12-08 19:09:57', '0', 0, 'tag: microdosing', 0),
	(132, 115, NULL, 177, '2022-12-08 19:10:43', '0', 0, 'tag: microdosing', 0),
	(133, 115, NULL, 176, '2022-12-08 19:14:07', '0', 0, 'tag: various substances, microdosing', 0),
	(134, 115, NULL, 173, '2022-12-08 19:17:45', '0', 0, 'tag: overview, regulation', 0),
	(135, 115, NULL, 174, '2022-12-08 19:18:31', '0', 0, 'tag: resource, clinical trials', 0),
	(136, 115, NULL, 175, '2022-12-08 19:22:40', '0', 0, 'tag: microdosing, anxiety, motherhood', 0),
	(137, 115, NULL, 172, '2022-12-08 20:08:43', '0', 0, 'tag: various substances and conditions, regulation', 0),
	(138, 115, NULL, 171, '2022-12-08 20:10:42', '0', 0, 'tag: overview, business', 0),
	(139, 115, NULL, 170, '2022-12-08 20:13:07', '0', 0, 'tag: regulation', 0),
	(140, 115, NULL, 169, '2022-12-08 20:17:45', '0', 0, 'tag: celebrities', 0),
	(141, 115, NULL, 168, '2022-12-08 20:18:45', '0', 0, 'tag: r&d company', 0),
	(142, 115, NULL, 167, '2022-12-08 20:20:35', '0', 0, 'tag: practitioner company', 0),
	(143, 115, NULL, 166, '2022-12-08 20:23:42', '0', 0, 'tag: r&d company, manufacturer, practitioner', 0),
	(144, 115, NULL, 165, '2022-12-08 20:24:27', '0', 0, 'tag: business', 0),
	(145, 115, NULL, 164, '2022-12-08 21:00:39', '0', 0, 'tag: clinical trials, Finland/Europe', 0),
	(146, 115, NULL, 163, '2022-12-08 21:01:41', '0', 0, 'tag: regulation, Illinois', 0),
	(147, 115, NULL, 162, '2022-12-08 21:02:41', '0', 0, 'tag: business', 0),
	(148, 115, NULL, 160, '2022-12-08 21:05:24', '0', 0, 'tag: business, clinical trials', 0),
	(149, 115, NULL, 158, '2022-12-08 21:08:29', '0', 0, 'tag: psilocybin, depression, PAT', 0),
	(150, 115, NULL, 217, '2022-12-08 21:46:12', '0', 0, 'tag: resource, research institution, Europe/UK', 0),
	(151, 115, NULL, 214, '2022-12-08 21:47:53', '0', 0, 'tag: various substances and conditions, regulation, US/MA', 0),
	(152, 115, NULL, 213, '2022-12-08 21:49:09', '0', 0, 'tag: regulation, US/MA', 0),
	(153, 115, NULL, 157, '2022-12-13 16:39:58', '0', 0, 'tag: this post needs to be tagged', 0),
	(154, 115, NULL, 150, '2022-12-13 16:44:12', '0', 0, 'tag: various substances, palliative care', 0),
	(155, 115, NULL, 151, '2022-12-13 16:46:02', '0', 0, 'tag: various substances and conditions, UK, regulation', 0),
	(156, 115, NULL, 152, '2022-12-13 16:57:16', '0', 0, 'tag: microdosing, motherhood', 0),
	(157, 115, NULL, 153, '2022-12-13 16:58:55', '0', 0, 'tag: various substances', 0),
	(158, 115, NULL, 155, '2022-12-13 17:01:32', '0', 0, 'tag: various substances and conditions, podcast', 0),
	(159, 115, NULL, 156, '2022-12-13 17:04:27', '0', 0, 'tag: various substances and conditions, podcast with transcript', 0),
	(160, 115, NULL, 138, '2022-12-13 17:34:46', '0', 0, 'tag: various substances and conditions, business/investing', 0),
	(161, 115, NULL, 139, '2022-12-13 17:36:22', '0', 0, 'tag: various substances and conditions, podcast', 0),
	(162, 115, NULL, 140, '2022-12-13 17:37:41', '0', 0, 'tag: various substances and conditions, video/resource?', 0),
	(163, 115, NULL, 141, '2022-12-13 17:47:02', '0', 0, 'tag: various substances and conditions', 0),
	(164, 115, NULL, 146, '2022-12-13 17:50:02', '0', 0, 'tag: regulation, US/CO', 0),
	(165, 115, NULL, 147, '2022-12-13 17:53:45', '0', 0, 'tag: regulation, US/CO', 0),
	(166, 115, NULL, 148, '2022-12-13 17:55:19', '0', 0, 'tag: regulation, US/OR', 0),
	(167, 115, NULL, 149, '2022-12-13 17:56:15', '0', 0, 'tag: business', 0),
	(168, 104, NULL, 116, '2022-12-14 21:16:15', '0', 0, 'tag: video', 0),
	(169, 104, NULL, 115, '2022-12-14 21:19:47', '0', 0, '"This article is part of Nature Outlook: Psychedelic medicine, an editorially independent supplement produced with the financial support of third parties." Possibly/probably biased?', 0),
	(170, 104, NULL, 115, '2022-12-14 21:21:34', '0', 0, 'tag: various substances and conditions, overview', 0),
	(171, 115, NULL, 135, '2022-12-14 21:32:47', '0', 0, 'tag: investing, patents', 0),
	(172, 115, NULL, 136, '2022-12-14 21:33:49', '0', 0, 'tag: various substances and conditions, video', 0),
	(173, 115, NULL, 137, '2022-12-14 21:36:46', '0', 0, 'tag: neurology, adverse effects', 0),
	(174, 115, NULL, 117, '2022-12-14 21:39:53', '0', 0, 'tag: various substances and conditions, neurology', 0),
	(175, 115, NULL, 117, '2022-12-14 21:40:15', '0', 0, '"This article is part of Nature Outlook: Psychedelic medicine, an editorially independent supplement produced with the financial support of third parties." Possibly/probably biased?', 0),
	(176, 115, NULL, 120, '2022-12-14 21:43:22', '0', 0, 'tag: various substances and conditions, overview', 0),
	(177, 104, NULL, 121, '2022-12-14 21:44:49', '0', 0, 'tag: various conditions, background/history', 0),
	(178, 104, NULL, 123, '2022-12-14 21:50:06', '0', 0, 'tag: various substances and conditions, overview, background, business', 0),
	(179, 115, NULL, 124, '2022-12-14 22:06:43', '0', 0, 'tag: psilocybin, addiction/smoking, PAT/CBT', 0),
	(180, 104, NULL, 125, '2022-12-14 22:12:00', '0', 0, 'tag: regulation', 0),
	(181, 115, NULL, 126, '2022-12-14 22:12:36', '0', 0, 'tag: resource', 0),
	(182, 115, NULL, 127, '2022-12-14 22:15:17', '0', 0, 'tag: OCD, psilocybin', 0),
	(183, 115, NULL, 129, '2022-12-14 22:16:06', '0', 0, 'tag: psilocybin, depression, neurology', 0),
	(184, 115, NULL, 130, '2022-12-14 22:18:30', '0', 0, 'tag: psilocybin, depression, adverse effects', 0),
	(185, 115, NULL, 236, '2022-12-15 19:38:32', '0', 0, 'tag: business', 0),
	(186, 115, NULL, 237, '2022-12-15 19:45:03', '0', 0, 'tag: regulation, US/OR, business', 0),
	(187, 115, NULL, 238, '2022-12-16 18:38:30', '0', 0, 'tag: religion', 0),
	(188, 115, NULL, 236, '2022-12-16 20:37:50', '0', 0, 'deleted', 1),
	(189, 115, NULL, 230, '2022-12-16 21:05:54', '0', 0, 'delete this comment', 0),
	(190, 125, 188, 236, '2022-12-16 22:31:25', '0:188', 1, 'Delete this reply', -1),
	(191, 125, NULL, 240, '2022-12-16 22:41:07', '0', 0, 'Delete this edited comment', -1),
	(192, 125, 191, 240, '2022-12-16 22:41:34', '0:191', 1, 'And this reply', 1),
	(193, 125, NULL, 240, '2022-12-16 22:41:53', '0', 0, 'New comment to delete', 1);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- Dumping structure for table news.entry
DROP TABLE IF EXISTS `entry`;
CREATE TABLE IF NOT EXISTS `entry` (
  `EntryID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `EntryTypeID` tinyint(4) DEFAULT NULL,
  `EntryDateTime` timestamp NULL DEFAULT NULL,
  `EntryTitle` tinytext DEFAULT NULL,
  `EntryText` text DEFAULT NULL,
  `EntryUrl` varchar(2048) DEFAULT NULL,
  `EntryUrlDomain` varchar(250) DEFAULT NULL,
  `VoteScoreActual` smallint(6) NOT NULL DEFAULT 0,
  `VoteScoreBias` smallint(6) NOT NULL DEFAULT 0,
  `CommentCount` int(11) NOT NULL DEFAULT 0,
  `Rank` int(11) DEFAULT 0,
  PRIMARY KEY (`EntryID`),
  KEY `IDX_ENTRY_URL` (`EntryUrl`),
  KEY `FK_USER_ID` (`UserID`) USING BTREE,
  KEY `Index 3` (`UserID`),
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=latin1;

-- Dumping data for table news.entry: ~110 rows (approximately)
/*!40000 ALTER TABLE `entry` DISABLE KEYS */;
INSERT INTO `entry` (`EntryID`, `UserID`, `EntryTypeID`, `EntryDateTime`, `EntryTitle`, `EntryText`, `EntryUrl`, `EntryUrlDomain`, `VoteScoreActual`, `VoteScoreBias`, `CommentCount`, `Rank`) VALUES
	(103, 104, 3, '2022-11-08 21:35:49', 'PsychonautWiki', 'Encyclopedic resource for psychedelic substances and their effects.', 'https://psychonautwiki.org/wiki/Main_Page', 'psychonautwiki.org', 0, 0, 0, 0),
	(115, 109, 1, '2022-11-08 21:35:49', 'Research round-up: Psychedelic medicine', 'Predicting bad trips, treating depression without hallucinations, and other highlights from studies of psychedelics.', 'https://www.nature.com/articles/d41586-022-02877-4', 'nature.com', 0, 0, 2, 0),
	(116, 104, 1, '2022-11-08 21:35:49', 'Severe depression eased by single dose of synthetic ‘magic mushroom’', 'CNN\'s report on study from The New England Journal of Medicine', 'https://www.cnn.com/2022/11/02/health/psilocybin-magic-mushroom-depression-wellness/index.html', 'cnn.com', 0, 0, 1, 0),
	(117, 109, 1, '2022-11-08 21:35:49', 'Your brain on psychedelics', 'Mind-altering drugs are shaking up medicine — but how they actually work remains a mystery. A flurry of imaging studies could clarify the picture.', 'https://www.nature.com/articles/d41586-022-02874-7', 'nature.com', 0, 0, 2, 0),
	(119, 104, 3, '2022-11-08 21:35:49', 'Resource: Johns Hopkins Center for Psychedelic and Consciousness Research', 'Leading scientific research center for psychedelics across therapeutic areas. Publications, experts, newsletter.', 'https://hopkinspsychedelic.org/', 'hopkinspsychedelic.org', 1, 0, 0, 0),
	(120, 109, 1, '2022-11-08 21:35:49', 'Back to the future: Psychedelic drugs in psychiatry (2021)', 'Recently, psychedelic drugs have once again taken popular culture by storm. From the psychedelic startup companies newly forming on Wall Street to a recent New York Timesarticle that claims "psychedelic drugs are closer to medicinal use," it seems that there is a renewed media and medical interest in acid (LSD), mushrooms (psilocybin), ecstasy (MDMA), ayahuasca, DMT (dimethyltryptamine), and ketamine.', 'https://www.health.harvard.edu/blog/back-to-the-future-psychedelic-drugs-in-psychiatry-202106222508', 'harvard.edu', 0, 0, 1, 0),
	(121, 104, 1, '2022-11-08 21:35:49', 'Exploring the History and Therapeutic Potential of Ayahuasca', '', 'https://psychedelicspotlight.com/exploring-the-history-and-therapeutic-potential-of-ayahuasca/', 'psychedelicspotlight.com', 0, 0, 1, 0),
	(123, 104, 1, '2022-11-08 21:35:49', 'The Psychedelic Revolution Is Coming. Psychiatry May Never Be the Same. (paywall)', 'Psilocybin and MDMA are poised to be the hottest new therapeutics since Prozac. Universities want in, and so does Wall Street. Some worry a push to loosen access could bring unintended consequences.', 'https://www.nytimes.com/2021/05/09/health/psychedelics-mdma-psilocybin-molly-mental-health.html', 'nytimes.com', 2, 0, 1, 1),
	(124, 109, 1, '2022-11-08 21:35:49', '\'Magic Mushrooms\' Help Longtime Smokers Quit', '', 'https://www.hopkinsmedicine.org/news/media/releases/magic_mushrooms_help_longtime_smokers_quit', 'hopkinsmedicine.org', 0, 0, 1, 0),
	(125, 104, 1, '2022-11-08 21:35:49', 'Veterans Have Become Unlikely Lobbyists in Push to Legalize Psychedelic Drugs (paywall)', '', 'https://www.nytimes.com/2021/11/11/health/veterans-psychedelics-ptsd-depression.html?action=click&pgtype=Article&state=default&module=styln-ptsd&variant=show&region=MAIN_CONTENT_1&block=storyline_top_links_recirc', 'nytimes.com', 0, 0, 1, 0),
	(126, 109, 1, '2022-11-08 21:35:49', 'Resource: Center for the Neuroscience of Psychedelics', 'The Center seeks to understand how psychedelics enhance the brain’s capacity for change, to optimize current treatments and create new treatments for mental illness, and to make the term “treatment resistant” obsolete.', 'https://www.massgeneral.org/psychiatry/treatments-and-services/center-for-the-neuroscience-of-psychedelics', 'massgeneral.org', 0, 0, 1, 0),
	(127, 109, 1, '2022-11-08 21:35:49', 'OCD and Psychedelics', 'The use of psilocybin for OCD treatment.', 'https://www.brainsway.com/knowledge-center/psychedelics-and-ocd/', 'brainsway.com', 0, 0, 1, 0),
	(128, 104, 1, '2022-11-08 21:35:49', 'Book: How to Change Your Mind', 'What the New Science of Psychedelics Teaches Us About Consciousness, Dying, Addiction, Depression, and Transcendence. Popular book, highly rated.', 'https://www.amazon.com/dp/0735224153/?coliid=I1D2ZPY329NQGQ&colid=3SF10F9MJWJ7C&psc=1&ref_=lv_ov_lig_dp_it', 'amazon.com', 1, 0, 0, 0),
	(129, 109, 1, '2022-11-08 21:35:49', 'Psilocybin Rewires the Brain for People with Depression', 'Study suggests new mechanism for how psychedelics affect the brain.', 'https://www.ucsf.edu/news/2022/04/422606/psilocybin-rewires-brain-people-depression', 'ucsf.edu', 1, 0, 2, 1),
	(130, 109, 1, '2022-11-08 21:35:49', 'The Harms of Psychedelics Need to Be Put Into Context', 'As psychedelic therapy trials get bigger and the drugs become more accessible, researchers need to start talking about their potential adverse effects.', 'https://www.wired.com/story/psychedelics-side-effects/', 'wired.com', 0, 0, 1, 0),
	(131, 104, 1, '2022-11-08 21:35:49', 'Book: The Psilocybin Mushroom Bible: The Definitive Guide to Growing and Using Magic Mushrooms', 'Very popular. Very high ratings.', 'https://www.amazon.com/dp/1937866289/?coliid=I1J665IHNXM5QJ&colid=3SF10F9MJWJ7C&psc=1&ref_=lv_ov_lig_dp_it', 'amazon.com', 0, 0, 0, 0),
	(134, 115, 1, '2022-11-09 00:35:02', 'Please stop licking psychedelic toads, National Park Service warns', '', 'https://www.washingtonpost.com/health/2022/11/08/national-park-toad-sonoran-desert-hallucinogenic/', 'washingtonpost.com', 0, 0, 0, 0),
	(135, 115, 1, '2022-11-09 01:38:26', 'With Promise of Legalization, Psychedelic Companies Joust Over Future Profits (paywall)', 'Cash rich start-ups are filing scores of patent claims on hallucinogens like magic mushrooms. Researchers and patient advocates worry high prices will make the therapies unaffordable.', 'https://www.nytimes.com/2022/10/25/health/psychedelic-drug-therapy-patents.html', 'nytimes.com', 0, 0, 1, 0),
	(136, 115, 1, '2022-11-09 01:42:43', 'Episode of NOVA: Can Psychedelics Cure?', 'Hallucinogenic drugs—popularly called psychedelics—have been used by human societies for thousands of years. Today, scientists are taking a second look at many of these mind-altering substances – both natural and synthetic – and discovering that they can have profoundly positive clinical impacts, helping patients struggling with a range of afflictions from addiction to depression and PTSD. October 2022. 53 minutes.', 'https://www.pbs.org/video/can-psychedelics-cure-lxqulz/', 'pbs.org', 0, 0, 1, 0),
	(137, 115, 1, '2022-11-09 01:47:23', 'What happens to your brain on psychedelics? Experts explain the benefits and risks', 'article also includes some market sizing stats', 'https://fortune.com/well/2022/09/27/psychedelics-benefits-and-risks/', 'fortune.com', 0, 0, 1, 0),
	(138, 115, 1, '2022-11-09 01:52:17', 'Counterpoint Global Insights: Psychedelics', 'Morgan Stanley Investment Management’s Counterpoint Global shares their proprietary views on a big idea that has the potential to trigger far-reaching consequences.', 'https://www.morganstanley.com/im/publication/insights/articles/article_psychedelics_us.pdf', 'morganstanley.com', 0, 0, 1, 0),
	(139, 115, 1, '2022-11-09 01:57:33', '\'Reluctant Psychonaut\' Michael Pollan Embraces The \'New Science\' Of Psychedelics', '42-minute interview from 2018 on NPR\'s Fresh Air with the author of "How to Change Your Mind: What the New Science of Psychedelics Teaches Us About Consciousness, Dying, Addiction, Depression, and Transcendence"', 'https://www.npr.org/sections/health-shots/2018/05/15/611225541/reluctant-psychonaut-michael-pollan-embraces-the-new-science-of-psychedelics', 'npr.org', 0, 0, 1, 0),
	(140, 115, 1, '2022-11-09 02:07:37', 'The future of psychedelic-assisted psychotherapy', '16 minute video of a TED Talk from 2019', 'https://www.ted.com/talks/rick_doblin_the_future_of_psychedelic_assisted_psychotherapy', 'ted.com', 0, 0, 1, 0),
	(141, 115, 1, '2022-11-09 02:12:29', 'The Highs and Lows of Psychedelics', 'Cautionary tales about the psychedelics hype bubble and the possible dangers of off-label treatments at "brain wellness spas"', 'https://www.psychologytoday.com/us/blog/demystifying-psychiatry/202211/the-highs-and-lows-psychedelics', 'psychologytoday.com', 0, 0, 1, 0),
	(146, 115, 1, '2022-11-10 19:29:00', 'Colorado becomes second state to legalize “magic mushrooms”', 'Proposition 122, which passed by an extremely thin margin, would allow healing centers where people could consume psilocybin mushrooms', 'https://coloradosun.com/2022/11/09/proposition-122-colorado-results-psilocybin-mushrooms-2/', 'coloradosun.com', 1, 0, 3, 1),
	(147, 115, 1, '2022-11-10 19:48:13', 'It’s legal to use psilocybin, or ‘magic mushrooms,’ in Oregon. But that could soon change', 'Includes a map showing the status of psychedelic drug policy reform across US states', 'https://www.cnn.com/2022/11/04/us/oregon-psilocybin-voter-pushback-ctrp', 'cnn.com', 0, 0, 1, 0),
	(148, 115, 1, '2022-11-10 19:50:01', 'Oregon Psilocybin Services to finalize rules around administration, production in December 2022', 'Taking magic mushrooms in Oregon will be a legal possibility next year, once Oregon Psilocybin Services finalizes that rules for its administration and production. Those rules must be in place by Dec. 31, 2022, so the state can begin taking license applications on Jan. 2, 2023.', 'https://www.kgw.com/article/news/local/oregon-psilocybin-services-finalize-rules-in-december-2022/283-5fb47d31-3e7e-4d23-bcbe-ba2bcc653da8', 'kgw.com', 0, 0, 1, 0),
	(149, 115, 1, '2022-11-10 21:42:21', 'Psychedelics and business could make for a bad trip', 'Brash new investors are clashing with the pioneers of mind-altering drug therapies', 'https://www.ft.com/content/4da607e4-c2af-4002-ab96-cfe79269aff2', 'ft.com', 0, 0, 1, 0),
	(150, 115, 1, '2022-11-10 21:45:09', 'How Psychedelics Can Transform End-of-Life Care', '“We don’t always know why the medicine we give patients for pain, anxiety, or agitation isn’t working. If there could be a better way to treat people where they can still enjoy their loved ones at the end of life, then why not use it?”', 'https://slate.com/technology/2022/11/how-psychedelics-can-transform-end-of-life-care.html', 'slate.com', 0, 0, 1, 0),
	(151, 115, 1, '2022-11-10 21:46:19', 'Psychedelic drug research held back by UK rules and attitudes, say scientists', 'Draconian licensing rules and a lack of public funding are holding back the emerging field of psychedelic medicine in the UK, leading scientists have warned after the release of groundbreaking results on the use of psilocybin to treat depression.', 'https://www.theguardian.com/science/2022/nov/08/psilocybin-research-kept-in-limbo-by-rules-and-attitudes-say-scientists', 'theguardian.com', 0, 5, 1, 1),
	(152, 115, 1, '2022-11-10 21:48:45', 'Are All the Moms Microdosing Without Me?', 'One mother of two digs into the advantages—and red flags—of shrooming for increased mental health. Here’s what she found.', 'https://www.oprahdaily.com/life/health/a41626181/microdosing-mushrooms-moms/', 'oprahdaily.com', 0, 3, 1, 1),
	(153, 115, 1, '2022-11-10 21:52:58', 'Psychedelics Can Treat PTSD, So Should They Be Given to Soldiers?', 'A push to get psychedelics into the hands of active-duty US military personnel is controversial but gaining steam, raising questions about whether these drugs’ potential to treat post-traumatic stress disorder outweighs longstanding concerns about their use.', 'https://www.bloomberg.com/news/newsletters/2022-11-07/psychedelics-for-the-military-debate-grows-over-treatments-for-ptsd', 'bloomberg.com', 0, 4, 1, 1),
	(155, 121, 1, '2022-11-11 21:33:42', 'What Promise Do Psychedelics Hold As Therapeutics?', 'On his podcast, Sanjay Gupta, the popular CNN medical correspondent discusses how scientists are studying psychedelics like MDMA, psilocybin, and ketamine as treatment for depression, PTSD, anxiety, and other mental health conditions.', 'https://www.cnn.com/audio/podcasts/chasing-life/episodes/a3a7231d-6c28-4ef5-9d2f-af43016639f1', 'cnn.com', 0, 0, 1, 0),
	(156, 121, 1, '2022-11-11 21:38:34', 'Psychedelic research: balancing trippyness with a new scientific rigor – The Conversation Weekly podcast transcript', 'Dan Merino discusses his recent experience with people taking psychedelics at the Burning Man festival as well as interviews with noted scientists who study the psychological effects of psychedelics.', 'https://theconversation.com/psychedelic-research-balancing-trippyness-with-a-new-scientific-rigor-the-conversation-weekly-podcast-transcript-192640', 'theconversation.com', 0, 0, 1, 0),
	(157, 121, 1, '2022-11-11 21:43:29', 'Could psychedelics be the healthcare of the future? UW researchers find promising results', 'Report on research being conducted at the University of Wisconsin-Madison Transdisciplinary Center for Research in Psychoactive Substances (TCRPS). According to the Diretor of the Center: “The data from one dose of psilocybin seems to suggest that there is a substantial benefit for many persons with depression, at least as good as from SSRIs like Prozac, with fewer side effects... “Not everybody improves — it\'s not a magic bullet, but it does have a substantial response rate.”', 'https://www.dailycardinal.com/article/2022/11/could-psychedelics-be-the-healthcare-of-the-future-uw-researchers-find-promising-results', 'dailycardinal.com', 0, 0, 2, 0),
	(158, 121, 1, '2022-11-11 21:49:18', 'Magic-mushroom drug can treat severe depression, trial suggests', 'A drug based on a compound in hallucinogenic mushrooms can improve the symptoms of severe depression for up to 12 weeks, a trial shows.', 'https://www.bbc.com/news/health-63475630', 'bbc.com', 1, 0, 2, 1),
	(159, 121, 1, '2022-11-11 21:54:10', 'Single-Dose Psilocybin for a Treatment-Resistant Episode of Major Depression', 'In this phase 2 trial involving participants with treatment-resistant depression, psilocybin at a single dose of 25 mg, but not 10 mg, reduced depression scores significantly more than a 1-mg dose over a period of 3 weeks but was associated with adverse effects.', 'https://www.nejm.org/doi/full/10.1056/NEJMoa2206443', 'nejm.org', 1, 2, 2, 1),
	(160, 115, 1, '2022-11-14 18:45:22', 'Awakn Announces Positive Results From Phase II A/B Clinical Trial', 'Company\'s own press release regarding its clinical trial published on the American Journal of Psychiatry. Investigating Ketamine-Assisted Therapy for the treatment of Alcohol Use Disorder (AUD).', 'https://awaknlifesciences.com/awakn-announces-positive-results-from-phase-ii-a-b-clinical-trial', 'awaknlifesciences.com', 0, 0, 1, 0),
	(161, 115, 2, '2022-11-14 18:49:52', 'Adjunctive Ketamine With Relapse Prevention–Based Psychological Therapy in the Treatment of Alcohol Use Disorder', 'Original publication from 11 Jan 2022', 'https://ajp.psychiatryonline.org/doi/10.1176/appi.ajp.2021.21030277', 'psychiatryonline.org', 0, 0, 0, 0),
	(162, 115, 1, '2022-11-14 18:55:07', 'Awakn Life Sciences Signs its Third Licensing Partnership Agreement in North America, and First in New York', 'Bringing Awakn’s Ketamine-assisted therapy treatment for AUD to Nushama’s clinic in New York City.', 'https://awaknlifesciences.com/awakn-life-sciences-signs-its-third-licensing-partnership-agreement-in-north-america', 'awaknlifesciences.com', 0, 0, 1, 0),
	(163, 115, 1, '2022-11-14 19:23:41', 'POLITICSLocal Illinois Lawmaker Pushes For Psychedelics Decriminalization With New Bill', 'Illinois legalization begins in Evanston, outside of Chicago.', 'https://www.marijuanamoment.net/local-illinois-lawmaker-pushes-for-psychedelics-decriminalization-with-new-bill/', 'marijuanamoment.net', 0, 0, 1, 0),
	(164, 115, 1, '2022-11-14 19:27:18', 'Finland grants license for psychedelic drug therapy study', 'The Finnish Medicines Agency (Fimea) has granted Clairvoyant Therapeutics, a Canadian drug company, permission to study the effects of psychedelic drug therapies (specifically psilocybin) for the treatment of alcohol addiction.', 'https://yle.fi/a/3-12676727', 'yle.fi', 0, 0, 1, 0),
	(165, 115, 1, '2022-11-14 19:30:40', 'Revitalist and Wake Network Announce Joint Venture Partnership to Open Psychedelic Clinics and Retreats in the United States', 'Revitalist and WAKE Network, Inc. announce the joint venture partnership opening psychedelic clinics and retreats with vertical offerings with a personalized medicine and therapy approach.', 'https://www.businesswire.com/news/home/20221114005523/en/', 'businesswire.com', 0, 0, 1, 0),
	(166, 115, 1, '2022-11-14 19:33:43', 'Company: Wake Network, Inc.', 'Our Mission: To create a world where natural psilocybin therapies and integration practices are the primary support for mental health.', 'https://wake.net/', 'wake.net', 0, 0, 1, 0),
	(167, 115, 1, '2022-11-14 19:35:35', 'Company: Revitalist Lifestyle and Wellness Ltd.', 'Our wellness centers empower individuals toward an improved quality of life through comprehensive and compassionate care.', 'https://revitalist.com/', 'revitalist.com', 0, 0, 1, 0),
	(168, 115, 1, '2022-11-14 19:38:25', 'Company: Awakn Life Sciences Corp', 'Awakn Life Sciences is a biotechnology company, researching, developing, and commercializing therapeutics to treat addiction with a near-term focus on Alcohol Use Disorder. OBJECTIVE: To provide effective therapeutics to addiction sufferers in desperate need.', 'https://awaknlifesciences.com/', 'awaknlifesciences.com', 0, 0, 1, 0),
	(169, 115, 1, '2022-11-14 19:44:38', 'Elon Musk Joins Twitter Conversation About Psychedelics: A Debate On Empathy', 'Story covering Elon Musk\'s comments on twitter. Useful for monitoring public sentiment re psychedelics.', 'https://www.benzinga.com/markets/cannabis/22/11/29706858/elon-musk-joins-twitter-conversation-about-psychedelics-a-debate-on-empathy', 'benzinga.com', 0, 0, 1, 0),
	(170, 115, 1, '2022-11-14 19:46:29', 'Legal Experts Discuss Regulation of Cannabis and Psychedelics at Petrie-Flom Center', 'A panel of legal experts discussed lessons the psychedelics industry can learn from the history of U.S. cannabis policy during a virtual event hosted by Harvard Law School’s Petrie-Flom Center.', 'https://www.thecrimson.com/article/2022/11/11/petrie--psychedelic-industry-discussion/', 'thecrimson.com', 0, 0, 1, 0),
	(171, 115, 1, '2022-11-14 19:51:00', 'Could Psychedelics Open New Doors for Science and Business? (paywall)', '"Psychedelic medicines and therapies are becoming more mainstream and may offer innovative solutions in an era of declining mental health and well-being." Thorough background and context setting the stage for the "psychedelic renaissance"', 'https://sloanreview.mit.edu/article/could-psychedelics-open-new-doors-for-science-and-business/', 'mit.edu', 1, 0, 1, 0),
	(172, 115, 1, '2022-11-14 20:13:14', 'Nearly half of U.S. adults support legalizing some psychedelics for mental health treatment', 'A new survey from VeryWellMind found 45 percent of Americans support legalizing some psychedelic substances for the treatment of a mental health condition — if they are administered under supervision from a medical or mental health professional.', 'https://thehill.com/changing-america/well-being/mental-health/3703454-nearly-half-of-u-s-adults-support-legalizing-some-psychedelics-for-mental-health-treatment/', 'thehill.com', 0, 0, 1, 0),
	(173, 115, 1, '2022-11-14 20:15:47', 'Nearly Half of Americans Support Legalization of Psychedelics for Mental Health', 'While Americans seem to have a firm stance against psychedelics in general, the tenor of responses shifts when the context of mental health is given stronger consideration.', 'https://www.verywellmind.com/psychedelics-and-mental-health-survey-6753410', 'verywellmind.com', 0, 0, 1, 0),
	(174, 115, 1, '2022-11-15 18:26:34', 'List of worldwide clinical trials with "psychedelic"', 'Search results from ClinicalTrials.gov, which is is a registry and results database of privately and publicly funded clinical studies conducted around the world. The resource is provided by the U.S. National Library of Medicine. Each study record includes a summary of the study protocol.', 'https://clinicaltrials.gov/ct2/results?cond=&term=psychedelic&cntry=&state=&city=&dist=', 'clinicaltrials.gov', 0, 0, 1, 0),
	(175, 115, 1, '2022-11-15 21:40:43', 'Thousands of moms are microdosing with mushrooms to ease the stress of parenting', 'Interview and transcript with a divorced mom who turned to shrooms', 'https://www.npr.org/2022/09/13/1121599369/thousands-of-moms-are-microdosing-with-mushrooms-to-ease-the-stress-of-parenting', 'npr.org', 0, 0, 1, 0),
	(176, 115, 1, '2022-11-15 21:41:56', 'Can microdosing psychedelics boost mental health? Here’s what the evidence suggests. (paywall)', 'Taking tiny doses of drugs like psilocybin, LSD, and ayahuasca is gaining popularity. But the benefits are still being investigated.', 'https://www.nationalgeographic.com/science/article/can-microdosing-psychedelics-boost-mental-health-heres-what-the-evidence-shows', 'nationalgeographic.com', 0, 0, 1, 0),
	(177, 115, 1, '2022-11-15 21:43:13', 'The popularity of microdosing of psychedelics: What does the science say?', 'Dated 9/19/22. "There is no definitive evidence yet that microdosing with psychedelics is either effective or safe."', 'https://www.health.harvard.edu/blog/the-popularity-of-microdosing-of-psychedelics-what-does-the-science-say-202209192819', 'harvard.edu', 0, 0, 1, 0),
	(178, 115, 1, '2022-11-15 21:44:33', 'Scientists Are Starting to Test Claims about "Microdosing"', 'From 2018. Could psychedelics lead to improved antidepressant or antianxiety therapies?', 'https://www.scientificamerican.com/article/scientists-are-starting-to-test-claims-about-microdosing/', 'scientificamerican.com', 0, 0, 1, 0),
	(179, 115, 1, '2022-11-16 19:52:26', 'Midtown clinic becomes first in New York to use ketamine to treat alcoholism', 'Ketamine has been used to treat mood and stress-related disorders, and now, Nushama Psychedelic Wellness is using the psychedelic to help people suffering from alcoholism.', 'https://www.cbsnews.com/newyork/news/midtown-clinic-becomes-first-in-new-york-to-use-ketamine-to-treat-alcoholism/', 'cbsnews.com', 0, 0, 0, 0),
	(180, 115, 1, '2022-11-16 19:57:13', 'Americans Take Ketamine at Home for Depression With Little Oversight', 'Startups are prescribing ketamine online to treat serious mental-health conditions, raising concern among psychiatrists about the safety of taking the mind-altering anesthetic without medical supervision, sometimes at high doses that raise risks of side effects.', 'https://www.wsj.com/articles/ketamine-depression-treatment-mental-health-home-11667059093', 'wsj.com', 0, 0, 0, 0),
	(181, 115, 1, '2022-11-16 20:02:18', 'Electroshock Therapy More Successful for Depression than Ketamine', 'An analysis of six studies found that electroconvulsive therapy (ECT) is better at quickly relieving major depression than ketamine, a team of researchers report in JAMA Psychiatry.', 'https://today.uconn.edu/2022/10/electroshock-therapy-more-successful-for-depression-than-ketamine/#', 'uconn.edu', 0, 0, 0, 0),
	(182, 115, 2, '2022-11-16 20:03:39', 'Efficacy and Safety of Ketamine vs Electroconvulsive Therapy Among Patients With Major Depressive Episode', 'This systematic review and meta-analysis of 6 trials with 340 patients suggests that ECT may be superior to ketamine in improving depression severity. Findings also suggest that ketamine and ECT each have unique adverse effect profiles.', 'https://jamanetwork.com/journals/jamapsychiatry/article-abstract/2797209', 'jamanetwork.com', 0, 0, 0, 0),
	(183, 115, 1, '2022-11-21 21:53:55', 'Psychedelics caucus launched to research benefits of mushrooms and LSD', 'Reps. Jack Bergman (R-MI) and Lou Correa (D-CA) will co-chair the Congressional Psychedelics Advancing Clinical Treatments Caucus (PACT) to explore clinical research into the efficiency of psychedelics in treating brain disorders such as depression, post-traumatic stress disorder, and substance abuse disorder. The caucus will not advocate the legalization of psychedelics for recreational use or decriminalization.', 'https://www.washingtonexaminer.com/policy/healthcare/bipartisan-lawmakers-form-psychedelics-caucus', 'washingtonexaminer.com', 0, 0, 1, 0),
	(184, 115, 1, '2022-11-22 00:46:03', 'Jim Harris Was Paralyzed. Then He Ate Magic Mushrooms.', 'Long read describing recovery from paralysis using psychedelics.', 'https://www.outsideonline.com/outdoor-adventure/exploration-survival/psychedelics-research-paralysis-treatment-jim-harris/', 'outsideonline.com', 0, 0, 1, 0),
	(185, 115, 1, '2022-11-22 00:48:04', 'Psychedelic guides trained in first-ever UC Berkeley program', 'This fall (2022), 24 people in a first-of-its-kind training program at the year-old UC Berkeley Center for the Science of Psychedelics are learning to safely guide patients’ psychedelic experiences in therapeutic and research settings. The group of advanced professionals chosen for the nine-month, 175-hour program includes doctors, nurses, social workers, psychologists, chaplains and others.', 'https://news.berkeley.edu/2022/11/10/first-ever-uc-berkeley-program-trains-certifies-psychedelic-guides/', 'berkeley.edu', 0, 0, 1, 0),
	(186, 115, 1, '2022-11-22 00:49:48', 'Resource: UC Berkeley Center for the Science of Psychedelics', 'BCSP: Exploring the potential of psychedelics for the betterment of all.', 'https://psychedelics.berkeley.edu/', 'berkeley.edu', 0, 0, 1, 0),
	(187, 115, 1, '2022-11-22 00:56:37', 'Microscopy reveals how psychedelics light up brain’s neuropathways', 'using optical microscopy and other tools to map the brain’s neural response to psychoactive chemicals', 'https://news.cornell.edu/stories/2022/10/microscopy-reveals-how-psychedelics-light-brains-neuropathways', 'cornell.edu', 0, 0, 1, 0),
	(188, 115, 3, '2022-11-22 01:00:03', 'Book: The Psychedelic Handbook: A Practical Guide to Psilocybin, LSD, Ketamine, MDMA, and Ayahuasca', 'Learn everything you need to know about psychedelics with this ultimate guide packed with information on popular psychedelic drugs like psilocybin, ketamine, MDMA, DMT and LSD—plus practical tips for microdosing and how to safely "trip"—from bestselling author Dr. Rick Strassman.', 'https://www.amazon.com/Psychedelic-Handbook-Practical-Psilocybin-Ayahuasca/dp/1646043812/ref=sr_1_1?crid=UH2RWM0P6RWC&keywords=psychedelic+handbook&qid=1669078719&sprefix=psychedelic+handbook%2Caps%2C85&sr=8-1', 'amazon.com', 0, 0, 1, 0),
	(189, 115, 1, '2022-11-22 01:01:27', 'Is Psychedelic-Aided Therapy a Mental Health Game Changer?', 'With growing decriminalization and educational efforts, the next frontier of battling conditions like PTSD and depression could be trippy.', 'https://www.shondaland.com/live/body/a41978419/are-psychedelics-a-mental-health-game-changer/', 'shondaland.com', 0, 0, 1, 0),
	(190, 115, 1, '2022-11-22 01:04:32', 'A Provocative New Course Tackles Motherhood And Psychedelics', 'About the launch of a provocative new course dubbed "Psychedelics & Maternity” targeting people who are seeking resources, such as psychedelics, which will help them gain control over their bodies and wombs.', 'https://www.forbes.com/sites/irisdorbian/2022/11/15/a-provocative-new-course-tackles-motherhood-and-psychedelics/?sh=dcb53e76f4b0', 'forbes.com', 0, 0, 1, 0),
	(191, 115, 1, '2022-11-22 20:06:05', 'Ayahuasca causes mental health problems that last MONTHS in majority of users, landmark study finds', 'In the first major global study of its kind, researchers surveyed more than 10,000 people from more than 50 countries about their experiences with ayahuasca, an ancient South American brew.', 'https://www.dailymail.co.uk/health/article-11436027/Ayahuasca-warning-Hippy-brew-causes-headaches-vomiting-mental-health-problems.html', 'dailymail.co.uk', 0, 0, 1, 1),
	(192, 115, 2, '2022-11-22 20:09:35', 'Adverse effects of ayahuasca: Results from the Global Ayahuasca Survey', 'Using data from an online Global Ayahuasca Survey (n = 10,836) collected between 2017 and 2019 involving participants from more than 50 countries.', 'https://journals.plos.org/globalpublichealth/article?id=10.1371/journal.pgph.0000438', 'plos.org', 0, 0, 1, 1),
	(193, 115, 1, '2022-11-22 20:23:58', 'Is Mind-Altering Ayahuasca Safe? No, But Folks Who Try It May Not Care', 'On the downside, the vast majority said the drug induced some significant side effects, ranging from nausea and vomiting to the onset of nightmares, disturbing thoughts and a feeling of disconnection. On the upside, however, only a very small minority said they needed medical care to handle their physical discomfort.', 'https://www.usnews.com/news/health-news/articles/2022-11-17/is-mind-altering-ayahuasca-safe-no-but-folks-who-try-it-may-not-care', 'usnews.com', 0, 0, 1, 1),
	(194, 90, 1, '2022-11-24 18:33:01', 'Open Source Psychedelic-Assisted Therapy Course on GitHub', 'This repository consists of a series of recommended books, articles, interviews, and videos that together cover the majority of what is needed to become a Psychedelic-Assisted Therapist knowledge. While this curriculum cannot currently replace certifications it is meant to be the basis by which others create their own courses from.', 'https://github.com/unshakenme/OSPAT', 'github.com', 0, 0, 1, 1),
	(195, 115, 1, '2022-11-29 22:36:56', 'Notice of Information on NIMH\'s Considerations for Research Involving Psychedelics and Related Compounds', 'The purpose of this Notice is to outline NIMH priorities and considerations for potential applicants investigating the effects of psychedelic drugs and their derivatives or analogues (i.e., related compounds) on mental health and mental illness.', 'https://grants.nih.gov/grants/guide/notice-files/NOT-MH-23-125.html?utm_source=dlvr.it&utm_medium=twitter', 'nih.gov', 0, 0, 1, 1),
	(196, 115, 1, '2022-11-29 22:39:51', 'Booker, Paul Introduce Bipartisan Legislation to Promote Research and Access to Potential Life Saving Drugs', 'U.S. Senator Cory Booker (D-N.J.) and U.S. Senator Rand Paul (R-KY) introduced the Breakthrough Therapies Act, legislation that would enable the Drug Enforcement Agency (DEA) to make the findings necessary to transfer breakthrough therapies involving Schedule I substances such as MDMA and psilocybin from Schedule I to Schedule II, which could help facilitate a phased roll-out of these potentially lifesaving therapies via FDA-approved Expanded Access pilot programs.', 'https://www.booker.senate.gov/news/press/booker-paul-introduce-bipartisan-legislation-to-promote-research-and-access-to-potential-life-saving-drugs#:~:text=and%20U.S.%20Senator%20Rand%20Paul,Schedule%20II%2C%20which%20could%20help', 'senate.gov', 0, 0, 1, 1),
	(197, 115, 1, '2022-11-29 22:42:38', 'Canada Steps Ahead of U.S. On Psychedelic Drug Legalization', 'Canada was the first country on the North American continent to legalize cannabis. Now the country is on the same path with psychedelics, effectively mirroring the step-by-step psychedelics legalization efforts in the U.S. while moving the needle toward broader legalization ever so slightly.', 'https://www.greenmarketreport.com/canada-steps-ahead-of-u-s-on-psychedelic-drug-legalization/', 'greenmarketreport.com', 0, 0, 1, 1),
	(198, 115, 1, '2022-11-29 22:44:44', 'Is New York on track to legalize magic mushrooms?', '"What we are trying to do is disentangle the hype and hysteria that led to these substances becoming illegal in the first place," Stempel said. "The more we talk about it and are open about how people have been using them — that\'s what I think will help drive the change in the climate."', 'https://www.timesunion.com/news/article/Mushrooms-17564620.php', 'timesunion.com', 0, 0, 1, 1),
	(199, 115, 1, '2022-11-29 22:58:15', 'Could the Latest Science on Psychedelics Revolutionise the Way We Understand Our Minds?', 'Research into psychedelic drugs as a remedy for poor mental health is showing promising results. MH spoke to science writer Jane C Hu, author of The Microdose, about the future of the field', 'https://www.menshealth.com/uk/mental-strength/a41933627/psychedelics-mental-health-care/', 'menshealth.com', 0, 0, 1, 1),
	(200, 115, 1, '2022-11-29 23:01:21', 'Artists Discuss How Psychedelics Influence Their Work', 'Visual artists who incorporate psychedelics into their practices maintain a foundational understanding that there is more to reality than meets the eye.', 'https://hyperallergic.com/782273/artists-discuss-how-psychedelics-influence-their-work/', 'hyperallergic.com', 0, 0, 1, 1),
	(201, 115, 1, '2022-11-29 23:08:33', 'Cybin: A Leading Early-Stage Psychedelics Play', 'Cybin (NYSE:CYBN) is working to develop novel medicines for mental illnesses like depression and alcohol use disorder. There are three components to the bull thesis for buying and holding Cybin stock for the long-term.', 'https://seekingalpha.com/article/4560100-cybin-a-leading-early-stage-psychedelics-play', 'seekingalpha.com', 0, 0, 1, 1),
	(202, 115, 3, '2022-11-29 23:12:07', '10 Most Psychedelic Movies', 'The best psychedelic movies span many genres and styles, united by experimentation, bright colors, and mind-bending narratives. They tend to be nonlinear and feature visual distortion, often intended to subvert the audience\'s idea of reality. The aesthetic is inspired by the warped sensory perceptions of psychoactive drugs, especially LSD.', 'https://collider.com/best-most-psychedelic-movies-according-to-reddit/', 'collider.com', 0, 0, 1, 1),
	(203, 115, 3, '2022-11-29 23:19:47', 'Movie: Have a Good Trip: Adventures in Psychedelics', 'Explore hallucinogenic highs and lows as celebrities share funny, mind-blowing tales via animations, reenactments and more in this documentary.', 'https://www.netflix.com/title/80231917', 'netflix.com', 0, 0, 1, 1),
	(204, 115, 1, '2022-11-29 23:21:37', 'Tune In; Turn On; Figure It Out', '"I believe there is a potential in psychedelic substances to aid people in psychological pain, and for a profoundly human reason."', 'https://www.psychologytoday.com/us/blog/get-out-your-mind/202211/tune-in-turn-figure-it-out', 'psychologytoday.com', 0, 0, 1, 1),
	(205, 115, 1, '2022-11-30 21:26:31', 'Psychedelics in Palliative Care', 'Drugs that foster feelings of uplift and connection can be therapeutic for many conditions in many phases of life', 'https://blogs.scientificamerican.com/observations/psychedelics-in-palliative-care/', 'scientificamerican.com', 0, 0, 1, 1),
	(206, 115, 1, '2022-11-30 21:31:06', 'Dying Patients Are Fighting for Access to Psychedelics', '"If you could provide an option that would provide immediate, sustained relief of depression, anxiety, and lead to a sense of peace as [someone is] going through their final days—why would you not want that as an option?”', 'https://time.com/6208079/psychedelics-psilocybin-access-end-of-life/', 'time.com', 0, 0, 0, 0),
	(207, 115, 1, '2022-11-30 21:34:50', 'I Took A Psychedelic Drug for My Cancer Anxiety. It Changed My Life', '"The feeling of immense love lingered for weeks, and four years later I still feel it at times. My fear and anxiety were completely removed, and they haven’t come back."', 'https://time.com/4586052/psychedelic-drug-psilocybin-cancer-anxiety/', 'time.com', 0, 0, 0, 0),
	(208, 115, 1, '2022-11-30 21:48:58', 'Biomind Receives Approval for a Third Phase II Clinical Trial for Its 5-MeO-DMT Based BMND08 Candidate for Depression & Anxiety in Alzheimer’s Disease', '', 'https://www.linkedin.com/pulse/biomind-receives-approval-third-phase-ii-clinical-trial-/', 'linkedin.com', 0, 0, 0, 0),
	(209, 115, 1, '2022-11-30 21:56:02', 'Microdosed LSD: Finally A Breakthrough For Alzheimer’s Disease?', 'Eleusis is investigating the anti-inflammatory potential of psychedelics as medicines, specifically the application of sub-perceptual doses of LSD in halting the progression of Alzheimer’s disease at its earliest detectable stage. Interview with Shlomi Raz, CEO and founder.', 'https://www.forbes.com/sites/abbierosner/2020/02/21/microdosed-lsd-may-finally-be-the-breakthrough-for-alzheimers-disease/?sh=29e6890853a8', 'forbes.com', 0, 0, 1, 1),
	(210, 115, 2, '2022-11-30 22:18:49', 'Safety, tolerability, pharmacokinetics, and pharmacodynamics of low dose LSD in healthy older volunteers', 'Our results suggest safety and tolerability of orally administered 5 mcg, 10 mcg, and 20 mcg LSD every fourth day over a 21-day period and support further clinical development of LSD for the treatment and prevention of Alzheimer’s disease (AD).', 'https://link.springer.com/article/10.1007/s00213-019-05417-7', 'springer.com', 0, 0, 1, 1),
	(212, 115, 1, '2022-12-01 18:27:27', 'Why some Mass. communities are moving to decriminalize psychedelics', 'From July 2021 summarizing MA activity prior', 'https://www.boston.com/news/politics/2021/07/21/massachusetts-communities-moving-decriminalize-psychedelics/', 'boston.com', 0, 0, 0, 1),
	(213, 115, 1, '2022-12-01 18:29:18', 'Easthampton is the fourth city in Mass. to vote to decriminalize psychedelics', '', 'https://www.wbur.org/news/2021/10/21/easthampton-psychedelic-plant-decriminalization', 'wbur.org', 0, 0, 1, 1),
	(214, 115, 1, '2022-12-01 18:31:39', 'Worcester commission looks at decriminalizing psychedelics, although vote won’t change state law', 'From March 2022, Worcester is only the latest in a group of Massachusetts cities that have taken up the issue.', 'https://www.masslive.com/worcester/2022/03/worcester-commission-looks-at-decriminalizing-psychedelics-although-vote-wont-change-state-law.html', 'masslive.com', 0, 0, 1, 1),
	(215, 115, 1, '2022-12-01 18:36:26', 'An Act Resolve establishing a special commission on psychedelic drug use for clinical trials and therapy', 'By Ms. DiZoglio (by request), a petition (accompanied by bill, Senate, No. 1282) of Matthew Crepeau for legislation to establish a special commission on psychedelic drug use for clinical trials and therapy.', 'https://malegislature.gov/Bills/192/S1282', 'malegislature.gov', 0, 0, 1, 1),
	(216, 115, 1, '2022-12-01 19:08:27', 'Taking the tripping out of psychedelic medicine', 'Drugs under development offer the mental-health benefits of psilocybin and similar substances without inducing strong hallucinatory effects.', 'https://www.nature.com/articles/d41586-022-02869-4', 'nature.com', 0, 0, 1, 1),
	(217, 115, 1, '2022-12-01 19:33:28', 'Imperial College London Centre for Psychedelic Research', 'The Centre aims to develop a research clinic that could help to gather additional clinical evidence and become a prototype for the licensed psychedelic care facilities of the future. It represents a watershed moment for psychedelic science, symbolic of its now mainstream recognition. Psychedelics are set to have a major impact on neuroscience and psychiatry in the coming years, and the Centre operates at the forefront of one of the most exciting areas in medical science.', 'https://www.imperial.ac.uk/psychedelic-research-centre/', 'imperial.ac.uk', 0, 0, 1, 1),
	(218, 115, 1, '2022-12-02 19:39:07', 'Esketamine nasal spray for treatment-resistant depression', 'NICE (UK NATIONAL INSTITUTE FOR HEALTH AND CARE EXCELLENCE) document explaining why esketamine nasal spray is not currently recommended for treatment-resistant depression.', 'https://www.nice.org.uk/guidance/gid-ta10371/documents/final-appraisal-determination-document-2?utm_source=substack&utm_medium=email', 'nice.org.uk', 0, 0, 1, 1),
	(219, 115, 1, '2022-12-02 19:49:18', 'The Psychedelics as Medicine Report: Fourth Edition', 'The Psychedelics as Medicine Report: Fourth Edition serves as a comprehensive account of the psychedelic healthcare industry. Following the success of the third edition and the sold out PSYCH Symposium, this report provides market data and insights from thought leaders across the sector - empowering regulators, researchers and investors to make informed decisions.', 'https://psych.global/report/', 'psych.global', 0, 0, 1, 1),
	(220, 115, 1, '2022-12-02 19:59:17', 'Psychedelic mushrooms expand Jamaica tourism beyond sunshine and reggae', 'A new group of Jamaican resorts is promoting tourism that offers mystical experiences and stress relief through "magic mushrooms," as the Caribbean nation seeks to develop a niche industry in natural psychedelics.', 'https://www.reuters.com/world/americas/psychedelic-mushrooms-expand-jamaica-tourism-beyond-sunshine-reggae-2022-11-24/', 'reuters.com', 0, 0, 0, 1),
	(221, 115, 1, '2022-12-02 20:15:49', 'These 5 Animals Trip on Psychedelic and Psychoactive Drugs, Too', 'Humans have manipulated psychoactive substances from plant and animal sources for millennia, though the impulse to trip isn’t solely our own. Includes cats, deer, dophins, sheep, and wallabies.', 'https://discovermagazine.com/planet-earth/these-5-animals-like-to-take-psychedelic-trips-themselves', 'discovermagazine.com', 0, 0, 0, 1),
	(222, 115, 1, '2022-12-05 23:55:01', 'A Look at MindMed’s phase 2a trial using low doses of LSD for ADHD', 'simple overview of the trial and what they hope to learn', 'https://microdose.buzz/news/science-feature-mindmed-s-lsd-trial-for-adhd/', 'microdose.buzz', 0, 0, 0, 1),
	(223, 115, 1, '2022-12-05 23:58:53', 'I have ADHD and was scared of psychedelics. Then I found myself eating magic truffles ...', 'Personal experience: "The safe, repetitive domesticity of lockdown made me face my demons and seek therapy, while also making me hungry for sensation and risk. So I set off for a retreat in Amsterdam."', 'https://www.theguardian.com/commentisfree/2021/nov/23/i-have-adhd-and-was-scared-of-psychedelics-then-i-found-myself-eating-magic-truffles-', 'theguardian.com', 0, 0, 0, 1),
	(224, 115, 1, '2022-12-06 00:00:01', 'Psilocybin and ADHD: A Revolutionary Treatment?', 'While there are a variety of pharmaceutical treatments available for ADHD, they come with a host of potential negative side effects, including decreased appetite, weight loss, insomnia, and irritability. So, could psilocybin be the answer?', 'https://utahpatients.org/psilocybin-and-adhd-a-revolutionary-treatment/', 'utahpatients.org', 0, 0, 0, 1),
	(225, 115, 1, '2022-12-06 00:07:10', 'People Respond Differently to Psychedelic Drugs — Genetics Could Be One Reason', 'Just as symptoms associated with various mental health conditions may present differently in different people, how people respond to psychedelics may also vary.', 'https://www.healthline.com/health-news/people-respond-differently-to-psychedelic-drugs-genetics-could-be-one-reason', 'healthline.com', 0, 0, 0, 1),
	(226, 115, 1, '2022-12-06 00:12:49', 'Getting smart to cognitive enhancers', 'Research on cognitive enhancers is growing, and an increasing body of preclinical and clinical work will help not only to dissect the effect of\nsmart drugs on the healthy population, but also to test whether those interventions could be used to treat brain-related disorders.', 'https://www.thelancet.com/pdfs/journals/eclinm/PIIS2589-5370(19)30107-5.pdf', 'thelancet.com', 0, 0, 0, 1),
	(227, 115, 1, '2022-12-06 00:18:18', 'Ketamine, psilocybin and ecstasy are coming to the medicine cabinet (paywall)', '"The New Psychedelia" is chapter 4 of The Economist\'s Sep 2022 Technology Quarterly on "Fixing the Brain."', 'https://www.economist.com/technology-quarterly/2022/09/21/ketamine-psilocybin-and-ecstasy-are-coming-to-the-medicine-cabinet', 'economist.com', 0, 0, 0, 1),
	(228, 115, 1, '2022-12-06 00:33:38', 'Biden Administration Plans for Legal Psychedelic Therapies within Two Years', 'A letter from the Health and Human Services Department discloses the anticipated FDA approval of MDMA and psilocybin treatments.', 'https://theintercept.com/2022/07/26/mdma-psilocybin-fda-ptsd/', 'theintercept.com', 0, 0, 0, 1),
	(229, 115, 1, '2022-12-06 00:35:12', 'A Psychedelic May Soon Go to the FDA for Approval to Treat Trauma (paywall)', 'MDMA, known as Ecstasy in the clubs, gained high marks in a clinical trial for PTSD', 'https://www.scientificamerican.com/article/a-psychedelic-may-soon-go-to-the-fda-for-approval-to-treat-trauma/', 'scientificamerican.com', 0, 0, 0, 1),
	(230, 115, 1, '2022-12-07 01:13:07', 'Psychedelics Provide New Frontier For Venture Funding, But Nuances Prevail', 'Psychedelics-related startups have raised over $236 million between July 2021 and July 2022, largely allotted to drug companies as the FDA continues to move psychedelic therapeutics through the clinical trial pipeline. This is compared to $96 million funded between July 2020 and July 2021, according to Crunchbase data.', 'https://news.crunchbase.com/health-wellness-biotech/psychedelics-drug-funding/', 'crunchbase.com', 1, 0, 1, 3),
	(231, 115, 1, '2022-12-07 01:19:04', 'The top psychedelic drug developers leading the market', 'Here are five of the top drug developers leading their particular niches in the emerging field of psychedelic medicines.', 'https://www.labiotech.eu/best-biotech/psychedelic-drug-depression/', 'labiotech.eu', 0, 0, 0, 1),
	(232, 115, 1, '2022-12-07 01:24:04', 'Will Medical Insurers Agree to Cover Psychedelic Trips?', 'Having a health insurer pay for a magic-mushroom trip or an ecstasy experience might sound far-fetched, but the psychedelics industry is already running the numbers and pitching US insurers. Mental-health spending in the US is estimated to be more than $200 billion a year, with a lot coming from the US Medicaid program.', 'https://www.bloomberg.com/news/newsletters/2022-10-17/could-psychedelic-trips-end-up-being-covered-by-health-insurance', 'bloomberg.com', 0, 0, 0, 1),
	(233, 90, 1, '2022-12-07 20:13:54', 'this is a news article', 'this is a pubmed article', 'https://pubmed.ncbi.nlm.nih.gov/33427944', 'nih.gov', 0, 0, 0, 1),
	(234, 115, 2, '2022-12-15 19:18:38', 'Percentage of Heavy Drinking Days Following Psilocybin-Assisted Psychotherapy vs Placebo in the Treatment of Adult Patients With Alcohol Use Disorder', 'In this randomized clinical trial in participants with AUD, psilocybin administered in combination with psychotherapy was associated with robust and sustained decreases in drinking, which were greater than those observed following active placebo with psychotherapy. These results provide support for further study of psilocybin-assisted treatment for adults with AUD.', 'https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2795625', 'jamanetwork.com', 0, 0, 0, 8),
	(235, 115, 1, '2022-12-15 19:31:23', 'Portland Shop Openly Selling Psychedelic Mushrooms', 'A Portland shop is selling psychedelic mushrooms despite a lack of regulations authorizing retail sales of psilocybin.', 'https://hightimes.com/news/portland-shop-openly-selling-psychedelic-mushrooms/', 'hightimes.com', 1, 0, 0, 16),
	(236, 115, 1, '2022-12-15 19:38:21', 'Psychedelic therapy is moving to the next frontier: workplace perk', 'Acupuncture and chiropractic care weren’t always the common fixtures of employer benefit plans they are today. It took clamoring from workers, the accumulation of evidence, and the slow realization by businesses that those perks would be popular with workers. A similar evolution could be in store for psychedelic-assisted therapy for mental health conditions.', 'https://www.statnews.com/2022/12/06/psychedelic-therapy-moving-to-next-frontier-workplace-perk/', 'statnews.com', 0, 0, 3, 33),
	(237, 115, 1, '2022-12-15 19:44:19', '‘It’s not medical’: Oregon wrestles with how to offer psychedelics outside the health care system', '', 'https://www.statnews.com/2022/03/10/oregon-wrestles-with-offering-psychedelic-therapy-outside-health-care-system/', 'statnews.com', 0, 0, 1, 16),
	(238, 115, 3, '2022-12-16 18:38:08', 'Ligare: A Christian Psychedelic Society', 'We are clergy, chaplains, religious educators, scholars, spiritual guides, philanthropists, and researchers dedicated to bringing the direct experience of the sacred to all who desire it through ritualized engagement with psychedelic substances within the context of the Christian contemplative tradition.', 'https://www.ligare.org/', 'ligare.org', 0, 0, 1, 28),
	(239, 115, 4, '2022-12-16 21:10:46', 'delete this post', 'question about ocd', '', '', 0, 0, 0, 14),
	(240, 125, 5, '2022-12-16 22:33:34', 'Test misc post', 'Delete this post', '', '', 1, 0, 3, 69);
/*!40000 ALTER TABLE `entry` ENABLE KEYS */;

-- Dumping structure for table news.entry_health_condition
DROP TABLE IF EXISTS `entry_health_condition`;
CREATE TABLE IF NOT EXISTS `entry_health_condition` (
  `EntryID` int(11) NOT NULL,
  `ConditionID` smallint(6) NOT NULL,
  KEY `FK_entry_condition_entry` (`EntryID`) USING BTREE,
  KEY `FK_entry_condition_condition` (`ConditionID`) USING BTREE,
  CONSTRAINT `FK_entry_condition_condition` FOREIGN KEY (`ConditionID`) REFERENCES `health_condition` (`ConditionID`),
  CONSTRAINT `FK_entry_condition_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table news.entry_health_condition: ~36 rows (approximately)
/*!40000 ALTER TABLE `entry_health_condition` DISABLE KEYS */;
INSERT INTO `entry_health_condition` (`EntryID`, `ConditionID`) VALUES
	(233, 1),
	(224, 4),
	(231, 1),
	(231, 4),
	(231, 6),
	(229, 6),
	(228, 1),
	(228, 6),
	(223, 4),
	(222, 4),
	(219, 1),
	(219, 2),
	(219, 3),
	(219, 4),
	(219, 5),
	(219, 6),
	(206, 2),
	(206, 6),
	(207, 2),
	(208, 1),
	(208, 2),
	(218, 1),
	(205, 1),
	(198, 5),
	(198, 6),
	(198, 1),
	(189, 1),
	(182, 1),
	(181, 1),
	(180, 1),
	(179, 5),
	(178, 2),
	(178, 1),
	(176, 2),
	(164, 5),
	(161, 5),
	(160, 5),
	(153, 6),
	(116, 1),
	(125, 6),
	(234, 5),
	(239, 3),
	(240, 6);
/*!40000 ALTER TABLE `entry_health_condition` ENABLE KEYS */;

-- Dumping structure for table news.entry_substance
DROP TABLE IF EXISTS `entry_substance`;
CREATE TABLE IF NOT EXISTS `entry_substance` (
  `EntryID` int(11) NOT NULL,
  `SubstanceID` smallint(6) NOT NULL,
  KEY `FK_entry_substance_entry` (`EntryID`),
  KEY `Index 2` (`SubstanceID`),
  CONSTRAINT `FK_entry_substance_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`),
  CONSTRAINT `FK_entry_substance_substance` FOREIGN KEY (`SubstanceID`) REFERENCES `substance` (`SubstanceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table news.entry_substance: ~55 rows (approximately)
/*!40000 ALTER TABLE `entry_substance` DISABLE KEYS */;
INSERT INTO `entry_substance` (`EntryID`, `SubstanceID`) VALUES
	(233, 3),
	(224, 2),
	(231, 2),
	(231, 5),
	(231, 6),
	(231, 1),
	(229, 6),
	(228, 6),
	(228, 2),
	(227, 5),
	(227, 6),
	(227, 2),
	(223, 2),
	(222, 1),
	(220, 2),
	(219, 2),
	(219, 3),
	(219, 4),
	(219, 5),
	(219, 1),
	(219, 6),
	(219, 7),
	(206, 6),
	(206, 2),
	(207, 2),
	(208, 7),
	(209, 1),
	(210, 1),
	(198, 2),
	(201, 2),
	(192, 3),
	(193, 3),
	(191, 3),
	(189, 5),
	(185, 2),
	(184, 2),
	(182, 5),
	(181, 5),
	(180, 5),
	(179, 5),
	(178, 2),
	(175, 2),
	(164, 2),
	(161, 5),
	(160, 5),
	(152, 2),
	(146, 2),
	(147, 2),
	(148, 2),
	(116, 2),
	(134, 7),
	(137, 2),
	(137, 3),
	(137, 1),
	(121, 3),
	(125, 2),
	(125, 6),
	(125, 1),
	(234, 2),
	(235, 2),
	(240, 7),
	(240, 3);
/*!40000 ALTER TABLE `entry_substance` ENABLE KEYS */;

-- Dumping structure for table news.entry_type
DROP TABLE IF EXISTS `entry_type`;
CREATE TABLE IF NOT EXISTS `entry_type` (
  `EntryTypeID` tinyint(4) NOT NULL,
  `EntryTypeName` varchar(50) NOT NULL DEFAULT '',
  `RequiresLink` tinyint(1) NOT NULL DEFAULT 0,
  KEY `Index 1` (`EntryTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table news.entry_type: ~5 rows (approximately)
/*!40000 ALTER TABLE `entry_type` DISABLE KEYS */;
INSERT INTO `entry_type` (`EntryTypeID`, `EntryTypeName`, `RequiresLink`) VALUES
	(1, 'News Article', 1),
	(2, 'Scientific Publication', 1),
	(3, 'Resource', 1),
	(4, 'Question', 0),
	(5, 'Misc', 0);
/*!40000 ALTER TABLE `entry_type` ENABLE KEYS */;

-- Dumping structure for table news.feedback
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `UserID` int(11) DEFAULT NULL,
  `IPAddress` varchar(50) DEFAULT NULL,
  `UserAgent` varchar(200) DEFAULT NULL,
  `DateTimeAdded` timestamp NULL DEFAULT NULL,
  `FeedbackText` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table news.feedback: ~0 rows (approximately)
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` (`UserID`, `IPAddress`, `UserAgent`, `DateTimeAdded`, `FeedbackText`) VALUES
	(115, '108.26.203.87', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', '2022-12-16 20:43:06', 'lots of good ideas'),
	(0, '108.26.203.87', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', '2022-12-16 21:02:28', 'can i send feedback when i\'m not logged in?'),
	(125, '107.77.225.18', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/108.0.5359.112 Mobile/15E148 Safari/604.1', '2022-12-16 22:39:26', 'Testing mobile feedback while logged in'),
	(0, '107.77.225.18', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/108.0.5359.112 Mobile/15E148 Safari/604.1', '2022-12-16 22:40:03', 'Testing mobile feedback while logged out');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;

-- Dumping structure for table news.health_condition
DROP TABLE IF EXISTS `health_condition`;
CREATE TABLE IF NOT EXISTS `health_condition` (
  `ConditionID` smallint(6) NOT NULL,
  `ConditionName` varchar(50) NOT NULL,
  KEY `Index 1` (`ConditionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table news.health_condition: ~6 rows (approximately)
/*!40000 ALTER TABLE `health_condition` DISABLE KEYS */;
INSERT INTO `health_condition` (`ConditionID`, `ConditionName`) VALUES
	(1, 'Depression'),
	(2, 'Anxiety'),
	(3, 'OCD'),
	(4, 'ADHD'),
	(5, 'Addiction'),
	(6, 'PTSD');
/*!40000 ALTER TABLE `health_condition` ENABLE KEYS */;

-- Dumping structure for table news.substance
DROP TABLE IF EXISTS `substance`;
CREATE TABLE IF NOT EXISTS `substance` (
  `SubstanceID` smallint(6) NOT NULL,
  `SubstanceName` varchar(50) NOT NULL,
  KEY `Index 1` (`SubstanceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table news.substance: ~7 rows (approximately)
/*!40000 ALTER TABLE `substance` DISABLE KEYS */;
INSERT INTO `substance` (`SubstanceID`, `SubstanceName`) VALUES
	(1, 'LSD'),
	(2, 'Psilocybin'),
	(3, 'Ayahuasca'),
	(4, 'DMT'),
	(5, 'Ketamine'),
	(6, 'MDMA'),
	(7, '5-MEO-DMT');
/*!40000 ALTER TABLE `substance` ENABLE KEYS */;

-- Dumping structure for table news.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(16) NOT NULL,
  `UserDescription` varchar(200) DEFAULT NULL,
  `Password` varchar(100) NOT NULL,
  `DateTimeCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`UserID`) USING BTREE,
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;

-- Dumping data for table news.user: ~8 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`UserID`, `UserName`, `UserDescription`, `Password`, `DateTimeCreated`) VALUES
	(90, 'cliff', NULL, '$2b$10$rppAP3qOSs1i0FIyKemrTuDiYXYUcpM7D2IupFoO1Euz0TTaEK6PW', '2022-12-15 12:13:47'),
	(104, 'Seed1', NULL, '$2b$10$4gE3Tz5Rihe8vYPN5V/afez396xT3syML9b0dzq0P4tDUhivOoT26', '2022-12-15 12:13:47'),
	(109, 'tarv0xs', NULL, '$2b$10$nQBCnZ0BUsc4dWaTAXU45eHi9AE/1LjvIVtkyalaGeziSqqTlH5se', '2022-12-15 12:13:47'),
	(110, 'john', NULL, '$2b$10$GBgnaDzcFrBDkZQcqPSKEeOxQUJt/bTWyvHkVuWMkwrwigiWc5G1O', '2022-12-15 12:13:47'),
	(115, 'ron', NULL, '$2b$10$gFG90UNSf0f0.ChtiWnXUui/JQbZgJL50xYG1FFek7/.pAublFS0u', '2022-12-15 12:13:47'),
	(121, 'scientist1962', NULL, '$2b$10$3.ztxjIyhJe/6z1GMbhyuOtbtGAzFDPVBk42iFcgj0FG1wQ50iwvi', '2022-12-15 12:13:47'),
	(123, 'user1', NULL, '$2b$10$2yG1j70nft6AKAV10SbfaeNRvQsirENSUQgyo3Ll0h0lhZkcZNnkS', '2022-12-15 12:13:47'),
	(124, 'scubacor', NULL, '$2b$10$8.YdntTMdDs3TPIFN.2n4eEjZdgH2fPNmj./iRyedkzTBkdmYNOt6', '2022-12-15 12:13:47'),
	(125, 'george', NULL, '$2b$10$AW9wh37YzDn2/yERk/f21uLfksQBV8UiKpLJJVQCeB89Y1/9Jfc5e', '2022-12-16 22:30:43');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table news.user_comment_vote
DROP TABLE IF EXISTS `user_comment_vote`;
CREATE TABLE IF NOT EXISTS `user_comment_vote` (
  `UserID` int(11) NOT NULL,
  `CommentID` int(11) NOT NULL,
  `Vote` int(11) NOT NULL,
  UNIQUE KEY `UserID_CommentID` (`UserID`,`CommentID`) USING BTREE,
  KEY `FK_user_comment_vote_entry_1` (`CommentID`) USING BTREE,
  CONSTRAINT `FK_user_comment_vote_entry_1` FOREIGN KEY (`CommentID`) REFERENCES `comment` (`CommentID`),
  CONSTRAINT `FK_user_comment_vote_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table news.user_comment_vote: ~4 rows (approximately)
/*!40000 ALTER TABLE `user_comment_vote` DISABLE KEYS */;
INSERT INTO `user_comment_vote` (`UserID`, `CommentID`, `Vote`) VALUES
	(90, 96, 1),
	(90, 98, 1),
	(90, 99, 1),
	(90, 100, 1),
	(115, 189, 0),
	(125, 188, 1),
	(125, 190, -1),
	(125, 191, -1),
	(125, 192, 1),
	(125, 193, 1);
/*!40000 ALTER TABLE `user_comment_vote` ENABLE KEYS */;

-- Dumping structure for table news.user_entry_vote
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

-- Dumping data for table news.user_entry_vote: ~14 rows (approximately)
/*!40000 ALTER TABLE `user_entry_vote` DISABLE KEYS */;
INSERT INTO `user_entry_vote` (`UserID`, `EntryID`, `Vote`) VALUES
	(90, 123, 1),
	(90, 128, 1),
	(90, 129, 0),
	(90, 146, 1),
	(90, 153, 0),
	(90, 158, 1),
	(90, 159, 1),
	(90, 171, 1),
	(90, 230, 1),
	(90, 233, 0),
	(115, 119, 1),
	(115, 238, 0),
	(121, 157, 0),
	(124, 123, 1),
	(124, 129, 1),
	(125, 235, 1),
	(125, 236, 0),
	(125, 240, 1);
/*!40000 ALTER TABLE `user_entry_vote` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
