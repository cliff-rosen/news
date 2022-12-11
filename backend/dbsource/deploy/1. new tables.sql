-- Dumping structure for table dev.entry_type
CREATE TABLE IF NOT EXISTS `entry_type` (
  `EntryTypeID` tinyint(4) NOT NULL,
  `EntryTypeName` varchar(50) NOT NULL DEFAULT '',
  `RequiresLink` tinyint(1) NOT NULL DEFAULT 0,
  KEY `Index 1` (`EntryTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table dev.entry_type: ~5 rows (approximately)
/*!40000 ALTER TABLE `entry_type` DISABLE KEYS */;
INSERT INTO `entry_type` (`EntryTypeID`, `EntryTypeName`, `RequiresLink`) VALUES
	(1, 'News Article', 1),
	(2, 'Scientific Publication', 1),
	(3, 'Resource', 0),
	(4, 'Question', 0),
	(5, 'Misc', 0);
/*!40000 ALTER TABLE `entry_type` ENABLE KEYS */;

-- Dumping structure for table dev.health_condition
CREATE TABLE IF NOT EXISTS `health_condition` (
  `ConditionID` smallint(6) NOT NULL,
  `ConditionName` varchar(50) NOT NULL,
  KEY `Index 1` (`ConditionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table dev.health_condition: ~6 rows (approximately)
/*!40000 ALTER TABLE `health_condition` DISABLE KEYS */;
INSERT INTO `health_condition` (`ConditionID`, `ConditionName`) VALUES
	(1, 'Depression'),
	(2, 'Anxiety'),
	(3, 'OCD'),
	(4, 'ADHD'),
	(5, 'Addiction'),
	(6, 'PTSD');
/*!40000 ALTER TABLE `health_condition` ENABLE KEYS */;

-- Dumping structure for table dev.substance
CREATE TABLE IF NOT EXISTS `substance` (
  `SubstanceID` smallint(6) NOT NULL,
  `SubstanceName` varchar(50) NOT NULL,
  KEY `Index 1` (`SubstanceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table dev.substance: ~7 rows (approximately)
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


-- Dumping structure for table dev.entry_health_condition
CREATE TABLE IF NOT EXISTS `entry_health_condition` (
  `EntryID` int(11) NOT NULL,
  `ConditionID` smallint(6) NOT NULL,
  KEY `FK_entry_condition_entry` (`EntryID`) USING BTREE,
  KEY `FK_entry_condition_condition` (`ConditionID`) USING BTREE,
  CONSTRAINT `FK_entry_condition_condition` FOREIGN KEY (`ConditionID`) REFERENCES `health_condition` (`ConditionID`),
  CONSTRAINT `FK_entry_condition_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping structure for table dev.entry_substance
CREATE TABLE IF NOT EXISTS `entry_substance` (
  `EntryID` int(11) NOT NULL,
  `SubstanceID` smallint(6) NOT NULL,
  KEY `FK_entry_substance_entry` (`EntryID`),
  KEY `Index 2` (`SubstanceID`),
  CONSTRAINT `FK_entry_substance_entry` FOREIGN KEY (`EntryID`) REFERENCES `entry` (`EntryID`),
  CONSTRAINT `FK_entry_substance_substance` FOREIGN KEY (`SubstanceID`) REFERENCES `substance` (`SubstanceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
