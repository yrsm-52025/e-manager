/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.5.61-log : Database - mydb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mydb` /*!40100 DEFAULT CHARACTER SET gbk */;

USE `mydb`;

/*Table structure for table `t_user` */

DROP TABLE IF EXISTS `t_user`;

CREATE TABLE `t_user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(16) NOT NULL,
  `u_pwd` varchar(16) NOT NULL,
  `u_img` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk;

/*Data for the table `t_user` */

insert  into `t_user`(`u_id`,`u_name`,`u_pwd`,`u_img`) values (1,'administrator','administrator','./images/avatar/avatar1.jpg'),(2,'Lin_52025','lin52025','./images/avatar/avatar2.jpg'),(3,'yrsm_msry','yrsmmsry','./images/avatar/avatar3.jpg'),(4,'你在我心里迷了路','nzwxlmll','./images/avatar/avatar4.jpg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
