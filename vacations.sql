CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followed`
--

DROP TABLE IF EXISTS `followed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_vacationId_idx` (`vacation_id`),
  KEY `FK_userId_idx` (`user_id`),
  CONSTRAINT `FK_userID` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_vacationID` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed`
--

LOCK TABLES `followed` WRITE;
/*!40000 ALTER TABLE `followed` DISABLE KEYS */;
INSERT INTO `followed` VALUES (63,23,4),(64,23,8),(66,24,6),(67,24,4),(69,26,8),(72,25,6),(74,25,2),(75,25,3),(76,25,4),(77,24,1),(78,24,2),(83,23,3),(84,23,42),(85,23,5),(87,26,1);
/*!40000 ALTER TABLE `followed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `birth_date` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (22,'sasson','sasson','99fe586fa26fb7bb6c5cd8030f93f142','21/15/2025','admin'),(23,'avi','avi','99fe586fa26fb7bb6c5cd8030f93f142','21/15/2025','user'),(24,'cdbhgnm','jjj','99fe586fa26fb7bb6c5cd8030f93f142','17/04/2005','user'),(25,'adsfc','eee','99fe586fa26fb7bb6c5cd8030f93f142','11/11/2007','user'),(26,'aaa','aaa','99fe586fa26fb7bb6c5cd8030f93f142','01/01/2004','user'),(27,'romi ish tov','romi@gmail.c','e2d2af960ada70e65297bec6a535e705','10/06/2001','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `from_date` varchar(45) NOT NULL,
  `to_date` varchar(45) NOT NULL,
  `photo_url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Emirates',350,'2022-03-22','2022-04-29','Emirates.jpg'),(2,'Prague',320,'2022-04-25','2022-04-27','Prague.jpg'),(3,'Berlin',330,'2022-04-04','2022-04-27','Berlin.jpg'),(4,'Dubai',300,'2022-04-27','2022-04-27','Dubai.jpg'),(5,'Warsaw',280,'2022-04-27','2022-04-27','Warsaw.jpg'),(6,'burgas',340,'2022-04-27','2022-04-27','https://www.eshet.com/resizeImage/565/330/cover/https:/static.eshet.com/5480/burgas-07.jpg'),(7,'Rome',270,'2022-04-27','2022-04-27','Rome.jpg'),(8,'Rhodes',190,'2022-04-27','2022-04-27','Rhodes.jpg'),(41,'Batumi',300,'2022-04-19','2022-04-26','https://www.israir.co.il/clients/isra2016/gallery/Batumi/294X291/Batumi_588079181%20294_291.jpg'),(42,'Athens',270,'2022-03-22','2022-04-28','https://www.israir.co.il/clients/isra2016/gallery/AthensV/294X291/Athens_580566364%20294_291.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-24 17:31:50
