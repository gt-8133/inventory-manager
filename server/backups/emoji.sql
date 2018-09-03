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
  `imageUrl` mediumtext COLLATE utf8mb4_unicode_ci,
  `name` mediumtext COLLATE utf8mb4_unicode_ci,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `quantity` int(11) DEFAULT NULL,
  `quantityUnits` mediumtext COLLATE utf8mb4_unicode_ci,
  `reusable` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` VALUES ('cjlmszcfv01u6010733srnjpd','2018-09-03 21:34:41','2018-09-03 22:05:25','https://assets-cdn.github.com/images/icons/emoji/unicode/1f399.png?v7','Mic','a microphone',2,'count',1),('cjlmu3o6001yw010753tjgjc5','2018-09-03 22:06:02','2018-09-03 22:06:02','https://assets-cdn.github.com/images/icons/emoji/unicode/1f349.png?v1','Watermelon','fruit',5,'count',1),('cjlmu4g3v01z00107hz4dk3nq','2018-09-03 22:06:38','2018-09-03 22:06:38','https://assets-cdn.github.com/images/icons/emoji/unicode/1f339.png?v7','Rose','its a flower',6,'bushels',1),('cjlmu535h01z40107agoyt9jz','2018-09-03 22:07:08','2018-09-03 22:07:08','https://assets-cdn.github.com/images/icons/emoji/unicode/1f384.png?v7','Festive Tree','for the holidays',2,'count',1),('cjlmu60cg01z8010727tp1jmz','2018-09-03 22:07:51','2018-09-03 22:07:51','https://assets-cdn.github.com/images/icons/emoji/unicode/1f389.png?v7','Party Poppers','For a good time',11,'boxes',0),('cjlmu7ke901zc0107uadl3lmc','2018-09-03 22:09:04','2018-09-03 22:09:04','https://assets-cdn.github.com/images/icons/emoji/unicode/1f369.png?v7','Doughnut','a sweet snack',4,'dozens',0);
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
INSERT INTO `_RelayId` VALUES ('cjllo437b00560107xzk42367','cjllne176000u0107y1v147nt'),('cjllo437b00570107v8szf2y6','cjllne176000u0107y1v147nt'),('cjllo437c00590107ng470fv1','cjllne176000u0107y1v147nt'),('cjllo437d005b0107icn4i750','cjllne176000u0107y1v147nt'),('cjlml7e9700zl0107jupyz1jc','cjllne176000u0107y1v147nt'),('cjlml7j9j00zp0107uxg660am','cjllne176000u0107y1v147nt'),('cjlml7l7o00zs01076i9g6o3u','cjllne176000u0107y1v147nt'),('cjlml7uf100zw0107qvedwaat','cjllne176000u0107y1v147nt'),('cjlmlb6sk01030107ggp07ki2','cjllne176000u0107y1v147nt'),('cjlmmpzsk00si0107ny0t0kiq','cjllne176000u0107y1v147nt'),('cjlmmpzsk00sj0107mjjztz5k','cjllne176000u0107y1v147nt'),('cjlmmpzsk00sk0107681ztzaj','cjllne176000u0107y1v147nt'),('cjlmmpzsk00sk01077rx5sjel','cjllne176000u0107y1v147nt'),('cjlmmq16600sq01076drdw41w','cjllne176000u0107y1v147nt'),('cjlmmq16800ss0107a3bo6kdc','cjllne176000u0107y1v147nt'),('cjlmmq16800sv01077iciokpr','cjllne176000u0107y1v147nt'),('cjlmmq16800sw0107nj598e94','cjllne176000u0107y1v147nt'),('cjlmmq1vn00t30107flh9jz0i','cjllne176000u0107y1v147nt'),('cjlmmq1vq00t50107hi5ia4ig','cjllne176000u0107y1v147nt'),('cjlmmq1vq00t701073qm3ivjg','cjllne176000u0107y1v147nt'),('cjlmmq1vt00t901077xt7ik45','cjllne176000u0107y1v147nt'),('cjlmmq2i300tf01076wk5ppw7','cjllne176000u0107y1v147nt'),('cjlmmq2i300tg01079f96o1a5','cjllne176000u0107y1v147nt'),('cjlmmq2i400ti0107ja455q49','cjllne176000u0107y1v147nt'),('cjlmmq2i600tk0107dkk0f9ss','cjllne176000u0107y1v147nt'),('cjlmmu822014o0107yr26www2','cjllne176000u0107y1v147nt'),('cjlmmu823014q0107v1ge7n4q','cjllne176000u0107y1v147nt'),('cjlmmu828014s0107d82mwwg3','cjllne176000u0107y1v147nt'),('cjlmn1cm601k80107edg7h9zb','cjllne176000u0107y1v147nt'),('cjlmpggil01qs0107lc0c5su7','cjllne176000u0107y1v147nt'),('cjlmpgrdi01r601079v2ifupt','cjllne176000u0107y1v147nt'),('cjlmpv5du01rd01079bro9cz2','cjllne176000u0107y1v147nt'),('cjlmpv5lp01rg0107b29rypa9','cjllne176000u0107y1v147nt'),('cjlmpvjku01rk0107b4kzyqhl','cjllne176000u0107y1v147nt'),('cjlms86wq01t30107rfs8ridx','cjllne176000u0107y1v147nt'),('cjlmscpt701t80107rk1d1cz2','cjllne176000u0107y1v147nt'),('cjlmscs1u01tb0107jzxg1tm1','cjllne176000u0107y1v147nt'),('cjlmszcfv01u6010733srnjpd','cjllne176000u0107y1v147nt'),('cjlmu3o6001yw010753tjgjc5','cjllne176000u0107y1v147nt'),('cjlmu4g3v01z00107hz4dk3nq','cjllne176000u0107y1v147nt'),('cjlmu535h01z40107agoyt9jz','cjllne176000u0107y1v147nt'),('cjlmu60cg01z8010727tp1jmz','cjllne176000u0107y1v147nt'),('cjlmu7ke901zc0107uadl3lmc','cjllne176000u0107y1v147nt');
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

-- Dump completed on 2018-09-03 22:09:40
