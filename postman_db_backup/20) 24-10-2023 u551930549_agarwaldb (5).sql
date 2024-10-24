-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2024 at 01:40 PM
-- Server version: 10.11.9-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u551930549_agarwaldb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_mst`
--

CREATE TABLE `admin_mst` (
  `admin_id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(300) NOT NULL DEFAULT '''''',
  `school_id` varchar(255) DEFAULT NULL,
  `adminuser_name` varchar(50) NOT NULL,
  `admin_password` varchar(50) NOT NULL,
  `admin_password_encrypted` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL,
  `admin_type` varchar(20) NOT NULL,
  `lastlogindt` datetime DEFAULT NULL,
  `added_date` datetime DEFAULT NULL,
  `added_admin_id` int(11) DEFAULT NULL,
  `edited_date` datetime DEFAULT NULL,
  `edited_admin_id` int(11) DEFAULT NULL,
  `mobile_no` int(11) NOT NULL,
  `parent_admin_id` int(11) NOT NULL DEFAULT 0,
  `is_deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin_mst`
--

INSERT INTO `admin_mst` (`admin_id`, `full_name`, `school_id`, `adminuser_name`, `admin_password`, `admin_password_encrypted`, `is_active`, `admin_type`, `lastlogindt`, `added_date`, `added_admin_id`, `edited_date`, `edited_admin_id`, `mobile_no`, `parent_admin_id`, `is_deleted`) VALUES
(1, 'demo', '1,2,3', 'main', 'test@123', '$2b$10$BDsh6uoAHtua7l8mkFix8ujMuIJ2inT0umKQ.GmSCYmoC5HdiuYTG', 1, 'ADMIN', NULL, '2019-12-20 16:40:26', 1, '2023-12-02 18:23:12', 1, 1234561231, 1, 0),
(121, 'admin', '1,2,3', 'admin', 'admin@gmail.com', '$2b$10$aycmEGQxnJuFuvbS9LPrLO/n/q7p1.V0H1pWabZDjOfHLkz008oU6', 1, 'ADMIN', NULL, '2024-10-17 05:50:10', 1, NULL, NULL, 1234567494, 1, 0),
(133, 'admin6', '1,2,3', 'admin6@gmail.com', 'admin6@gmail.com', '$2b$10$uewanQWzUmzQ5cD0CZ4ALuYr2VdwYMQxjgpRx8fQgfEFWbnyGquPu', 1, 'ADMIN', NULL, '2024-10-24 12:17:02', 1, NULL, NULL, 2147483647, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `app_top_scroller_msg`
--

CREATE TABLE `app_top_scroller_msg` (
  `scroller_id` int(11) NOT NULL,
  `detail` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `app_top_scroller_msg`
--

INSERT INTO `app_top_scroller_msg` (`scroller_id`, `detail`) VALUES
(18, 'TEST SCROOL NEWS');

-- --------------------------------------------------------

--
-- Table structure for table `app_top_welcome_msg`
--

CREATE TABLE `app_top_welcome_msg` (
  `welcome_id` int(11) NOT NULL,
  `detail` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `app_top_welcome_msg`
--

INSERT INTO `app_top_welcome_msg` (`welcome_id`, `detail`) VALUES
(20, 'TEST WELCOME MESSAGE');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryid` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryid`, `title`) VALUES
(1, 'Inbox'),
(2, 'Last Day'),
(3, 'Seen'),
(4, 'Starred'),
(5, 'testin77777777777g');

-- --------------------------------------------------------

--
-- Table structure for table `Chat_Message`
--

CREATE TABLE `Chat_Message` (
  `chat_msg_id` int(11) NOT NULL,
  `msg_id` int(11) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `msg_type` varchar(255) DEFAULT 'TEXT',
  `chat_id` varchar(255) DEFAULT NULL,
  `chat_type` varchar(255) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `mobile_no` varchar(255) NOT NULL,
  `receiver_id` varchar(255) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `message` longtext DEFAULT NULL,
  `sent_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Chat_Message`
--

INSERT INTO `Chat_Message` (`chat_msg_id`, `msg_id`, `link`, `msg_type`, `chat_id`, `chat_type`, `sender_id`, `mobile_no`, `receiver_id`, `group_id`, `message`, `sent_at`) VALUES
(176, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 1, '9009436798', NULL, 328, 'Hello Twinkle', '2024-10-24 07:00:59'),
(177, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 3, '7415309294', NULL, 328, 'Hello Viraj sir', '2024-10-24 07:01:58'),
(178, 328, 'http://206.189.130.102:3550/Uploads/pdf/1729753363759-1729753363759.pdf', 'PDF', NULL, 'GROUPCHAT', 5, '7692898921', NULL, 328, '', '2024-10-24 07:02:44'),
(179, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 1, '9009436798', NULL, 328, 'Twinkle ajj guru pushya nakshtra ka kaya purchase kiya', '2024-10-24 07:03:18'),
(180, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 3, '7415309294', NULL, 328, 'viraj sir kuch purchase nahi kiya he', '2024-10-24 07:04:07'),
(181, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 1, '9009436798', NULL, 328, 'Maine car purchase kari he', '2024-10-24 07:04:42'),
(182, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 3, '7415309294', NULL, 328, 'party do sir ji', '2024-10-24 07:04:54'),
(183, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 1, '9009436798', NULL, 328, 'party sham ko deta he', '2024-10-24 07:05:14'),
(184, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 1, '9009436798', NULL, 328, 'party sham ko deta he', '2024-10-24 07:21:16'),
(186, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '8989495923', '[{\"student_main_id\":1,\"mobilenumber\":\"9009436798\"},{\"student_main_id\":3,\"mobilenumber\":\"7415309294\"},{\"student_main_id\":4,\"mobilenumber\":\"7692898921\"}]', 329, 'Hello everyone! SENT FROM SACHIN 8989495923', '2024-10-24 07:27:54'),
(187, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 1, '9009436798', '[{\"student_main_id\":1,\"mobilenumber\":\"9009436798\"},{\"student_main_id\":3,\"mobilenumber\":\"7415309294\"},{\"student_main_id\":4,\"mobilenumber\":\"7692898921\"}]', 329, 'Hello everyone! SENT FROM  9009436798', '2024-10-24 07:31:25'),
(188, 328, NULL, 'TEXT', NULL, 'GROUPCHAT', 5, '7692898921', NULL, 328, 'viraj please fix time getting wrong time', '2024-10-24 08:23:15'),
(189, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '8989495923', '[{\"student_main_id\":1,\"mobilenumber\":\"9009436798\"},{\"student_main_id\":3,\"mobilenumber\":\"7415309294\"},{\"student_main_id\":4,\"mobilenumber\":\"7692898921\"}]', 329, 'Hello everyone! SENT FROM SACHIN 8989495923', '2024-10-24 08:31:06'),
(190, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":\"9009436798\"},{\"student_main_id\":3,\"mobilenumber\":\"7415309294\"},{\"student_main_id\":4,\"mobilenumber\":\"7692898921\"}]', 329, 'hyy', '2024-10-24 08:47:22'),
(191, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 4, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":\"9009436798\"},{\"student_main_id\":3,\"mobilenumber\":\"7415309294\"},{\"student_main_id\":4,\"mobilenumber\":\"7692898921\"}]', 329, 'Hello everyone! SENT FROM abc 7692898921', '2024-10-24 10:10:51'),
(192, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 4, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hyy', '2024-10-24 11:16:03'),
(193, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hyy', '2024-10-24 12:41:59'),
(194, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hyy', '2024-10-24 12:49:30'),
(195, 329, 'http://206.189.130.102:3550/Uploads/pdf/1729775608490-1729775608490.pdf', 'PDF', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hello', '2024-10-24 13:13:28'),
(196, 329, 'http://206.189.130.102:3550/Uploads/image/1729775633173-1729775633173.png', 'IMAGE', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, '', '2024-10-24 13:13:53'),
(197, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hello', '2024-10-24 13:15:45'),
(198, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hello', '2024-10-24 13:16:31'),
(199, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hello', '2024-10-24 13:20:09'),
(200, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hello this is from Tarannum', '2024-10-24 13:20:41'),
(201, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'hello', '2024-10-24 13:22:50'),
(202, 329, NULL, 'TEXT', NULL, 'INDIVIDUALCHAT', 5, '7692898921', '[{\"student_main_id\":1,\"mobilenumber\":9009436798},{\"student_main_id\":3,\"mobilenumber\":7415309294},{\"student_main_id\":4,\"mobilenumber\":7692898921}]', 329, 'gjj', '2024-10-24 13:28:43');

-- --------------------------------------------------------

--
-- Table structure for table `fees_display`
--

CREATE TABLE `fees_display` (
  `fees_display_id` int(11) NOT NULL,
  `scholar_no` int(11) DEFAULT NULL,
  `session_detail` varchar(255) DEFAULT NULL,
  `term` int(11) DEFAULT NULL,
  `outstandingfees` int(11) DEFAULT NULL,
  `duedate` varchar(255) DEFAULT NULL,
  `feesstatus` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fees_display`
--

INSERT INTO `fees_display` (`fees_display_id`, `scholar_no`, `session_detail`, `term`, `outstandingfees`, `duedate`, `feesstatus`, `createdAt`) VALUES
(7, 22010005, 'Session 2023-2024', 1, 25000, '07/12/2024', 0, '2024-10-24 11:17:18'),
(8, 22010007, '7692898725', 2, 50000, '07/12/2024', 0, '2024-10-24 11:17:18'),
(9, 22010202, 'Session 2023-2024', 1, 25000, '07/12/2024', 0, '2024-10-24 11:17:18'),
(10, 22010005, 'Session 2023-2024', 1, 25000, '07/12/2024', 0, '2024-10-24 13:04:31'),
(11, 22010007, '7692898725', 2, 50000, '07/12/2024', 0, '2024-10-24 13:04:31'),
(12, 22010202, 'Session 2023-2024', 1, 25000, '07/12/2024', 0, '2024-10-24 13:04:31'),
(13, 22010005, 'Session 2023-2024', 1, 25000, '07/12/2024', 0, '2024-10-24 13:05:55'),
(14, 22010007, '7692898725', 2, 50000, '07/12/2024', 0, '2024-10-24 13:05:55'),
(15, 22010202, 'Session 2023-2024', 1, 25000, '07/12/2024', 0, '2024-10-24 13:05:55');

-- --------------------------------------------------------

--
-- Table structure for table `msg_body`
--

CREATE TABLE `msg_body` (
  `msg_body_id` int(10) UNSIGNED NOT NULL,
  `msg_id` int(11) DEFAULT NULL,
  `msg_type` varchar(20) DEFAULT NULL,
  `data_text` varchar(4000) DEFAULT NULL,
  `is_reply_required` tinyint(4) DEFAULT NULL,
  `ordersno` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `msg_body`
--

INSERT INTO `msg_body` (`msg_body_id`, `msg_id`, `msg_type`, `data_text`, `is_reply_required`, `ordersno`) VALUES
(1044, 328, 'TEXT-DISPLAY', '{\"text\":\"(School Name)<br>\\r\\n<br>\\r\\nOSC:_______________<br>\\r\\n<br>\\r\\nDate: ______________<br>\\r\\n<br>\\r\\nTo<br>Dear Parents<br>\\r\\n<br>\\r\\nSubject : Festival Celebration at school.<br>\\r\\n<br>\\r\\nReference : Our earlier Circular No. OSC: CIR/2023-24/____ Dated: ________<br>\\r\\n<br>\\r\\nYou are already delaying the deposition of fee of your ward, now it\'s our humble request to deposit the fee at the earliest. .<br>\"}', 0, 1),
(1045, 328, 'TITLE-DISPLAY', '{\"title\":\"*Celebration  (Most important and urgent).\"}', 0, 1),
(1046, 328, 'IMAGE-DISPLAY', '{\"link\":\"https://nss-main.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/10/07175734/Blogsharadpurnima2024.jpg\"}', 0, 1),
(1047, 328, 'OPTION-INPUT', '{\"title\":\"Select Stream\",\"options\":\"Commerce;Science(PCM);Science(PCB);\"}', 1, 1),
(1048, 328, 'TEXTBOX-INPUT', '{\"title\":\"ID Code No.\",\"placeholder\":\"Enter Student Id Code No.\"}', 1, 2),
(1049, 328, 'CHECKBOX-INPUT', '{\"title\":\"Do you ready with\",\"options\":\"Last year Marksheet;Deposit First Term fee;Books & Notebooks;Student I-Card;Bus (if opted) I-Card\"}', 1, 2),
(1050, 328, 'YOUTUBE-DISPLAY', '{\"title\":\"title for youtube.\",\"link\":\"https://www.youtube.com/watch?v=mwMk-iuuFQ4\"}', 0, 2),
(1051, 328, 'LINK-DISPLAY', '{\"title\":\"Weekly Mega Test of class 9th CEP July 11th\",\"link\":\"https://apsindore.com/wp-content/uploads/2023/01/Combine%20Boarder%20and%20IIT-JEE%20Fees%20Structure.pdf\"}', 0, 2),
(1052, 328, 'FILE-INPUT', '{\"title\":\"Add Address Proof\",\"mime\":\"image/jpeg;image/png;\"}', 1, 2),
(1053, 328, 'CAMERA-INPUT', '{\"title\":\"Add Address Proof\"}', 1, 2),
(1054, 328, 'TEXTAREA-INPUT', '{\"title\":\"Family Detail Brief\",\"placeholder\":\"Type Your Detail here\"}', 0, 2),
(1055, 329, 'TEXT-DISPLAY', '{\"text\":\"(School Name)<br>\\r\\n<br>\\r\\nOSC:_______________<br>\\r\\n<br>\\r\\nDate: ______________<br>\\r\\n<br>\\r\\nTo<br>Dear Parents<br>\\r\\n<br>\\r\\nSubject : Festival Celebration at school.<br>\\r\\n<br>\\r\\nReference : Our earlier Circular No. OSC: CIR/2023-24/____ Dated: ________<br>\\r\\n<br>\\r\\nYou are already delaying the deposition of fee of your ward, now it\'s our humble request to deposit the fee at the earliest. .<br>\"}', 0, 1),
(1056, 329, 'TITLE-DISPLAY', '{\"title\":\"*Celebration  (Most important and urgent).\"}', 0, 1),
(1057, 329, 'IMAGE-DISPLAY', '{\"link\":\"https://nss-main.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/10/07175734/Blogsharadpurnima2024.jpg\"}', 0, 1),
(1058, 329, 'OPTION-INPUT', '{\"title\":\"Select Stream\",\"options\":\"Commerce;Science(PCM);Science(PCB);\"}', 1, 1),
(1059, 329, 'TEXTBOX-INPUT', '{\"title\":\"ID Code No.\",\"placeholder\":\"Enter Student Id Code No.\"}', 1, 2),
(1060, 329, 'CHECKBOX-INPUT', '{\"title\":\"Do you ready with\",\"options\":\"Last year Marksheet;Deposit First Term fee;Books & Notebooks;Student I-Card;Bus (if opted) I-Card\"}', 1, 2),
(1061, 329, 'YOUTUBE-DISPLAY', '{\"title\":\"title for youtube.\",\"link\":\"https://www.youtube.com/watch?v=mwMk-iuuFQ4\"}', 0, 2),
(1062, 329, 'LINK-DISPLAY', '{\"title\":\"Weekly Mega Test of class 9th CEP July 11th\",\"link\":\"https://apsindore.com/wp-content/uploads/2023/01/Combine%20Boarder%20and%20IIT-JEE%20Fees%20Structure.pdf\"}', 0, 2),
(1063, 329, 'FILE-INPUT', '{\"title\":\"Add Address Proof\",\"mime\":\"image/jpeg;image/png;\"}', 1, 2),
(1064, 329, 'CAMERA-INPUT', '{\"title\":\"Add Address Proof\"}', 1, 2),
(1065, 329, 'TEXTAREA-INPUT', '{\"title\":\"Family Detail Brief\",\"placeholder\":\"Type Your Detail here\"}', 0, 2),
(1066, 333, 'TEXT-DISPLAY', '{\"text\":\"agrawal public school\"}', 0, 1),
(1067, 334, 'TEXT-DISPLAY', '{\"text\":\"(School Name)<br>\\r\\n<br>\\r\\nOSC:_______________<br>\\r\\n<br>\\r\\nDate: ______________<br>\\r\\n<br>\\r\\nTo<br>Dear Parents<br>\\r\\n<br>\\r\\nSubject : Festival Celebration at school.<br>\\r\\n<br>\\r\\nReference : Our earlier Circular No. OSC: CIR/2023-24/____ Dated: ________<br>\\r\\n<br>\\r\\nYou are already delaying the deposition of fee of your ward, now it\'s our humble request to deposit the fee at the earliest. .<br>\"}', 0, 1),
(1068, 334, 'TITLE-DISPLAY', '{\"title\":\"*Celebration  (Most important and urgent).\"}', 0, 1),
(1069, 334, 'IMAGE-DISPLAY', '{\"link\":\"https://nss-main.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/10/07175734/Blogsharadpurnima2024.jpg\"}', 0, 1),
(1070, 334, 'OPTION-INPUT', '{\"title\":\"Select Stream\",\"options\":\"Commerce;Science(PCM);Science(PCB);\"}', 1, 1),
(1071, 334, 'TEXTBOX-INPUT', '{\"title\":\"ID Code No.\",\"placeholder\":\"Enter Student Id Code No.\"}', 1, 2),
(1072, 334, 'CHECKBOX-INPUT', '{\"title\":\"Do you ready with\",\"options\":\"Last year Marksheet;Deposit First Term fee;Books & Notebooks;Student I-Card;Bus (if opted) I-Card\"}', 1, 2),
(1073, 334, 'YOUTUBE-DISPLAY', '{\"title\":\"title for youtube.\",\"link\":\"https://www.youtube.com/watch?v=mwMk-iuuFQ4\"}', 0, 2),
(1074, 334, 'LINK-DISPLAY', '{\"title\":\"Weekly Mega Test of class 9th CEP July 11th\",\"link\":\"https://apsindore.com/wp-content/uploads/2023/01/Combine%20Boarder%20and%20IIT-JEE%20Fees%20Structure.pdf\"}', 0, 2),
(1075, 334, 'FILE-INPUT', '{\"title\":\"Add Address Proof\",\"mime\":\"image/jpeg;image/png;\"}', 1, 2),
(1076, 334, 'CAMERA-INPUT', '{\"title\":\"Add Address Proof\"}', 1, 2),
(1077, 334, 'TEXTAREA-INPUT', '{\"title\":\"Family Detail Brief\",\"placeholder\":\"Type Your Detail here\"}', 0, 2),
(1078, 335, 'TEXT-DISPLAY', '{\"text\":\"(School Name)<br>\\r\\n<br>\\r\\nOSC:_______________<br>\\r\\n<br>\\r\\nDate: ______________<br>\\r\\n<br>\\r\\nTo<br>Dear Parents<br>\\r\\n<br>\\r\\nSubject : Festival Celebration at school.<br>\\r\\n<br>\\r\\nReference : Our earlier Circular No. OSC: CIR/2023-24/____ Dated: ________<br>\\r\\n<br>\\r\\nYou are already delaying the deposition of fee of your ward, now it\'s our humble request to deposit the fee at the earliest. .<br>\"}', 0, 1),
(1079, 335, 'TITLE-DISPLAY', '{\"title\":\"*Celebration  (Most important and urgent).\"}', 0, 1),
(1080, 335, 'IMAGE-DISPLAY', '{\"link\":\"https://nss-main.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/10/07175734/Blogsharadpurnima2024.jpg\"}', 0, 1),
(1081, 335, 'OPTION-INPUT', '{\"title\":\"Select Stream\",\"options\":\"Commerce;Science(PCM);Science(PCB);\"}', 1, 1),
(1082, 335, 'TEXTBOX-INPUT', '{\"title\":\"ID Code No.\",\"placeholder\":\"Enter Student Id Code No.\"}', 1, 2),
(1083, 335, 'CHECKBOX-INPUT', '{\"title\":\"Do you ready with\",\"options\":\"Last year Marksheet;Deposit First Term fee;Books & Notebooks;Student I-Card;Bus (if opted) I-Card\"}', 1, 2),
(1084, 335, 'YOUTUBE-DISPLAY', '{\"title\":\"title for youtube.\",\"link\":\"https://www.youtube.com/watch?v=mwMk-iuuFQ4\"}', 0, 2),
(1085, 335, 'LINK-DISPLAY', '{\"title\":\"Weekly Mega Test of class 9th CEP July 11th\",\"link\":\"https://apsindore.com/wp-content/uploads/2023/01/Combine%20Boarder%20and%20IIT-JEE%20Fees%20Structure.pdf\"}', 0, 2),
(1086, 335, 'FILE-INPUT', '{\"title\":\"Add Address Proof\",\"mime\":\"image/jpeg;image/png;\"}', 1, 2),
(1087, 335, 'CAMERA-INPUT', '{\"title\":\"Add Address Proof\"}', 1, 2),
(1088, 335, 'TEXTAREA-INPUT', '{\"title\":\"Family Detail Brief\",\"placeholder\":\"Type Your Detail here\"}', 0, 2),
(1089, 336, 'YOUTUBE-DISPLAY', '{\"link\":\"https://www.youtube.com/live/hZFqqU5aLEI?si=kQ-I1yk6tnhG89ur\"}', 0, 1),
(1090, 336, 'TITLE-DISPLAY', '{\"title\":\"title\"}', 0, 2),
(1091, 336, 'TEXT-DISPLAY', '{\"text\":\"fbdfdfvdfvb\"}', 0, 3),
(1092, 337, 'TEXT-DISPLAY', '{\"text\":\"(School Name)<br>\\r\\n<br>\\r\\nOSC:_______________<br>\\r\\n<br>\\r\\nDate: ______________<br>\\r\\n<br>\\r\\nTo<br>Dear Parents<br>\\r\\n<br>\\r\\nSubject : Festival Celebration at school.<br>\\r\\n<br>\\r\\nReference : Our earlier Circular No. OSC: CIR/2023-24/____ Dated: ________<br>\\r\\n<br>\\r\\nYou are already delaying the deposition of fee of your ward, now it\'s our humble request to deposit the fee at the earliest. .<br>\"}', 0, 1),
(1093, 337, 'TITLE-DISPLAY', '{\"title\":\"*Celebration  (Most important and urgent).\"}', 0, 1),
(1094, 337, 'IMAGE-DISPLAY', '{\"link\":\"https://nss-main.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/10/07175734/Blogsharadpurnima2024.jpg\"}', 0, 1),
(1095, 337, 'OPTION-INPUT', '{\"title\":\"Select Stream\",\"options\":\"Commerce;Science(PCM);Science(PCB);\"}', 1, 1),
(1096, 337, 'TEXTBOX-INPUT', '{\"title\":\"ID Code No.\",\"placeholder\":\"Enter Student Id Code No.\"}', 1, 2),
(1097, 337, 'CHECKBOX-INPUT', '{\"title\":\"Do you ready with\",\"options\":\"Last year Marksheet;Deposit First Term fee;Books & Notebooks;Student I-Card;Bus (if opted) I-Card\"}', 1, 2),
(1098, 337, 'YOUTUBE-DISPLAY', '{\"title\":\"title for youtube.\",\"link\":\"https://www.youtube.com/watch?v=mwMk-iuuFQ4\"}', 0, 2),
(1099, 337, 'LINK-DISPLAY', '{\"title\":\"Weekly Mega Test of class 9th CEP July 11th\",\"link\":\"https://apsindore.com/wp-content/uploads/2023/01/Combine%20Boarder%20and%20IIT-JEE%20Fees%20Structure.pdf\"}', 0, 2),
(1100, 337, 'FILE-INPUT', '{\"title\":\"Add Address Proof\",\"mime\":\"image/jpeg;image/png;\"}', 1, 2),
(1101, 337, 'CAMERA-INPUT', '{\"title\":\"Add Address Proof\"}', 1, 2),
(1102, 337, 'TEXTAREA-INPUT', '{\"title\":\"Family Detail Brief\",\"placeholder\":\"Type Your Detail here\"}', 0, 2),
(1103, 338, 'TEXT-DISPLAY', '{\"text\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \"}', 0, 1),
(1104, 338, 'LINK-DISPLAY', '{\"link\":\"https://images.unsplash.com/photo-1530092285049-1c42085fd395?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D\"}', 0, 2),
(1105, 338, 'YOUTUBE-DISPLAY', '{\"link\":\"https://www.youtube.com/watch?v=aZj-MEqy2CM\"}', 0, 3),
(1106, 338, 'IMAGE-DISPLAY', '{\"link\":\"https://images.unsplash.com/photo-1530092285049-1c42085fd395?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D\"}', 0, 4),
(1107, 338, 'OPTION-INPUT', '{\"title\":\"gender\",\"options\":\"male;female;other\"}', 1, 5),
(1108, 338, 'CHECKBOX-INPUT', '{\"title\":\"select option\",\"options\":\"sonpapdi;kajukatli;khoprapak\"}', 1, 6),
(1109, 338, 'TEXTBOX-INPUT', '{\"title\":\"What is Lorem Ipsum?\",\"placeholder\":\"What is Lorem Ipsum?\"}', 1, 7),
(1110, 338, 'TEXTAREA-INPUT', '{\"title\":\"What is Lorem Ipsum?\",\"placeholder\":\"What is Lorem Ipsum?\"}', 1, 8),
(1111, 338, 'CAMERA-INPUT', '{\"title\":\"What is Lorem Ipsum?\"}', 1, 9),
(1112, 338, 'FILE-INPUT', '{}', 1, 10),
(1113, 339, 'TITLE-DISPLAY', '{\"title\":\"This notice regarding for diwali celebration\"}', 0, 1),
(1114, 339, 'TEXT-DISPLAY', '{\"text\":\"we are informing all of you that please come in formal dress in diwali celebration\"}', 0, 2),
(1115, 339, 'LINK-DISPLAY', '{\"link\":\"https://media.assettype.com/outlookindia/2024-10-14/msv1v5xm/1.png?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0\"}', 0, 3),
(1116, 339, 'YOUTUBE-DISPLAY', '{\"link\":\"https://www.youtube.com/watch?v=aZj-MEqy2CM\"}', 0, 4),
(1117, 339, 'IMAGE-DISPLAY', '{\"link\":\"https://media.assettype.com/outlookindia/2024-10-14/msv1v5xm/1.png?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0\"}', 0, 5),
(1118, 339, 'CHECKBOX-INPUT', '{\"title\":\"gender\",\"options\":\"male;female;other\"}', 1, 6),
(1119, 339, 'OPTION-INPUT', '{\"title\":\"are you intretest\",\"options\":\"yes;no\"}', 1, 7),
(1120, 339, 'TEXTBOX-INPUT', '{\"title\":\"write your thought about diwali\",\"placeholder\":\"write here\"}', 1, 8),
(1121, 339, 'TEXTAREA-INPUT', '{\"title\":\"write your thought about diwali\",\"placeholder\":\"write here\"}', 1, 9),
(1122, 339, 'CAMERA-INPUT', '{\"title\":\"uplaod image here\"}', 1, 10),
(1123, 339, 'FILE-INPUT', '{}', 1, 11);

-- --------------------------------------------------------

--
-- Table structure for table `msg_group_mst`
--

CREATE TABLE `msg_group_mst` (
  `msg_group_id` int(10) UNSIGNED NOT NULL,
  `msg_group_name` varchar(50) NOT NULL,
  `is_active` int(11) NOT NULL,
  `added_date` datetime DEFAULT NULL,
  `added_user_id` int(11) DEFAULT NULL,
  `edited_date` datetime DEFAULT NULL,
  `edited_user_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `msg_group_mst`
--

INSERT INTO `msg_group_mst` (`msg_group_id`, `msg_group_name`, `is_active`, `added_date`, `added_user_id`, `edited_date`, `edited_user_id`, `createdAt`, `is_deleted`) VALUES
(1, 'Session 2023-2024', 0, '2023-12-02 17:51:52', 1, '2024-10-16 06:36:14', 1, '2024-09-19 12:30:25', 1),
(2, 'Session 2024-2025', 1, '2023-12-02 17:52:02', 1, '2023-12-02 17:52:02', 1, '2024-09-19 12:30:25', 1),
(49, 'test sikha', 1, '2024-10-24 09:48:06', 1, NULL, NULL, '2024-10-24 09:48:06', 0),
(50, 'test sikha', 1, '2024-10-24 09:56:12', 1, NULL, NULL, '2024-10-24 09:56:12', 0),
(51, 'test group', 1, '2024-10-24 13:36:23', 1, NULL, NULL, '2024-10-24 13:36:23', 0);

-- --------------------------------------------------------

--
-- Table structure for table `msg_mst`
--

CREATE TABLE `msg_mst` (
  `msg_id` int(10) UNSIGNED NOT NULL,
  `msg_chat_type` varchar(255) DEFAULT 'GROUPCHAT',
  `five_mobile_number` varchar(4000) DEFAULT NULL,
  `subject_text` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `show_upto` datetime DEFAULT NULL,
  `msg_priority` tinyint(4) DEFAULT NULL,
  `msg_sgroup_id` int(11) NOT NULL DEFAULT 0,
  `is_reply_type` tinyint(4) DEFAULT NULL,
  `is_reply_required_any` tinyint(4) DEFAULT NULL,
  `is_active` tinyint(3) UNSIGNED NOT NULL,
  `entry_date` datetime DEFAULT NULL,
  `entry_by` int(11) DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  `edit_by` int(11) DEFAULT NULL,
  `school_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `msg_mst`
--

INSERT INTO `msg_mst` (`msg_id`, `msg_chat_type`, `five_mobile_number`, `subject_text`, `show_upto`, `msg_priority`, `msg_sgroup_id`, `is_reply_type`, `is_reply_required_any`, `is_active`, `entry_date`, `entry_by`, `edit_date`, `edit_by`, `school_id`, `createdAt`) VALUES
(328, 'GROUPCHAT', '[{\"student_main_id\":1,\"mobile_no\":9009436798},{\"student_main_id\":3,\"mobile_no\":7415309294},{\"student_main_id\":4,\"mobile_no\":7692898921}]', 'All Data Inserted title of GROUPCHAT', '2024-12-30 23:59:59', 1, 4, 0, 1, 0, NULL, 1, NULL, NULL, '1,2,3', '2024-10-24 06:43:21'),
(329, 'INDIVIDUALCHAT', '[{\"student_main_id\":1,\"mobile_no\":9009436798},{\"student_main_id\":3,\"mobile_no\":7415309294},{\"student_main_id\":4,\"mobile_no\":7692898921}]', 'All Data Inserted title of INDIVIDUALCHAT ', '2024-12-30 23:59:59', 1, 4, 0, 1, 1, NULL, 1, NULL, NULL, '1,2,3', '2024-10-24 06:44:19'),
(330, 'GROUPCHAT', NULL, 'test', '2024-10-24 00:00:00', 1, 2, 0, 1, 1, NULL, 1, NULL, NULL, '2', '2024-10-24 07:31:05'),
(331, 'GROUPCHAT', NULL, 'test', '2024-10-24 00:00:00', 2, 2, 0, 1, 1, NULL, 1, NULL, NULL, '1', '2024-10-24 07:33:40'),
(332, 'GROUPCHAT', NULL, 'test', '2024-10-24 00:00:00', 2, 2, 0, 1, 1, NULL, 1, NULL, NULL, '1', '2024-10-24 07:33:49'),
(333, 'GROUPCHAT', NULL, 'test', '2024-10-24 00:00:00', 2, 2, 0, 1, 1, NULL, 1, NULL, NULL, '1', '2024-10-24 07:37:23'),
(334, 'INPUT', '[{\"student_main_id\":1,\"mobile_no\":9009436798},{\"student_main_id\":3,\"mobile_no\":7415309294},{\"student_main_id\":4,\"mobile_no\":7692898921}]', 'All Data Inserted title of INPUT CHAT TYPE', '2024-12-30 23:59:59', 1, 4, 0, 1, 1, NULL, 1, NULL, NULL, '1,2,3', '2024-10-24 07:43:24'),
(335, 'DISPLAY', '[{\"student_main_id\":1,\"mobile_no\":9009436798},{\"student_main_id\":3,\"mobile_no\":7415309294},{\"student_main_id\":4,\"mobile_no\":7692898921}]', 'All Data Inserted title of DISPLAY CHAT TYPE', '2024-12-30 23:59:59', 1, 4, 0, 1, 1, NULL, 1, NULL, NULL, '1,2,3', '2024-10-24 07:43:56'),
(336, 'GROUPCHAT', NULL, '', '0000-00-00 00:00:00', 1, 0, 0, 1, 1, NULL, 1, NULL, NULL, '', '2024-10-24 07:44:17'),
(337, 'DISPLAY', '[{\"student_main_id\":1,\"mobile_no\":9009436798},{\"student_main_id\":3,\"mobile_no\":7415309294},{\"student_main_id\":4,\"mobile_no\":7692898921}]', 'Experimental post only use', '2024-12-30 23:59:59', 1, 4, 0, 1, 1, NULL, 1, NULL, NULL, '1,2,3', '2024-10-24 09:20:27'),
(338, 'GROUPCHAT', NULL, 'diwali ki chhuti ', '2024-10-30 00:00:00', 1, 2, 0, 1, 1, NULL, 1, NULL, NULL, '1,3,2', '2024-10-24 10:02:45'),
(339, 'GROUPCHAT', NULL, 'diwali celebration', '2024-10-30 00:00:00', 1, 2, 0, 1, 1, NULL, 1, NULL, NULL, '1', '2024-10-24 12:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `msg_sgroup_mst`
--

CREATE TABLE `msg_sgroup_mst` (
  `msg_sgroup_id` int(10) UNSIGNED NOT NULL,
  `msg_sgroup_name` varchar(50) NOT NULL,
  `is_active` int(11) NOT NULL,
  `added_date` datetime DEFAULT NULL,
  `added_user_id` int(11) DEFAULT NULL,
  `edited_date` datetime DEFAULT NULL,
  `edited_user_id` int(11) DEFAULT NULL,
  `msg_group_id` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL,
  `is_deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `msg_sgroup_mst`
--

INSERT INTO `msg_sgroup_mst` (`msg_sgroup_id`, `msg_sgroup_name`, `is_active`, `added_date`, `added_user_id`, `edited_date`, `edited_user_id`, `msg_group_id`, `createdAt`, `updatedAt`, `is_deleted`) VALUES
(2, 'Information', 1, '2023-12-02 17:53:09', 1, '2024-10-17 06:22:20', 1, 2, '2024-09-19 12:30:54', '2024-10-17 07:11:10', 0),
(3, 'Intimation', 1, '2023-12-02 17:54:58', 1, '2023-12-02 17:54:58', 1, 1, '2024-09-19 12:30:54', '2024-10-17 07:44:31', 0),
(4, 'Most Important', 0, '2023-12-02 17:55:11', 1, '2024-10-16 08:55:55', 1, 1, '2024-09-19 12:30:54', '2024-10-18 07:11:16', 0),
(5, 'Reminders', 1, '2023-12-02 17:55:27', 1, '2023-12-02 17:55:27', 1, 1, '2024-09-19 12:30:54', '2024-10-18 07:11:19', 0),
(6, 'Announcement (by State/Local Govt./Management)', 1, '2023-12-02 17:55:59', 1, '2023-12-12 15:13:05', 1, 1, '2024-09-19 12:30:54', '2024-10-18 07:11:24', 0),
(7, 'Celebration', 1, '2023-12-02 17:56:23', 1, '2023-12-12 15:10:22', 1, 1, '2024-09-19 12:30:54', '2024-10-18 07:11:28', 0),
(8, 'Fill the Form', 1, '2023-12-02 17:57:20', 1, '2023-12-12 15:12:10', 1, 1, '2024-09-19 12:30:54', '2024-10-18 07:11:33', 0),
(9, 'Social Media Link', 1, '2023-12-02 17:57:50', 1, '2023-12-12 15:35:23', 1, 1, '2024-09-19 12:30:54', '2024-10-18 07:11:37', 0),
(10, 'Intimation', 1, '2023-12-02 17:58:37', 1, '2023-12-02 17:58:37', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:11:42', 0),
(11, 'Most Important', 1, '2023-12-02 17:58:49', 1, '2023-12-12 15:11:33', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:12:48', 0),
(12, 'Reminders', 1, '2023-12-02 17:59:20', 1, '2023-12-02 17:59:20', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:12:53', 0),
(13, 'Announcement (by State/Local Govt./Management)', 1, '2023-12-02 17:59:35', 1, '2023-12-12 15:12:52', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:12:57', 0),
(14, 'Celebration', 1, '2023-12-02 17:59:55', 1, '2023-12-12 15:10:35', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:13:01', 0),
(15, 'Fill the Form', 1, '2023-12-02 18:00:22', 1, '2023-12-12 15:11:59', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:13:05', 0),
(16, 'Social Media Link', 1, '2023-12-02 18:00:45', 1, '2023-12-12 15:35:31', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:13:11', 0),
(17, 'Final Reminder (Warning)', 1, '2023-12-12 15:15:40', 1, '2023-12-12 15:15:40', 1, 1, '2024-09-19 12:30:54', '2024-10-18 07:13:14', 0),
(18, 'Final Reminder (Warning)', 1, '2023-12-12 15:15:54', 1, '2023-12-12 15:15:54', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:13:21', 0),
(19, 'Information', 1, '2023-12-12 15:33:36', 1, '2023-12-12 15:33:36', 1, 1, '2024-09-19 12:30:54', '2024-10-18 07:13:24', 0),
(20, 'CEP - 9th', 1, '2024-04-26 19:38:29', 1, '2024-04-26 19:43:36', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:13:29', 0),
(21, 'CEP - 10th', 1, '2024-04-26 19:39:00', 1, '2024-04-26 19:44:03', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:13:32', 0),
(22, 'CEP - 11th', 1, '2024-04-26 19:39:13', 1, '2024-04-26 19:43:53', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:13:36', 0),
(23, 'CEP - 12th', 1, '2024-04-26 19:39:29', 1, '2024-04-26 19:43:45', 1, 2, '2024-09-19 12:30:54', '2024-10-18 07:13:40', 0),
(24, 'Updated Marketing Teammmm', 1, '2024-09-30 12:15:11', 1, '2024-10-16 06:36:53', 2, 3, '2024-09-30 12:15:11', '2024-10-18 07:13:45', 0),
(25, 'chandan', 1, '2024-10-08 06:56:29', 1, NULL, NULL, 2, '2024-10-08 06:56:29', '2024-10-17 07:44:47', 1),
(26, 'chandan', 1, '2024-10-08 07:24:18', 1, NULL, NULL, 1, '2024-10-08 07:24:18', '2024-10-18 07:13:48', 1),
(27, 'Marketing Team', 1, '2024-10-08 07:56:28', 1, NULL, NULL, 3, '2024-10-08 07:56:28', '2024-10-18 07:13:53', 1),
(28, 'Marketing Team', 1, '2024-10-08 09:06:53', 1, NULL, NULL, 3, '2024-10-08 09:06:53', '2024-10-18 07:13:56', 1),
(29, 'Happy Diwali', 1, '2024-10-08 09:46:35', 1, NULL, NULL, 0, '2024-10-08 09:46:35', '2024-10-18 07:11:47', 1),
(30, 'Happy Diwali', 1, '2024-10-08 09:47:48', 1, NULL, NULL, 0, '2024-10-08 09:47:48', '2024-10-18 07:11:54', 1),
(31, 'chandan', 1, '2024-10-08 10:07:08', 1, NULL, NULL, 0, '2024-10-08 10:07:08', '2024-10-18 07:11:59', 1),
(32, 'Marketing Team', 1, '2024-10-08 10:13:17', 1, NULL, NULL, 3, '2024-10-08 10:13:17', '2024-10-18 07:14:02', 1),
(45, 'tEST exam time TABLE', 1, '2024-10-24 09:56:30', 1, NULL, NULL, 50, '2024-10-24 09:56:30', '2024-10-24 09:56:30', 0),
(46, 'test SUBgroup', 1, '2024-10-24 13:36:51', 1, NULL, NULL, 51, '2024-10-24 13:36:51', '2024-10-24 13:36:51', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notice_board_detail`
--

CREATE TABLE `notice_board_detail` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `document_type` varchar(255) DEFAULT NULL,
  `document_link` varchar(255) DEFAULT NULL,
  `thumbnails` varchar(255) NOT NULL,
  `timestamps` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notice_board_detail`
--

INSERT INTO `notice_board_detail` (`id`, `title`, `document_type`, `document_link`, `thumbnails`, `timestamps`) VALUES
(1, 'Scholar Uniform', 'PDF', 'https://apsindore.com/wp-content/uploads/2022/12/day-scholar-uniform.pdf', 'https://apsindore.com/wp-content/themes/aps/images/logo.jpg', '2024-09-18 06:32:55'),
(2, 'Boarders Uniforms', 'PDF', 'https://apsindore.com/wp-content/uploads/2022/12/borders-uniform.pdf', 'https://apsindore.com/wp-content/themes/aps/images/logo.jpg', '2024-09-18 06:33:24'),
(3, 'Boarder Fee Structure', 'PDF', 'https://apsindore.com/wp-content/uploads/2023/01/APS-Fee-Structure-for-Boarder-23-24.pdf', 'https://apsindore.com/wp-content/themes/aps/images/logo.jpg', '2024-09-18 06:36:04'),
(4, 'Boarder CEP (Competitive Exam JEE/NEET & Olympiad Preparation) Fee Structure', 'PDF', 'https://apsindore.com/wp-content/uploads/2023/01/Combine%20Boarder%20and%20IIT-JEE%20Fees%20Structure.pdf', 'https://apsindore.com/wp-content/themes/aps/images/logo.jpg', '2024-09-18 06:36:27'),
(5, 'Campus Video', 'VIDEO', 'https://apsindore.com/wp-content/uploads/2022/12/aps-indore.mp4', 'http://206.189.130.102:3550/Uploads/image/1729682835581-1729682835581.png', '2024-09-18 06:38:11'),
(6, 'Transport', 'IMAGE', 'https://apsindore.com/wp-content/uploads/2022/12/transport-1.jpg', 'http://206.189.130.102:3550/Uploads/image/1729682868117-1729682868117.png', '2024-09-18 06:39:06'),
(7, 'M.I. Room', 'IMAGE', 'https://apsindore.com/wp-content/uploads/2022/12/mi-room.jpg', 'http://206.189.130.102:3550/Uploads/image/1729682875645-1729682875645.png', '2024-09-18 06:40:17'),
(8, 'Legendary Actor Paresh Rawal adds spark to APS Sports Event ', 'YOUTUBE', 'https://www.youtube.com/watch?v=5E-lxOJzn9s', 'http://206.189.130.102:3550/Uploads/image/1729682882493-1729682882493.png', '2024-09-18 06:41:10'),
(9, 'Sports day of Agarwal Public School, Indore', 'YOUTUBE', 'https://www.youtube.com/watch?v=spEz6Ga8zQQ', 'http://206.189.130.102:3550/Uploads/image/1729682893805-1729682893805.png', '2024-09-18 06:41:37'),
(37, 'TWIKL', 'PDF', 'http://206.189.130.102:3550/Uploads/pdf/1729776527370-1729776527370.pdf', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `pageid` int(11) NOT NULL,
  `numberassign` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pagecode` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`pageid`, `numberassign`, `title`, `pagecode`, `detail`) VALUES
(6, 2, 'TERMSANDCONDITION', 'TERMSANDCONDITION', '<p><br><strong>Terms and Condition</strong></p><p>Thank you for your interest in Agrawal Public School! We value your feedback, questions, and inquiries. Here\'s how you can reach us:</p><p><strong>Customer Support:</strong> For assistance with technical i'),
(7, 1, 'SUPPORT', 'SUPPORT', '<p><br><strong>Support Us</strong></p><p>Thank you for your interest in Agrawal Public School! We value your feedback, questions, and inquiries. Here\'s how you can reach us:</p><p><strong>Customer Support:</strong> For assistance with technical issues, ac');

-- --------------------------------------------------------

--
-- Table structure for table `parents`
--

CREATE TABLE `parents` (
  `parents_id` int(10) UNSIGNED NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `scholar_dob` varchar(255) DEFAULT NULL,
  `scholar_email` varchar(255) DEFAULT NULL,
  `scholar_type` varchar(255) NOT NULL,
  `scholar_no` varchar(255) NOT NULL,
  `sch_short_nm` varchar(255) NOT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `otp_datetime` datetime DEFAULT NULL,
  `is_verified` tinyint(4) DEFAULT NULL,
  `verified_datetime` datetime DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `fail_attempt` tinyint(4) DEFAULT NULL,
  `fail_datetime` datetime DEFAULT NULL,
  `app_token` varchar(20) DEFAULT NULL,
  `is_app` tinyint(4) DEFAULT NULL,
  `fcm_token` varchar(250) DEFAULT NULL,
  `mobile_uuid` varchar(50) DEFAULT NULL,
  `mobile_info` varchar(4000) DEFAULT NULL,
  `mobile_platform` varchar(50) DEFAULT NULL,
  `last_visit_on` datetime DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `active_datetime` datetime DEFAULT NULL,
  `active_by` int(11) DEFAULT NULL,
  `user_agent` varchar(1000) DEFAULT NULL,
  `app_name` varchar(50) DEFAULT NULL,
  `app_vercode` int(11) DEFAULT NULL,
  `manufacturer` varchar(250) DEFAULT NULL,
  `model` varchar(250) DEFAULT NULL,
  `version` varchar(250) DEFAULT NULL,
  `sch_ids` varchar(500) DEFAULT NULL,
  `registerby_mobile` tinyint(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `parents`
--

INSERT INTO `parents` (`parents_id`, `student_name`, `mobile_no`, `scholar_dob`, `scholar_email`, `scholar_type`, `scholar_no`, `sch_short_nm`, `otp`, `otp_datetime`, `is_verified`, `verified_datetime`, `ip_address`, `fail_attempt`, `fail_datetime`, `app_token`, `is_app`, `fcm_token`, `mobile_uuid`, `mobile_info`, `mobile_platform`, `last_visit_on`, `is_active`, `active_datetime`, `active_by`, `user_agent`, `app_name`, `app_vercode`, `manufacturer`, `model`, `version`, `sch_ids`, `registerby_mobile`) VALUES
(59, '', '9009436798', '02/12/2000', 'viraj@gmail.com', 'STUDENT', '90094', 'AO', '3263', '2024-10-24 12:12:37', 1, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '2024-10-24 12:12:37', 1, '2024-10-24 12:12:37', 1, NULL, 'EMESSANGER', NULL, NULL, NULL, NULL, NULL, 0),
(60, '', '9009436798', '02/12/2000', 'chandan@gmail.com', 'STUDENT', '36798', 'AO', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(61, '', '7415309294', '02/12/2000', 'twinkle@gmail.com', 'STUDENT', '74153', 'AO', '5175', '2024-10-24 12:22:06', 1, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '2024-10-24 12:22:06', 1, '2024-10-24 12:22:06', 1, NULL, 'EMESSANGER', NULL, NULL, NULL, NULL, NULL, 0),
(62, '', '7692898921', '02/12/2000', 'aman@gmail.com', 'STUDENT', '28989', 'CPS2', '7417', '2024-10-24 12:24:58', 1, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '2024-10-24 12:24:58', 1, '2024-10-24 12:24:58', 1, NULL, 'EMESSANGER', NULL, NULL, NULL, NULL, NULL, 0),
(63, '', '7692898921', '02/12/2000', 'pragya@gmail.com', 'STUDENT', '76928', 'CPS', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(64, '', '8989495923', '02/12/2000', 'sachin@gmail.com', 'STUDENT', '894959', 'APS', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(65, '', '9300849246', '42720', 'nileshdevda@rediffmail.com', 'STUDENT', '11201522', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(66, '', '8301642281', '42720', 'nileshdevda@rediffmail.com', 'STUDENT', '11201522', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(67, '', '9926674765', '40675', 'parma.mahendra227@gmail.com', 'STUDENT', '11201523', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(68, '', '9174287650', '40675', 'parma.mahendra227@gmail.com', 'STUDENT', '11201523', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(69, '', '9993055000', '39666', 'prakashgajak@gmail.com', 'STUDENT', '11201524', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(70, '', '7703878541', '38973', NULL, 'STUDENT', '11201525', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(71, '', '9131273977', '42324', 'anuragvijayvargiya01@gmail.com', 'STUDENT', '11201526', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(72, '', '9977044343', '42324', 'anuragvijayvargiya01@gmail.com', 'STUDENT', '11201526', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(73, '', '9179883335', '40966', 'mann_d2010@yahoo.com', 'STUDENT', '11201527', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(74, '', '8349552489', '40966', 'mann_d2010@yahoo.com', 'STUDENT', '11201527', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(75, '', '9407215655', '40304', 'slparihar1975@gmail.com', 'STUDENT', '11201528', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(76, '', '9407241255', '40304', 'slparihar1975@gmail.com', 'STUDENT', '11201528', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(77, '', '7869199615', '40791', 'manishsahusahu100@gmail.com', 'STUDENT', '11201529', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(78, '', '7828138294', '40791', 'manishsahusahu100@gmail.com', 'STUDENT', '11201529', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(79, '', '8602701501', '40614', 'nitinsaini0803@gmail.com', 'STUDENT', '11201531', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(80, '', '9343600601', '40614', 'nitinsaini0803@gmail.com', 'STUDENT', '11201531', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(81, '', '9977704014', '43075', 'diptigrosiya@gmail.com', 'STUDENT', '11201532', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(82, '', '9098871134', '43075', 'diptigrosiya@gmail.com', 'STUDENT', '11201532', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(83, '', '9826050345', '39357', 'dilip.bamniya77@gmail.com', 'STUDENT', '11201534', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(84, '', '9826010345', '39357', 'dilip.bamniya77@gmail.com', 'STUDENT', '11201534', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(85, '', '9252190005', '42261', 'patnisandeep21@gmail.com', 'STUDENT', '11201535', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(86, '', '9252090005', '42261', 'patnisandeep21@gmail.com', 'STUDENT', '11201535', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(87, '', '9300073007', '39128', 'mehtamarketing123@gmail.com', 'STUDENT', '11201536', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(88, '', '9300757828', '39128', 'mehtamarketing123@gmail.com', 'STUDENT', '11201536', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(89, '', '9406903832', '39519', 'thakurcsbpl@gmail.com', 'STUDENT', '11201537', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(90, '', '9406376813', '39519', 'thakurcsbpl@gmail.com', 'STUDENT', '11201537', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(91, '', '9926571367', '42396', 'dev.panwar@gmail.com', 'STUDENT', '11201538', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(92, '', '9926561567', '42396', 'dev.panwar@gmail.com', 'STUDENT', '11201538', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(93, '', '9717222603', '42627', 'govajitendra@gmail.com', 'STUDENT', '11201539', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(94, '', '9871599214', '42627', 'govajitendra@gmail.com', 'STUDENT', '11201539', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(95, '', '8120392020', '42816', 'vaibhav.sbig@gmail.com', 'STUDENT', '11201540', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(96, '', '9140469697', '42816', 'vaibhav.sbig@gmail.com', 'STUDENT', '11201540', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(97, '', '9685360991', '42607', 'gagansharma230@gmail.com', 'STUDENT', '11201542', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(98, '', '8602705733', '40460', 'viveksinghpatel13576@gmail.com', 'STUDENT', '11201543', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(99, '', '7000661229', '40460', 'viveksinghpatel13576@gmail.com', 'STUDENT', '11201543', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(100, '', '9826023239', '42867', NULL, 'STUDENT', '11201544', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(101, '', '8120190009', '42867', NULL, 'STUDENT', '11201544', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(102, '', '9146018574', '41143', 'bharu640@gmail.com', 'STUDENT', '11201545', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(103, '', '9977920999', '42522', NULL, 'STUDENT', '11201547', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(104, '', '9039962710', '43404', 'saurabh.singh.21@gmail.com', 'STUDENT', '11201548', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(105, '', '8770733833', '43404', 'saurabh.singh.21@gmail.com', 'STUDENT', '11201548', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(106, '', '8770922842', '43819', 'nagawat.mehul@gmail.com', 'STUDENT', '11201549', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(107, '', '8319642956', '43819', 'nagawat.mehul@gmail.com', 'STUDENT', '11201549', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(108, '', '8770922842', '43819', 'nagawat.mehul@gmail.com', 'STUDENT', '11201550', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(109, '', '8319642956', '43819', 'nagawat.mehul@gmail.com', 'STUDENT', '11201550', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(110, '', '9705810418', '39947', 'rpdineshraj3@gmail.com', 'STUDENT', '11201551', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(111, '', '9131669496', '42266', 'sbcpondy@yahoo.co.in', 'STUDENT', '11201552', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(112, '', '9109107412', '42266', 'sbcpondy@yahoo.co.in', 'STUDENT', '11201552', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(113, '', '9752393807', '38699', 'kailashvip@gmail.com', 'STUDENT', '11201553', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(114, '', '9424787381', '42697', 'subodhscorlit@rediff.com', 'STUDENT', '11201554', 'APSNR', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(115, 'shyam', '2547896542', '02/12/2000', 'shyam@gmail.com', 'STUDENT', '900544', 'AO', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(116, 'ramesh', '7692898725', NULL, NULL, 'STUDENT', '22010105', 'AO', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(117, 'suresh', '7692898825', NULL, NULL, 'STUDENT', '21010002', 'AO', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `replied_msg`
--

CREATE TABLE `replied_msg` (
  `replied_msg_id` int(10) UNSIGNED NOT NULL,
  `sended_msg_id` int(10) NOT NULL,
  `msg_id` int(10) NOT NULL,
  `mobile_no` varchar(20) NOT NULL,
  `reply_date_time` datetime NOT NULL,
  `student_main_id` int(10) DEFAULT NULL,
  `student_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `replied_msg`
--

INSERT INTO `replied_msg` (`replied_msg_id`, `sended_msg_id`, `msg_id`, `mobile_no`, `reply_date_time`, `student_main_id`, `student_number`) VALUES
(120, 1, 328, '9009436798', '2024-10-24 06:55:44', 1, 90094),
(121, 26, 334, '7415309294', '2024-10-24 07:49:46', 3, 74153);

-- --------------------------------------------------------

--
-- Table structure for table `replied_msg_body`
--

CREATE TABLE `replied_msg_body` (
  `replied_msg_d_id` int(10) UNSIGNED NOT NULL,
  `replied_msg_id` int(10) UNSIGNED NOT NULL,
  `msg_body_id` int(10) UNSIGNED NOT NULL,
  `msg_type` varchar(255) NOT NULL,
  `data_reply_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `replied_msg_body`
--

INSERT INTO `replied_msg_body` (`replied_msg_d_id`, `replied_msg_id`, `msg_body_id`, `msg_type`, `data_reply_text`) VALUES
(603, 120, 1058, 'OPTION-INPUT', '{\"selected\":{\"0\":\"Commerce\"}}'),
(604, 120, 1059, 'TEXTBOX-INPUT', '{\"text\":\"Mr. Manglesh Rohatg\"}'),
(605, 120, 1060, 'CHECKBOX-INPUT', '{\"selected\":{\"0\":true,\"1\":true,\"2\":true}}'),
(606, 120, 1063, 'FILE-INPUT', '{\"imageURIsave\":\"http://app.actindore.com/uploads/r_camera_6268fd5ca3bf4_8.jpg\"}'),
(607, 120, 1064, 'CAMERA-INPUT', '{\"imageURIsave\":\"https://app.actindore.com/uploads/r_camera_670781ca9d462_9978.jpg\"}'),
(608, 120, 1065, 'TEXTAREA-INPUT', '{\"text\":\"Agarwal Public School, Campus\"}'),
(609, 121, 1070, 'OPTION-INPUT', '{\"selected\":{{3: Science(PCB)}}}'),
(610, 121, 1071, 'TEXTBOX-INPUT', '{\"text\":\"\"}'),
(611, 121, 1072, 'CHECKBOX-INPUT', '{\"selected\":{\"0\":true,\"1\":true,\"2\":true,\"3\":false,\"4\":false}}'),
(612, 121, 1075, 'FILE-INPUT', '{\"imageURIsave\":\"http://206.189.130.102:3550/Uploads/pdf/1729756145680-1729756145680.pdf\"}'),
(613, 121, 1076, 'CAMERA-INPUT', '{\"imageURIsave\":\"http://206.189.130.102:3550/Uploads/image/1729756150332-1729756150332.png\"}'),
(614, 121, 1077, 'TEXTAREA-INPUT', '{\"text\":\"hello student \n\"}');

-- --------------------------------------------------------

--
-- Table structure for table `scholar_data`
--

CREATE TABLE `scholar_data` (
  `scholar_data_id` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(10) NOT NULL,
  `sch_short_nm` varchar(10) NOT NULL,
  `scholar_no` varchar(10) NOT NULL,
  `scholar_type` varchar(30) NOT NULL,
  `scholar_otp` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sch_mst`
--

CREATE TABLE `sch_mst` (
  `sch_id` int(10) UNSIGNED NOT NULL,
  `sch_nm` varchar(250) DEFAULT NULL,
  `sch_short_nm` varchar(10) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `entry_date` datetime DEFAULT NULL,
  `entry_by` int(11) DEFAULT NULL,
  `edit_date` datetime DEFAULT NULL,
  `edit_by` int(11) DEFAULT NULL,
  `scroll_news_text` varchar(250) DEFAULT NULL,
  `def_msg_ids` varchar(500) NOT NULL DEFAULT '',
  `text_color` varchar(10) DEFAULT NULL,
  `bg_color` varchar(10) DEFAULT NULL,
  `address` varchar(500) NOT NULL,
  `contact_no` varchar(200) NOT NULL,
  `website` varchar(150) NOT NULL,
  `email_id` varchar(150) NOT NULL,
  `logo_img` varchar(500) NOT NULL,
  `session` varchar(10) NOT NULL DEFAULT '''''',
  `season` varchar(10) NOT NULL DEFAULT '''''',
  `mail_email_id` varchar(200) NOT NULL DEFAULT '''''',
  `is_deleted` int(5) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sch_mst`
--

INSERT INTO `sch_mst` (`sch_id`, `sch_nm`, `sch_short_nm`, `is_active`, `entry_date`, `entry_by`, `edit_date`, `edit_by`, `scroll_news_text`, `def_msg_ids`, `text_color`, `bg_color`, `address`, `contact_no`, `website`, `email_id`, `logo_img`, `session`, `season`, `mail_email_id`, `is_deleted`) VALUES
(1, 'AGARWAL PUBLIC SCHOOL, INDORE', 'APS', 1, '2019-02-27 15:49:12', 1, '2024-10-18 06:59:42', 1, 'test', '38, 39, 40', '#d70909', '#234fea', 'Bicholi Mardana Road', '-2', 'www.apsindore.com', 'office@apsindore.com', 'https://app.actindore.com/uploads/image_5dc40c2515db9_1.png', '\'\'', '\'\'', '\'\'', 0),
(2, 'CHAMELI DEVI PUBLIC SCHOOL, INDORE', 'CPS', 1, '2019-02-27 15:49:26', 1, '2024-04-15 19:08:43', 1, '\r\n', '', '#ffffff', '#7b7d25', 'Tejpur Gadbadi, Kesar Bagh Road\r\nIndore 452012 (M.P.)', '0731-4212999     Manager : 9301999208', 'www.cpsindore.com', 'office@cpsindore.com', 'https://app.actindore.com/uploads/image_5cb8723ed8bc9_1.png', '\'\'', '\'\'', '\'\'', 0),
(3, 'CHAMELI DEVI PUBLIC SCHOOL-2, INDORE', 'CPS2', 1, '2019-02-27 15:48:58', 1, '2024-04-15 19:08:19', 1, '', '', '#ffffff', '#222222', '3rd Floor, Yeshwant Plaza, Regal Square, Indore (M.P.)', '0731-4212900   Manger : 9301999218', 'www.cps2indore.com', 'office@cps2indore.com', 'https://app.actindore.com/uploads/image_5cb8723ed8bc9_1.png', '\'\'', '\'\'', '\'\'', 0),
(4, 'AGARWAL PUBLIC SCHOOL, NAVA RAIPUR', 'APSNR', 1, '2019-02-27 15:48:35', 1, '2023-12-02 17:48:01', 1, '', '', '#ffffff', '#0e9636', 'Plot B-4, Sector 28, Atal Nagar (Naya Raipur)-492015 (C.G.)', '0771-2430111    Manager : 9425509402', 'apsraipur.in', 'officenr@apsraipur.in', 'https://app.actindore.com/uploads/image_5ca71975521c2_1.png', '\'\'', '\'\'', '\'\'', 0),
(5, 'AGARWAL PUBLIC SCHOOL, RAIPUR', 'APSSN', 1, '2019-02-27 15:48:17', 1, '2023-12-02 18:25:29', 1, '', '', '#ffffff', '#e10b0b', 'Shankar Nagar, VIP Estate Near BSNL, Khamardih Exchange, Raipur-492014 (C.G.)', '0771-2430303      Manager : 9425509402', 'apsraipur.in', 'officesn@apsraipur.in', 'https://app.actindore.com/uploads/image_5ca71a7440ee5_1.png', '\'\'', '\'\'', '\'\'', 0),
(6, 'CHAMELI DEVI PUBLIC SCHOOL, MHOWGAON', 'CPSMG', 1, '2023-06-01 13:24:11', 1, '2024-04-15 19:08:07', 1, '', '', '#ffffff', '#ce5454', 'Plot No.C-7,  Shree City, Mahowgaon, Mhow-Pithampur Main Road, Mhowgaon', '8303544808,  Manager : 8303544808', 'www.cpsmhowgaon.com', 'info@cpsmhowgaon.com', 'https://app.actindore.com/uploads/image_64784ea0b3e09_1.png', '', '', '', 0),
(11, 'Schools of Agarwal Group', 'SOAG', 1, '2020-04-18 21:32:17', 1, '2024-04-15 19:09:03', 1, '', '', '#ffffff', '#f5cf0d', '', '0731-4212888  Manager : 9302100937', '', 'ho@apsindore.com', '', '\'\'', '\'\'', '\'\'', 0),
(14, 'APS-CEP-9TH', 'AC9', 1, '2024-04-29 18:05:38', 1, '2024-04-29 18:05:38', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5dc40c2515db9_1.png', '', '', '', 0),
(15, 'APS-CEP-10TH', 'AC10', 1, '2024-04-29 18:06:53', 1, '2024-04-29 18:06:53', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5dc40c2515db9_1.png', '', '', '', 0),
(16, 'APS-CEP-11TH-MATHS', 'AC11M', 1, '2024-04-29 18:07:34', 1, '2024-10-17 13:09:34', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5dc40c2515db9_1.png', '', '', '', 1),
(17, 'APS-CEP-11TH-BIO', 'AC11B', 1, '2024-04-29 18:08:17', 1, '2024-04-29 18:08:17', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5dc40c2515db9_1.png', '', '', '', 0),
(18, 'APS-CEP-12TH-MATHS', 'AC12M', 1, '2024-04-29 18:09:01', 1, '2024-04-29 18:09:01', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5dc40c2515db9_1.png', '', '', '', 0),
(19, 'APS-CEP-12TH-BIO', 'AC12B', 1, '2024-04-29 18:09:39', 1, '2024-04-29 18:09:39', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5dc40c2515db9_1.png', '', '', '', 0),
(20, 'CPS-CEP-9TH', 'CC9', 1, '2024-04-29 18:14:39', 1, '2024-04-29 18:15:20', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5cb8723ed8bc9_1.png', '', '', '', 0),
(21, 'CPS-CEP-10TH', 'CC10', 1, '2024-04-29 18:15:52', 1, '2024-04-29 18:15:52', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5cb8723ed8bc9_1.png', '', '', '', 0),
(22, 'CPS-CEP-11TH-MATHS', 'CC11M', 1, '2024-04-29 18:16:18', 1, '2024-04-29 18:16:18', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5cb8723ed8bc9_1.png', '', '', '', 0),
(23, 'CPS-CEP-11TH-BIO', 'CC11B', 1, '2024-04-29 18:17:10', 1, '2024-04-29 18:17:10', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5cb8723ed8bc9_1.png', '', '', '', 0),
(24, 'CPS-CEP-12TH-MATHS', 'CC12M', 1, '2024-04-29 18:17:45', 1, '2024-04-29 18:17:45', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5cb8723ed8bc9_1.png', '', '', '', 0),
(25, 'CPS-CEP-12TH-BIO', 'CC12B', 1, '2024-04-29 18:18:23', 1, '2024-04-29 18:18:23', 1, '', '', '#ffffff', '#ce5454', '', '', '', '', 'https://app.actindore.com/uploads/image_5cb8723ed8bc9_1.png', '', '', '', 0),
(34, 'TEST', 'TST', 1, '2024-10-24 10:38:09', NULL, NULL, NULL, '', '', '#d98e26', '#5af019', 'test nagar, indore', '1478523690', 'www.test.com', 'test@gmail.com', 'http://206.189.130.102:3550/Uploads/image/1729766284505-1729766284505.png', '\'\'', '\'\'', '\'\'', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sended_msg`
--

CREATE TABLE `sended_msg` (
  `sended_msg_id` int(10) UNSIGNED NOT NULL,
  `msg_id` int(10) UNSIGNED DEFAULT NULL,
  `mobile_no` varchar(10) DEFAULT NULL,
  `sch_short_nm` varchar(10) DEFAULT NULL,
  `scholar_no` varchar(10) DEFAULT NULL,
  `sended_date` datetime DEFAULT NULL,
  `sended_by` int(10) UNSIGNED DEFAULT NULL,
  `is_seen` tinyint(3) UNSIGNED DEFAULT NULL,
  `seen_on` datetime DEFAULT NULL,
  `is_starred` tinyint(3) UNSIGNED DEFAULT NULL,
  `starred_on` datetime DEFAULT NULL,
  `is_reply_done` tinyint(3) UNSIGNED DEFAULT NULL,
  `reply_on` datetime DEFAULT NULL,
  `is_fcm_sended` tinyint(3) UNSIGNED DEFAULT 0,
  `admission_id` int(11) DEFAULT 0,
  `class_subject_videos_id` int(11) DEFAULT 0,
  `class_id` int(11) DEFAULT 0,
  `subject_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sended_msg`
--

INSERT INTO `sended_msg` (`sended_msg_id`, `msg_id`, `mobile_no`, `sch_short_nm`, `scholar_no`, `sended_date`, `sended_by`, `is_seen`, `seen_on`, `is_starred`, `starred_on`, `is_reply_done`, `reply_on`, `is_fcm_sended`, `admission_id`, `class_subject_videos_id`, `class_id`, `subject_id`) VALUES
(1, 328, '9009436798', 'AO', '90094', '2024-10-24 06:46:35', 115, NULL, NULL, NULL, NULL, 1, '2024-10-24 06:55:44', 0, 0, 0, 0, 0),
(2, 328, '9009436798', 'AO', '36798', '2024-10-24 06:46:35', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(3, 328, '7415309294', 'AO', '74153', '2024-10-24 06:46:35', 115, 1, '2024-10-24 09:02:41', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(4, 328, '7692898921', 'CPS2', '28989', '2024-10-24 06:46:35', 115, 1, '2024-10-24 13:25:48', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(5, 328, '7692898921', 'CPS', '76928', '2024-10-24 06:46:35', 115, 1, '2024-10-24 06:55:23', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(6, 328, '8989495923', 'APS', '894959', '2024-10-24 06:46:35', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(7, 329, '9009436798', 'AO', '90094', '2024-10-24 06:46:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(8, 329, '9009436798', 'AO', '36798', '2024-10-24 06:46:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(9, 329, '7415309294', 'AO', '74153', '2024-10-24 06:46:42', 115, 1, '2024-10-24 07:45:17', 1, '2024-10-24 06:49:23', NULL, NULL, 0, 0, 0, 0, 0),
(10, 329, '7692898921', 'CPS2', '28989', '2024-10-24 06:46:42', 115, 1, '2024-10-24 10:52:26', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(11, 329, '7692898921', 'CPS', '76928', '2024-10-24 06:46:42', 115, 1, '2024-10-24 12:41:27', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(12, 329, '8989495923', 'APS', '894959', '2024-10-24 06:46:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(13, 329, '7415309294', 'AO', '74153', '2024-10-24 07:12:58', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(14, 329, '7415309294', 'AO', '74153', '2024-10-24 07:28:58', 115, 1, '2024-10-24 09:59:10', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(15, 330, '7415309294', 'AO', '74153', '2024-10-24 07:31:45', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(16, 330, '7415309294', 'AO', '74153', '2024-10-24 07:32:54', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(17, 330, '7415309294', 'AO', '74153', '2024-10-24 07:33:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(18, 335, '9009436798', 'AO', '90094', '2024-10-24 07:44:15', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(19, 335, '9009436798', 'AO', '36798', '2024-10-24 07:44:15', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(20, 335, '7415309294', 'AO', '74153', '2024-10-24 07:44:15', 115, 1, '2024-10-24 08:58:13', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(21, 335, '7692898921', 'CPS2', '28989', '2024-10-24 07:44:15', 115, 1, '2024-10-24 09:20:41', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(22, 335, '7692898921', 'CPS', '76928', '2024-10-24 07:44:15', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(23, 335, '8989495923', 'APS', '894959', '2024-10-24 07:44:15', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(24, 334, '9009436798', 'AO', '90094', '2024-10-24 07:44:35', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(25, 334, '9009436798', 'AO', '36798', '2024-10-24 07:44:35', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(26, 334, '7415309294', 'AO', '74153', '2024-10-24 07:44:35', 115, 1, '2024-10-24 09:02:29', NULL, NULL, 1, '2024-10-24 07:49:46', 0, 0, 0, 0, 0),
(27, 334, '7692898921', 'CPS2', '28989', '2024-10-24 07:44:35', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(28, 334, '7692898921', 'CPS', '76928', '2024-10-24 07:44:35', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(29, 334, '8989495923', 'APS', '894959', '2024-10-24 07:44:35', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(30, 333, '7415309294', 'AO', '74153', '2024-10-24 07:45:09', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(31, 337, '9009436798', 'AO', '90094', '2024-10-24 09:20:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(32, 337, '9009436798', 'AO', '36798', '2024-10-24 09:20:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(33, 337, '7415309294', 'AO', '74153', '2024-10-24 09:20:42', 115, 1, '2024-10-24 09:59:13', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(34, 337, '7692898921', 'CPS2', '28989', '2024-10-24 09:20:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(35, 337, '7692898921', 'CPS', '76928', '2024-10-24 09:20:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(36, 337, '8989495923', 'APS', '894959', '2024-10-24 09:20:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(37, 338, '9009436798', 'AO', '90094', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(38, 338, '9009436798', 'AO', '36798', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(39, 338, '7415309294', 'AO', '74153', '2024-10-24 10:03:41', 115, 1, '2024-10-24 10:53:23', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(40, 338, '7692898921', 'CPS2', '28989', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(41, 338, '7692898921', 'CPS', '76928', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(42, 338, '8989495923', 'APS', '894959', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(43, 338, '9300849246', 'APSNR', '11201522', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(44, 338, '8301642281', 'APSNR', '11201522', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(45, 338, '9926674765', 'APSNR', '11201523', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(46, 338, '9174287650', 'APSNR', '11201523', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(47, 338, '9993055000', 'APSNR', '11201524', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(48, 338, '7703878541', 'APSNR', '11201525', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(49, 338, '9131273977', 'APSNR', '11201526', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(50, 338, '9977044343', 'APSNR', '11201526', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(51, 338, '9179883335', 'APSNR', '11201527', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(52, 338, '8349552489', 'APSNR', '11201527', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(53, 338, '9407215655', 'APSNR', '11201528', '2024-10-24 10:03:41', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(54, 338, '9407241255', 'APSNR', '11201528', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(55, 338, '7869199615', 'APSNR', '11201529', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(56, 338, '7828138294', 'APSNR', '11201529', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(57, 338, '8602701501', 'APSNR', '11201531', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(58, 338, '9343600601', 'APSNR', '11201531', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(59, 338, '9977704014', 'APSNR', '11201532', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(60, 338, '9098871134', 'APSNR', '11201532', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(61, 338, '9826050345', 'APSNR', '11201534', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(62, 338, '9826010345', 'APSNR', '11201534', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(63, 338, '9252190005', 'APSNR', '11201535', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(64, 338, '9252090005', 'APSNR', '11201535', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(65, 338, '9300073007', 'APSNR', '11201536', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(66, 338, '9300757828', 'APSNR', '11201536', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(67, 338, '9406903832', 'APSNR', '11201537', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(68, 338, '9406376813', 'APSNR', '11201537', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(69, 338, '9926571367', 'APSNR', '11201538', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(70, 338, '9926561567', 'APSNR', '11201538', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(71, 338, '9717222603', 'APSNR', '11201539', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(72, 338, '9871599214', 'APSNR', '11201539', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(73, 338, '8120392020', 'APSNR', '11201540', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(74, 338, '9140469697', 'APSNR', '11201540', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(75, 338, '9685360991', 'APSNR', '11201542', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(76, 338, '8602705733', 'APSNR', '11201543', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(77, 338, '7000661229', 'APSNR', '11201543', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(78, 338, '9826023239', 'APSNR', '11201544', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(79, 338, '8120190009', 'APSNR', '11201544', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(80, 338, '9146018574', 'APSNR', '11201545', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(81, 338, '9977920999', 'APSNR', '11201547', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(82, 338, '9039962710', 'APSNR', '11201548', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(83, 338, '8770733833', 'APSNR', '11201548', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(84, 338, '8770922842', 'APSNR', '11201549', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(85, 338, '8319642956', 'APSNR', '11201549', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(86, 338, '8770922842', 'APSNR', '11201550', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(87, 338, '8319642956', 'APSNR', '11201550', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(88, 338, '9705810418', 'APSNR', '11201551', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(89, 338, '9131669496', 'APSNR', '11201552', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(90, 338, '9109107412', 'APSNR', '11201552', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(91, 338, '9752393807', 'APSNR', '11201553', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(92, 338, '9424787381', 'APSNR', '11201554', '2024-10-24 10:03:42', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(93, 339, '9009436798', 'AO', '90094', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(94, 339, '9009436798', 'AO', '36798', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(95, 339, '7415309294', 'AO', '74153', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(96, 339, '7692898921', 'CPS2', '28989', '2024-10-24 12:11:05', 115, 1, '2024-10-24 13:37:48', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(97, 339, '7692898921', 'CPS', '76928', '2024-10-24 12:11:05', 115, 1, '2024-10-24 13:37:35', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(98, 339, '8989495923', 'APS', '894959', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(99, 339, '9300849246', 'APSNR', '11201522', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(100, 339, '8301642281', 'APSNR', '11201522', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(101, 339, '9926674765', 'APSNR', '11201523', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(102, 339, '9174287650', 'APSNR', '11201523', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(103, 339, '9993055000', 'APSNR', '11201524', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(104, 339, '7703878541', 'APSNR', '11201525', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(105, 339, '9131273977', 'APSNR', '11201526', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(106, 339, '9977044343', 'APSNR', '11201526', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(107, 339, '9179883335', 'APSNR', '11201527', '2024-10-24 12:11:05', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(108, 339, '8349552489', 'APSNR', '11201527', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(109, 339, '9407215655', 'APSNR', '11201528', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(110, 339, '9407241255', 'APSNR', '11201528', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(111, 339, '7869199615', 'APSNR', '11201529', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(112, 339, '7828138294', 'APSNR', '11201529', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(113, 339, '8602701501', 'APSNR', '11201531', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(114, 339, '9343600601', 'APSNR', '11201531', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(115, 339, '9977704014', 'APSNR', '11201532', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(116, 339, '9098871134', 'APSNR', '11201532', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(117, 339, '9826050345', 'APSNR', '11201534', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(118, 339, '9826010345', 'APSNR', '11201534', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(119, 339, '9252190005', 'APSNR', '11201535', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(120, 339, '9252090005', 'APSNR', '11201535', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(121, 339, '9300073007', 'APSNR', '11201536', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(122, 339, '9300757828', 'APSNR', '11201536', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(123, 339, '9406903832', 'APSNR', '11201537', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(124, 339, '9406376813', 'APSNR', '11201537', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(125, 339, '9926571367', 'APSNR', '11201538', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(126, 339, '9926561567', 'APSNR', '11201538', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(127, 339, '9717222603', 'APSNR', '11201539', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(128, 339, '9871599214', 'APSNR', '11201539', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(129, 339, '8120392020', 'APSNR', '11201540', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(130, 339, '9140469697', 'APSNR', '11201540', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(131, 339, '9685360991', 'APSNR', '11201542', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(132, 339, '8602705733', 'APSNR', '11201543', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(133, 339, '7000661229', 'APSNR', '11201543', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(134, 339, '9826023239', 'APSNR', '11201544', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(135, 339, '8120190009', 'APSNR', '11201544', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(136, 339, '9146018574', 'APSNR', '11201545', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(137, 339, '9977920999', 'APSNR', '11201547', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(138, 339, '9039962710', 'APSNR', '11201548', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(139, 339, '8770733833', 'APSNR', '11201548', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(140, 339, '8770922842', 'APSNR', '11201549', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(141, 339, '8319642956', 'APSNR', '11201549', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(142, 339, '8770922842', 'APSNR', '11201550', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(143, 339, '8319642956', 'APSNR', '11201550', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(144, 339, '9705810418', 'APSNR', '11201551', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(145, 339, '9131669496', 'APSNR', '11201552', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(146, 339, '9109107412', 'APSNR', '11201552', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(147, 339, '9752393807', 'APSNR', '11201553', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(148, 339, '9424787381', 'APSNR', '11201554', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0),
(149, 339, '2547896542', 'AO', '900544', '2024-10-24 12:11:06', 115, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `student_main_detail`
--

CREATE TABLE `student_main_detail` (
  `student_main_id` int(11) NOT NULL,
  `student_number` int(11) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `scholar_type` varchar(255) NOT NULL,
  `student_dob` varchar(255) DEFAULT NULL,
  `student_email` varchar(255) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `tab_active_by_mobile` varchar(255) DEFAULT NULL,
  `tab_active_status` tinyint(11) NOT NULL DEFAULT 0,
  `student_family_mobile_number` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_main_detail`
--

INSERT INTO `student_main_detail` (`student_main_id`, `student_number`, `student_name`, `scholar_type`, `student_dob`, `student_email`, `color`, `tab_active_by_mobile`, `tab_active_status`, `student_family_mobile_number`, `createdAt`) VALUES
(1, 90094, 'viraj', 'STUDENT', '02/12/2000', 'viraj@gmail.com', '#1EBA17', NULL, 0, '9009436798', '2024-10-24 06:36:39'),
(2, 36798, 'Chandan', 'STUDENT', '02/12/2000', 'chandan@gmail.com', '#44AAB4', NULL, 0, '9009436798', '2024-10-24 06:36:39'),
(3, 74153, 'Twinkle', 'STUDENT', '02/12/2000', 'twinkle@gmail.com', '#87BBFF', NULL, 0, '7415309294', '2024-10-24 06:36:39'),
(4, 28989, 'Aman', 'STUDENT', '02/12/2000', 'aman@gmail.com', '#07C1CF', NULL, 0, '7692898921', '2024-10-24 06:36:39'),
(5, 76928, 'Pragya', 'STUDENT', '02/12/2000', 'pragya@gmail.com', '#66E296', NULL, 0, '7692898921', '2024-10-24 06:36:39'),
(6, 894959, 'Sachin', 'STUDENT', '02/12/2000', 'sachin@gmail.com', '#295CD2', NULL, 0, '8989495923', '2024-10-24 06:36:39'),
(7, 11201522, 'HRIDYA DEVDA', 'STUDENT', '42720', 'nileshdevda@rediffmail.com', '#38B5D9', NULL, 0, '9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,8301642281,9300849246,83', '2024-10-24 09:39:59'),
(8, 11201523, 'MANVIKA PARMAR', 'STUDENT', '40675', 'parma.mahendra227@gmail.com', '#35D8C6', NULL, 0, '9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,9174287650,9926674765,91', '2024-10-24 09:39:59'),
(9, 11201524, 'ROSHNI YADAV', 'STUDENT', '39666', 'prakashgajak@gmail.com', '#861370', NULL, 0, '9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,9993055000,99', '2024-10-24 09:39:59'),
(10, 11201525, 'JIYA GANDHI', 'STUDENT', '38973', '', '#506673', NULL, 0, '7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,7703878541,77', '2024-10-24 09:39:59'),
(11, 11201526, 'SOUMYA VIJAYWARGIYA', 'STUDENT', '42324', 'anuragvijayvargiya01@gmail.com', '#8C2AE4', NULL, 0, '9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,9977044343,9131273977,99', '2024-10-24 09:39:59'),
(12, 11201527, 'LAKSHIKA CHAUHAN', 'STUDENT', '40966', 'mann_d2010@yahoo.com', '#70F0A8', NULL, 0, '9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,8349552489,9179883335,83', '2024-10-24 09:39:59'),
(13, 11201528, 'JANHVI PARIHAR', 'STUDENT', '40304', 'slparihar1975@gmail.com', '#A3760D', NULL, 0, '9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,9407241255,9407215655,94', '2024-10-24 09:39:59'),
(14, 11201529, 'ANSHIKA SAHU', 'STUDENT', '40791', 'manishsahusahu100@gmail.com', '#782314', NULL, 0, '7869199615,7828138294,7869199615,7828138294,7869199615,7828138294,7869199615,7828138294,7869199615,7828138294,7869199615,7828138294,7869199615,7869199615,7828138294,7869199615,7828138294,7869199615,7828138294,7869199615,7828138294,7869199615,7828138294,78', '2024-10-24 09:39:59'),
(15, 11201531, 'VIMUDHA SAINI', 'STUDENT', '40614', 'nitinsaini0803@gmail.com', '#C73F05', NULL, 0, '8602701501,9343600601,8602701501,9343600601,8602701501,9343600601,8602701501,9343600601,8602701501,9343600601,8602701501,9343600601,8602701501,8602701501,9343600601,8602701501,9343600601,8602701501,9343600601,8602701501,9343600601,8602701501,9343600601,86', '2024-10-24 09:40:00'),
(16, 11201532, 'MANNAT GORSIYA', 'STUDENT', '43075', 'diptigrosiya@gmail.com', '#1658D9', NULL, 0, '9977704014,9098871134,9977704014,9098871134,9977704014,9098871134,9977704014,9098871134,9977704014,9098871134,9977704014,9098871134,9977704014,9977704014,9098871134,9977704014,9098871134,9977704014,9098871134,9977704014,9098871134,9977704014,9098871134,99', '2024-10-24 09:40:00'),
(17, 11201534, 'KASHISH BAMNIYA', 'STUDENT', '39357', 'dilip.bamniya77@gmail.com', '#C6FEC9', NULL, 0, '9826050345,9826010345,9826050345,9826010345,9826050345,9826010345,9826050345,9826010345,9826050345,9826010345,9826050345,9826010345,9826050345,9826050345,9826010345,9826050345,9826010345,9826050345,9826010345,9826050345,9826010345,9826050345,9826010345,98', '2024-10-24 09:40:00'),
(18, 11201535, 'PAHAL JAIN', 'STUDENT', '42261', 'patnisandeep21@gmail.com', '#AB136C', NULL, 0, '9252190005,9252090005,9252190005,9252090005,9252190005,9252090005,9252190005,9252090005,9252190005,9252090005,9252190005,9252090005,9252190005,9252190005,9252090005,9252190005,9252090005,9252190005,9252090005,9252190005,9252090005,9252190005,9252090005,92', '2024-10-24 09:40:00'),
(19, 11201536, 'JAHANVI MEHTA', 'STUDENT', '39128', 'mehtamarketing123@gmail.com', '#6D1E4F', NULL, 0, '9300073007,9300757828,9300073007,9300757828,9300073007,9300757828,9300073007,9300757828,9300073007,9300757828,9300073007,9300757828,9300073007,9300073007,9300757828,9300073007,9300757828,9300073007,9300757828,9300073007,9300757828,9300073007,9300757828,93', '2024-10-24 09:40:00'),
(20, 11201537, 'ISHA THAKUR', 'STUDENT', '39519', 'thakurcsbpl@gmail.com', '#BDF985', NULL, 0, '9406903832,9406376813,9406903832,9406376813,9406903832,9406376813,9406903832,9406376813,9406903832,9406376813,9406903832,9406376813,9406903832,9406903832,9406376813,9406903832,9406376813,9406903832,9406376813,9406903832,9406376813,9406903832,9406376813,94', '2024-10-24 09:40:00'),
(21, 11201538, 'TIYARA PANWAR', 'STUDENT', '42396', 'dev.panwar@gmail.com', '#215A56', NULL, 0, '9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,9926561567,9926571367,99', '2024-10-24 09:40:00'),
(22, 11201539, 'GRAHI PATIDAR', 'STUDENT', '42627', 'govajitendra@gmail.com', '#9124E4', NULL, 0, '9717222603,9871599214,9717222603,9871599214,9717222603,9871599214,9717222603,9871599214,9717222603,9871599214,9717222603,9871599214,9717222603,9717222603,9871599214,9717222603,9871599214,9717222603,9871599214,9717222603,9871599214,9717222603,9871599214,97', '2024-10-24 09:40:00'),
(23, 11201540, 'KAVYA GUPTA', 'STUDENT', '42816', 'vaibhav.sbig@gmail.com', '#FAD25E', NULL, 0, '8120392020,9140469697,8120392020,9140469697,8120392020,9140469697,8120392020,9140469697,8120392020,9140469697,8120392020,9140469697,8120392020,8120392020,9140469697,8120392020,8120392020,9140469697,8120392020,9140469697,8120392020,9140469697,8120392020,81', '2024-10-24 09:40:01'),
(24, 11201542, 'SIDDHI SHARMA', 'STUDENT', '42607', 'gagansharma230@gmail.com', '#9C03AB', NULL, 0, '9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,9685360991,96', '2024-10-24 09:40:01'),
(25, 11201543, 'AROHI PATEL', 'STUDENT', '40460', 'viveksinghpatel13576@gmail.com', '#D63691', NULL, 0, '8602705733,7000661229,8602705733,7000661229,8602705733,7000661229,8602705733,7000661229,8602705733,7000661229,8602705733,7000661229,8602705733,8602705733,7000661229,8602705733,8602705733,7000661229,8602705733,7000661229,8602705733,7000661229,8602705733,86', '2024-10-24 09:40:01'),
(26, 11201544, 'NAVYA JOSHI', 'STUDENT', '42867', '', '#60B219', NULL, 0, '9826023239,8120190009,9826023239,8120190009,9826023239,8120190009,9826023239,8120190009,9826023239,8120190009,9826023239,8120190009,9826023239,9826023239,8120190009,9826023239,9826023239,8120190009,9826023239,8120190009,9826023239,8120190009,9826023239,98', '2024-10-24 09:40:01'),
(27, 11201545, 'PARI VAISHNAV', 'STUDENT', '41143', 'bharu640@gmail.com', '#87CE81', NULL, 0, '9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,9146018574,91', '2024-10-24 09:40:01'),
(28, 11201547, 'GURVIND CHOUHAN', 'STUDENT', '42522', '', '#1C15E5', NULL, 0, '9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,9977920999,99', '2024-10-24 09:40:01'),
(29, 11201548, 'MAYRA SINGH', 'STUDENT', '43404', 'saurabh.singh.21@gmail.com', '#DAEF49', NULL, 0, '9039962710,8770733833,9039962710,8770733833,9039962710,8770733833,9039962710,8770733833,9039962710,8770733833,9039962710,8770733833,9039962710,8770733833,8770733833,9039962710,9039962710,8770733833,9039962710,8770733833,9039962710,8770733833,9039962710,90', '2024-10-24 09:40:01'),
(30, 11201549, 'PARSHVI NAGAWAT', 'STUDENT', '43819', 'nagawat.mehul@gmail.com', '#19D94B', NULL, 0, '8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,87', '2024-10-24 09:40:01'),
(31, 11201550, 'PARTHVI NAGAWAT', 'STUDENT', '43819', 'nagawat.mehul@gmail.com', '#B1F926', NULL, 0, '8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,8770922842,8319642956,87', '2024-10-24 09:40:02'),
(32, 11201551, 'PAYAL RAJPUROHIT', 'STUDENT', '39947', 'rpdineshraj3@gmail.com', '#8B9F2F', NULL, 0, '9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,9705810418,97', '2024-10-24 09:40:02'),
(33, 11201552, 'NISHITA SHARMA', 'STUDENT', '42266', 'sbcpondy@yahoo.co.in', '#A02251', NULL, 0, '9131669496,9109107412,9131669496,9109107412,9131669496,9109107412,9131669496,9109107412,9131669496,9109107412,9131669496,9109107412,9131669496,9131669496,9109107412,9131669496,9109107412,9131669496,9109107412,9131669496,9109107412,9131669496,9109107412,91', '2024-10-24 09:40:02'),
(34, 11201553, 'ISHITA MUKATI', 'STUDENT', '38699', 'kailashvip@gmail.com', '#3058F8', NULL, 0, '9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,9752393807,97', '2024-10-24 09:40:02'),
(35, 11201554, 'SHARLIN RAJWANSH', 'STUDENT', '42697', 'subodhscorlit@rediff.com', '#28AD58', NULL, 0, '9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,9424787381,94', '2024-10-24 09:40:02'),
(36, 900544, 'shyam', 'STUDENT', '02/12/2000', 'shyam@gmail.com', '#CC756B', NULL, 0, '2547896542', '2024-10-24 11:57:32'),
(37, 22010105, 'ramesh', 'STUDENT', NULL, '', '#E1A460', NULL, 0, '7692898725', '2024-10-24 13:05:25'),
(38, 21010002, 'suresh', 'STUDENT', NULL, '', '#A7D761', NULL, 0, '7692898825', '2024-10-24 13:05:25');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacherId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobileNo` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_mst`
--
ALTER TABLE `admin_mst`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `app_top_scroller_msg`
--
ALTER TABLE `app_top_scroller_msg`
  ADD PRIMARY KEY (`scroller_id`);

--
-- Indexes for table `app_top_welcome_msg`
--
ALTER TABLE `app_top_welcome_msg`
  ADD PRIMARY KEY (`welcome_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryid`);

--
-- Indexes for table `Chat_Message`
--
ALTER TABLE `Chat_Message`
  ADD PRIMARY KEY (`chat_msg_id`);

--
-- Indexes for table `fees_display`
--
ALTER TABLE `fees_display`
  ADD PRIMARY KEY (`fees_display_id`);

--
-- Indexes for table `msg_body`
--
ALTER TABLE `msg_body`
  ADD PRIMARY KEY (`msg_body_id`),
  ADD KEY `msg_body_id` (`msg_id`,`msg_body_id`,`ordersno`) USING BTREE,
  ADD KEY `ordersno` (`ordersno`);

--
-- Indexes for table `msg_group_mst`
--
ALTER TABLE `msg_group_mst`
  ADD PRIMARY KEY (`msg_group_id`);

--
-- Indexes for table `msg_mst`
--
ALTER TABLE `msg_mst`
  ADD PRIMARY KEY (`msg_id`),
  ADD KEY `msg_id` (`is_active`,`msg_id`,`entry_date`,`show_upto`) USING BTREE;

--
-- Indexes for table `msg_sgroup_mst`
--
ALTER TABLE `msg_sgroup_mst`
  ADD PRIMARY KEY (`msg_sgroup_id`);

--
-- Indexes for table `notice_board_detail`
--
ALTER TABLE `notice_board_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`pageid`);

--
-- Indexes for table `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`parents_id`),
  ADD KEY `is_verified` (`is_app`,`is_active`,`is_verified`,`mobile_uuid`,`app_name`,`app_token`) USING BTREE,
  ADD KEY `mobile_uuid` (`mobile_uuid`);

--
-- Indexes for table `replied_msg`
--
ALTER TABLE `replied_msg`
  ADD PRIMARY KEY (`replied_msg_id`);

--
-- Indexes for table `replied_msg_body`
--
ALTER TABLE `replied_msg_body`
  ADD PRIMARY KEY (`replied_msg_d_id`);

--
-- Indexes for table `scholar_data`
--
ALTER TABLE `scholar_data`
  ADD PRIMARY KEY (`scholar_data_id`);

--
-- Indexes for table `sch_mst`
--
ALTER TABLE `sch_mst`
  ADD PRIMARY KEY (`sch_id`),
  ADD KEY `sch_id` (`is_active`,`sch_short_nm`,`sch_id`) USING BTREE;

--
-- Indexes for table `sended_msg`
--
ALTER TABLE `sended_msg`
  ADD PRIMARY KEY (`sended_msg_id`),
  ADD KEY `sended_msg_id` (`msg_id`,`sch_short_nm`,`is_seen`,`is_starred`,`sended_date`,`sended_msg_id`) USING BTREE,
  ADD KEY `mobile_no` (`mobile_no`,`msg_id`,`sch_short_nm`,`scholar_no`) USING BTREE;

--
-- Indexes for table `student_main_detail`
--
ALTER TABLE `student_main_detail`
  ADD PRIMARY KEY (`student_main_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacherId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_mst`
--
ALTER TABLE `admin_mst`
  MODIFY `admin_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `app_top_scroller_msg`
--
ALTER TABLE `app_top_scroller_msg`
  MODIFY `scroller_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `app_top_welcome_msg`
--
ALTER TABLE `app_top_welcome_msg`
  MODIFY `welcome_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Chat_Message`
--
ALTER TABLE `Chat_Message`
  MODIFY `chat_msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT for table `fees_display`
--
ALTER TABLE `fees_display`
  MODIFY `fees_display_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `msg_body`
--
ALTER TABLE `msg_body`
  MODIFY `msg_body_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1124;

--
-- AUTO_INCREMENT for table `msg_group_mst`
--
ALTER TABLE `msg_group_mst`
  MODIFY `msg_group_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `msg_mst`
--
ALTER TABLE `msg_mst`
  MODIFY `msg_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=340;

--
-- AUTO_INCREMENT for table `msg_sgroup_mst`
--
ALTER TABLE `msg_sgroup_mst`
  MODIFY `msg_sgroup_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `notice_board_detail`
--
ALTER TABLE `notice_board_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `pageid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `parents`
--
ALTER TABLE `parents`
  MODIFY `parents_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `replied_msg`
--
ALTER TABLE `replied_msg`
  MODIFY `replied_msg_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `replied_msg_body`
--
ALTER TABLE `replied_msg_body`
  MODIFY `replied_msg_d_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=615;

--
-- AUTO_INCREMENT for table `scholar_data`
--
ALTER TABLE `scholar_data`
  MODIFY `scholar_data_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15361;

--
-- AUTO_INCREMENT for table `sch_mst`
--
ALTER TABLE `sch_mst`
  MODIFY `sch_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `sended_msg`
--
ALTER TABLE `sended_msg`
  MODIFY `sended_msg_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `student_main_detail`
--
ALTER TABLE `student_main_detail`
  MODIFY `student_main_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacherId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
