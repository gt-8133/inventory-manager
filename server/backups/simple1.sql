-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: cjllndxls00020107o32kr4h3
-- ------------------------------------------------------
-- Server version	5.7.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Item` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` mediumtext COLLATE utf8mb4_unicode_ci,
  `quantity` int(11) NOT NULL,
  `quantityUnits` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` VALUES ('cjllo437b00560107xzk42367','2018-09-03 02:30:38','2018-09-03 02:30:38','Tennis Ball','Here\'s a description','https://image.flaticon.com/icons/png/512/1084/1084790.png',12,'count'),('cjllo437b00570107v8szf2y6','2018-09-03 02:30:38','2018-09-03 02:30:38','Referee Whistle','Here\'s a description','https://image.flaticon.com/icons/png/128/1084/1084794.png',3,'count'),('cjllo437c00590107ng470fv1','2018-09-03 02:30:38','2018-09-03 02:30:38','Dumbell','Here\'s a description','https://image.flaticon.com/icons/png/128/1084/1084783.png',2,'count'),('cjllo437d005b0107icn4i750','2018-09-03 02:30:38','2018-09-03 02:30:38','Basketball','a basketball','https://image.flaticon.com/icons/png/128/1084/1084780.png',5,'count');
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_RelayId`
--

DROP TABLE IF EXISTS `_RelayId`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_RelayId` (
  `id` char(25) CHARACTER SET utf8 NOT NULL,
  `modelId` char(25) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_RelayId`
--

LOCK TABLES `_RelayId` WRITE;
/*!40000 ALTER TABLE `_RelayId` DISABLE KEYS */;
INSERT INTO `_RelayId` VALUES ('cjllo437b00560107xzk42367','cjllne176000u0107y1v147nt'),('cjllo437b00570107v8szf2y6','cjllne176000u0107y1v147nt'),('cjllo437c00590107ng470fv1','cjllne176000u0107y1v147nt'),('cjllo437d005b0107icn4i750','cjllne176000u0107y1v147nt');
/*!40000 ALTER TABLE `_RelayId` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-03  2:32:20
