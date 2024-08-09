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

 Date: 08/08/2024 17:38:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for almacen_mprima
-- ----------------------------
DROP TABLE IF EXISTS `almacen_mprima`;
CREATE TABLE `almacen_mprima`  (
  `idAlmaMprima` int NOT NULL AUTO_INCREMENT,
  `idMprima` int NOT NULL,
  `codigoMprimaAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreMprimaAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadMprimaAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cantidadMprimaAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precioMprimaAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idAlmaMprima`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of almacen_mprima
-- ----------------------------
INSERT INTO `almacen_mprima` VALUES (1, 29, 'HilNeg202503', 'Holi negro 3.5', 'Docena', '48', '400.00', '2024-07-25 10:14:28', '2024-08-08 13:43:06');
INSERT INTO `almacen_mprima` VALUES (2, 28, 'RollTelCedBla202405', 'Rollo tela ceda blanco', 'Uni', '48', '9000.00', '2024-07-25 10:14:51', '2024-08-08 13:43:06');
INSERT INTO `almacen_mprima` VALUES (3, 27, 'RollTelDri202405', 'Rollo tela dril azul', 'Uni', '48', '8000.00', '2024-07-25 10:15:01', '2024-08-08 13:43:06');
INSERT INTO `almacen_mprima` VALUES (4, 26, 'Boto202405', 'Botones de pantalones hombre', 'Uni', '48', '13.00', '2024-07-25 10:15:02', '2024-08-08 13:43:06');
INSERT INTO `almacen_mprima` VALUES (5, 25, 'CieCasProm202405', 'Cierre Casacas Promo', 'Uni', '48', '150.00', '2024-07-25 10:15:03', '2024-08-08 13:43:06');

-- ----------------------------
-- Table structure for almacen_prod
-- ----------------------------
DROP TABLE IF EXISTS `almacen_prod`;
CREATE TABLE `almacen_prod`  (
  `idAlmaProd` int NOT NULL AUTO_INCREMENT,
  `idProd` int NOT NULL,
  `codigoProdAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombreProdAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `unidadProdAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cantidadProdAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precioProdAlma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idAlmaProd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of almacen_prod
-- ----------------------------
INSERT INTO `almacen_prod` VALUES (24, 40, 'PolEdFisUnx0325', 'Polos Ed Fisica Unisex', 'Docena', '10', '4800.00', '2024-07-24 13:02:20', '2024-08-08 12:32:03');
INSERT INTO `almacen_prod` VALUES (25, 39, 'CamVarCole0324', 'Camisa Varon Colegio', 'Uni', '-1', '6000.00', '2024-07-24 13:02:54', '2024-08-08 12:32:08');
INSERT INTO `almacen_prod` VALUES (26, 37, 'BluCda0524', 'Blusa Ceda Blanca', 'Uni', '0', '8000.00', '2024-07-24 13:03:19', '2024-08-08 12:32:05');
INSERT INTO `almacen_prod` VALUES (27, 38, 'PantSol0525', 'Pantalon Soldadura', 'Docena', '0', '28800.00', '2024-07-24 13:04:15', '2024-08-08 12:32:03');
INSERT INTO `almacen_prod` VALUES (28, 36, 'PolProm202403', 'Polera Promocion Escolar', 'Uni', '-22', '7500.00', '2024-07-24 13:04:16', '2024-08-08 12:32:03');
INSERT INTO `almacen_prod` VALUES (34, 41, '123456', 'productoNuevo', 'Uni', '0', '10.00', '2024-07-25 14:35:17', '2024-07-26 13:52:22');

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_mprima
-- ----------------------------
INSERT INTO `categoria_mprima` VALUES (1, 'Hilo', '0000-00-00 00:00:00', '2024-07-24 12:55:26');
INSERT INTO `categoria_mprima` VALUES (5, 'Tela Ceda', '2024-07-24 12:52:10', '2024-07-24 12:55:20');
INSERT INTO `categoria_mprima` VALUES (6, 'Tela Dril', '2024-07-24 12:52:31', '2024-07-24 12:55:16');
INSERT INTO `categoria_mprima` VALUES (8, 'Botones ', '2024-07-24 12:52:56', '2024-07-24 12:55:00');
INSERT INTO `categoria_mprima` VALUES (9, 'Cierre', '2024-07-24 12:53:07', '2024-07-24 12:54:56');

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
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_prod
-- ----------------------------
INSERT INTO `categoria_prod` VALUES (32, 'Polo', '2024-07-24 12:44:07', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (33, 'Camisa', '2024-07-24 12:44:14', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (34, 'Pantalon', '2024-07-24 12:44:19', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (35, 'Blusa', '2024-07-24 12:44:25', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (36, 'Polera', '2024-07-24 12:44:30', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cotizacion
-- ----------------------------
INSERT INTO `cotizacion` VALUES (17, 'Ad molestiae ea iste', '1987-04-12', 'Reiciendis qui modi ', 'Dolorem velit repreh', 87, 'Sit consectetur mol', 12, 'Voluptatem ea dolor', 'At eaque aut rerum p', 'Sunt officia anim re', '{\"producto0\":{\"codProdCoti\":\"41\",\"nombreProdCoti\":\"productoNuevo\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"1.00\"},\"producto1\":{\"codProdCoti\":\"40\",\"nombreProdCoti\":\"Polos Ed Fisica Unisex\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"480.00\"},\"producto2\":{\"codProdCoti\":\"39\",\"nombreProdCoti\":\"Camisa Varon Colegio\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"29\",\"nombreProdMprimaCoti\":\"Holi negro 3.5\",\"unidadProdMprimaCoti\":\"Docena\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"40.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"28\",\"nombreProdMprimaCoti\":\"Rollo tela ceda blanco\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"900.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"27\",\"nombreProdMprimaCoti\":\"Rollo tela dril azul\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"800.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"26\",\"nombreProdMprimaCoti\":\"Botones de pantalones hombre\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"1.30\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"25\",\"nombreProdMprimaCoti\":\"Cierre Casacas Promo\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"15.00\"}}', 541.00, 1756.30, 413.51, 2297.30, 2710.81, 1, '2024-08-07 16:11:48', '2024-08-08 11:37:31');
INSERT INTO `cotizacion` VALUES (18, 'Necessitatibus sint ', '1983-01-03', 'Velit eos qui amet', 'Ex rem labore debiti', 25, 'Nihil sunt cillum ut', 63, 'Incididunt vero quid', 'Consequatur volupta', 'Blanditiis quia quod', '{\"producto0\":{\"codProdCoti\":\"38\",\"nombreProdCoti\":\"Pantalon Soldadura\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"960.00\"},\"producto1\":{\"codProdCoti\":\"37\",\"nombreProdCoti\":\"Blusa Ceda Blanca\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"80.00\"},\"producto2\":{\"codProdCoti\":\"36\",\"nombreProdCoti\":\"Polera Promocion Escolar\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"150.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"25\",\"nombreProdMprimaCoti\":\"Cierre Casacas Promo\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"15.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"26\",\"nombreProdMprimaCoti\":\"Botones de pantalones hombre\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"1.30\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"27\",\"nombreProdMprimaCoti\":\"Rollo tela dril azul\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"800.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"28\",\"nombreProdMprimaCoti\":\"Rollo tela ceda blanco\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"900.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"29\",\"nombreProdMprimaCoti\":\"Holi negro 3.5\",\"unidadProdMprimaCoti\":\"Docena\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"40.00\"}}', 1190.00, 1756.30, 530.33, 2946.30, 3476.63, 1, '2024-08-07 16:12:10', '2024-08-08 11:35:13');
INSERT INTO `cotizacion` VALUES (19, 'Dolores ea ea volupt', '2001-07-15', 'Itaque aut irure acc', 'Amet laborum tenetu', 78, 'Sint aliquid corpor', 99, 'Eaque eos anim nobis', 'Magna quis magni est', 'Velit minim quisqua', '{\"producto0\":{\"codProdCoti\":\"41\",\"nombreProdCoti\":\"productoNuevo\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"1.00\"},\"producto1\":{\"codProdCoti\":\"40\",\"nombreProdCoti\":\"Polos Ed Fisica Unisex\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"480.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"29\",\"nombreProdMprimaCoti\":\"Holi negro 3.5\",\"unidadProdMprimaCoti\":\"Docena\",\"cantidadProdMprimaCoti\":\"50\",\"precioProdMprimaCoti\":\"2000.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"28\",\"nombreProdMprimaCoti\":\"Rollo tela ceda blanco\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"50\",\"precioProdMprimaCoti\":\"45000.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"27\",\"nombreProdMprimaCoti\":\"Rollo tela dril azul\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"50\",\"precioProdMprimaCoti\":\"40000.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"26\",\"nombreProdMprimaCoti\":\"Botones de pantalones hombre\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"50\",\"precioProdMprimaCoti\":\"65.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"25\",\"nombreProdMprimaCoti\":\"Cierre Casacas Promo\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"50\",\"precioProdMprimaCoti\":\"750.00\"}}', 481.00, 87815.00, 15893.28, 88296.00, 104189.28, 2, '2024-08-08 11:46:47', '2024-08-08 11:47:19');

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
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ficha_proceso
-- ----------------------------
INSERT INTO `ficha_proceso` VALUES (3, '213213123213213', 'Quae esse dolorem re', 'Exercitation autem u', '{}', NULL, '2024-07-11 13:29:01', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 191 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ficha_tecnica
-- ----------------------------
INSERT INTO `ficha_tecnica` VALUES (190, 'Sed aliquam nihil es', '1975-02-01', 'Sint maiores ex in ', 'Consequuntur dolorem', 'Eveniet qui rerum i', 'Enim at qui ex dolor', 52, 'Mollit pariatur Sin', 'Do quod et nesciunt', '190_fichatectnica1.txt', 1, '2024-07-27 11:10:20', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for ingreso_mprima
-- ----------------------------
DROP TABLE IF EXISTS `ingreso_mprima`;
CREATE TABLE `ingreso_mprima`  (
  `idIngMprima` int NOT NULL AUTO_INCREMENT,
  `nombreIngMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaIngMprima` date NOT NULL,
  `igvIngMprima` varchar(5) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `subTotalIngMprima` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `totalIngMprima` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ingJsonMprima` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idIngMprima`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_mprima
-- ----------------------------
INSERT INTO `ingreso_mprima` VALUES (15, 'Asperiores molestiae', '1979-07-25', '0', '17563.00', '17563.00', '{\"producto0\":{\"codProdIng\":\"29\",\"nombreProdIng\":\"Holi negro 3.5\",\"codigoProdIng\":\"HilNeg202503\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"400.00\"},\"producto1\":{\"codProdIng\":\"28\",\"nombreProdIng\":\"Rollo tela ceda blanco\",\"codigoProdIng\":\"RollTelCedBla202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"9000.00\"},\"producto2\":{\"codProdIng\":\"27\",\"nombreProdIng\":\"Rollo tela dril azul\",\"codigoProdIng\":\"RollTelDri202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"8000.00\"},\"producto3\":{\"codProdIng\":\"26\",\"nombreProdIng\":\"Botones de pantalones hombre\",\"codigoProdIng\":\"Boto202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"13.00\"},\"producto4\":{\"codProdIng\":\"25\",\"nombreProdIng\":\"Cierre Casacas Promo\",\"codigoProdIng\":\"CieCasProm202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"150.00\"}}', '2024-07-26 11:14:34', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_prod
-- ----------------------------
INSERT INTO `ingreso_prod` VALUES (31, 'produccion polos educacion fisica', '2024-07-24', '0', '4800.00', '4800.00', '{\"producto0\":{\"codProdIng\":\"40\",\"nombreProdIng\":\"Polos Ed Fisica Unisex\",\"codigoProdIng\":\"PolEdFisUnx0325\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"4800.00\"}}', '2024-07-24 13:02:20', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of materia_prima
-- ----------------------------
INSERT INTO `materia_prima` VALUES (25, 9, 'CieCasProm202405', 'Cierre Casacas Promo', 'Cierres para casacas de promocion', 'Uni', 15.00, '2024-07-24 12:56:23', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (26, 8, 'Boto202405', 'Botones de pantalones hombre', 'botones para pantalones de varones ', 'Uni', 1.30, '2024-07-24 12:57:22', '2024-07-25 10:24:30');
INSERT INTO `materia_prima` VALUES (27, 6, 'RollTelDri202405', 'Rollo tela dril azul', 'Rollo de tela dril azul', 'Uni', 800.00, '2024-07-24 12:58:42', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (28, 5, 'RollTelCedBla202405', 'Rollo tela ceda blanco', 'Rollo de tela ceda blanco', 'Uni', 900.00, '2024-07-24 12:59:44', '0000-00-00 00:00:00');
INSERT INTO `materia_prima` VALUES (29, 1, 'HilNeg202503', 'Holi negro 3.5', 'caja de hilos negros 3.5', 'Docena', 40.00, '2024-07-24 13:00:42', '0000-00-00 00:00:00');

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
  `fechaMermaIng` date NULL DEFAULT NULL,
  `estadoMerma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `fechaMermaAprob` date NULL DEFAULT NULL,
  `nombreMerma` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `jsonMerma` longtext CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL,
  PRIMARY KEY (`idMerma`) USING BTREE,
  INDEX `idProcOp`(`idProcOp`) USING BTREE,
  CONSTRAINT `merma_ibfk_1` FOREIGN KEY (`idProcOp`) REFERENCES `proceso_operativo` (`idProcOp`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of merma
-- ----------------------------
INSERT INTO `merma` VALUES (1, 48, 20, '2024-08-08 17:03:02', '0000-00-00 00:00:00', '2024-08-08', '1', NULL, 'Merma de proceso operativo Sin Aceptar', NULL);
INSERT INTO `merma` VALUES (2, 47, 19, '2024-08-08 17:37:28', '0000-00-00 00:00:00', '2024-08-08', '1', NULL, 'Merma de proceso operativo Sin Aceptar', NULL);

-- ----------------------------
-- Table structure for pedido
-- ----------------------------
DROP TABLE IF EXISTS `pedido`;
CREATE TABLE `pedido`  (
  `idPedido` int NOT NULL AUTO_INCREMENT,
  `idCli` int NOT NULL,
  `tituloPedido` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombrePedido` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaPedido` date NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `idCoti` int NULL DEFAULT NULL,
  `idFichaTec` int NULL DEFAULT NULL,
  `estadoPedido` int NOT NULL,
  PRIMARY KEY (`idPedido`) USING BTREE,
  INDEX `idCli`(`idCli`) USING BTREE,
  INDEX `fk_idCoti`(`idCoti`) USING BTREE,
  INDEX `fk_idFichaTec`(`idFichaTec`) USING BTREE,
  CONSTRAINT `fk_idCoti` FOREIGN KEY (`idCoti`) REFERENCES `cotizacion` (`idCoti`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_idFichaTec` FOREIGN KEY (`idFichaTec`) REFERENCES `ficha_tecnica` (`idFichaTec`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCli`) REFERENCES `cliente` (`idCli`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pedido
-- ----------------------------
INSERT INTO `pedido` VALUES (8, 11, 'Veritatis dolorum lo', 'Aut repellendus Err', '1980-07-19', '2024-08-08 11:34:08', '2024-08-08 17:03:02', 17, 190, 3);
INSERT INTO `pedido` VALUES (9, 11, 'Rem nulla labore eni', 'Soluta quibusdam ull', '1997-11-20', '2024-08-08 11:47:19', '2024-08-08 17:37:28', 19, 190, 3);

-- ----------------------------
-- Table structure for proceso_operativo
-- ----------------------------
DROP TABLE IF EXISTS `proceso_operativo`;
CREATE TABLE `proceso_operativo`  (
  `idProcOp` int NOT NULL AUTO_INCREMENT,
  `idTipoProc` int NOT NULL,
  `idPedido` int NOT NULL,
  `idSalMprima` int NULL DEFAULT NULL,
  `descripcionProcOp` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `estadoProcOp` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `nombreProcOp` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaRegistroProcOp` date NOT NULL,
  `fechaInicioProcOp` date NULL DEFAULT NULL,
  `fechaFinProcOp` date NOT NULL,
  PRIMARY KEY (`idProcOp`) USING BTREE,
  INDEX `idTipoProc`(`idTipoProc`) USING BTREE,
  INDEX `idPedido`(`idPedido`) USING BTREE,
  INDEX `idSalMprima`(`idSalMprima`) USING BTREE,
  CONSTRAINT `proceso_operativo_ibfk_1` FOREIGN KEY (`idTipoProc`) REFERENCES `tipo_proceso` (`idTipoProc`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `proceso_operativo_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo
-- ----------------------------
INSERT INTO `proceso_operativo` VALUES (47, 1, 9, 19, 'Irure laborum qui qu', 5, '2024-08-08 12:42:21', '2024-08-08 17:37:28', 'Enim ea pariatur Id', '2023-07-07', '2024-08-08', '1970-12-08');
INSERT INTO `proceso_operativo` VALUES (48, 1, 8, 20, 'In atque cillum illo', 2, '2024-08-08 13:43:34', '2024-08-08 17:03:02', 'Aliquid ipsam sed re', '2013-11-20', '2024-08-08', '1989-05-19');

-- ----------------------------
-- Table structure for proceso_operativo_fin
-- ----------------------------
DROP TABLE IF EXISTS `proceso_operativo_fin`;
CREATE TABLE `proceso_operativo_fin`  (
  `idProcOpFin` int NOT NULL AUTO_INCREMENT,
  `idProcOp` int NOT NULL,
  `estadoProcOpFin` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProcOpFin`) USING BTREE,
  INDEX `idProcOp`(`idProcOp`) USING BTREE,
  CONSTRAINT `proceso_operativo_fin_ibfk_2` FOREIGN KEY (`idProcOp`) REFERENCES `proceso_operativo` (`idProcOp`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo_fin
-- ----------------------------
INSERT INTO `proceso_operativo_fin` VALUES (8, 47, 1, '2024-08-08 14:45:58', '0000-00-00 00:00:00');
INSERT INTO `proceso_operativo_fin` VALUES (9, 48, 1, '2024-08-08 17:03:02', '0000-00-00 00:00:00');
INSERT INTO `proceso_operativo_fin` VALUES (10, 47, 1, '2024-08-08 17:37:28', '0000-00-00 00:00:00');

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
  `estadoProduccion` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProduccion`) USING BTREE,
  INDEX `idProcOpFin`(`idProcOpFin`) USING BTREE,
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`idProcOpFin`) REFERENCES `proceso_operativo_fin` (`idProcOpFin`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of produccion
-- ----------------------------
INSERT INTO `produccion` VALUES (6, 8, 1, '2024-08-08 14:45:58', '0000-00-00 00:00:00');
INSERT INTO `produccion` VALUES (7, 9, 1, '2024-08-08 17:03:02', '0000-00-00 00:00:00');
INSERT INTO `produccion` VALUES (8, 10, 1, '2024-08-08 17:37:28', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (36, 36, 'PolProm202403', 'Polera Promocion Escolar', 'Polera promocion colegio San Sebastian', 'Uni', 150.00, '2024-07-24 12:46:18', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (37, 35, 'BluCda0524', 'Blusa Ceda Blanca', 'Blusa ceda blanca dama', 'Uni', 80.00, '2024-07-24 12:47:22', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (38, 34, 'PantSol0525', 'Pantalon Soldadura', 'Pantalon de soldadura empresa Soldadora', 'Docena', 960.00, '2024-07-24 12:48:43', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (39, 33, 'CamVarCole0324', 'Camisa Varon Colegio', 'Camisa varon colegio san sebastian', 'Uni', 60.00, '2024-07-24 12:49:41', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (40, 32, 'PolEdFisUnx0325', 'Polos Ed Fisica Unisex', 'Polos educacion fisica colegio san sebastian', 'Docena', 480.00, '2024-07-24 12:51:01', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (41, 36, '123456', 'productoNuevo', 'prueba', 'Uni', 1.00, '2024-07-25 14:35:02', '0000-00-00 00:00:00');

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
  `idProcOp` int NULL DEFAULT NULL,
  `nombreSalMprima` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaSalMprima` date NOT NULL,
  `igvSalMprima` varchar(5) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `subTotalSalMprima` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `totalSalMprima` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `salJsonMprima` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `idPedido` int NULL DEFAULT NULL,
  PRIMARY KEY (`idSalMprima`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salida_mprima
-- ----------------------------
INSERT INTO `salida_mprima` VALUES (19, 47, 'Est veniam asperio', '2005-01-27', '0', '1756.30', '1756.30', '{\"producto0\":{\"codProdIng\":\"29\",\"nombreProdIng\":\"Holi negro 3.5\",\"codigoProdIng\":\"HilNeg202503\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"40.00\"},\"producto1\":{\"codProdIng\":\"28\",\"nombreProdIng\":\"Rollo tela ceda blanco\",\"codigoProdIng\":\"RollTelCedBla202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"900.00\"},\"producto2\":{\"codProdIng\":\"27\",\"nombreProdIng\":\"Rollo tela dril azul\",\"codigoProdIng\":\"RollTelDri202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"800.00\"},\"producto3\":{\"codProdIng\":\"26\",\"nombreProdIng\":\"Botones de pantalones hombre\",\"codigoProdIng\":\"Boto202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"1.30\"},\"producto4\":{\"codProdIng\":\"25\",\"nombreProdIng\":\"Cierre Casacas Promo\",\"codigoProdIng\":\"CieCasProm202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"15.00\"}}', '2024-08-08 12:43:40', '2024-08-08 12:44:02', 8);
INSERT INTO `salida_mprima` VALUES (20, 48, 'Vero Nam pariatur O', '2019-11-08', '0', '1756.30', '1756.30', '{\"producto0\":{\"codProdIng\":\"29\",\"nombreProdIng\":\"Holi negro 3.5\",\"codigoProdIng\":\"HilNeg202503\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"40.00\"},\"producto1\":{\"codProdIng\":\"28\",\"nombreProdIng\":\"Rollo tela ceda blanco\",\"codigoProdIng\":\"RollTelCedBla202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"900.00\"},\"producto2\":{\"codProdIng\":\"27\",\"nombreProdIng\":\"Rollo tela dril azul\",\"codigoProdIng\":\"RollTelDri202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"800.00\"},\"producto3\":{\"codProdIng\":\"26\",\"nombreProdIng\":\"Botones de pantalones hombre\",\"codigoProdIng\":\"Boto202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"1.30\"},\"producto4\":{\"codProdIng\":\"25\",\"nombreProdIng\":\"Cierre Casacas Promo\",\"codigoProdIng\":\"CieCasProm202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"15.00\"}}', '2024-08-08 13:43:06', '2024-08-08 13:43:34', 8);

-- ----------------------------
-- Table structure for salida_prod
-- ----------------------------
DROP TABLE IF EXISTS `salida_prod`;
CREATE TABLE `salida_prod`  (
  `idSalProd` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NULL DEFAULT NULL,
  `nombreSalProd` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fechaSalProd` date NOT NULL,
  `igvSalProd` varchar(5) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `subTotalSalProd` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `totalSalProd` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `salJsonProd` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idSalProd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salida_prod
-- ----------------------------

-- ----------------------------
-- Table structure for tipo_proceso
-- ----------------------------
DROP TABLE IF EXISTS `tipo_proceso`;
CREATE TABLE `tipo_proceso`  (
  `idTipoProc` int NOT NULL AUTO_INCREMENT,
  `descripcionTipoProc` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `idFichaProc` int NULL DEFAULT NULL,
  `nombreTipoProc` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idTipoProc`) USING BTREE,
  INDEX `fk_idFichaProc`(`idFichaProc`) USING BTREE,
  CONSTRAINT `fk_idFichaProc` FOREIGN KEY (`idFichaProc`) REFERENCES `ficha_proceso` (`idFichaProc`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_proceso
-- ----------------------------
INSERT INTO `tipo_proceso` VALUES (1, 'proceso1', '2024-02-16 12:09:23', '2024-02-16 12:09:23', 3, 'proceso ya adjuntado xd');

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 1, 'dfrida', 'Administrador', 'administrador', '$argon2id$v=19$m=4096,t=2,p=2$ZURZWG0yNkNOZVJTLlg5Lw$MvzbwXUNlV+Inxssd1nN+A8EN5Il6CdSAs7pTc3szJk', '2024-08-08 08:35:26', '2024-02-16 12:09:23', '2024-02-16 12:09:23');
INSERT INTO `usuario` VALUES (7, 2, 'alex', 'alex administrativo', 'flores', '$argon2id$v=19$m=4096,t=2,p=2$N0RQdHo5MXhOb1ZPdS45Wg$lk4EN49DUl5YTX+omAM/qpOZZG1P4adfpdAWl/IFSG4', '2024-07-16 15:02:17', '2024-07-16 15:02:09', '2024-07-16 15:02:09');

SET FOREIGN_KEY_CHECKS = 1;
