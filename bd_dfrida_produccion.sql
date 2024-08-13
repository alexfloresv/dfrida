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

 Date: 13/08/2024 16:49:37
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
INSERT INTO `almacen_mprima` VALUES (1, 29, 'HilNeg202503', 'Holi negro 3.5', 'Docena', '9', '400.00', '2024-07-25 10:14:28', '2024-08-12 13:26:02');
INSERT INTO `almacen_mprima` VALUES (2, 28, 'RollTelCedBla202405', 'Rollo tela ceda blanco', 'Uni', '10', '9000.00', '2024-07-25 10:14:51', '2024-08-10 09:57:29');
INSERT INTO `almacen_mprima` VALUES (3, 27, 'RollTelDri202405', 'Rollo tela dril azul', 'Uni', '10', '8000.00', '2024-07-25 10:15:01', '2024-08-10 09:57:29');
INSERT INTO `almacen_mprima` VALUES (4, 26, 'Boto202405', 'Botones de pantalones hombre', 'Uni', '10', '13.00', '2024-07-25 10:15:02', '2024-08-10 09:57:29');
INSERT INTO `almacen_mprima` VALUES (5, 25, 'CieCasProm202405', 'Cierre Casacas Promo', 'Uni', '10', '150.00', '2024-07-25 10:15:03', '2024-08-10 09:57:29');

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
INSERT INTO `almacen_prod` VALUES (24, 40, 'PolEdFisUnx0325', 'Polos Ed Fisica Unisex', 'Docena', '15', '4800.00', '2024-07-24 13:02:20', '2024-08-12 08:50:14');
INSERT INTO `almacen_prod` VALUES (25, 39, 'CamVarCole0324', 'Camisa Varon Colegio', 'Uni', '15', '6000.00', '2024-07-24 13:02:54', '2024-08-12 08:50:14');
INSERT INTO `almacen_prod` VALUES (26, 37, 'BluCda0524', 'Blusa Ceda Blanca', 'Uni', '18', '8000.00', '2024-07-24 13:03:19', '2024-08-12 08:50:49');
INSERT INTO `almacen_prod` VALUES (27, 38, 'PantSol0525', 'Pantalon Soldadura', 'Docena', '18', '28800.00', '2024-07-24 13:04:15', '2024-08-12 08:50:48');
INSERT INTO `almacen_prod` VALUES (28, 36, 'PolProm202403', 'Polera Promocion Escolar', 'Uni', '10', '7500.00', '2024-07-24 13:04:16', '2024-08-10 12:56:45');
INSERT INTO `almacen_prod` VALUES (34, 41, '123456', 'productoNuevo', 'Uni', '15', '10.00', '2024-07-25 14:35:17', '2024-08-12 08:50:14');

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
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES (10, 'cliente prueba 2', 'cliente prueba 2', 'cliente prueba 2', 'cliente prueba 2@mailinator.com', 'cliente prueba 2', 16, 'cliente prueba 2', 2, '2024-06-25 09:30:34', '2024-08-13 11:46:46');
INSERT INTO `cliente` VALUES (11, 'Cliente prueba', 'Cliente prueba', 'Cliente prueba', 'Cliente prueba@mailinator.com', 'Cliente prueba', 94, 'Cliente prueba', 2, '2024-06-25 09:31:42', '2024-08-13 11:46:31');
INSERT INTO `cliente` VALUES (12, 'HOFMANN ENGINEERING PERU SAC', '20557715372', 'RAUL APAZA', 'raul.apaza@hofmannengineerign.com', 'LA JOYA', 994242441, '', 1, '2024-08-13 11:28:52', '2024-08-13 11:28:52');
INSERT INTO `cliente` VALUES (13, 'P&S PROSERGE SRL', '20539399536', 'VICTOR RENGIFO', '', 'URB. CABAÑA MARIA MZ. M - LT. 8', 987898243, '', 1, '2024-08-13 11:33:22', '2024-08-13 11:33:22');
INSERT INTO `cliente` VALUES (14, 'P & P DISMAT MEDIC  EIRL', '20509021881', 'STER', '', 'CALLE LADISLAO CABRERA VALDEZ URB. PABLO VI', 957999530, '', 1, '2024-08-13 11:45:20', '2024-08-13 11:45:20');

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
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cotizacion
-- ----------------------------
INSERT INTO `cotizacion` VALUES (20, 'cotizacion2', '1981-10-19', 'Autem ut enim unde o', 'Asperiores aliqua D', 13, 'Explicabo Et hic ut', 42, 'Dolore laborum volup', 'Sint illum consequa', 'Quae omnis obcaecati', '{\"producto0\":{\"codProdCoti\":\"41\",\"nombreProdCoti\":\"productoNuevo\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"5\",\"precioProdCoti\":\"5.00\"},\"producto1\":{\"codProdCoti\":\"40\",\"nombreProdCoti\":\"Polos Ed Fisica Unisex\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"5\",\"precioProdCoti\":\"2400.00\"},\"producto2\":{\"codProdCoti\":\"39\",\"nombreProdCoti\":\"Camisa Varon Colegio\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"5\",\"precioProdCoti\":\"300.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"29\",\"nombreProdMprimaCoti\":\"Holi negro 3.5\",\"unidadProdMprimaCoti\":\"Docena\",\"cantidadProdMprimaCoti\":\"5\",\"precioProdMprimaCoti\":\"200.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"28\",\"nombreProdMprimaCoti\":\"Rollo tela ceda blanco\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"5\",\"precioProdMprimaCoti\":\"4500.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"27\",\"nombreProdMprimaCoti\":\"Rollo tela dril azul\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"5\",\"precioProdMprimaCoti\":\"4000.00\"}}', 2705.00, 8700.00, 486.90, 2705.00, 3191.90, 2, '2024-08-09 12:44:31', '2024-08-12 15:20:52');
INSERT INTO `cotizacion` VALUES (21, 'cotizacion 1', '1980-05-01', 'Ut id mollit autem s', 'Officiis fuga Earum', 53, 'Fugit hic magna ess', 67, 'Rerum proident dolo', 'Aliquam dolorum itaq', 'Voluptatibus molesti', '{\"producto0\":{\"codProdCoti\":\"38\",\"nombreProdCoti\":\"Pantalon Soldadura\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"8\",\"precioProdCoti\":\"7680.00\"},\"producto1\":{\"codProdCoti\":\"37\",\"nombreProdCoti\":\"Blusa Ceda Blanca\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"8\",\"precioProdCoti\":\"640.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"26\",\"nombreProdMprimaCoti\":\"Botones de pantalones hombre\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"9\",\"precioProdMprimaCoti\":\"11.70\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"25\",\"nombreProdMprimaCoti\":\"Cierre Casacas Promo\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"9\",\"precioProdMprimaCoti\":\"135.00\"}}', 8320.00, 146.70, 1497.60, 8320.00, 9817.60, 2, '2024-08-09 12:44:54', '2024-08-12 15:20:47');
INSERT INTO `cotizacion` VALUES (22, 'prueba 4', '1977-03-19', 'Culpa anim voluptas ', 'Ut veritatis occaeca', 71, 'Repellendus Quasi t', 78, 'Molestias eum veniam', 'In nihil est irure t', 'Obcaecati iusto erro', '{\"producto0\":{\"codProdCoti\":\"41\",\"nombreProdCoti\":\"productoNuevo\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"1.00\"},\"producto1\":{\"codProdCoti\":\"40\",\"nombreProdCoti\":\"Polos Ed Fisica Unisex\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"480.00\"},\"producto2\":{\"codProdCoti\":\"39\",\"nombreProdCoti\":\"Camisa Varon Colegio\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto3\":{\"codProdCoti\":\"38\",\"nombreProdCoti\":\"Pantalon Soldadura\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"960.00\"},\"producto4\":{\"codProdCoti\":\"37\",\"nombreProdCoti\":\"Blusa Ceda Blanca\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"80.00\"},\"producto5\":{\"codProdCoti\":\"36\",\"nombreProdCoti\":\"Polera Promocion Escolar\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"150.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"25\",\"nombreProdMprimaCoti\":\"Cierre Casacas Promo\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"15.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"26\",\"nombreProdMprimaCoti\":\"Botones de pantalones hombre\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"1.30\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"27\",\"nombreProdMprimaCoti\":\"Rollo tela dril azul\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"800.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"28\",\"nombreProdMprimaCoti\":\"Rollo tela ceda blanco\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"900.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"29\",\"nombreProdMprimaCoti\":\"Holi negro 3.5\",\"unidadProdMprimaCoti\":\"Docena\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"40.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"28\",\"nombreProdMprimaCoti\":\"Rollo tela ceda blanco\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"900.00\"},\"productoPrima6\":{\"codProdMprimaCoti\":\"27\",\"nombreProdMprimaCoti\":\"Rollo tela dril azul\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"800.00\"},\"productoPrima7\":{\"codProdMprimaCoti\":\"26\",\"nombreProdMprimaCoti\":\"Botones de pantalones hombre\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"1.30\"}}', 1731.00, 3457.60, 311.58, 1731.00, 2042.58, 2, '2024-08-10 09:51:01', '2024-08-12 15:20:41');
INSERT INTO `cotizacion` VALUES (23, 'Hic amet quia ex do', '1998-10-10', 'Dolorum minima ipsam', 'Enim labore eos in q', 75, 'Rerum enim sint at p', 54, 'Eiusmod quaerat ut q', 'Irure quaerat expedi', 'Earum ea rerum quaer', '{\"producto0\":{\"codProdCoti\":\"41\",\"nombreProdCoti\":\"productoNuevo\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"15\",\"precioProdCoti\":\"15.00\"},\"producto1\":{\"codProdCoti\":\"37\",\"nombreProdCoti\":\"Blusa Ceda Blanca\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"80.00\"},\"producto2\":{\"codProdCoti\":\"36\",\"nombreProdCoti\":\"Polera Promocion Escolar\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"150.00\"},\"producto3\":{\"codProdCoti\":\"39\",\"nombreProdCoti\":\"Camisa Varon Colegio\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"29\",\"nombreProdMprimaCoti\":\"Holi negro 3.5\",\"unidadProdMprimaCoti\":\"Docena\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"40.00\"}}', 305.00, 40.00, 54.90, 305.00, 359.90, 2, '2024-08-12 12:44:43', '2024-08-12 15:22:03');

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
INSERT INTO `ficha_proceso` VALUES (3, '213213123213213', 'Quae esse dolorem re', 'Exercitation autem u', '{\"procesoTrabajo0\":{\"procesosAdd\":\"proceso 1\",\"tiempoAdd\":\"1 Horas\",\"observacionAdd\":\"proceso 1 \"},\"procesoTrabajo1\":{\"procesosAdd\":\"proceso 2\",\"tiempoAdd\":\"2 Dias\",\"observacionAdd\":\"proceso 2\"}}', NULL, '2024-07-11 13:29:01', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_mprima
-- ----------------------------
INSERT INTO `ingreso_mprima` VALUES (15, 'Asperiores molestiae', '1979-07-25', '0', '17563.00', '17563.00', '{\"producto0\":{\"codProdIng\":\"29\",\"nombreProdIng\":\"Holi negro 3.5\",\"codigoProdIng\":\"HilNeg202503\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"400.00\"},\"producto1\":{\"codProdIng\":\"28\",\"nombreProdIng\":\"Rollo tela ceda blanco\",\"codigoProdIng\":\"RollTelCedBla202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"9000.00\"},\"producto2\":{\"codProdIng\":\"27\",\"nombreProdIng\":\"Rollo tela dril azul\",\"codigoProdIng\":\"RollTelDri202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"8000.00\"},\"producto3\":{\"codProdIng\":\"26\",\"nombreProdIng\":\"Botones de pantalones hombre\",\"codigoProdIng\":\"Boto202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"13.00\"},\"producto4\":{\"codProdIng\":\"25\",\"nombreProdIng\":\"Cierre Casacas Promo\",\"codigoProdIng\":\"CieCasProm202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"150.00\"}}', '2024-07-26 11:14:34', '0000-00-00 00:00:00');
INSERT INTO `ingreso_mprima` VALUES (16, 'Eum qui consectetur', '1996-12-14', '0', '5268.90', '5268.90', '{\"producto0\":{\"codProdIng\":\"29\",\"nombreProdIng\":\"Holi negro 3.5\",\"codigoProdIng\":\"HilNeg202503\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"3\",\"precioProdIng\":\"120.00\"},\"producto1\":{\"codProdIng\":\"28\",\"nombreProdIng\":\"Rollo tela ceda blanco\",\"codigoProdIng\":\"RollTelCedBla202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"3\",\"precioProdIng\":\"2700.00\"},\"producto2\":{\"codProdIng\":\"27\",\"nombreProdIng\":\"Rollo tela dril azul\",\"codigoProdIng\":\"RollTelDri202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"3\",\"precioProdIng\":\"2400.00\"},\"producto3\":{\"codProdIng\":\"26\",\"nombreProdIng\":\"Botones de pantalones hombre\",\"codigoProdIng\":\"Boto202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"3\",\"precioProdIng\":\"3.90\"},\"producto4\":{\"codProdIng\":\"25\",\"nombreProdIng\":\"Cierre Casacas Promo\",\"codigoProdIng\":\"CieCasProm202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"3\",\"precioProdIng\":\"45.00\"}}', '2024-08-10 09:54:31', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_prod
-- ----------------------------
INSERT INTO `ingreso_prod` VALUES (70, 'prueba 3', '2024-08-12', '0', '2705.00', '2705.00', '{\"producto0\":{\"codProdIng\":\"41\",\"nombreProdIng\":\"productoNuevo\",\"codigoProdIng\":\"123456\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"5\",\"precioProdIng\":\"5.00\"},\"producto1\":{\"codProdIng\":\"40\",\"nombreProdIng\":\"Polos Ed Fisica Unisex\",\"codigoProdIng\":\"PolEdFisUnx0325\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"5\",\"precioProdIng\":\"2400.00\"},\"producto2\":{\"codProdIng\":\"39\",\"nombreProdIng\":\"Camisa Varon Colegio\",\"codigoProdIng\":\"CamVarCole0324\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"5\",\"precioProdIng\":\"300.00\"}}', '2024-08-12 08:50:14', '0000-00-00 00:00:00');
INSERT INTO `ingreso_prod` VALUES (71, 'prueba ingreso prueba 4', '2024-08-12', '0', '8320.00', '8320.00', '{\"producto0\":{\"codProdIng\":\"38\",\"nombreProdIng\":\"Pantalon Soldadura\",\"codigoProdIng\":\"PantSol0525\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"8\",\"precioProdIng\":\"7680.00\"},\"producto1\":{\"codProdIng\":\"37\",\"nombreProdIng\":\"Blusa Ceda Blanca\",\"codigoProdIng\":\"BluCda0524\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"8\",\"precioProdIng\":\"640.00\"}}', '2024-08-12 08:50:49', '0000-00-00 00:00:00');

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
  `idProv` int NULL DEFAULT NULL,
  PRIMARY KEY (`idMprima`) USING BTREE,
  INDEX `idCatMprima`(`idCatMprima`) USING BTREE,
  CONSTRAINT `materia_prima_ibfk_1` FOREIGN KEY (`idCatMprima`) REFERENCES `categoria_mprima` (`idCatMPrima`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of materia_prima
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of merma
-- ----------------------------
INSERT INTO `merma` VALUES (3, 49, 21, '2024-08-09 12:54:43', '0000-00-00 00:00:00', '2024-08-09', '1', NULL, 'Merma de proceso operativo Sin Aceptar', NULL);
INSERT INTO `merma` VALUES (4, 50, 22, '2024-08-09 12:54:47', '0000-00-00 00:00:00', '2024-08-09', '1', NULL, 'Merma de proceso operativo Sin Aceptar', NULL);
INSERT INTO `merma` VALUES (5, 51, 23, '2024-08-10 10:02:34', '0000-00-00 00:00:00', '2024-08-10', '1', NULL, 'Merma de proceso operativo Sin Aceptar', NULL);
INSERT INTO `merma` VALUES (6, 51, 23, '2024-08-10 12:29:02', '0000-00-00 00:00:00', '2024-08-10', '1', NULL, 'Merma de proceso operativo Sin Aceptar', NULL);
INSERT INTO `merma` VALUES (7, 52, 24, '2024-08-12 13:26:31', '0000-00-00 00:00:00', '2024-08-12', '1', NULL, 'Merma de proceso operativo Sin Aceptar', NULL);

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
  `idSalMprima` int NULL DEFAULT NULL,
  PRIMARY KEY (`idPedido`) USING BTREE,
  INDEX `idCli`(`idCli`) USING BTREE,
  INDEX `fk_idCoti`(`idCoti`) USING BTREE,
  INDEX `fk_idFichaTec`(`idFichaTec`) USING BTREE,
  CONSTRAINT `fk_idCoti` FOREIGN KEY (`idCoti`) REFERENCES `cotizacion` (`idCoti`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_idFichaTec` FOREIGN KEY (`idFichaTec`) REFERENCES `ficha_tecnica` (`idFichaTec`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCli`) REFERENCES `cliente` (`idCli`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pedido
-- ----------------------------
INSERT INTO `pedido` VALUES (10, 11, 'pedido 1', 'pedido 1', '2024-08-09', '2024-08-09 12:47:23', '2024-08-09 12:54:43', 21, 190, 3, NULL);
INSERT INTO `pedido` VALUES (11, 11, 'pedido2', 'pedido2', '2024-08-09', '2024-08-09 12:47:41', '2024-08-09 12:54:47', 20, 190, 3, NULL);
INSERT INTO `pedido` VALUES (12, 11, 'Eu id et consectetu', 'Eligendi doloribus n', '2009-01-10', '2024-08-10 09:51:38', '2024-08-10 12:29:02', 22, 190, 3, NULL);
INSERT INTO `pedido` VALUES (13, 10, 'Adipisicing rerum la', 'Rerum quidem error i', '2015-06-01', '2024-08-12 12:44:58', '2024-08-12 13:26:31', 23, 190, 3, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo
-- ----------------------------
INSERT INTO `proceso_operativo` VALUES (49, 1, 10, 21, 'proceso oeprativo 1', 5, '2024-08-09 12:50:07', '2024-08-09 12:54:43', 'proceso oeprativo 1', '2024-08-09', '2024-08-09', '2024-08-09');
INSERT INTO `proceso_operativo` VALUES (50, 1, 11, 22, 'proceso oeprativo pedido 2', 5, '2024-08-09 12:50:38', '2024-08-09 12:54:47', 'proceso oeprativo pedido 2', '2024-08-09', '2024-08-09', '2024-08-09');
INSERT INTO `proceso_operativo` VALUES (51, 1, 12, 23, 'proceso prueba 4', 5, '2024-08-10 09:59:27', '2024-08-10 12:29:02', 'proceso prueba 4', '2024-08-10', '2024-08-10', '2024-10-03');
INSERT INTO `proceso_operativo` VALUES (52, 1, 13, 24, 'Impedit impedit al', 5, '2024-08-12 13:26:25', '2024-08-12 13:26:31', 'Ex quidem laboriosam', '1977-08-09', '2024-08-12', '1991-05-20');

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo_fin
-- ----------------------------
INSERT INTO `proceso_operativo_fin` VALUES (11, 49, 1, '2024-08-09 12:54:43', '0000-00-00 00:00:00');
INSERT INTO `proceso_operativo_fin` VALUES (12, 50, 1, '2024-08-09 12:54:47', '0000-00-00 00:00:00');
INSERT INTO `proceso_operativo_fin` VALUES (13, 51, 1, '2024-08-10 10:02:34', '0000-00-00 00:00:00');
INSERT INTO `proceso_operativo_fin` VALUES (14, 51, 1, '2024-08-10 12:29:02', '0000-00-00 00:00:00');
INSERT INTO `proceso_operativo_fin` VALUES (15, 52, 1, '2024-08-12 13:26:31', '0000-00-00 00:00:00');

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
  `fechaAceptProducc` date NULL DEFAULT NULL,
  `idIngProd` int NULL DEFAULT NULL,
  `nombreProduccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idProduccion`) USING BTREE,
  INDEX `idProcOpFin`(`idProcOpFin`) USING BTREE,
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`idProcOpFin`) REFERENCES `proceso_operativo_fin` (`idProcOpFin`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of produccion
-- ----------------------------
INSERT INTO `produccion` VALUES (9, 11, 1, '2024-08-10 12:31:38', '2024-08-12 08:50:49', '2024-08-10', 71, 'proceso oeprativo 1');
INSERT INTO `produccion` VALUES (10, 12, 1, '2024-08-09 17:49:52', '2024-08-12 08:50:14', '2024-08-09', 70, 'produccion ultima');
INSERT INTO `produccion` VALUES (11, 13, 1, '2024-08-10 11:45:48', '2024-08-10 12:26:01', '2024-08-10', 61, 'proceso prueba 4');
INSERT INTO `produccion` VALUES (12, 14, 2, '2024-08-10 12:29:02', '2024-08-10 12:56:39', '2024-08-10', 66, NULL);
INSERT INTO `produccion` VALUES (13, 15, 2, '2024-08-12 13:39:58', '0000-00-00 00:00:00', '2024-08-12', NULL, 'Ex quidem laboriosam');

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
  `rucProv` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `nombreProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `correoProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `direccionProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `celularProv` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `detalleProv` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `estadoProv` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProv`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proveedores
-- ----------------------------
INSERT INTO `proveedores` VALUES (12, '', '2147483647', 'VASQUEZ ESPINOZA CAMILA ALAEXANDA', '', 'SAN CAMILO TIENDA 316', '0', '', 1, '2024-08-13 11:46:06', '2024-08-13 11:46:06');
INSERT INTO `proveedores` VALUES (13, '', '2147483647', 'TEXTILES JOSE ANTONIO SOCIEDAD ANONIMA CERRADA', '', 'GAL, SAN CAMILO SER FISO NRO. 318 INT. 102', '0', '', 1, '2024-08-13 12:14:10', '2024-08-13 12:14:10');
INSERT INTO `proveedores` VALUES (14, 'NABILA S.A.C.', '2147483647', 'NABILA', 'ventas@nabila.pe', 'Jr. Lucanas N°: 913-919 La Victoria Lima', '0', '', 1, '2024-08-13 12:15:47', '2024-08-13 12:15:47');
INSERT INTO `proveedores` VALUES (15, '', '2147483647', 'CHOQUE BLANCO DE GOMEZ NINOSKA YENNY', '', 'CAL. PASEO AREQUIPA 153 URB. ALTO SAN MARTIN MARIANO MELGAR - AREQUIPA ', '0', '', 1, '2024-08-13 12:16:49', '2024-08-13 12:16:49');
INSERT INTO `proveedores` VALUES (16, 'X PANDEX E.I.R.L.', '2147483647', 'X PANDEX ', '', 'CAL. MARISCAL RAMON CASTILLA 613  MIRAFLORES - AREQUIPA -', '0', '', 1, '2024-08-13 12:30:29', '2024-08-13 12:30:29');
INSERT INTO `proveedores` VALUES (17, 'Importaciones y Representaciones', '2147483647', 'LEON', '', 'Calle San Camilo 403 Int B AREQUIPA', '0', '', 1, '2024-08-13 12:31:01', '2024-08-13 12:31:01');
INSERT INTO `proveedores` VALUES (18, 'M', '2147483647', 'MALUTEX', '', 'CALLE PERÚ 319 INT. 4 AREQUIPA -', '0', '', 1, '2024-08-13 12:32:17', '2024-08-13 12:32:17');
INSERT INTO `proveedores` VALUES (19, 'TABJA ABUAPARA NEME ELIZABETH', '2147483647', 'DE MODA', '', 'CAL. SAN CAMILO 235  AREQUIPA ', '0', '', 1, '2024-08-13 12:33:29', '2024-08-13 12:33:29');
INSERT INTO `proveedores` VALUES (20, '', '2147483647', 'TEXTILES JOSE ANTONIO SOCIEDAD ANONIMA CERRADA', '', 'CAL. SAN CAMILO 3ER PISO 318 OTR. C.C.CRISTO DE LA CARIDAD INT. 102', '0', '', 1, '2024-08-13 12:34:46', '2024-08-13 12:37:01');

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
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salida_mprima
-- ----------------------------
INSERT INTO `salida_mprima` VALUES (21, 49, 'salida pedido 1', '2024-08-09', '0', '146.70', '146.70', '{\"producto0\":{\"codProdIng\":\"26\",\"nombreProdIng\":\"Botones de pantalones hombre\",\"codigoProdIng\":\"Boto202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"48\",\"precioProdIng\":\"11.70\"},\"producto1\":{\"codProdIng\":\"25\",\"nombreProdIng\":\"Cierre Casacas Promo\",\"codigoProdIng\":\"CieCasProm202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"48\",\"precioProdIng\":\"135.00\"}}', '2024-08-09 12:48:42', '2024-08-09 12:50:07', 10);
INSERT INTO `salida_mprima` VALUES (22, 50, 'salida pedido 2', '2024-08-09', '0', '8700.00', '8700.00', '{\"producto0\":{\"codProdIng\":\"29\",\"nombreProdIng\":\"Holi negro 3.5\",\"codigoProdIng\":\"HilNeg202503\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"48\",\"precioProdIng\":\"200.00\"},\"producto1\":{\"codProdIng\":\"28\",\"nombreProdIng\":\"Rollo tela ceda blanco\",\"codigoProdIng\":\"RollTelCedBla202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"48\",\"precioProdIng\":\"4500.00\"},\"producto2\":{\"codProdIng\":\"27\",\"nombreProdIng\":\"Rollo tela dril azul\",\"codigoProdIng\":\"RollTelDri202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"48\",\"precioProdIng\":\"4000.00\"}}', '2024-08-09 12:49:09', '2024-08-09 12:50:38', 11);
INSERT INTO `salida_mprima` VALUES (23, 0, 'pedido 4', '2024-08-10', '0', '3457.60', '3457.60', '{\"producto0\":{\"codProdIng\":\"25\",\"nombreProdIng\":\"Cierre Casacas Promo\",\"codigoProdIng\":\"CieCasProm202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"15.00\"},\"producto1\":{\"codProdIng\":\"26\",\"nombreProdIng\":\"Botones de pantalones hombre\",\"codigoProdIng\":\"Boto202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"1.30\"},\"producto2\":{\"codProdIng\":\"27\",\"nombreProdIng\":\"Rollo tela dril azul\",\"codigoProdIng\":\"RollTelDri202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"800.00\"},\"producto3\":{\"codProdIng\":\"28\",\"nombreProdIng\":\"Rollo tela ceda blanco\",\"codigoProdIng\":\"RollTelCedBla202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"900.00\"},\"producto4\":{\"codProdIng\":\"29\",\"nombreProdIng\":\"Holi negro 3.5\",\"codigoProdIng\":\"HilNeg202503\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"40.00\"},\"producto5\":{\"codProdIng\":\"28\",\"nombreProdIng\":\"Rollo tela ceda blanco\",\"codigoProdIng\":\"RollTelCedBla202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"900.00\"},\"producto6\":{\"codProdIng\":\"27\",\"nombreProdIng\":\"Rollo tela dril azul\",\"codigoProdIng\":\"RollTelDri202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"800.00\"},\"producto7\":{\"codProdIng\":\"26\",\"nombreProdIng\":\"Botones de pantalones hombre\",\"codigoProdIng\":\"Boto202405\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"1.30\"}}', '2024-08-10 09:57:29', '2024-08-10 10:58:05', 12);
INSERT INTO `salida_mprima` VALUES (24, 52, 'Reprehenderit quidem', '2024-08-12', '0', '40.00', '40.00', '{\"producto0\":{\"codProdIng\":\"29\",\"nombreProdIng\":\"Holi negro 3.5\",\"codigoProdIng\":\"HilNeg202503\",\"unidadProdIng\":\"Docena\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"40.00\"}}', '2024-08-12 13:26:02', '2024-08-12 13:26:25', 13);

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
INSERT INTO `usuario` VALUES (1, 1, 'dfrida', 'Administrador', 'administrador', '$argon2id$v=19$m=4096,t=2,p=2$ZURZWG0yNkNOZVJTLlg5Lw$MvzbwXUNlV+Inxssd1nN+A8EN5Il6CdSAs7pTc3szJk', '2024-08-13 14:32:57', '2024-02-16 12:09:23', '2024-02-16 12:09:23');
INSERT INTO `usuario` VALUES (7, 2, 'alex', 'alex administrativo', 'flores', '$argon2id$v=19$m=4096,t=2,p=2$N0RQdHo5MXhOb1ZPdS45Wg$lk4EN49DUl5YTX+omAM/qpOZZG1P4adfpdAWl/IFSG4', '2024-07-16 15:02:17', '2024-07-16 15:02:09', '2024-07-16 15:02:09');

SET FOREIGN_KEY_CHECKS = 1;
