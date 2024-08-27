/*
 Navicat Premium Data Transfer

 Source Server         : DbDfridaHostinAcide
 Source Server Type    : MySQL
 Source Server Version : 101108
 Source Host           : 154.56.48.204:3306
 Source Schema         : u553466910_dfrida

 Target Server Type    : MySQL
 Target Server Version : 101108
 File Encoding         : 65001

 Date: 27/08/2024 13:26:36
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
  `codigoMprimaAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombreMprimaAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `unidadMprimaAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `cantidadMprimaAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `precioMprimaAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idAlmaMprima`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of almacen_mprima
-- ----------------------------

-- ----------------------------
-- Table structure for almacen_prod
-- ----------------------------
DROP TABLE IF EXISTS `almacen_prod`;
CREATE TABLE `almacen_prod`  (
  `idAlmaProd` int NOT NULL AUTO_INCREMENT,
  `idProd` int NOT NULL,
  `codigoProdAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombreProdAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `unidadProdAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `cantidadProdAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `precioProdAlma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idAlmaProd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of almacen_prod
-- ----------------------------

-- ----------------------------
-- Table structure for categoria_mprima
-- ----------------------------
DROP TABLE IF EXISTS `categoria_mprima`;
CREATE TABLE `categoria_mprima`  (
  `idCatMPrima` int NOT NULL AUTO_INCREMENT,
  `nombreCategoriaMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idCatMPrima`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_mprima
-- ----------------------------
INSERT INTO `categoria_mprima` VALUES (17, 'TELAS', '2024-08-22 12:47:39', '0000-00-00 00:00:00');
INSERT INTO `categoria_mprima` VALUES (18, 'FRANELAS', '2024-08-22 13:14:51', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for categoria_prod
-- ----------------------------
DROP TABLE IF EXISTS `categoria_prod`;
CREATE TABLE `categoria_prod`  (
  `idCatPro` int NOT NULL AUTO_INCREMENT,
  `nombreCategoriaProd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idCatPro`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categoria_prod
-- ----------------------------
INSERT INTO `categoria_prod` VALUES (41, 'BLUSA ', '2024-08-26 10:26:32', '2024-08-26 10:46:10');

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente`  (
  `idCli` int NOT NULL AUTO_INCREMENT,
  `RazonSocialCli` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `rucCli` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `nombreCli` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `correoCli` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `direccionCli` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `celularCli` int NULL DEFAULT NULL,
  `detalleCli` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `EstadoCli` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idCli`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES (12, 'HOFMANN ENGINEERING PERU SAC', '20557715372', 'RAUL APAZA', 'raul.apaza@hofmannengineerign.com', 'LA JOYA', 994242441, '', 1, '2024-08-13 11:28:52', '2024-08-13 11:28:52');
INSERT INTO `cliente` VALUES (13, 'P&S PROSERGE SRL', '20539399536', 'VICTOR RENGIFO', '', 'URB. CABAÑA MARIA MZ. M - LT. 8', 987898243, '', 1, '2024-08-13 11:33:22', '2024-08-13 11:33:22');
INSERT INTO `cliente` VALUES (14, 'P & P DISMAT MEDIC  EIRL', '20509021881', 'STER', '', 'CALLE LADISLAO CABRERA VALDEZ URB. PABLO VI', 957999530, '', 1, '2024-08-13 11:45:20', '2024-08-13 11:45:20');
INSERT INTO `cliente` VALUES (18, 'IMPORTACI9NES Y REPRESENTACIONES LEON E.I.R.L. ', '20498365389', 'ELIZABETH QUISPE YAURI', 'elizbethjuliquispeyauri@gmil.com', 'CERRO COLORADO', 928385132, 'Sin Observaciones', 1, '2024-08-26 10:48:40', '2024-08-26 10:48:40');

-- ----------------------------
-- Table structure for cotizacion
-- ----------------------------
DROP TABLE IF EXISTS `cotizacion`;
CREATE TABLE `cotizacion`  (
  `idCoti` int NOT NULL AUTO_INCREMENT,
  `tituloCoti` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `fechaCoti` date NOT NULL,
  `razonSocialCoti` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombreComercialCoti` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `rucCoti` int NOT NULL,
  `nombreCoti` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `celularCoti` int NULL DEFAULT NULL,
  `correoCoti` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `direccionCoti` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `detalleCoti` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cotizacion
-- ----------------------------

-- ----------------------------
-- Table structure for desecho_merma
-- ----------------------------
DROP TABLE IF EXISTS `desecho_merma`;
CREATE TABLE `desecho_merma`  (
  `idDeseMerma` int NOT NULL AUTO_INCREMENT,
  `idMerma` int NOT NULL,
  `codigoMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombreMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `unidadMprima` int NOT NULL,
  `cantidadMprima` decimal(10, 2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idDeseMerma`) USING BTREE,
  INDEX `idMerma`(`idMerma`) USING BTREE,
  CONSTRAINT `desecho_merma_ibfk_1` FOREIGN KEY (`idMerma`) REFERENCES `merma` (`idMerma`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of desecho_merma
-- ----------------------------

-- ----------------------------
-- Table structure for ficha_proceso
-- ----------------------------
DROP TABLE IF EXISTS `ficha_proceso`;
CREATE TABLE `ficha_proceso`  (
  `idFichaProc` int NOT NULL AUTO_INCREMENT,
  `tituloFichaProc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `productoFichaProc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `detalleFichaProc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `procesoFichaProcJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `docFichaProc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idFichaProc`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ficha_proceso
-- ----------------------------

-- ----------------------------
-- Table structure for ficha_tecnica
-- ----------------------------
DROP TABLE IF EXISTS `ficha_tecnica`;
CREATE TABLE `ficha_tecnica`  (
  `idFichaTec` int NOT NULL AUTO_INCREMENT,
  `nombreFichaTec` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `fechaFichaTec` date NULL DEFAULT NULL,
  `clienteFichaTec` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `descripcionFichaTec` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `codigoFichaTec` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `nombreSoliFichaTec` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `celularFichaTec` int NULL DEFAULT NULL,
  `correoFichaTec` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `detalleFichaTec` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `docFichaTec` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `estadoFichaTec` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idFichaTec`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 206 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ficha_tecnica
-- ----------------------------
INSERT INTO `ficha_tecnica` VALUES (205, 'FICHA TECNICA DE BLUSAS LILAS', '2024-08-26', 'ELIZABEH QUISPE YAURI', 'FICHA DE BLUSAS', 'TD-001', 'LEON', 987654321, 'Saguacve@gmail.com', '', '205_FichaTrabajoDFridaCRECIONDEBLUSASLILA.pdf', 2, '2024-08-26 10:54:48', '2024-08-26 11:04:50');

-- ----------------------------
-- Table structure for ingreso_mprima
-- ----------------------------
DROP TABLE IF EXISTS `ingreso_mprima`;
CREATE TABLE `ingreso_mprima`  (
  `idIngMprima` int NOT NULL AUTO_INCREMENT,
  `nombreIngMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `fechaIngMprima` date NOT NULL,
  `igvIngMprima` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `subTotalIngMprima` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `totalIngMprima` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `ingJsonMprima` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idIngMprima`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_mprima
-- ----------------------------

-- ----------------------------
-- Table structure for ingreso_prod
-- ----------------------------
DROP TABLE IF EXISTS `ingreso_prod`;
CREATE TABLE `ingreso_prod`  (
  `idIngProd` int NOT NULL AUTO_INCREMENT,
  `nombreIngProd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `fechaIngProd` date NOT NULL,
  `igvIngProd` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `subTotalIngProd` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `totalIngProd` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `ingJsonProd` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idIngProd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 76 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ingreso_prod
-- ----------------------------

-- ----------------------------
-- Table structure for materia_prima
-- ----------------------------
DROP TABLE IF EXISTS `materia_prima`;
CREATE TABLE `materia_prima`  (
  `idMprima` int NOT NULL AUTO_INCREMENT,
  `idCatMprima` int NOT NULL,
  `codigoMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombreMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `detalleMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `unidadMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `precioMprima` decimal(10, 2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `idProv` int NULL DEFAULT NULL,
  PRIMARY KEY (`idMprima`) USING BTREE,
  INDEX `idCatMprima`(`idCatMprima`) USING BTREE,
  CONSTRAINT `materia_prima_ibfk_1` FOREIGN KEY (`idCatMprima`) REFERENCES `categoria_mprima` (`idCatMPrima`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of materia_prima
-- ----------------------------
INSERT INTO `materia_prima` VALUES (37, 17, 'TLTAFETA26062024', 'TELA TAFETA', '', 'METROS', 12.30, '2024-08-22 12:51:50', '0000-00-00 00:00:00', 12);
INSERT INTO `materia_prima` VALUES (38, 17, 'TLMAGITEL26062024', 'TELA MAGITEL', '', 'METROS', 5.70, '2024-08-22 12:55:09', '0000-00-00 00:00:00', 13);
INSERT INTO `materia_prima` VALUES (39, 17, 'TLPOLIPIMA26062024', 'TELA POLIPIMA', '', 'METROS', 7.00, '2024-08-22 12:58:19', '0000-00-00 00:00:00', 12);
INSERT INTO `materia_prima` VALUES (40, 17, '770-182-NARANJA26032024', 'TELA DILL770-220-NARANJA', '', 'METROS', 19.80, '2024-08-22 13:06:14', '2024-08-22 13:10:48', 14);
INSERT INTO `materia_prima` VALUES (41, 17, '899-NARANJA260320024', 'TELA POPELINA-691-NARANJA', '', 'METROS', 7.30, '2024-08-22 13:10:29', '0000-00-00 00:00:00', 14);
INSERT INTO `materia_prima` VALUES (42, 18, '20*1RX30032024', 'FRANELA CAMONES COLOR AZUL MARINO 20*1 RX', '', 'KILOGRAMOS', 28.81, '2024-08-22 13:17:27', '0000-00-00 00:00:00', 16);

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
  `estadoMerma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `fechaMermaAprob` date NULL DEFAULT NULL,
  `nombreMerma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `jsonMerma` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL,
  PRIMARY KEY (`idMerma`) USING BTREE,
  INDEX `idProcOp`(`idProcOp`) USING BTREE,
  CONSTRAINT `merma_ibfk_1` FOREIGN KEY (`idProcOp`) REFERENCES `proceso_operativo` (`idProcOp`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

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
  `tituloPedido` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombrePedido` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

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
  `idSalMprima` int NULL DEFAULT NULL,
  `descripcionProcOp` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `estadoProcOp` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `nombreProcOp` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `fechaRegistroProcOp` date NOT NULL,
  `fechaInicioProcOp` date NULL DEFAULT NULL,
  `fechaFinProcOp` date NOT NULL,
  PRIMARY KEY (`idProcOp`) USING BTREE,
  INDEX `idTipoProc`(`idTipoProc`) USING BTREE,
  INDEX `idPedido`(`idPedido`) USING BTREE,
  INDEX `idSalMprima`(`idSalMprima`) USING BTREE,
  CONSTRAINT `proceso_operativo_ibfk_1` FOREIGN KEY (`idTipoProc`) REFERENCES `tipo_proceso` (`idTipoProc`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `proceso_operativo_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 74 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proceso_operativo_fin
-- ----------------------------

-- ----------------------------
-- Table structure for prod_merma
-- ----------------------------
DROP TABLE IF EXISTS `prod_merma`;
CREATE TABLE `prod_merma`  (
  `idProdMerma` int NOT NULL AUTO_INCREMENT,
  `idMerma` int NULL DEFAULT NULL,
  `totalProdMerma` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `estadoProdMerma` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `totalMerma` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `descripcionProdMerma` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `jsonProdMerma` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL,
  `jsonMerma` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL,
  `fechaProdMerma` date NOT NULL,
  PRIMARY KEY (`idProdMerma`) USING BTREE,
  INDEX `idMerma`(`idMerma`) USING BTREE,
  CONSTRAINT `prod_merma_ibfk_1` FOREIGN KEY (`idMerma`) REFERENCES `merma` (`idMerma`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

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
  `nombreProduccion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idProduccion`) USING BTREE,
  INDEX `idProcOpFin`(`idProcOpFin`) USING BTREE,
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`idProcOpFin`) REFERENCES `proceso_operativo_fin` (`idProcOpFin`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of produccion
-- ----------------------------

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `idProd` int NOT NULL AUTO_INCREMENT,
  `idCatPro` int NULL DEFAULT NULL,
  `codigoProd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombreProd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `detalleProd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `unidadProd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `precioProd` decimal(10, 2) NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProd`) USING BTREE,
  INDEX `idCatPro`(`idCatPro`) USING BTREE,
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idCatPro`) REFERENCES `categoria_prod` (`idCatPro`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 61 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (56, 41, 'BL26082024', 'BLUSA LILA', '', 'UNIDAD', 48.00, '2024-08-26 10:30:13', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (57, 41, 'BLS26082024', 'BLUSA LILA S', '', 'UNIDAD', 48.00, '2024-08-26 10:47:07', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (58, 41, 'BLM26082024', 'BLUSA LILA M', '', 'UNIDAD', 48.00, '2024-08-26 10:47:40', '0000-00-00 00:00:00');
INSERT INTO `producto` VALUES (59, 41, 'BLL26082024', 'BLUSA LILA L', '', 'UNIDAD', 48.00, '2024-08-26 10:47:55', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for proveedores
-- ----------------------------
DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE `proveedores`  (
  `idProv` int NOT NULL AUTO_INCREMENT,
  `razonSocialProv` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `rucProv` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `nombreProv` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `correoProv` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `direccionProv` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `celularProv` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `detalleProv` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `estadoProv` int NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idProv`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 163 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of proveedores
-- ----------------------------
INSERT INTO `proveedores` VALUES (12, '', '2147483647', 'VASQUEZ ESPINOZA CAMILA ALAEXANDA', '', 'SAN CAMILO TIENDA 316', '0', '', 1, '2024-08-13 11:46:06', '2024-08-13 11:46:06');
INSERT INTO `proveedores` VALUES (13, '', '2147483647', 'TEXTILES JOSE ANTONIO SOCIEDAD ANONIMA CERRADA', '', 'GAL, SAN CAMILO SER FISO NRO. 318 INT. 102', '0', '', 1, '2024-08-13 12:14:10', '2024-08-13 12:14:10');
INSERT INTO `proveedores` VALUES (14, 'NABILA S.A.C.', '2147483647', 'NABILA', 'ventas@nabila.pe', 'Jr. Lucanas N°: 913-919 La Victoria Lima', '0', '', 1, '2024-08-13 12:15:47', '2024-08-13 12:15:47');
INSERT INTO `proveedores` VALUES (15, '', '2147483647', 'CHOQUE BLANCO DE GOMEZ NINOSKA YENNY', '', 'CAL. PASEO AREQUIPA 153 URB. ALTO SAN MARTIN MARIANO MELGAR - AREQUIPA ', '0', '', 1, '2024-08-13 12:16:49', '2024-08-13 12:16:49');
INSERT INTO `proveedores` VALUES (16, 'X PANDEX E.I.R.L.', '2147483647', 'X PANDEX ', '', 'CAL. MARISCAL RAMON CASTILLA 613  MIRAFLORES - AREQUIPA -', '0', '', 1, '2024-08-13 12:30:29', '2024-08-13 12:30:29');
INSERT INTO `proveedores` VALUES (17, 'Importaciones y Representaciones', '2147483647', 'LEON', '', 'Calle San Camilo 403 Int B AREQUIPA', '0', '', 1, '2024-08-13 12:31:01', '2024-08-13 12:31:01');
INSERT INTO `proveedores` VALUES (18, 'MALUTEX', '2147483647', 'HUACANI HUAMANI MARILU ELIANA', '', 'CALLE PERÚ 319 INT. 4 AREQUIPA - AREQUIPA', '0', '', 1, '2024-08-13 12:32:17', '2024-08-22 09:44:32');
INSERT INTO `proveedores` VALUES (19, 'TABJA ABUAPARA NEME ELIZABETH', '2147483647', 'DE MODA', '', 'CAL. SAN CAMILO 235  AREQUIPA ', '0', '', 1, '2024-08-13 12:33:29', '2024-08-13 12:33:29');
INSERT INTO `proveedores` VALUES (20, 'TEXTILES JOSE ANTONIO SOCIEDAD ANONIMA CERRADA', '20603070357', 'TEXTILES JOSE ANTONIO SOCIEDAD ANONIMA CERRADA', '', 'CAL. SAN CAMILO 3ER PISO 318 OTR. C.C.CRISTO DE LA CARIDAD INT. 102', '0', '', 1, '2024-08-13 12:34:46', '2024-08-19 09:33:27');
INSERT INTO `proveedores` VALUES (25, 'DISTRIBUCIONES TEXTILES FARIDE EMPRESA INDIVIDUAL DE RESPOSABILIDAD LIMITADA', '20605835032', 'DISTRIBUCIONES TEXTILES FARIDE EMPRESA INDIVIDUAL DE RESPOSABILIDAD LIMITADA ', '', 'CAL PIZARRO 219A URB. CERCADO AQREQUIPA-AREQUIPA', '', '', 1, '2024-08-19 09:48:08', '2024-08-19 09:48:08');
INSERT INTO `proveedores` VALUES (27, 'LEON IMPORTACIONES Y REPRESENTACIONES E.I.R.L.', '20498365389', 'LEON IMPORTACIONES Y REPRESENTACIONES', '', 'Calle San Camilo 403 Int B AREQUIPA AREQUIPA, AREQUIPA', '', '', 1, '2024-08-19 10:06:55', '2024-08-19 10:06:55');
INSERT INTO `proveedores` VALUES (28, 'MALUTEX', '10403071256', 'HUACANI HUAMANI MARILU ELIANA', '', 'CALLE PERU 333 INT. 6 AREQUIPA - AREQUIPA - AREQUIPA', '0', '', 1, '2024-08-19 10:13:45', '2024-08-19 11:05:20');
INSERT INTO `proveedores` VALUES (29, 'BOTICA VIRGEN  J&G E.I.R.L.', '20602957315', 'BOTICA VIRGE DEL CHAPI', 'boticvch68@gmail.com', 'CAL. CLORINDA MATTO DE TURNER NRO- 52A URB. PABLO VI CERCADO', '', '', 1, '2024-08-19 10:19:45', '2024-08-19 10:19:45');
INSERT INTO `proveedores` VALUES (30, 'NABILA S.A.C. ', '2035882071', 'NABILA ', 'ventas@nabila.pe', 'Jr. Lucanas N°: 913-919 La Victoria - Lima; Jr. Luis Giribaldi N°: 704 La Victoria - Lima', '0', '', 1, '2024-08-19 10:23:41', '2024-08-19 12:03:43');
INSERT INTO `proveedores` VALUES (33, 'IMPORTACIONES Y REPRESENTACIONES LON E.I.R.L.', '20498365389', 'LEON MAYORISTA', '', 'Calle San Camilo 403 Int B AREQUIPA AREQUIPA, AREQUIPA', '', '', 1, '2024-08-19 10:29:13', '2024-08-19 10:29:13');
INSERT INTO `proveedores` VALUES (34, 'TEXTIL ARCOIRIS S.R.L.', '20498647287', 'TEXTIL ARCOIRIS', '', 'DEAN VALDIVIA 307 INT 2 AREQUIPA - AREQUIPA - AREQUIPA', '934645235', '', 1, '2024-08-19 10:32:30', '2024-08-19 10:32:30');
INSERT INTO `proveedores` VALUES (36, 'INVERSIONES TEXTILES LEO S. A. C.', '20607859877', 'LEON TEXTILES', '', 'Calle San Camilo 405 Int 109 AREQUIPA AREQUIPA, AREQUIPA', '', '', 1, '2024-08-19 10:37:52', '2024-08-19 10:37:52');
INSERT INTO `proveedores` VALUES (38, 'IMPORTACIONES Y DISTRIBUCIONES REPUESTOS GUTI', '20539560094', 'GUTI REPUESTOS ', '', 'CAL. SAN CAMILO NRO 309 INT 109 AREQUIPA ', '979802726', '', 1, '2024-08-19 10:47:03', '2024-08-19 10:47:03');
INSERT INTO `proveedores` VALUES (39, 'COMERCIAL GARCIA Y PUNTO E.I.R.L.', '20510893833', 'GARCIA Y PUNTO E.I.R.L.', '', 'JR SEBASTIAN BARRANCA NRO. 1548 - LIMA LIMA LA VICTORIA', '0', '', 1, '2024-08-19 10:49:51', '2024-08-19 10:58:31');
INSERT INTO `proveedores` VALUES (42, 'COLOR CENTRO', '10296919379', 'VELA ARBILDO WILSON HUMBERTO', '', 'AV. PARRA NRO. 159 AREQUIPA - AREQUIPA - AREQUIPA AVENIDA QUIROZ 108 URB MARIA ISABEL- AREQUIPA', '', '', 1, '2024-08-19 11:04:13', '2024-08-19 11:04:13');
INSERT INTO `proveedores` VALUES (43, 'TEJIDOS GARCIA E.I.R.L.', '20508181443', 'TEJIDOS GARCIA E.I.R.L.', '', 'JR. ANTONIO BAZO NRO. 800 - LIMA LIMA LA VCTORIA.', '', '', 1, '2024-08-19 11:08:02', '2024-08-19 11:08:02');
INSERT INTO `proveedores` VALUES (44, 'IMPORT BOTTON´S J & K E.I.R.L.', '20608362160', 'IMPORT BOTTON´S J & K', '', 'JR. HIPOLITO UNANUE NRO 1568 INT. 104 URB. EL PROVENIR LIMA - LIMA - LA VICTORIA', '', '', 1, '2024-08-19 11:12:11', '2024-08-19 11:12:11');
INSERT INTO `proveedores` VALUES (45, 'TEJIDOS GARCIA E.I.R.L.', '20508181443', 'TEJIDOS GARCIA E.I.R.L.', '', 'JR. ANTONIO BAZO NRO. 800 - LIMA LIMA LA VCTORIA.', '', '', 1, '2024-08-19 11:19:18', '2024-08-19 11:19:18');
INSERT INTO `proveedores` VALUES (46, '', '10295564917', 'WALTER VICENTE LAURA COAQUIRA', '', 'ALTO DE LA LUNA 217 INT 5 AREQUIPA AREQUIPA AREQUIPA', '0', '', 1, '2024-08-19 11:24:50', '2024-08-19 11:36:12');
INSERT INTO `proveedores` VALUES (47, 'SOLIDARIO AQP S. A. C.', '20604848084', '', '', 'CAL. SAN CAMILO NRO. 405 INT. 206', '959228502', '', 1, '2024-08-19 11:28:01', '2024-08-19 11:28:01');
INSERT INTO `proveedores` VALUES (48, 'TEXTILES FLORES', '10017730725', 'CONDEMAYTA FLORES MARITZA', '', 'C. SAN CAMILO 316-318 TDA 10 Y 11 AREQUIPA - AREQUIPA', '', '', 1, '2024-08-19 11:31:06', '2024-08-19 11:31:06');
INSERT INTO `proveedores` VALUES (49, 'INDUSTRIAL TEXTIL A CUARTO SA', '20267901813', 'INUTEXA', 'ventas@indutexa.com.pe', 'AV. PROLONGACION PARINACOCHAS 1180 LIMA-LIMA-LA VICTORIA', '7176042', '', 1, '2024-08-19 11:35:22', '2024-08-19 11:35:22');
INSERT INTO `proveedores` VALUES (50, 'RIMPORT EIRL.', '20498481290', 'ARIMPORT', '', 'CALLE PIEROLA NRO 431 INT A-6 AREQUIPA-AREQUIPA-ARQUIPA', '97012328', '', 1, '2024-08-19 11:38:44', '2024-08-19 11:38:44');
INSERT INTO `proveedores` VALUES (51, 'ARIMPORT EIRL.', '20498481290', 'ARIMPORT', '', 'CALLE PIEROLA NRO 431 INT A-6 AREQUIPA-AREQUIPA-ARQUIPA', '970121328', '', 1, '2024-08-19 11:43:46', '2024-08-19 11:43:46');
INSERT INTO `proveedores` VALUES (52, 'SURTEXTIL S. R. L. ', '20498424067', 'SURTEXTIL S. R. L.', '', 'CALLE PERÚ 333 INT. 7 AREQUIPA - AREQUIPA - AREQUIPA ', '', '', 1, '2024-08-19 11:46:23', '2024-08-19 11:46:23');
INSERT INTO `proveedores` VALUES (53, 'SOLIDARIDAD AQP S. A. C. ', '20604848084', 'SOLIDARIDAD', 'solidaridadaqp.19@hotmail,com', 'Calle San Camilo 405 Int 206 AREQUIPA AREQUIPA, AREQUIPA', '959228502', '', 1, '2024-08-19 11:50:49', '2024-08-19 11:50:49');
INSERT INTO `proveedores` VALUES (54, 'DINASTIA I E.I.R.L.', '20453863680', 'DINASTIA', '', 'CAL. OCTAVIO MUÑOZ NAJAR 131', '', '', 1, '2024-08-19 11:55:58', '2024-08-19 11:55:58');
INSERT INTO `proveedores` VALUES (55, 'SURTEXTIL S.R.L. ', '20498424067', 'SURTEXTIL S..R.L.', '', 'CALLE PERÚ 333 INT. 7 AREQUIPA - AREQUIPA - AREQUIPA ', '', '', 1, '2024-08-19 11:59:37', '2024-08-19 11:59:37');
INSERT INTO `proveedores` VALUES (57, 'IMPORTACIONES Y DISTRIBUCIONES REPUESTOS GUTI E.I.R.L.', '20538560094', 'GUTI REPUESTOS ', '', 'CAL SAN CAMILO NRO 309 INT. 109 AREQUIPA', '978802726', '', 1, '2024-08-19 12:13:06', '2024-08-19 12:13:06');
INSERT INTO `proveedores` VALUES (58, 'DIXPORTBAEZ S.A.C. ', '20454826427', 'DIXPORTBAZ S.A.C.', 'liabaezB2@gmail.com', 'CAL. SAN CAMILO  NRO. 335 AREQUIPA - AREQUIPA - AREQUIPA', '', '', 1, '2024-08-19 12:17:07', '2024-08-19 12:17:07');
INSERT INTO `proveedores` VALUES (60, 'IMPORTACIONES Y DISTRIBUCIONES REPUESTOS GUTI E.I.R.L.', '20539500094', 'GUTI REPUESTOS ', '', 'CAL. SAN CAMILO NRO 309 INT 109 AREQUIPA ', '979802726', '', 1, '2024-08-19 12:27:36', '2024-08-19 12:27:36');
INSERT INTO `proveedores` VALUES (62, 'SURTEXTIL S.R.L. ', '20498424067', 'SURTEXTIL S..R.L.', '', 'CALLE PERÚ 333 INT. 7 AREQUIPA - AREQUIPA - AREQUIPA ', '', '', 1, '2024-08-19 12:32:32', '2024-08-19 12:32:32');
INSERT INTO `proveedores` VALUES (66, 'TEXTILES FLORES', '10017730745', 'CONDEMAYTA FLORES MARITZA', '', 'C. SAN CAMILO 316-318 TDA 10 Y 11 AREQUIPA - AREQUIPA', '', '', 1, '2024-08-19 12:37:46', '2024-08-19 12:37:46');
INSERT INTO `proveedores` VALUES (68, 'TEXTIL FLORES', '10017730725', 'CONDEMAYTA FLORES MARITZA', '', 'C. SAN CAMILO 316-318 TDA 10 Y 11 AREQUIPA - AREQUIPA', '', '', 1, '2024-08-19 12:47:55', '2024-08-19 12:47:55');
INSERT INTO `proveedores` VALUES (70, 'DINASTIA I E.I.R.L.', '20453863680', 'DINASTIA', '', 'CAL. OCTAVIO MUÑOZ NAJAR 131', '', '', 1, '2024-08-19 12:53:09', '2024-08-19 12:53:09');
INSERT INTO `proveedores` VALUES (71, 'IMPORTACIONES DAMITEX E.I.R.L.', '20608466593', 'DAMITEX', '', 'CAL. SAN CAMILO 410 URB. CERCADO 2DO PISO', '', '', 1, '2024-08-19 12:55:44', '2024-08-19 12:55:44');
INSERT INTO `proveedores` VALUES (72, 'DECORACIONES ALEX ', '10296397372', 'POLANCO CONDORI ALEX GILBER', '', 'CAL. PIZARRO 329', '', '', 1, '2024-08-19 13:00:04', '2024-08-19 13:00:04');
INSERT INTO `proveedores` VALUES (74, 'DISTRIBUIDORA CHARITO AQP', '10406170611', 'MARRON CONDORI JEANETH LOURDES', '', 'CAL. SAN CAMILO 309 URB. CERCADO INT. 112', '', '', 1, '2024-08-19 13:04:00', '2024-08-19 13:04:00');
INSERT INTO `proveedores` VALUES (75, 'TEXTILES FLORES', '10017730725', 'CONDEMAYTA FLORES MARITZA', '', 'C. SAN CAMILO 316-318 TDA 10 Y 11 AREQUIPA - AREQUIPA', '', '', 1, '2024-08-19 13:06:18', '2024-08-19 13:06:18');
INSERT INTO `proveedores` VALUES (76, 'TEXTILES DENEGUI E.I.R.L. ', '20539518489', 'TEXTILES DENEGUI', '', 'CAL. SAN CAMILO NRO 318 INT 4', '', '', 1, '2024-08-19 13:07:42', '2024-08-19 13:07:42');
INSERT INTO `proveedores` VALUES (77, 'IMPORTACIONES Y DISTRIBUCIONES REPUESTOS GUTI E.I.R.L.', '20538560094', 'GUTI REPUESTOS ', '', 'CAL. SAN CAMILO NRO 309 INT 109 AREQUIPA ', '979802726', '', 1, '2024-08-19 13:10:46', '2024-08-19 13:10:46');
INSERT INTO `proveedores` VALUES (78, 'INSUMOS PERU S.A.C. ', '20432008101', 'INSUMOS PERU HILOS-ENTRETELAS-NOTEX', '', 'JR JUAN JOSE MOTAJO 275 SANTA CATALINA LIM LIMA LA VICTORIA', '994079467', '', 1, '2024-08-19 13:16:05', '2024-08-19 13:16:05');
INSERT INTO `proveedores` VALUES (80, 'ACCESORIOS SEMATEX E.I.R.L.', '20434868450', 'ACCESORIOS SEMATEX', '', 'CAL. SAN CAMILO NRO. 331A AREQUIPA-AREQUIPA-AREQUIPA', '', '', 1, '2024-08-19 13:21:05', '2024-08-19 13:21:05');
INSERT INTO `proveedores` VALUES (81, 'ACCESORIOS SEMATEX E.I.R.L.', '20434868450', 'ACCESORIOS SEMATEX', '', 'CAL. SAN CAMILO NRO. 331A AREQUIPA-AREQUIPA-AREQUIPA', '0', '', 1, '2024-08-19 13:23:39', '2024-08-19 13:24:00');
INSERT INTO `proveedores` VALUES (82, 'ACCESORIOS SEMATEX E.I.R.L.', '20434868450', 'ACCESORIOS SEMATEX', '', 'CAL. SAN CAMILO NRO 331A AREQUIPA-AREQUIPA-AREQUIPA', '', '', 1, '2024-08-19 13:26:10', '2024-08-19 13:26:10');
INSERT INTO `proveedores` VALUES (83, 'INVERSIONES CARLOTEX S.R.L.', '20602482627', 'INVERSIONES CARLOTEX', '', 'CAL. SAN CAMILO 400C URB. CERCADO AREQUIPA - AREQUIPA', '', '', 1, '2024-08-20 09:32:03', '2024-08-20 09:32:03');
INSERT INTO `proveedores` VALUES (84, 'DISTRIBUCIONES GEDEON S.A.C.', '20609816466', 'DISTRIBUCIONES SAC', '', 'PJ. SANT CATALINA 106 URB. LA ISLA AREQUIPA-AREQUIPA', '', '', 1, '2024-08-20 09:34:58', '2024-08-20 09:34:58');
INSERT INTO `proveedores` VALUES (85, 'MAQUI PUNTO E.I.R.L.', '20455369127', 'MAQI PUNTO', 'maquipunto@hotmail.com', 'CAL.DEAN VALDIVIA NRO. 328-A AREQUIPA', '', '', 1, '2024-08-20 09:38:21', '2024-08-20 09:38:21');
INSERT INTO `proveedores` VALUES (86, 'BAZAR TIA ', '10294422671', 'ORTIZ CARDENAS JOSE', '', 'CALLE SAN CAMILO 303 AREQUIPA-AREQUIPA', '', '', 1, '2024-08-20 09:41:57', '2024-08-20 09:41:57');
INSERT INTO `proveedores` VALUES (87, 'SURTEXTIL S.R.L. ', '20498424067', 'SURTEXTIL S..R.L.', '', 'CALLE PERÚ 333 INT. 7 AREQUIPA - AREQUIPA - AREQUIPA ', '', '', 1, '2024-08-20 09:44:46', '2024-08-20 09:44:46');
INSERT INTO `proveedores` VALUES (88, 'TEXTIL MARY ', '10296937407', 'HUAMANI JORDAN ANASTACIA', '', 'CALLE PERÚ 333 INT. 3 AREQUIPA - AREQUIPA - AREQUIPA ', '', '', 1, '2024-08-20 09:46:25', '2024-08-20 09:46:25');
INSERT INTO `proveedores` VALUES (89, 'SURTEXTIL S.R.L. ', '20498424067', 'SURTEXTIL S. R. L.', '', 'CALLE PERU 333 INT. 7 AREQUIPA - AREQUIPA - AREQUIPA', '', '', 1, '2024-08-20 09:49:09', '2024-08-20 09:49:09');
INSERT INTO `proveedores` VALUES (90, '', '10295564917', 'WALTER VICENTE LURA COAQUIRA', '', 'ALTO DE LA LUNA 217 INT 5 AREQUIPA AREQUIPA AREQUIPA', '', '', 1, '2024-08-20 09:51:48', '2024-08-20 09:51:48');
INSERT INTO `proveedores` VALUES (91, 'TEXTILES FLORES', '10017730725', 'CONDEMAYTA FLORES MARITZA', '', 'C. SAN CAMILO 316-318 TDA 10 Y 11 AREQUIPA - AREQUIPA', '', '', 1, '2024-08-20 09:53:20', '2024-08-20 09:53:20');
INSERT INTO `proveedores` VALUES (95, 'ACCESORIOS SEMATEX E.I.R.L.', '20434868450', 'ACCESORIOS SEMATEX', '', 'CAL. SAN CAMILO NRO 331A AREQUIPA-AREQUIPA-AREQUIPA', '', '', 1, '2024-08-20 10:02:45', '2024-08-20 10:02:45');
INSERT INTO `proveedores` VALUES (96, 'CONFECCIONES JEMATY', '10295050336', 'VALENCIA CHINO TIMOTEO', '', 'CAL. DEAN VALDIVIA 418 INT. 8 AREQUIPA - AREQUIPA', '', '', 1, '2024-08-20 10:05:47', '2024-08-20 10:05:47');
INSERT INTO `proveedores` VALUES (97, 'PAPELES Y CARTULINA SOCIEDAD ANONIMA CERRADA - PAYCAR S.A.C.', '20455311048', 'DAYPAR GRUPO ORDOÑEZ', '', 'CALLE PIZARRO NRO. 122 AREQUIPA - AREQUIPA ', '941865951', '', 1, '2024-08-20 10:08:17', '2024-08-20 10:08:17');
INSERT INTO `proveedores` VALUES (98, '', '10775292291', 'OCHANTE HUACASI ISABEL', '', 'PRO. ANDAHUAYLAS 710 LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 10:15:10', '2024-08-20 10:15:10');
INSERT INTO `proveedores` VALUES (99, '', '10775292291', 'OCHANTE HUACASI ISABEL', '', 'PRO. ANDAHUAYLAS 710 LA VICTORIA - LIMA - LIMA', '0', '', 1, '2024-08-20 10:17:42', '2024-08-20 10:18:29');
INSERT INTO `proveedores` VALUES (100, '', '10775292291', 'OCHANTE HUACASI ISABEL', '', 'PRO. ANDAHUAYLAS 710 LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 10:19:00', '2024-08-20 10:19:00');
INSERT INTO `proveedores` VALUES (102, 'ACCESORIOS SEMATEX E.I.R.L.', '20434868450', 'ACCESORIOS SEMATEX', '', 'CAL. SAN CAMILO NRO 331A AREQUIPA-AREQUIPA-AREQUIPA', '', '', 1, '2024-08-20 10:24:02', '2024-08-20 10:24:02');
INSERT INTO `proveedores` VALUES (103, 'ACCESORIOS SEMATEX E.I.R.L.', '20434868450', 'ACCESORIOS SEMATEX', '', 'CAL. SAN CAMILO NRO 331A AREQUIPA-AREQUIPA-AREQUIPA', '', '', 1, '2024-08-20 10:25:09', '2024-08-20 10:25:09');
INSERT INTO `proveedores` VALUES (105, 'ACCESORIOS SEMATEX E.I.R.L.', '20434868450', 'ACCESORIOS SEMATEX', '', 'CAL. SAN CAMILO NRO 331A AREQUIPA-AREQUIPA-AREQUIPA', '', '', 1, '2024-08-20 10:32:59', '2024-08-20 10:32:59');
INSERT INTO `proveedores` VALUES (107, 'CORPORACION CRYSTAL SHADES PERU S.A.C.', '20602486819', 'CORPORACION CRYSTAL SHADES PERU', '', 'JR. ALEXANDER VON HUMBOLD NRO 1354 URB. EL PROVENIR LIMA - LIMA - LA VICTORIA', '0', '', 1, '2024-08-20 10:38:08', '2024-08-20 10:40:00');
INSERT INTO `proveedores` VALUES (108, 'CORPORACION CRYSTAL SHADES PERU S.A.C.', '20602486819', 'CORPORACION CRYSTAL SHADES PERU', '', 'JR. ALEXANDER VON HUMBOLD NRO 1354 URB. EL PROVENIR LIMA - LIMA - LA VICTORIA', '', '', 1, '2024-08-20 10:39:31', '2024-08-20 10:39:31');
INSERT INTO `proveedores` VALUES (109, 'COFECCIONES PRINCESA', '10295698581', 'CARLOS MARCELINO SALDIVAR MURILLO', '', 'CALLE SAN CAMILO 300 A-300B - INT. 38 - AREQUIPA - AREQUIPA', '', '', 1, '2024-08-20 10:44:59', '2024-08-20 10:44:59');
INSERT INTO `proveedores` VALUES (110, 'REPUESTOS GUTI E.I.R.L.', '20539560094', 'REPUESTOS GUTI', '', 'CALLE SAN CAMILO N° 309 - INT 109', '', '', 1, '2024-08-20 10:49:49', '2024-08-20 10:49:49');
INSERT INTO `proveedores` VALUES (111, 'NEW FASHION MISTI S.R.L.', '20454151390', 'NEW FASHION MISTI', '', 'AV. AREQUIPA  MZ-10 LT-21 P.J.  MIGUEL GRAU III ETAPA AREQUIPA-AREQUIPA-PAUCARPATA', '', '', 1, '2024-08-20 10:53:11', '2024-08-20 10:53:11');
INSERT INTO `proveedores` VALUES (112, 'NINOSKA JPG CONFECCIONES', '10296885130', 'NINOSKA YENNY CHOQUE BLANCO DE GOMEZ', '', 'CALLE PSEO AREQUIPA NRO: 153 URB ALTO SAN MARTIN MNO MELGAR - AREQUIPA - AREQUIPA', '', '', 1, '2024-08-20 10:55:53', '2024-08-20 10:55:53');
INSERT INTO `proveedores` VALUES (113, 'COMERCIALIZADORA GERSON', '10721273691', 'LUNA VICTORIA  CHAVEZ GERSON ALEXIS', '', 'CRNEL ZUBIAGA NRO. 498 LIMA - LIMA - LIMA', '', '', 1, '2024-08-20 10:58:32', '2024-08-20 10:58:32');
INSERT INTO `proveedores` VALUES (114, 'TUTTO SPORT', '10293013409', 'MARITA BEATRIZ VELASQUEZ GAMBARINI', '', 'DEAN VALDIVIA 311, 3ER PISO - CERCADO - AREQUIPA', '', '', 1, '2024-08-20 11:05:00', '2024-08-20 11:05:00');
INSERT INTO `proveedores` VALUES (115, 'INSUMOS PERU S.A.C. ', '20432008101', 'INSUMOS PERU HILOS-ENTRETELAS-NOTEX', '', 'JR. JUAN JOSE MOSTAJO 275 SANTA CATALINA LIMA-LIMA-LA VICTORIA', '998271342', '', 1, '2024-08-20 11:11:24', '2024-08-20 11:11:24');
INSERT INTO `proveedores` VALUES (116, 'ASOCIACION PAZ PERU', '20454117884', 'PAZPERU', '', 'AV. SALAVERRY S/N - URB. LARA  SOCABAYA - AREQUIPA - AREQUIPA', '', '', 1, '2024-08-20 11:14:16', '2024-08-20 11:14:16');
INSERT INTO `proveedores` VALUES (117, 'CONFECCIONES ALE', '1029396631', 'VALENTIN VICTOR HUANCA LOZANO', '', 'AV. ALIANZA N° 210 - DPTO. B ALTO SELVA ALEGRE - AREQUIPA - AREQUIPA', '990068886', '', 1, '2024-08-20 11:19:49', '2024-08-20 11:20:42');
INSERT INTO `proveedores` VALUES (119, 'THE ELEPHANT AQP EIRL.', '20605978437', 'THE ELEPHANT AQP', '', 'CALLE SAN CAMILO N° 309 - INT 113 C.C. ', '959600179', '', 1, '2024-08-20 11:25:24', '2024-08-20 11:25:24');
INSERT INTO `proveedores` VALUES (121, 'TRANSPORTES ANTHONY', '10707515967', 'GARCIA MIRANDO ANTHONY GABRIEL', '', 'CAL. PROLONGACION MIGUEL GRAU 103 TIABAYA-AREQUIPA', '', '', 1, '2024-08-20 11:29:36', '2024-08-20 11:29:36');
INSERT INTO `proveedores` VALUES (122, 'HENKO MERAKI E.I.R.L. ', '20606823275', 'HENKO MERAKI', '', '316 INT. 08 OTR. AREQUIPA', '', '', 1, '2024-08-20 11:30:50', '2024-08-20 11:30:50');
INSERT INTO `proveedores` VALUES (123, 'IMPORT JOMAYDA EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA - IPORT JOMAYDA E.I.R.L.', '20603520590', 'IMPORT JOMAYDA EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA - IPORT JOMAYDA', '', 'CAL. SAN CAMILO 309 INT. 115 CENTRO COMERCIAL SUR AREQUIPA -AREQUIPA', '', '', 1, '2024-08-20 11:33:26', '2024-08-20 11:33:26');
INSERT INTO `proveedores` VALUES (124, 'TEXTILES VASQUEZ & ESPINOZA S.A.C. ', '204555005756', 'TEXTILES VASQUEZ ESPINOZA', '', 'CAL. SAN CAMILO 316 TIENDA 1 AREQUIPA - AREQUIPA', '', '', 1, '2024-08-20 11:36:36', '2024-08-20 11:36:36');
INSERT INTO `proveedores` VALUES (125, 'DISTRIBUCIONES BAZAR MILAGRITOS S.R.L.', '20558667916', 'MILAGRITOS ', '', 'CALLE SAN CAMILO NRO. 227, AREQUIPA , AREQUIPA', '', '', 1, '2024-08-20 11:44:47', '2024-08-20 11:44:47');
INSERT INTO `proveedores` VALUES (126, 'FABRICA DE CONFECCIONES ARCAMET S.A.C.', '20603746105', 'FABRICA DE CONFECCIONES ARCAMET', '', 'CAL. DEAN VDIVIAL 331 INTO. 7 AREQUIPA-AREQUIPA ', '0', '', 1, '2024-08-20 11:58:37', '2024-08-20 11:59:27');
INSERT INTO `proveedores` VALUES (127, 'ELECTRONICA GONZALES E.I.R.L.', '20496514140', 'ELEGON', '', 'CALLE PIZARRO 316 - 335 AREQUIPA-AREQUIPA', '', '', 1, '2024-08-20 12:03:51', '2024-08-20 12:03:51');
INSERT INTO `proveedores` VALUES (128, 'CORPORACION MULTICOMERCIAL NAYLIN S.A.C.', '20603522185', 'CORPORACION MULTICOMERCIAL NYLIN', '', 'LT. 19 MZ. B, URB ABRAHAM MARIQUE REQUIPA - AREQUIPA', '', '', 1, '2024-08-20 12:07:51', '2024-08-20 12:07:51');
INSERT INTO `proveedores` VALUES (129, 'DECORSAR E..I.R.L', '20600312368', 'DECORSAR', '', 'CAL. PIZARRO 321A REQUIPA - AREQUIPA', '', '', 1, '2024-08-20 12:10:58', '2024-08-20 12:10:58');
INSERT INTO `proveedores` VALUES (130, 'IMPORT Y EXPORT EDISON TEXTIL S.R.L.', '20513276835', 'EDISON TEXTIL', '', 'PROLONGACION SAN CRISTOBAL NRO 1510 LIMA-LIMA-LA VICTORIA', '', '', 1, '2024-08-20 12:14:48', '2024-08-20 12:14:48');
INSERT INTO `proveedores` VALUES (131, 'TEXTIL FANTASIA & MODA', '', 'PAMPANI  QUICAÑA LUIS ANDRES', '', 'CAL. LAS RETAMAS MZA. W LOTE. 13 SANTA ANITA-LIMA-LIMA ', '', '', 1, '2024-08-20 12:19:57', '2024-08-20 12:19:57');
INSERT INTO `proveedores` VALUES (132, 'BARBARA SERIGRAF S.R.L.', '20512442499', 'BARBARA SERIGRAF', 'barbarserigraf-produccion@hotmail.com', 'JR. EARITO SAN CRISTOBAL N° 325 URB. SAN PABLO - LA VICTORIA - LIMA -LIMA', '999183864', '', 1, '2024-08-20 12:24:09', '2024-08-20 12:24:09');
INSERT INTO `proveedores` VALUES (133, 'CARP Y ASOCIADOS S.C.R.L.', '20504822274', 'CARP', 'despachos@carpyasociados.com', 'AV. ABEL B. DU PELIT THOUARS 3975 - SAN ISIDRO-LIMA-LIMA', '', '', 1, '2024-08-20 12:28:03', '2024-08-20 12:28:03');
INSERT INTO `proveedores` VALUES (134, 'METAL DESING SANTA ANA S.A.C. ', '20555969059', 'METAL DESING', '', 'MZ. A LT.8 URB. ALAMEDA  DE CHOSICA LURIGANCHO -LIMA-LIMA', '', '', 1, '2024-08-20 12:31:30', '2024-08-20 12:31:30');
INSERT INTO `proveedores` VALUES (135, 'IMPORTACIONES VASSAL E.I.R.L.', '20601005281', 'VASSAL', '', 'JR. ANTONIO BAZO N° 712 - INT B STAND 2, URB. EL PROVENIR LA VICTORIA -LIMA-LIMA', '', '', 1, '2024-08-20 12:35:29', '2024-08-20 12:35:29');
INSERT INTO `proveedores` VALUES (136, 'INVERSIONES Y MULTISEVICIOS JOCKER E.I.R.L.', '20545625432', 'INVERSIONES Y MULTISERVICIOS JOCKER', '', 'JR. SAN CRISTOBAL, EVARISTO 1421 URB. SAN PABLO - LA VISTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 12:38:31', '2024-08-20 12:38:31');
INSERT INTO `proveedores` VALUES (137, 'MEL CHAVEZ CESAR AUGUSTO ', '10414874881', 'MEL CHAVEZ CESAR AUGUSTO ', '', 'CAL. HIPOLITO UNANUE 1326 LA VICTORIA-LIMA-LIMA', '', '', 1, '2024-08-20 12:41:24', '2024-08-20 12:41:24');
INSERT INTO `proveedores` VALUES (138, 'CARRANZA RODRIGUEZ BRENDA FABIOLA', '10476226461', 'CARRANZA RODRIGUEZ BRENDA FABIOLA', '', 'CAL. CERRO GRIS URB. SAN IGNACIO DE MOTERRICO MZA. N1 LT 13, SANTIAGO DE SURCO - LIMA - LIMA', '', '', 1, '2024-08-20 12:44:33', '2024-08-20 12:44:33');
INSERT INTO `proveedores` VALUES (139, 'QUICHE ZALDIVAR MARCIO ALEXIS', '10446029202', 'QUICHE ZALDIVAR MARCIO ALEXIS', '', 'HIPOLITO UNANUE 1222 DPTO. 4 LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 12:49:04', '2024-08-20 12:49:04');
INSERT INTO `proveedores` VALUES (140, 'QUICHE ZALDIVAR MARCIO ALEXIS', '10446029202', 'QUICHE ZALDIVAR MARCIO ALEXIS', '', 'HIPOLITO UNANUE 1222 DPTO. 4 LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 12:49:04', '2024-08-20 12:49:04');
INSERT INTO `proveedores` VALUES (141, 'AMANECER TRADING S.A.C. ', '205222170675', 'AMANECER TRADING', '', 'JR. EVARISTO SAN CRISTOBAL 1421 URB. SAN PABLO ALT. CENTRO COMERCIAL GAMERO B DE GAMARRA LA VICTORIA, LIMA-LIMA', '', '', 1, '2024-08-20 12:52:15', '2024-08-20 12:52:15');
INSERT INTO `proveedores` VALUES (142, 'GIL FLORES JEAN PAUL ROBBY', '10446319961', 'GIL FLORES JEAN PAUL ROBBY ', '', 'AV. UNIVERSITARIA MZ B. LT 12 SAN MARTIN DE PORRES - LIMA - LIMA', '', '', 1, '2024-08-20 12:55:42', '2024-08-20 12:55:42');
INSERT INTO `proveedores` VALUES (143, 'SANCHEZ RODRIGUEZ DIANA ISABEL', '10443151872', 'SANCHEZ RODRIGUEZ  DIANA ISABEL ', '', 'PRO. PARINACOCHAS 883 LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 12:57:41', '2024-08-20 12:57:41');
INSERT INTO `proveedores` VALUES (144, 'INVERSIONES RECOBA', '10427259400', 'INVRSIONES RECOBA', '', 'JR. SAN CRISTOBAL 1421 INT. 501 LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 12:59:05', '2024-08-20 12:59:05');
INSERT INTO `proveedores` VALUES (145, 'MENDOZA TAPULLIMA GIANNY CRISTOPHER', '10413126148', 'MENDOZA TAPULLIMA GIANNY CRISTOPHER', '', 'SAN CRISTOBAL 1421 INT. 601 LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 13:01:34', '2024-08-20 13:01:34');
INSERT INTO `proveedores` VALUES (146, 'VIDAURRE REVILLA CARLOS ENRIQUE', '10774756324', 'VIDAURRE REVILLA CARLOS ENRIQUE', '', 'JR. EVARISTO SAN CRISTOBAL 1421 URB. EL PROVENIR DPTO. 302 LA VICTORIA, LIMA-LIMA', '', '', 1, '2024-08-20 13:03:50', '2024-08-20 13:03:50');
INSERT INTO `proveedores` VALUES (147, 'SERVICIOS GENERALIDADES JR&CO E.I.R.L.', '206604227390', 'JR & CO', '', 'AV. LAS FLORES N°149 URB. SAN RAFAEL LIMA, LIMA-SAN JUAN DE LURIGANCHO', '0', '', 1, '2024-08-20 13:07:57', '2024-08-20 13:13:18');
INSERT INTO `proveedores` VALUES (148, 'FABRICA DE CINTAS ARBONA S.A.', '20100244391', 'FABRICA DE CINTAS ARBONA', 'ventas@arbona.com.pe', 'AV. ARGENTINA N°4215 - CALLAO PROV. CONST DEL CALLAO -LIMA', '0', '', 1, '2024-08-20 13:20:19', '2024-08-20 13:25:30');
INSERT INTO `proveedores` VALUES (149, 'TEXTILES SAN GABRIEL S.A.', '20100541255', 'TEXTILES SAN GABRIEL', '', 'CAL. MZ C, LT 2B, URB. FD BOCANEGRA, PROV DEL CALLAO- LIM', '', '', 1, '2024-08-20 13:22:41', '2024-08-20 13:22:41');
INSERT INTO `proveedores` VALUES (150, 'INVERSIONES Y REPRESENTACIONES JOTA S.A.C.', '20600178688', 'INVERSIONES Y REPRESENTACIONES JOTA', '', 'AV. AVIACION 732 INT. 35 LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-20 13:25:02', '2024-08-20 13:25:02');
INSERT INTO `proveedores` VALUES (151, 'RETOR S.A.', '20100716667', 'RETOR', 'info@retorsa.com', 'JR. CARLOS AUGUSTO SALAVERRY 1137/SURQUILLO - LIMA 34 - LIMA - PERU', '998328208', '', 1, '2024-08-20 13:28:18', '2024-08-20 13:28:18');
INSERT INTO `proveedores` VALUES (152, 'TEXFINA S.A.', '20100364451', 'TEXFINA', 'texfina@texfina.com.pe', 'AV. ELMER FAUCETT NRO. 4636 URB. INDUSTRIAL BOCANEGRA CALLAO-LIMA', '5742222', '', 1, '2024-08-20 13:30:31', '2024-08-20 13:30:31');
INSERT INTO `proveedores` VALUES (153, 'ALDAL CORPORATION E.I.R.L.', '20506528314', 'ALDAL', 'aldalcorppe_@hotmail.com', '', '', '', 1, '2024-08-21 09:33:04', '2024-08-21 09:33:04');
INSERT INTO `proveedores` VALUES (154, 'MANUFACTURAS DE PAADORES Y CANVA S.A.C.', '20101216471', 'MAPASAC', 'ventas@mapasac.com.pe', 'AV. NICOLAS DUEÑAS RO. 940-URB. LIMA INDUSTRIAL-LIMA-LIMA', '', '', 1, '2024-08-21 09:39:33', '2024-08-21 09:39:33');
INSERT INTO `proveedores` VALUES (155, 'CORPORACION REY S.A.', '20295458551', 'REY', 'facturaelectronica@rey.com.pe', 'AV. OCAR R. BENAVIDES NRO. 5991 Z.I. PARQUE IDUSTRIAL Y COMER', '', '', 1, '2024-08-21 09:44:26', '2024-08-21 09:44:26');
INSERT INTO `proveedores` VALUES (156, 'GRUPO TEXTIL CASAS S.A.C.', '20513118849', 'GRUPO TEXTIL CASAS', '', 'JR. GIRIBALDI NRO. 564 - LA VICTORIA - LIMA - LIMA', '', '', 1, '2024-08-21 09:47:50', '2024-08-21 09:47:50');
INSERT INTO `proveedores` VALUES (157, 'MERMA CRUZ JANETH MARIA', '10296416750', 'MERMA CRUZ JANETH MARIA', '', 'CAL. ALTO DE LA LUNA 217 MERCADO SAN CAMILO TDA. 14 2°PISO AREQUIPA-AREQUIPA', '', '', 1, '2024-08-21 09:51:56', '2024-08-21 09:51:56');
INSERT INTO `proveedores` VALUES (158, 'GRUPO MARVO E.I.R.L.', '20606459387', 'MARVO', 'GRUPOMARVO@GMAIL.COM', 'CALLE MUÑOZ NAJAR 251 AREQUIPA', '987911920', '', 1, '2024-08-21 09:54:31', '2024-08-21 09:54:31');
INSERT INTO `proveedores` VALUES (159, 'INDUSTRIA TEXTIL DEL SUR Q&Q E.I.R.L.', '20603854781', 'INDUSTRIA TEXTIL DEL SUR Q&Q', '', 'CAL. ALTO DE LA ALIANZA NRO. 100 URB. EDIFICADORES MISTI AREQUIP-AREQUIPA-MIRAFLORES', '', '', 1, '2024-08-21 09:58:58', '2024-08-21 09:58:58');
INSERT INTO `proveedores` VALUES (160, 'PERUVIAN GARMENT ', '20498576916', 'COAQUIRA BEGAZO RAUL ORLANDO', '', 'MZA. J LOTE. 2 LA CAMPIÑA II LA PALIZADA AREQUIPA-AREQUIPA-SOCABAYA', '', '', 1, '2024-08-21 10:04:57', '2024-08-21 10:04:57');
INSERT INTO `proveedores` VALUES (161, 'DE JOS TEXTIL E.I.R.L.', '20605783075', 'DE JOS TEXTIL', '', 'CAL. CALLE SAN CAMILO 323 INT. 6 AREQUIPA-AREQUIPA', '', '', 1, '2024-08-21 10:06:26', '2024-08-21 10:06:26');
INSERT INTO `proveedores` VALUES (162, 'TIENDA EL TRIUNFADOR', '10067428604', 'JULIO ANDRES VARGAS AVILA', '', 'JR. UCAYALI N° 119 - LIMA - LIMA - LIMA', '6619058', '', 1, '2024-08-21 10:10:16', '2024-08-21 10:10:16');

-- ----------------------------
-- Table structure for salida_mprima
-- ----------------------------
DROP TABLE IF EXISTS `salida_mprima`;
CREATE TABLE `salida_mprima`  (
  `idSalMprima` int NOT NULL AUTO_INCREMENT,
  `idProcOp` int NULL DEFAULT NULL,
  `nombreSalMprima` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `fechaSalMprima` date NOT NULL,
  `igvSalMprima` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `subTotalSalMprima` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `totalSalMprima` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `salJsonMprima` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `idPedido` int NULL DEFAULT NULL,
  PRIMARY KEY (`idSalMprima`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salida_mprima
-- ----------------------------

-- ----------------------------
-- Table structure for salida_prod
-- ----------------------------
DROP TABLE IF EXISTS `salida_prod`;
CREATE TABLE `salida_prod`  (
  `idSalProd` int NOT NULL AUTO_INCREMENT,
  `idPedido` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `nombreSalProd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `fechaSalProd` date NOT NULL,
  `igvSalProd` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `subTotalSalProd` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `totalSalProd` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `salJsonProd` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `idCliente` int NULL DEFAULT NULL,
  PRIMARY KEY (`idSalProd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of salida_prod
-- ----------------------------

-- ----------------------------
-- Table structure for tipo_proceso
-- ----------------------------
DROP TABLE IF EXISTS `tipo_proceso`;
CREATE TABLE `tipo_proceso`  (
  `idTipoProc` int NOT NULL AUTO_INCREMENT,
  `descripcionTipoProc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `idFichaProc` int NULL DEFAULT NULL,
  `nombreTipoProc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idTipoProc`) USING BTREE,
  INDEX `fk_idFichaProc`(`idFichaProc`) USING BTREE,
  CONSTRAINT `fk_idFichaProc` FOREIGN KEY (`idFichaProc`) REFERENCES `ficha_proceso` (`idFichaProc`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipo_proceso
-- ----------------------------

-- ----------------------------
-- Table structure for tipo_usuario
-- ----------------------------
DROP TABLE IF EXISTS `tipo_usuario`;
CREATE TABLE `tipo_usuario`  (
  `idTipoUsu` int NOT NULL AUTO_INCREMENT,
  `descripcionTipo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idTipoUsu`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

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
  `nombreUsu` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `apellido` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `LastConnection` datetime NULL DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  PRIMARY KEY (`idUsu`) USING BTREE,
  INDEX `idTipoUsu`(`idTipoUsu`) USING BTREE,
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idTipoUsu`) REFERENCES `tipo_usuario` (`idTipoUsu`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (1, 1, 'dfrida', 'Administrador', 'administrador', '$argon2id$v=19$m=4096,t=2,p=2$ZURZWG0yNkNOZVJTLlg5Lw$MvzbwXUNlV+Inxssd1nN+A8EN5Il6CdSAs7pTc3szJk', '2024-08-27 13:26:04', '2024-02-16 12:09:23', '2024-02-16 12:09:23');
INSERT INTO `usuario` VALUES (8, 1, 'elizabeth', 'Elizabeth ', 'Quispe', '$argon2id$v=19$m=4096,t=2,p=2$RFJRRjlBUldJa01mOFNrMQ$ka2ZjFaDBCFjUjxtLvDnOcHE5Xy8Bvs+dFsNDRFR4f8', '2024-08-26 10:14:58', '2024-08-17 10:29:36', '2024-08-17 10:29:36');

SET FOREIGN_KEY_CHECKS = 1;
