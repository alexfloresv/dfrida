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

 Date: 14/08/2024 17:35:57
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
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of almacen_mprima
-- ----------------------------
INSERT INTO `almacen_mprima` VALUES (6, 33, 'T1234555', 'boton 1cm', 'Uni', '94', '30.00', '2024-08-14 09:12:20', '2024-08-14 16:14:27');
INSERT INTO `almacen_mprima` VALUES (7, 32, 'T123459', 'hilo blanco', 'Uni', '94', '700.00', '2024-08-14 09:12:20', '2024-08-14 16:14:27');
INSERT INTO `almacen_mprima` VALUES (8, 31, 'T123456', 'dril', 'metros', '94', '1700.00', '2024-08-14 09:12:20', '2024-08-14 16:14:27');
INSERT INTO `almacen_mprima` VALUES (9, 30, 'T12345', 'ceda', 'Metros', '94', '1400.00', '2024-08-14 09:12:20', '2024-08-14 16:14:27');
INSERT INTO `almacen_mprima` VALUES (10, 34, 'T12345888', 'boton casaca promo', 'Uni', '94', '50.00', '2024-08-14 09:12:20', '2024-08-14 16:14:27');

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
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of almacen_prod
-- ----------------------------
INSERT INTO `almacen_prod` VALUES (35, 45, '1234568', 'Blusa Ceda Blanca', 'Uni', '1', '20.00', '2024-08-14 09:56:06', '0000-00-00 00:00:00');
INSERT INTO `almacen_prod` VALUES (36, 44, '1234567', 'Camisa Varon Colegio', 'Uni', '1', '50.00', '2024-08-14 09:56:06', '0000-00-00 00:00:00');
INSERT INTO `almacen_prod` VALUES (37, 43, '123456', 'chaqueta', 'Uni', '1', '30.00', '2024-08-14 09:56:06', '0000-00-00 00:00:00');
INSERT INTO `almacen_prod` VALUES (38, 42, '123', 'pantalon dril', 'Uni', '1', '40.00', '2024-08-14 09:56:06', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_mprima
-- ----------------------------
INSERT INTO `categoria_mprima` VALUES (10, 'botones', '2024-08-14 09:04:28', '0000-00-00 00:00:00');
INSERT INTO `categoria_mprima` VALUES (11, 'Botones Pantalon', '2024-08-14 09:04:35', '0000-00-00 00:00:00');
INSERT INTO `categoria_mprima` VALUES (12, 'hilo 3ml', '2024-08-14 09:04:40', '0000-00-00 00:00:00');
INSERT INTO `categoria_mprima` VALUES (13, 'Tela Ceda Blano', '2024-08-14 09:05:00', '0000-00-00 00:00:00');
INSERT INTO `categoria_mprima` VALUES (14, 'Tela Dril Azul', '2024-08-14 09:05:09', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_prod
-- ----------------------------
INSERT INTO `categoria_prod` VALUES (32, 'Polo', '2024-07-24 12:44:07', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (33, 'Camisa', '2024-07-24 12:44:14', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (34, 'Pantalon', '2024-07-24 12:44:19', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (35, 'Blusa', '2024-07-24 12:44:25', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (36, 'Polera', '2024-07-24 12:44:30', '0000-00-00 00:00:00');
INSERT INTO `categoria_prod` VALUES (37, 'chaqueta', '2024-08-14 09:03:03', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES (10, 'cliente prueba 2', 'cliente prueba 2', 'cliente prueba 2', 'cliente prueba 2@mailinator.com', 'cliente prueba 2', 16, 'cliente prueba 2', 2, '2024-06-25 09:30:34', '2024-08-13 11:46:46');
INSERT INTO `cliente` VALUES (11, 'Cliente prueba', 'Cliente prueba', 'Cliente prueba', 'Cliente prueba@mailinator.com', 'Cliente prueba', 94, 'Cliente prueba', 2, '2024-06-25 09:31:42', '2024-08-13 11:46:31');
INSERT INTO `cliente` VALUES (12, 'HOFMANN ENGINEERING PERU SAC', '20557715372', 'RAUL APAZA', 'raul.apaza@hofmannengineerign.com', 'LA JOYA', 994242441, '', 1, '2024-08-13 11:28:52', '2024-08-13 11:28:52');
INSERT INTO `cliente` VALUES (13, 'P&S PROSERGE SRL', '20539399536', 'VICTOR RENGIFO', '', 'URB. CABAÑA MARIA MZ. M - LT. 8', 987898243, '', 1, '2024-08-13 11:33:22', '2024-08-13 11:33:22');
INSERT INTO `cliente` VALUES (14, 'P & P DISMAT MEDIC  EIRL', '20509021881', 'STER', '', 'CALLE LADISLAO CABRERA VALDEZ URB. PABLO VI', 957999530, '', 1, '2024-08-13 11:45:20', '2024-08-13 11:45:20');
INSERT INTO `cliente` VALUES (15, 'colegio santa clara', '1254879635', 'cliente nuevo de cotizacion', 'clientenuevo1@gmail.com', 'casita del cliente ', 987654321, 'cliente cotizacion', 1, '2024-08-14 09:27:00', '2024-08-14 09:27:00');
INSERT INTO `cliente` VALUES (16, 'cotizacion prueba 1', '2113213123', 'cliente prueba 2 cotizacion', 'correo@gmail.com', 'direccion cliente prueba 2 cotizacion', 65465465, 'Sin Observaciones', 1, '2024-08-14 09:39:04', '2024-08-14 09:39:04');

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
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cotizacion
-- ----------------------------
INSERT INTO `cotizacion` VALUES (27, 'cotizacion 1', '1996-11-17', 'Adipisci iusto qui e', 'Quae quibusdam imped', 2147483647, 'RAUL APAZA', 994242441, 'raul.apaza@hofmannengineerign.com', 'LA JOYA', '', '{\"producto0\":{\"codProdCoti\":\"45\",\"nombreProdCoti\":\"Blusa Ceda Blanca\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"10\",\"precioProdCoti\":\"200.00\"},\"producto1\":{\"codProdCoti\":\"44\",\"nombreProdCoti\":\"Camisa Varon Colegio\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"10\",\"precioProdCoti\":\"500.00\"},\"producto2\":{\"codProdCoti\":\"43\",\"nombreProdCoti\":\"chaqueta\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"10\",\"precioProdCoti\":\"300.00\"},\"producto3\":{\"codProdCoti\":\"42\",\"nombreProdCoti\":\"pantalon dril\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"10\",\"precioProdCoti\":\"400.00\"},\"producto4\":{\"codProdCoti\":\"42\",\"nombreProdCoti\":\"pantalon dril\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"10\",\"precioProdCoti\":\"400.00\"}}', '', 1800.00, 0.00, 324.00, 1800.00, 2124.00, 2, '2024-08-14 13:07:33', '2024-08-14 16:13:36');
INSERT INTO `cotizacion` VALUES (28, 'cotizacion 2', '1997-09-24', 'Elit delectus corp', 'Magni Nam cillum vel', 2147483647, 'STER', 957999530, '', 'CALLE LADISLAO CABRERA VALDEZ URB. PABLO VI', '', '{\"producto0\":{\"codProdCoti\":\"44\",\"nombreProdCoti\":\"Camisa Varon Colegio\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"50.00\"},\"producto1\":{\"codProdCoti\":\"45\",\"nombreProdCoti\":\"Blusa Ceda Blanca\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"20.00\"},\"producto2\":{\"codProdCoti\":\"43\",\"nombreProdCoti\":\"chaqueta\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"30.00\"},\"producto3\":{\"codProdCoti\":\"42\",\"nombreProdCoti\":\"pantalon dril\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"40.00\"},\"producto4\":{\"codProdCoti\":\"43\",\"nombreProdCoti\":\"chaqueta\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"30.00\"},\"producto5\":{\"codProdCoti\":\"44\",\"nombreProdCoti\":\"Camisa Varon Colegio\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"50.00\"}}', '', 220.00, 0.00, 39.60, 220.00, 259.60, 2, '2024-08-14 13:14:35', '2024-08-14 16:13:51');

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
INSERT INTO `ficha_proceso` VALUES (3, 'crear casacas de promocion santa clara', 'casaca promocion', 'Este proceso es especificamente para la creacion de una casaca de promocion para el colegio santa clara', '{\"procesoTrabajo0\":{\"procesosAdd\":\"proceso 1\",\"tiempoAdd\":\"1 Horas\",\"observacionAdd\":\"proceso 1 \"},\"procesoTrabajo1\":{\"procesosAdd\":\"proceso 2\",\"tiempoAdd\":\"2 Dias\",\"observacionAdd\":\"proceso 2\"},\"procesoTrabajo2\":{\"procesosAdd\":\"proceso 3\",\"tiempoAdd\":\"5 Horas\",\"observacionAdd\":\"proceso 3\"},\"procesoTrabajo3\":{\"procesosAdd\":\"proceso 4\",\"tiempoAdd\":\"6 Horas\",\"observacionAdd\":\"proceso 4\"},\"procesoTrabajo4\":{\"procesosAdd\":\"proceso 5\",\"tiempoAdd\":\"1 Dias\",\"observacionAdd\":\"proceso 5\"},\"procesoTrabajo5\":{\"procesosAdd\":\"proceso 6\",\"tiempoAdd\":\"2 Dias\",\"observacionAdd\":\"proceso 6\"},\"procesoTrabajo6\":{\"procesosAdd\":\"proceso 7\",\"tiempoAdd\":\"3 Horas\",\"observacionAdd\":\"proceso 7\"},\"procesoTrabajo7\":{\"procesosAdd\":\"proceso 8\",\"tiempoAdd\":\"8 Horas\",\"observacionAdd\":\"proceso 8\"},\"procesoTrabajo8\":{\"procesosAdd\":\"proceso 9\",\"tiempoAdd\":\"1 Dias\",\"observacionAdd\":\"proceso 9\"},\"procesoTrabajo9\":{\"procesosAdd\":\"proceso 10\",\"tiempoAdd\":\"5 Dias\",\"observacionAdd\":\"proceso 10\"}}', NULL, '2024-07-11 13:29:01', '0000-00-00 00:00:00');

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
INSERT INTO `ficha_tecnica` VALUES (190, 'ficha tecnica producto colegio ', '2024-08-14', 'colegio santa clara', 'producto nuevo', 'codigo 12345', 'alex flores valdez', 987654321, 'santaclara@gmail.com', 'producto para los alumnos de promoscion', '190_fichatectnica1.txt', 2, '2024-07-27 11:10:20', '2024-08-14 09:17:22');

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
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_mprima
-- ----------------------------
INSERT INTO `ingreso_mprima` VALUES (17, 'ingreso materia prima', '2024-08-14', '0', '3880.00', '3880.00', '{\"producto0\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"boton 1cm\",\"codigoProdIng\":\"T1234555\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"100\",\"precioProdIng\":\"30.00\"},\"producto1\":{\"codProdIng\":\"32\",\"nombreProdIng\":\"hilo blanco\",\"codigoProdIng\":\"T123459\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"100\",\"precioProdIng\":\"700.00\"},\"producto2\":{\"codProdIng\":\"31\",\"nombreProdIng\":\"dril\",\"codigoProdIng\":\"T123456\",\"unidadProdIng\":\"metros\",\"cantidadProdIng\":\"100\",\"precioProdIng\":\"1700.00\"},\"producto3\":{\"codProdIng\":\"30\",\"nombreProdIng\":\"ceda\",\"codigoProdIng\":\"T12345\",\"unidadProdIng\":\"Metros\",\"cantidadProdIng\":\"100\",\"precioProdIng\":\"1400.00\"},\"producto4\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"boton casaca promo\",\"codigoProdIng\":\"T12345888\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"100\",\"precioProdIng\":\"50.00\"}}', '2024-08-14 09:12:20', '0000-00-00 00:00:00');
INSERT INTO `ingreso_mprima` VALUES (18, 'ingreso materiales para confeccion', '2024-08-14', '0', '582.00', '582.00', '{\"producto0\":{\"codProdIng\":\"30\",\"nombreProdIng\":\"ceda\",\"codigoProdIng\":\"T12345\",\"unidadProdIng\":\"Metros\",\"cantidadProdIng\":\"15\",\"precioProdIng\":\"210.00\"},\"producto1\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"boton 1cm\",\"codigoProdIng\":\"T1234555\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"15\",\"precioProdIng\":\"4.50\"},\"producto2\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"boton casaca promo\",\"codigoProdIng\":\"T12345888\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"15\",\"precioProdIng\":\"7.50\"},\"producto3\":{\"codProdIng\":\"31\",\"nombreProdIng\":\"dril\",\"codigoProdIng\":\"T123456\",\"unidadProdIng\":\"metros\",\"cantidadProdIng\":\"15\",\"precioProdIng\":\"255.00\"},\"producto4\":{\"codProdIng\":\"32\",\"nombreProdIng\":\"hilo blanco\",\"codigoProdIng\":\"T123459\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"15\",\"precioProdIng\":\"105.00\"}}', '2024-08-14 09:13:07', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_prod
-- ----------------------------
INSERT INTO `ingreso_prod` VALUES (72, 'ingreso produccion ', '2024-08-14', '0', '140.00', '140.00', '{\"producto0\":{\"codProdIng\":\"45\",\"nombreProdIng\":\"Blusa Ceda Blanca\",\"codigoProdIng\":\"1234568\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"20.00\"},\"producto1\":{\"codProdIng\":\"44\",\"nombreProdIng\":\"Camisa Varon Colegio\",\"codigoProdIng\":\"1234567\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"50.00\"},\"producto2\":{\"codProdIng\":\"43\",\"nombreProdIng\":\"chaqueta\",\"codigoProdIng\":\"123456\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"30.00\"},\"producto3\":{\"codProdIng\":\"42\",\"nombreProdIng\":\"pantalon dril\",\"codigoProdIng\":\"123\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"40.00\"}}', '2024-08-14 09:56:06', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of materia_prima
-- ----------------------------
INSERT INTO `materia_prima` VALUES (30, 13, 'T12345', 'ceda', '', 'Metros', 14.00, '2024-08-14 09:06:11', '0000-00-00 00:00:00', 20);
INSERT INTO `materia_prima` VALUES (31, 14, 'T123456', 'dril', '', 'metros', 17.00, '2024-08-14 09:07:04', '0000-00-00 00:00:00', 17);
INSERT INTO `materia_prima` VALUES (32, 12, 'T123459', 'hilo blanco', '', 'Uni', 7.00, '2024-08-14 09:07:40', '0000-00-00 00:00:00', 20);
INSERT INTO `materia_prima` VALUES (33, 11, 'T1234555', 'boton 1cm', '', 'Uni', 0.30, '2024-08-14 09:08:23', '0000-00-00 00:00:00', 19);
INSERT INTO `materia_prima` VALUES (34, 10, 'T12345888', 'boton casaca promo', '', 'Uni', 0.50, '2024-08-14 09:09:48', '0000-00-00 00:00:00', 14);

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
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pedido
-- ----------------------------
INSERT INTO `pedido` VALUES (19, 16, 'pedido1', 'pedido1', '2024-08-14', '2024-08-14 16:13:36', '2024-08-14 17:26:05', 27, 190, 1, NULL);
INSERT INTO `pedido` VALUES (20, 14, 'pedido2', 'pedido2', '2024-08-14', '2024-08-14 16:13:51', '2024-08-14 17:26:05', 28, 190, 2, 34);

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
) ENGINE = InnoDB AUTO_INCREMENT = 66 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo
-- ----------------------------
INSERT INTO `proceso_operativo` VALUES (64, 1, 20, 34, 'pedido 1', 1, '2024-08-14 16:33:34', '2024-08-14 17:26:05', 'pedido 1', '2024-08-14', NULL, '2024-08-14');

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
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

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
  `estadoProduccion` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `fechaAceptProducc` date NULL DEFAULT NULL,
  `idIngProd` int NULL DEFAULT NULL,
  `nombreProduccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idProduccion`) USING BTREE,
  INDEX `idProcOpFin`(`idProcOpFin`) USING BTREE,
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`idProcOpFin`) REFERENCES `proceso_operativo_fin` (`idProcOpFin`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (42, 34, '123', 'pantalon dril', '', 'Uni', 40.00, '2024-08-14 09:00:58', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (43, 37, '123456', 'chaqueta', '', 'Uni', 30.00, '2024-08-14 09:02:17', '2024-08-14 09:03:13');
INSERT INTO `producto` VALUES (44, 33, '1234567', 'Camisa Varon Colegio', '', 'Uni', 50.00, '2024-08-14 09:02:46', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (45, 35, '1234568', 'Blusa Ceda Blanca', '', 'Uni', 20.00, '2024-08-14 09:03:55', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salida_mprima
-- ----------------------------
INSERT INTO `salida_mprima` VALUES (33, 0, 'salida2', '2024-08-14', '0', '388.00', '388.00', '{\"producto0\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"boton casaca promo\",\"codigoProdIng\":\"T12345888\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"5.00\"},\"producto1\":{\"codProdIng\":\"30\",\"nombreProdIng\":\"ceda\",\"codigoProdIng\":\"T12345\",\"unidadProdIng\":\"Metros\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"140.00\"},\"producto2\":{\"codProdIng\":\"31\",\"nombreProdIng\":\"dril\",\"codigoProdIng\":\"T123456\",\"unidadProdIng\":\"metros\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"170.00\"},\"producto3\":{\"codProdIng\":\"32\",\"nombreProdIng\":\"hilo blanco\",\"codigoProdIng\":\"T123459\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"70.00\"},\"producto4\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"boton 1cm\",\"codigoProdIng\":\"T1234555\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"10\",\"precioProdIng\":\"3.00\"}}', '2024-08-14 12:59:47', '2024-08-14 17:23:59', 0);
INSERT INTO `salida_mprima` VALUES (34, 64, 'salida 1', '2024-08-14', '0', '38.80', '38.80', '{\"producto0\":{\"codProdIng\":\"33\",\"nombreProdIng\":\"boton 1cm\",\"codigoProdIng\":\"T1234555\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"0.30\"},\"producto1\":{\"codProdIng\":\"32\",\"nombreProdIng\":\"hilo blanco\",\"codigoProdIng\":\"T123459\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"7.00\"},\"producto2\":{\"codProdIng\":\"31\",\"nombreProdIng\":\"dril\",\"codigoProdIng\":\"T123456\",\"unidadProdIng\":\"metros\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"17.00\"},\"producto3\":{\"codProdIng\":\"30\",\"nombreProdIng\":\"ceda\",\"codigoProdIng\":\"T12345\",\"unidadProdIng\":\"Metros\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"14.00\"},\"producto4\":{\"codProdIng\":\"34\",\"nombreProdIng\":\"boton casaca promo\",\"codigoProdIng\":\"T12345888\",\"unidadProdIng\":\"Uni\",\"cantidadProdIng\":\"1\",\"precioProdIng\":\"0.50\"}}', '2024-08-14 16:14:27', '2024-08-14 17:23:59', NULL);

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
INSERT INTO `usuario` VALUES (1, 1, 'dfrida', 'Administrador', 'administrador', '$argon2id$v=19$m=4096,t=2,p=2$ZURZWG0yNkNOZVJTLlg5Lw$MvzbwXUNlV+Inxssd1nN+A8EN5Il6CdSAs7pTc3szJk', '2024-08-14 16:10:57', '2024-02-16 12:09:23', '2024-02-16 12:09:23');
INSERT INTO `usuario` VALUES (7, 2, 'alex', 'alex administrativo', 'flores', '$argon2id$v=19$m=4096,t=2,p=2$N0RQdHo5MXhOb1ZPdS45Wg$lk4EN49DUl5YTX+omAM/qpOZZG1P4adfpdAWl/IFSG4', '2024-07-16 15:02:17', '2024-07-16 15:02:09', '2024-07-16 15:02:09');

SET FOREIGN_KEY_CHECKS = 1;
