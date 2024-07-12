/*
 Navicat Premium Data Transfer

 Source Server         : BasesdeDatos
 Source Server Type    : MySQL
 Source Server Version : 100432
 Source Host           : localhost:3306
 Source Schema         : bd_dfrida

 Target Server Type    : MySQL
 Target Server Version : 100432
 File Encoding         : 65001

 Date: 12/07/2024 17:32:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for alamcen_mprima
-- ----------------------------
DROP TABLE IF EXISTS `alamcen_mprima`;
CREATE TABLE `alamcen_mprima`  (
  `idAlmaMprima` int NOT NULL AUTO_INCREMENT,
  `idMprima` int NOT NULL,
  `codigoMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadMprima` int NOT NULL,
  `cantidadMprima` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idAlmaMprima`) USING BTREE,
  INDEX `idMprima`(`idMprima`) USING BTREE,
  CONSTRAINT `alamcen_mprima_ibfk_1` FOREIGN KEY (`idMprima`) REFERENCES `materia_prima` (`idMprima`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of alamcen_mprima
-- ----------------------------

-- ----------------------------
-- Table structure for almacen_prod
-- ----------------------------
DROP TABLE IF EXISTS `almacen_prod`;
CREATE TABLE `almacen_prod`  (
  `idAlmaProd` int NOT NULL AUTO_INCREMENT,
  `idProd` int NOT NULL,
  `codigoProdAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreProdAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadProdAlma` int NOT NULL,
  `cantidadProdAlma` int NOT NULL,
  `precioProdAlma` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idAlmaProd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of almacen_prod
-- ----------------------------
INSERT INTO `almacen_prod` VALUES (1, 34, 'Dignissimos possimus', 'Jordan Cross', 0, 110, 690, '2024-07-12 17:19:19', '2024-07-12 17:25:08');
INSERT INTO `almacen_prod` VALUES (2, 33, 'Corrupti ipsa sed ', 'Kai Griffith', 0, 1, 761, '2024-07-12 17:19:30', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for categoria_mprima
-- ----------------------------
DROP TABLE IF EXISTS `categoria_mprima`;
CREATE TABLE `categoria_mprima`  (
  `idCatMPrima` int NOT NULL AUTO_INCREMENT,
  `nombreCategoriaMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idCatMPrima`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_mprima
-- ----------------------------
INSERT INTO `categoria_mprima` VALUES (1, 'Hilo negro', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `categoria_mprima` VALUES (2, 'Hilooo 3ml', '2024-06-27 13:23:40', '2024-06-27 15:33:21');

-- ----------------------------
-- Table structure for categoria_prod
-- ----------------------------
DROP TABLE IF EXISTS `categoria_prod`;
CREATE TABLE `categoria_prod`  (
  `idCatPro` int NOT NULL AUTO_INCREMENT,
  `nombreCategoriaProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idCatPro`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_prod
-- ----------------------------
INSERT INTO `categoria_prod` VALUES (1, 'Poleras Hombre XL', '0000-00-00 00:00:00', '2024-06-26 13:13:14');
INSERT INTO `categoria_prod` VALUES (5, 'Casca Promo Ln', '2024-06-26 11:46:38', '2024-06-28 11:38:35');
INSERT INTO `categoria_prod` VALUES (6, 'Camisa Escolar S', '2024-06-26 11:47:09', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (16, 'Casca Promo M', '2024-06-26 12:32:03', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (17, 'Casca Promo S', '2024-06-26 12:32:23', '2024-06-26 13:01:23');
INSERT INTO `categoria_prod` VALUES (23, 'Casca Promo Miiii', '2024-06-26 14:46:21', '2024-06-26 15:55:51');
INSERT INTO `categoria_prod` VALUES (28, 'Casca Promo yygg', '2024-06-26 15:18:39', '2024-06-26 15:57:31');
INSERT INTO `categoria_prod` VALUES (31, 'sdgsdg', '2024-06-28 11:39:24', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente`  (
  `idCli` int NOT NULL AUTO_INCREMENT,
  `RazonSocialCli` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `rucCli` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `nombreCli` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `correoCli` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `direccionCli` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `celularCli` int NULL DEFAULT NULL,
  `detalleCli` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `EstadoCli` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idCli`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES (10, 'Impedit qui facilis', 'Exercitation sequi n', 'Carla Mcpherson', 'kygaxud@mailinator.com', 'Qui elit minus veli', 16, 'Voluptas maxime obca', 2, '2024-06-25 09:30:34', '2024-06-25 09:32:33');
INSERT INTO `cliente` VALUES (11, 'Harum reprehenderit ', 'Et provident volupt', 'Ella Myers', 'gafemuz@mailinator.com', 'Eaque aut eaque eius', 94, 'Exercitationem et ni', 1, '2024-06-25 09:31:42', '2024-06-25 09:31:42');

-- ----------------------------
-- Table structure for cotizacion
-- ----------------------------
DROP TABLE IF EXISTS `cotizacion`;
CREATE TABLE `cotizacion`  (
  `idCoti` int NOT NULL AUTO_INCREMENT,
  `tituloCoti` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaCoti` date NOT NULL,
  `razonSocialCoti` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreComercialCoti` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `rucCoti` int NOT NULL,
  `nombreCoti` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `celularCoti` int NULL DEFAULT NULL,
  `correoCoti` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `direccionCoti` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `detalleCoti` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `productsCoti` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productsMprimaCoti` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `totalProductsCoti` decimal(10, 2) NOT NULL,
  `totalProductsMprimaCoti` decimal(10, 2) NOT NULL,
  `igvCoti` decimal(10, 2) NOT NULL,
  `subTotalCoti` decimal(10, 2) NOT NULL,
  `totalCoti` decimal(10, 2) NOT NULL,
  `estadoCoti` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idCoti`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cotizacion
-- ----------------------------
INSERT INTO `cotizacion` VALUES (1, 'Esse inventore dolo', '1980-07-25', 'Eu error ea quas bea', 'Est accusamus quo as', 2147483647, 'Aut sed quae error a', 24654654, 'correo@gmail.com', 'Esse asperiores eu Sint inventore possisadfasdfasdfasfasdfsdf', 'Sint inventore possisadfasdfasdfasfasdfsdfSint inventore possisadfasdfasdfasfasdfsdfSint inventore possisadfasdfasdfasfasdfsdfSint inventore possisadfasdfasdfasfasdfsdfSint inventore possisadfasdfasdfasfasdfsdfSint inventore possisadfasdfasdfasfasdfsdf', '{\"producto0\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto1\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto2\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto3\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima6\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima7\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima8\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima9\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"}}', 2831.00, 3791.00, 0.00, 6622.00, 6622.00, 2, '2024-07-03 12:29:29', '0000-00-00 00:00:00');
INSERT INTO `cotizacion` VALUES (2, 'Ex atque dolor cupid', '2003-06-13', 'Est vitae laborum in', 'Sed do doloremque fu', 27, 'Aut deserunt alias p', 2, 'Delectus ea aut et ', 'Sed ut quidem quasi ', 'Qui eum ratione magn', '{\"producto0\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"99\",\"precioProdCoti\":\"68310.00\"},\"producto1\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"12\",\"precioProdCoti\":\"8280.00\"},\"producto2\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"59\",\"precioProdCoti\":\"40710.00\"},\"producto3\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"35\",\"precioProdCoti\":\"24150.00\"},\"producto4\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"86\",\"precioProdCoti\":\"59340.00\"},\"producto5\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"57\",\"precioProdCoti\":\"39330.00\"},\"producto6\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"45\",\"precioProdCoti\":\"31050.00\"},\"producto7\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"86\",\"precioProdCoti\":\"59340.00\"},\"producto8\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"2\",\"precioProdCoti\":\"1380.00\"},\"producto9\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"17\",\"precioProdCoti\":\"11730.00\"},\"producto10\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"74\",\"precioProdCoti\":\"51060.00\"},\"producto11\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"74\",\"precioProdCoti\":\"51060.00\"},\"producto12\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"35\",\"precioProdCoti\":\"24150.00\"},\"producto13\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"89\",\"precioProdCoti\":\"61410.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"35\",\"precioProdMprimaCoti\":\"5600.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"63\",\"precioProdMprimaCoti\":\"10080.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"84\",\"precioProdMprimaCoti\":\"13440.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"44\",\"precioProdMprimaCoti\":\"7040.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"5\",\"precioProdMprimaCoti\":\"800.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"61\",\"precioProdMprimaCoti\":\"9760.00\"},\"productoPrima6\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"21\",\"precioProdMprimaCoti\":\"3360.00\"},\"productoPrima7\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"7\",\"precioProdMprimaCoti\":\"1120.00\"},\"productoPrima8\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"30\",\"precioProdMprimaCoti\":\"4800.00\"},\"productoPrima9\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"63\",\"precioProdMprimaCoti\":\"10080.00\"},\"productoPrima10\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"73\",\"precioProdMprimaCoti\":\"11680.00\"},\"productoPrima11\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"70\",\"precioProdMprimaCoti\":\"11200.00\"},\"productoPrima12\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"42\",\"precioProdMprimaCoti\":\"6720.00\"},\"productoPrima13\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"93\",\"precioProdMprimaCoti\":\"14880.00\"},\"productoPrima14\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima15\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"}}', 531300.00, 110880.00, 0.00, 642180.00, 642180.00, 2, '2024-07-03 13:35:14', '0000-00-00 00:00:00');
INSERT INTO `cotizacion` VALUES (3, 'Aut vitae totam nihi', '1983-05-09', 'Reprehenderit sit f', 'Aut id nisi dignissi', 77, 'Dolor omnis est inv', 96, 'Excepteur omnis corp', 'Dolores et ut atque ', 'Harum quos nulla qua', '{\"producto0\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto1\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto2\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto3\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto4\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto5\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto6\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto7\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto8\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto9\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto10\":{\"codProdCoti\":\"30\",\"nombreProdCoti\":\"Sylvester Tuckergggggggg\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto11\":{\"codProdCoti\":\"30\",\"nombreProdCoti\":\"Sylvester Tuckergggggggg\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto12\":{\"codProdCoti\":\"30\",\"nombreProdCoti\":\"Sylvester Tuckergggggggg\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto13\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto14\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto15\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto16\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto17\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"22\",\"nombreProdMprimaCoti\":\"Hop Powers\",\"unidadProdMprimaCoti\":\"34\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"196.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"22\",\"nombreProdMprimaCoti\":\"Hop Powers\",\"unidadProdMprimaCoti\":\"34\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"196.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima6\":{\"codProdMprimaCoti\":\"21\",\"nombreProdMprimaCoti\":\"Maya Fuller\",\"unidadProdMprimaCoti\":\"78\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"20.00\"},\"productoPrima7\":{\"codProdMprimaCoti\":\"21\",\"nombreProdMprimaCoti\":\"Maya Fuller\",\"unidadProdMprimaCoti\":\"78\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"20.00\"},\"productoPrima8\":{\"codProdMprimaCoti\":\"21\",\"nombreProdMprimaCoti\":\"Maya Fuller\",\"unidadProdMprimaCoti\":\"78\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"20.00\"},\"productoPrima9\":{\"codProdMprimaCoti\":\"21\",\"nombreProdMprimaCoti\":\"Maya Fuller\",\"unidadProdMprimaCoti\":\"78\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"20.00\"},\"productoPrima10\":{\"codProdMprimaCoti\":\"20\",\"nombreProdMprimaCoti\":\"Ulla Yang\",\"unidadProdMprimaCoti\":\"65\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"555.00\"},\"productoPrima11\":{\"codProdMprimaCoti\":\"20\",\"nombreProdMprimaCoti\":\"Ulla Yang\",\"unidadProdMprimaCoti\":\"65\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"555.00\"},\"productoPrima12\":{\"codProdMprimaCoti\":\"20\",\"nombreProdMprimaCoti\":\"Ulla Yang\",\"unidadProdMprimaCoti\":\"65\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"555.00\"},\"productoPrima13\":{\"codProdMprimaCoti\":\"20\",\"nombreProdMprimaCoti\":\"Ulla Yang\",\"unidadProdMprimaCoti\":\"65\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"555.00\"},\"productoPrima14\":{\"codProdMprimaCoti\":\"20\",\"nombreProdMprimaCoti\":\"Ulla Yang\",\"unidadProdMprimaCoti\":\"65\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"555.00\"},\"productoPrima15\":{\"codProdMprimaCoti\":\"21\",\"nombreProdMprimaCoti\":\"Maya Fuller\",\"unidadProdMprimaCoti\":\"78\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"20.00\"},\"productoPrima16\":{\"codProdMprimaCoti\":\"21\",\"nombreProdMprimaCoti\":\"Maya Fuller\",\"unidadProdMprimaCoti\":\"78\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"20.00\"},\"productoPrima17\":{\"codProdMprimaCoti\":\"21\",\"nombreProdMprimaCoti\":\"Maya Fuller\",\"unidadProdMprimaCoti\":\"78\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"20.00\"},\"productoPrima18\":{\"codProdMprimaCoti\":\"22\",\"nombreProdMprimaCoti\":\"Hop Powers\",\"unidadProdMprimaCoti\":\"34\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"196.00\"}}', 378274.00, 5395.00, 0.00, 383669.00, 383669.00, 2, '2024-07-03 16:07:52', '0000-00-00 00:00:00');
INSERT INTO `cotizacion` VALUES (4, 'Dolores veniam id ', '2018-03-09', 'Culpa voluptates com', 'Rerum quo alias aliq', 61, 'Placeat quia ea est', 43, 'Non fugiat molestiae', 'Quos veniam magni e', 'Quo dolorem ut cillu', '{\"producto0\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto1\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto2\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto3\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"22\",\"nombreProdMprimaCoti\":\"Hop Powers\",\"unidadProdMprimaCoti\":\"34\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"196.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"22\",\"nombreProdMprimaCoti\":\"Hop Powers\",\"unidadProdMprimaCoti\":\"34\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"196.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"22\",\"nombreProdMprimaCoti\":\"Hop Powers\",\"unidadProdMprimaCoti\":\"34\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"196.00\"}}', 2902.00, 1381.00, 0.00, 4283.00, 4283.00, 2, '2024-07-05 14:43:41', '0000-00-00 00:00:00');
INSERT INTO `cotizacion` VALUES (5, 'Voluptas corrupti n', '2009-01-12', 'Non vel in dolor adi', 'Ea ullamco magnam ip', 56, 'Dolorem voluptatem ', 68, 'Est blanditiis facer', 'Iste aperiam volupta', 'Quis qui ea veniam ', '{\"producto0\":{\"codProdCoti\":\"30\",\"nombreProdCoti\":\"Sylvester Tuckergggggggg\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto1\":{\"codProdCoti\":\"30\",\"nombreProdCoti\":\"Sylvester Tuckergggggggg\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto2\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto3\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto4\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto5\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto6\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto7\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto8\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto9\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima6\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima7\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima8\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima9\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"}}', 189654.00, 3478.00, 0.00, 193132.00, 193132.00, 1, '2024-07-05 16:49:32', '0000-00-00 00:00:00');
INSERT INTO `cotizacion` VALUES (6, 'Voluptas corrupti n', '2009-01-12', 'Non vel in dolor adi', 'Ea ullamco magnam ip', 56, 'Dolorem voluptatem ', 68, 'Est blanditiis facer', 'Iste aperiam volupta', 'Quis qui ea veniam ', '{\"producto0\":{\"codProdCoti\":\"30\",\"nombreProdCoti\":\"Sylvester Tuckergggggggg\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto1\":{\"codProdCoti\":\"30\",\"nombreProdCoti\":\"Sylvester Tuckergggggggg\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto2\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto3\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto4\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto5\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto6\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto7\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto8\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto9\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima6\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima7\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima8\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima9\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"}}', 189654.00, 3478.00, 0.00, 193132.00, 193132.00, 1, '2024-07-05 16:49:32', '0000-00-00 00:00:00');
INSERT INTO `cotizacion` VALUES (7, 'Quam impedit nobis ', '1981-12-02', 'Eligendi incidunt e', 'Et Nam et consequatu', 84, 'Ipsum dolorem corru', 28, 'Porro in vel at comm', 'Sed excepturi rerum ', 'Est id animi ipsum', '{\"producto0\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto1\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto2\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto3\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto4\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto5\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto6\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto7\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima6\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima7\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"}}', 5804.00, 2532.00, 0.00, 8336.00, 8336.00, 1, '2024-07-05 16:50:05', '0000-00-00 00:00:00');
INSERT INTO `cotizacion` VALUES (8, 'Quam impedit nobis ', '1981-12-02', 'Eligendi incidunt e', 'Et Nam et consequatu', 84, 'Ipsum dolorem corru', 28, 'Porro in vel at comm', 'Sed excepturi rerum ', 'Est id animi ipsum', '{\"producto0\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto1\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto2\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto3\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto4\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto5\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto6\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto7\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima6\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima7\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"}}', 5804.00, 2532.00, 0.00, 8336.00, 8336.00, 2, '2024-07-05 16:50:05', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for desecho_merma
-- ----------------------------
DROP TABLE IF EXISTS `desecho_merma`;
CREATE TABLE `desecho_merma`  (
  `idDeseMerma` int NOT NULL AUTO_INCREMENT,
  `idMerma` int NOT NULL,
  `codigoMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadMprima` int NOT NULL,
  `cantidadMprima` decimal(10, 2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idDeseMerma`) USING BTREE,
  INDEX `idMerma`(`idMerma`) USING BTREE,
  CONSTRAINT `desecho_merma_ibfk_1` FOREIGN KEY (`idMerma`) REFERENCES `merma` (`idMerma`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of desecho_merma
-- ----------------------------

-- ----------------------------
-- Table structure for ficha_proceso
-- ----------------------------
DROP TABLE IF EXISTS `ficha_proceso`;
CREATE TABLE `ficha_proceso`  (
  `idFichaProc` int NOT NULL AUTO_INCREMENT,
  `tituloFichaProc` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `productoFichaProc` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `detalleFichaProc` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `procesoFichaProcJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `docFichaProc` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idFichaProc`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ficha_proceso
-- ----------------------------
INSERT INTO `ficha_proceso` VALUES (3, '213213123213213', 'Quae esse dolorem re', 'Exercitation autem u', '{}', NULL, '2024-07-11 13:29:01', '0000-00-00 00:00:00');
INSERT INTO `ficha_proceso` VALUES (6, 'Elit reiciendis ali', 'At quasi est est ad', 'Ut quisquam rerum ea', '{\"procesoTrabajo0\":{\"procesosAdd\":\"1312321\",\"tiempoAdd\":\"123123\",\"observacionAdd\":\"131231231\"},\"procesoTrabajo1\":{\"procesosAdd\":\"13123213\",\"tiempoAdd\":\"13123\",\"observacionAdd\":\"13123\"}}', NULL, '2024-07-11 16:51:56', '0000-00-00 00:00:00');
INSERT INTO `ficha_proceso` VALUES (7, 'Et veritatis volupta', 'Qui similique illum', 'Atque et occaecat of', '{\"procesoTrabajo0\":{\"procesosAdd\":\"Incidunt ullam labo\",\"tiempoAdd\":\"Beatae commodi amet\",\"observacionAdd\":\"Commodi minus offici\"},\"procesoTrabajo1\":{\"procesosAdd\":\"Omnis accusantium do\",\"tiempoAdd\":\"Aut earum a rerum ei\",\"observacionAdd\":\"Accusantium labore m\"}}', NULL, '2024-07-12 10:36:39', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for ficha_tecnica
-- ----------------------------
DROP TABLE IF EXISTS `ficha_tecnica`;
CREATE TABLE `ficha_tecnica`  (
  `idFichaTec` int NOT NULL AUTO_INCREMENT,
  `nombreFichaTec` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaFichaTec` date NOT NULL,
  `clienteFichaTec` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `descripcionFichaTec` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `codigoFichaTec` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreSoliFichaTec` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `celularFichaTec` int NOT NULL,
  `correoFichaTec` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `detalleFichaTec` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `docFichaTec` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `estadoFichaTec` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idFichaTec`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 190 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ficha_tecnica
-- ----------------------------

-- ----------------------------
-- Table structure for ingreso_mprima
-- ----------------------------
DROP TABLE IF EXISTS `ingreso_mprima`;
CREATE TABLE `ingreso_mprima`  (
  `idIngMprima` int NOT NULL AUTO_INCREMENT,
  `idMprima` int NOT NULL,
  `codigoMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadMprima` int NOT NULL,
  `cantidadMprima` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idIngMprima`) USING BTREE,
  INDEX `idMprima`(`idMprima`) USING BTREE,
  CONSTRAINT `ingreso_mprima_ibfk_1` FOREIGN KEY (`idMprima`) REFERENCES `materia_prima` (`idMprima`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_mprima
-- ----------------------------

-- ----------------------------
-- Table structure for ingreso_prod
-- ----------------------------
DROP TABLE IF EXISTS `ingreso_prod`;
CREATE TABLE `ingreso_prod`  (
  `idIngProd` int NOT NULL AUTO_INCREMENT,
  `nombreIngProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaIngProd` date NOT NULL,
  `igvIngProd` varchar(5) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `subTotalIngProd` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `totalIngProd` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ingJsonProd` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idIngProd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_prod
-- ----------------------------
INSERT INTO `ingreso_prod` VALUES (1, 'prueba q', '2024-07-12', '0', '3592.00', '3592.00', '{\"producto0\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"690.00\"},\"producto1\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"Kai Griffith\",\"codigoProdIng\":\"Corrupti ipsa sed \",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"761.00\"},\"producto2\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"690.00\"},\"producto3\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"Kai Griffith\",\"codigoProdIng\":\"Corrupti ipsa sed \",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"761.00\"},\"producto4\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"690.00\"}}', '2024-07-12 16:08:19', '0000-00-00 00:00:00');
INSERT INTO `ingreso_prod` VALUES (2, 'asdasd', '2024-07-12', '0', '1451.00', '1451.00', '{\"producto0\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"690.00\"},\"producto1\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"Kai Griffith\",\"codigoProdIng\":\"Corrupti ipsa sed \",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"761.00\"}}', '2024-07-12 16:10:26', '0000-00-00 00:00:00');
INSERT INTO `ingreso_prod` VALUES (3, 'Ex libero ipsum cup', '1970-04-20', '0', '2141.00', '2141.00', '{\"producto0\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"690.00\"},\"producto1\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"Kai Griffith\",\"codigoProdIng\":\"Corrupti ipsa sed \",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"761.00\"},\"producto2\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"690.00\"}}', '2024-07-12 16:11:05', '0000-00-00 00:00:00');
INSERT INTO `ingreso_prod` VALUES (4, 'asdasdasd', '2024-07-12', '0', '1451.00', '1451.00', '{\"producto0\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"690.00\"},\"producto1\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"Kai Griffith\",\"codigoProdIng\":\"Corrupti ipsa sed \",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"761.00\"}}', '2024-07-12 17:20:28', '0000-00-00 00:00:00');
INSERT INTO `ingreso_prod` VALUES (5, 'Aut sed minus Nam eo', '1970-10-26', '0', '3450.00', '3450.00', '{\"producto0\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"5\",\"precioProdIng\":\"3450.00\"}}', '2024-07-12 17:22:20', '0000-00-00 00:00:00');
INSERT INTO `ingreso_prod` VALUES (6, 'Illo in et est irure', '1991-01-19', '0', '69000.00', '69000.00', '{\"producto0\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"100\",\"precioProdIng\":\"69000.00\"}}', '2024-07-12 17:24:37', '0000-00-00 00:00:00');
INSERT INTO `ingreso_prod` VALUES (7, 'Optio rerum volupta', '2015-04-03', '0', '2760.00', '2760.00', '{\"producto0\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"Jordan Cross\",\"codigoProdIng\":\"Dignissimos possimus\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"4\",\"precioProdIng\":\"2760.00\"}}', '2024-07-12 17:25:22', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for materia_prima
-- ----------------------------
DROP TABLE IF EXISTS `materia_prima`;
CREATE TABLE `materia_prima`  (
  `idMprima` int NOT NULL AUTO_INCREMENT,
  `idCatMprima` int NOT NULL,
  `codigoMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `detalleMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `unidadMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precioMprima` decimal(10, 2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idMprima`) USING BTREE,
  INDEX `idCatMprima`(`idCatMprima`) USING BTREE,
  CONSTRAINT `materia_prima_ibfk_1` FOREIGN KEY (`idCatMprima`) REFERENCES `categoria_mprima` (`idCatMPrima`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of materia_prima
-- ----------------------------
INSERT INTO `materia_prima` VALUES (1, 1, 'Nisi maxime delectus', 'Cain Odonnell', 'Exercitation commodi', '0', 774.00, '2024-06-27 10:24:19', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (2, 1, 'Est et ea sit obcaec', 'Guy Carr', 'Tempora quis quia ip', '0', 344.00, '2024-06-27 10:24:34', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (3, 1, 'Minus harum ea atque', 'Marcia Odom', 'In et ullamco facili', '0', 261.00, '2024-06-27 10:24:40', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (4, 1, 'Sunt dolore rerum qu', 'Dakota Browning', 'Mollit ratione lorem', '0', 598.00, '2024-06-27 10:24:46', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (12, 2, 'Rerum adipisci provi', 'alex', 'Dicta enim dolore to', '90', 519.00, '2024-06-27 15:05:05', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (13, 2, '	Sunt dolore rerum qu', 'EPEPE', 'Dolor deleniti eiusm', '10', 542.00, '2024-06-27 15:05:50', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (15, 2, '', '', '', '0', 0.00, '2024-06-27 15:44:19', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (16, 2, 'Error nihil beatae e', 'tellaaaaaaaa', 'Ratione earum ea duc', '21', 1.00, '2024-06-28 17:28:02', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (17, 2, 'Error nihil beatae egggg', 'tellaaaaaaaayyyy', 'Ratione earum ea duc', '21', 1.00, '2024-06-28 17:28:10', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (19, 1, 'Molestiae et sit qu', 'Megan Taylor', 'Consequatur Omnis u', '21', 183.00, '2024-06-28 17:28:38', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (20, 2, 'Ipsam nesciunt dese', 'Ulla Yang', 'Reprehenderit paria', '65', 555.00, '2024-06-28 17:32:51', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (21, 2, 'Voluptatem Irure ev', 'Maya Fuller', 'Facere nostrum nihil', '78', 20.00, '2024-06-28 17:37:10', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (22, 1, 'Non omnis adipisci c', 'Hop Powers', 'Veniam nobis aut re', '34', 196.00, '2024-06-28 17:38:32', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (23, 2, 'Sed voluptas duis qu', 'Teegan Gay', 'Asperiores dolorum m', 'Metros', 473.00, '2024-07-01 15:33:39', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (24, 2, 'Officia et eiusmod q', 'Robin Dunn', 'Deserunt adipisicing', 'Uni', 160.00, '2024-07-01 15:33:55', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for merma
-- ----------------------------
DROP TABLE IF EXISTS `merma`;
CREATE TABLE `merma`  (
  `idMerma` int NOT NULL AUTO_INCREMENT,
  `idProcOp` int NOT NULL,
  `idSalMprima` int NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idMerma`) USING BTREE,
  INDEX `idProcOp`(`idProcOp`) USING BTREE,
  CONSTRAINT `merma_ibfk_1` FOREIGN KEY (`idProcOp`) REFERENCES `proceso_operativo` (`idProcOp`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of merma
-- ----------------------------

-- ----------------------------
-- Table structure for pedido
-- ----------------------------
DROP TABLE IF EXISTS `pedido`;
CREATE TABLE `pedido`  (
  `idPedido` int NOT NULL AUTO_INCREMENT,
  `idCli` int NOT NULL,
  `idProd` int NOT NULL,
  `idFichaTec` int NULL DEFAULT NULL,
  `idFichaProc` int NULL DEFAULT NULL,
  `tituloPedido` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombrePedido` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaPedido` date NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idPedido`) USING BTREE,
  INDEX `idCli`(`idCli`) USING BTREE,
  INDEX `idProd`(`idProd`) USING BTREE,
  INDEX `idFichaTec`(`idFichaTec`) USING BTREE,
  INDEX `idFichaProc`(`idFichaProc`) USING BTREE,
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCli`) REFERENCES `cliente` (`idCli`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`idProd`) REFERENCES `producto` (`idProd`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`idFichaTec`) REFERENCES `ficha_tecnica` (`idFichaTec`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`idFichaProc`) REFERENCES `ficha_proceso` (`idFichaProc`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pedido
-- ----------------------------

-- ----------------------------
-- Table structure for proceso_operativo
-- ----------------------------
DROP TABLE IF EXISTS `proceso_operativo`;
CREATE TABLE `proceso_operativo`  (
  `idProcOp` int NOT NULL AUTO_INCREMENT,
  `idTipoProc` int NOT NULL,
  `idPedido` int NOT NULL,
  `idSalMprima` int NOT NULL,
  `descripcionProcOp` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `estadoProcOp` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProcOp`) USING BTREE,
  INDEX `idTipoProc`(`idTipoProc`) USING BTREE,
  INDEX `idPedido`(`idPedido`) USING BTREE,
  INDEX `idSalMprima`(`idSalMprima`) USING BTREE,
  CONSTRAINT `proceso_operativo_ibfk_1` FOREIGN KEY (`idTipoProc`) REFERENCES `tipo_proceso` (`idTipoProc`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `proceso_operativo_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `proceso_operativo_ibfk_3` FOREIGN KEY (`idSalMprima`) REFERENCES `salida_mprima` (`idSalMprima`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo
-- ----------------------------

-- ----------------------------
-- Table structure for proceso_operativo_fin
-- ----------------------------
DROP TABLE IF EXISTS `proceso_operativo_fin`;
CREATE TABLE `proceso_operativo_fin`  (
  `idProcOpFin` int NOT NULL AUTO_INCREMENT,
  `idTipoProc` int NOT NULL,
  `idProcOp` int NOT NULL,
  `descripcionProcOpFin` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `estadoProcOpFin` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProcOpFin`) USING BTREE,
  INDEX `idTipoProc`(`idTipoProc`) USING BTREE,
  INDEX `idProcOp`(`idProcOp`) USING BTREE,
  CONSTRAINT `proceso_operativo_fin_ibfk_1` FOREIGN KEY (`idTipoProc`) REFERENCES `tipo_proceso` (`idTipoProc`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `proceso_operativo_fin_ibfk_2` FOREIGN KEY (`idProcOp`) REFERENCES `proceso_operativo` (`idProcOp`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo_fin
-- ----------------------------

-- ----------------------------
-- Table structure for prod_merma
-- ----------------------------
DROP TABLE IF EXISTS `prod_merma`;
CREATE TABLE `prod_merma`  (
  `idProdMerma` int NOT NULL AUTO_INCREMENT,
  `idMerma` int NOT NULL,
  `idProd` int NULL DEFAULT NULL,
  `cantidadProdMerma` int NOT NULL,
  `estadoProdMerma` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProdMerma`) USING BTREE,
  INDEX `idMerma`(`idMerma`) USING BTREE,
  CONSTRAINT `prod_merma_ibfk_1` FOREIGN KEY (`idMerma`) REFERENCES `merma` (`idMerma`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of prod_merma
-- ----------------------------

-- ----------------------------
-- Table structure for produccion
-- ----------------------------
DROP TABLE IF EXISTS `produccion`;
CREATE TABLE `produccion`  (
  `idProduccion` int NOT NULL AUTO_INCREMENT,
  `idProcOpFin` int NOT NULL,
  `idPedido` int NULL DEFAULT NULL,
  `estadoProduccion` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProduccion`) USING BTREE,
  INDEX `idProcOpFin`(`idProcOpFin`) USING BTREE,
  INDEX `idPedido`(`idPedido`) USING BTREE,
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`idProcOpFin`) REFERENCES `proceso_operativo_fin` (`idProcOpFin`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `produccion_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of produccion
-- ----------------------------

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `idProd` int NOT NULL AUTO_INCREMENT,
  `idCatPro` int NOT NULL,
  `codigoProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `detalleProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precioProd` decimal(10, 2) NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProd`) USING BTREE,
  INDEX `idCatPro`(`idCatPro`) USING BTREE,
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idCatPro`) REFERENCES `categoria_prod` (`idCatPro`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (16, 17, 'Accusantium ut volup', 'Simone Chan', 'Velit ut voluptatum', '51', 333.00, '2024-06-26 15:43:57', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (29, 6, '123456', 'camisa', 'asdas', '1', 1.00, '2024-06-28 15:12:39', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (30, 17, 'Anim dolor recusanda', 'Sylvester Tuckergggggggg', 'Veniam pariatur Re', '1', 60.00, '2024-07-01 12:45:09', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (31, 28, 'Magnam consequat Qu', 'Arsenio Gilliam', 'Ab perspiciatis in ', '1', 92555.00, '2024-07-01 12:45:38', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (33, 5, 'Corrupti ipsa sed ', 'Kai Griffith', 'Quis veritatis dolor', 'Docena', 761.00, '2024-07-01 15:30:54', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (34, 31, 'Dignissimos possimus', 'Jordan Cross', 'Quas ut amet aperia', 'Uni', 690.00, '2024-07-01 15:31:23', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for proveedores
-- ----------------------------
DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE `proveedores`  (
  `idProv` int NOT NULL AUTO_INCREMENT,
  `razonSocialProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `rucProv` int NULL DEFAULT NULL,
  `nombreProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `correoProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `direccionProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `celularProv` int NULL DEFAULT NULL,
  `detalleProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `estadoProv` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProv`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proveedores
-- ----------------------------
INSERT INTO `proveedores` VALUES (5, 'vende telas', 2147483647, 'telas suavecitas', 'telas_suavecitas@gmail.com', 'su local xd', 32654654, 'suavecitas', 1, '2024-06-25 12:02:03', '2024-06-25 12:02:16');
INSERT INTO `proveedores` VALUES (6, 'Dolore aspernatur cu', 74, 'Eiusmod nisi necessi', 'Iste qui blanditiis ', 'Labore nisi pariatur', 54, 'Similique recusandae', 1, '2024-06-28 11:58:58', '2024-06-28 11:58:58');
INSERT INTO `proveedores` VALUES (7, 'Impedit praesentium', 61, 'Consectetur molestia', 'Qui quas in suscipit', 'Qui voluptate repreh', 1, 'Exercitationem animi', 1, '2024-06-28 11:59:03', '2024-06-28 11:59:03');
INSERT INTO `proveedores` VALUES (8, 'Eos aute itaque cill', 14, 'Dolore aliquip qui v', 'Est provident mole', 'Cupidatat reprehende', 81, 'Reiciendis molestiae', 1, '2024-06-28 11:59:09', '2024-06-28 11:59:09');
INSERT INTO `proveedores` VALUES (9, 'Numquam rerum dicta ', 8, 'Aut ut anim sed sunt', 'Autem aut rerum ulla', 'Sed enim dolore nost', 87, 'Autem qui deserunt s', 1, '2024-06-28 11:59:14', '2024-06-28 11:59:14');
INSERT INTO `proveedores` VALUES (11, 'Et sit culpa inven', 83, 'Dolores sed nihil it', 'Quae recusandae Nos', 'Velit aute similique', 38, 'Vitae commodo quis d', 1, '2024-06-28 11:59:25', '2024-06-28 11:59:25');

-- ----------------------------
-- Table structure for salida_mprima
-- ----------------------------
DROP TABLE IF EXISTS `salida_mprima`;
CREATE TABLE `salida_mprima`  (
  `idSalMprima` int NOT NULL AUTO_INCREMENT,
  `idMprima` int NOT NULL,
  `codigoMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadMprima` int NOT NULL,
  `cantidadMprima` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idSalMprima`) USING BTREE,
  INDEX `idMprima`(`idMprima`) USING BTREE,
  CONSTRAINT `salida_mprima_ibfk_1` FOREIGN KEY (`idMprima`) REFERENCES `materia_prima` (`idMprima`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salida_mprima
-- ----------------------------

-- ----------------------------
-- Table structure for salida_prod
-- ----------------------------
DROP TABLE IF EXISTS `salida_prod`;
CREATE TABLE `salida_prod`  (
  `idSalProd` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NULL DEFAULT NULL,
  `idCli` int NULL DEFAULT NULL,
  `idProd` int NOT NULL,
  `codigoProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadProd` int NOT NULL,
  `cantidadProd` decimal(10, 2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idSalProd`) USING BTREE,
  INDEX `idProd`(`idProd`) USING BTREE,
  INDEX `idPedido`(`idPedido`) USING BTREE,
  INDEX `idCli`(`idCli`) USING BTREE,
  CONSTRAINT `salida_prod_ibfk_1` FOREIGN KEY (`idProd`) REFERENCES `producto` (`idProd`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `salida_prod_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `salida_prod_ibfk_3` FOREIGN KEY (`idCli`) REFERENCES `cliente` (`idCli`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salida_prod
-- ----------------------------

-- ----------------------------
-- Table structure for tipo_proceso
-- ----------------------------
DROP TABLE IF EXISTS `tipo_proceso`;
CREATE TABLE `tipo_proceso`  (
  `idTipoProc` int NOT NULL AUTO_INCREMENT,
  `idFichaProc` int NULL DEFAULT NULL,
  `descripcionTipoProc` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idTipoProc`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_proceso
-- ----------------------------

-- ----------------------------
-- Table structure for tipo_usuario
-- ----------------------------
DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE `tipo_usuario`  (
  `idTipoUsu` int NOT NULL AUTO_INCREMENT,
  `descripcionTipo` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idTipoUsu`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_usuario
-- ----------------------------
INSERT INTO `tipo_usuario` VALUES (1, 'Administrador');
INSERT INTO `tipo_usuario` VALUES (2, 'Administrativo');

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `idUsu` int NOT NULL AUTO_INCREMENT,
  `idTipoUsu` int NOT NULL,
  `nombreUsu` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `LastConnection` datetime NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idUsu`) USING BTREE,
  INDEX `idTipoUsu`(`idTipoUsu`) USING BTREE,
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idTipoUsu`) REFERENCES `tipo_usuario` (`idTipoUsu`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 1, 'dfrida', 'Administrador', 'administrador', '$argon2id$v=19$m=4096,t=2,p=2$ZURZWG0yNkNOZVJTLlg5Lw$MvzbwXUNlV+Inxssd1nN+A8EN5Il6CdSAs7pTc3szJk', '2024-07-12 15:56:33', '2024-02-16 12:09:23', '2024-02-16 12:09:23');

SET FOREIGN_KEY_CHECKS = 1;
