-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-02-2024 a las 22:54:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `marsa_db`
--
CREATE DATABASE IF NOT EXISTS `dfrida_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dfrida_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_almacen`
--

CREATE TABLE `tb_almacen` (
  `IdAlma` int(11) NOT NULL,
  `IdProd` int(11) NOT NULL,
  `CantidadTotal` int(11) NOT NULL,
  `DateCreate` date NOT NULL,
  `DateUpdate` date NOT NULL,
  `HoraCreate` time NOT NULL,
  `HoraUpdate` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_almacen_merma`
--

CREATE TABLE `tb_almacen_merma` (
  `IdAlmacenMerma` int(11) NOT NULL,
  `IdProducto` int(11) NOT NULL,
  `IdSalida` int(11) NOT NULL,
  `IdIngresoDev` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `TipoSalida` varchar(25) NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_categoriaprod`
--

CREATE TABLE `tb_categoriaprod` (
  `IdCate` int(11) NOT NULL,
  `NombreCategoria` varchar(255) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tb_categoriaprod`
--

INSERT INTO `tb_categoriaprod` (`IdCate`, `NombreCategoria`, `DateCreate`, `DateUpdate`) VALUES
(1, 'Aceites', '2024-01-26 16:14:25', '2024-01-26 16:14:25'),
(2, 'Aceitunas', '2024-01-26 16:14:25', '2024-01-26 16:14:25'),
(3, 'Endulzantes y Jarabes', '2024-01-26 16:14:25', '2024-01-26 16:14:25'):


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `IdCli` int(11) NOT NULL,
  `RucCli` varchar(255) DEFAULT NULL,
  `NombreCli` varchar(255) NOT NULL,
  `CorreoCli` varchar(255) DEFAULT NULL,
  `DireccionCli` varchar(255) DEFAULT NULL,
  `TelefonoCli` int(11) DEFAULT NULL,
  `Estado` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `RazonSocial` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_estado`
--

CREATE TABLE `tb_estado` (
  `IdEstado` int(11) NOT NULL,
  `TipoEstado` varchar(255) NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tb_estado`
--

INSERT INTO `tb_estado` (`IdEstado`, `TipoEstado`, `Descripcion`, `DateCreate`, `DateUpdate`) VALUES
(1, 'Vigente', 'Estado vigente para productos', '2024-01-26 13:17:10', '2024-01-26 13:17:10'),
(2, 'Vencido', 'Estado vencido para productos', '2024-01-26 13:17:10', '2024-01-26 13:17:10'),
(3, 'Activo', 'Estado activo para personal', '2024-01-26 13:17:10', '2024-01-26 13:17:10'),
(4, 'Inactivo', 'Estado inactivo para personal', '2024-01-26 13:17:10', '2024-01-26 13:17:10'),
(5, 'Completado', 'Estado completado para nota pedido', '2024-01-26 13:17:10', '2024-01-26 13:17:10'),
(6, 'Devolucion', 'Estado de devolución para nota pedido y ingreso', '2024-01-26 13:17:10', '2024-01-26 13:17:10'),
(7, 'Produccion', 'Estado de detalle de ingreso', '2024-01-26 16:09:22', '2024-01-26 16:09:22'),
(8, 'Retirado', 'Estado de salida para nota pedido', '2024-01-26 16:09:22', '2024-01-26 16:09:22'),
(9, 'Merma', 'Estado de detalle de perdida para ingreso', '2024-01-29 10:51:07', '2024-01-29 10:51:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ingreso`
--

CREATE TABLE `tb_ingreso` (
  `IdIng` int(11) NOT NULL,
  `IdPer` int(11) NOT NULL,
  `DatosRefSalida` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `TipoIngreso` int(11) DEFAULT NULL,
  `DescripcionIng` varchar(250) DEFAULT NULL,
  `DatosProductosIngresoJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `FechaProduccionIng` date DEFAULT NULL,
  `FechaVencimientoIng` date DEFAULT NULL,
  `Estado` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_lote`
--

CREATE TABLE `tb_lote` (
  `IdLote` int(11) NOT NULL,
  `IdPer` int(11) NOT NULL,
  `IdCliente` int(11) NOT NULL,
  `CodigoLote` varchar(50) DEFAULT NULL,
  `DescripcionLote` varchar(150) DEFAULT NULL,
  `DatosLoteIngresoJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `FechaProduccionLote` date NOT NULL,
  `FechaVencimientoLote` date DEFAULT NULL,
  `Estado` int(11) NOT NULL,
  `FechaDevolucion` date DEFAULT NULL,
  `NroFactura` varchar(150) DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL,
  `Observacion` varchar(255) DEFAULT NULL,
  `TipoSalida` varchar(35) NOT NULL,
  `TotalFactura` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_notapedido`
--

CREATE TABLE `tb_notapedido` (
  `IdNotaP` int(11) NOT NULL,
  `IdPer` int(11) NOT NULL,
  `IdRes` int(11) NOT NULL,
  `Observacion` varchar(255) NOT NULL,
  `EstadoNota` int(11) NOT NULL,
  `IdCliente` varchar(25) NOT NULL,
  `DatosProductosNotaPedidoJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Total` decimal(10,2) NOT NULL,
  `FechaNotaPedido` date DEFAULT NULL,
  `FechaDevolucion` date DEFAULT NULL,
  `NroFactura` varchar(150) DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_personal`
--

CREATE TABLE `tb_personal` (
  `IdPer` int(11) NOT NULL,
  `IdTipoPer` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `NombrePer` varchar(255) NOT NULL,
  `ApellidoPer` varchar(255) DEFAULT NULL,
  `TelefonoPer` varchar(12) DEFAULT NULL,
  `DireccionPer` varchar(255) DEFAULT NULL,
  `Estado` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_producto`
--

CREATE TABLE `tb_producto` (
  `IdProd` int(11) NOT NULL,
  `IdCate` int(11) NOT NULL,
  `NombreProducto` varchar(255) NOT NULL,
  `DetalleProducto` varchar(255) DEFAULT NULL,
  `Unidad` varchar(50) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tb_producto`
--

INSERT INTO `tb_producto` (`IdProd`, `IdCate`, `NombreProducto`, `DetalleProducto`, `Unidad`, `Cantidad`, `Precio`, `DateCreate`, `DateUpdate`) VALUES
(1, 1, 'Aceite de Ajonjolí x 250ml.', NULL, 'ml', 1, 0.00, '2024-01-26 16:14:30', '2024-01-26 16:14:30'),
(2, 1, 'Aceite de Castaña x 250ml.', NULL, 'ml', 1, 0.00, '2024-01-26 16:14:30', '2024-01-26 16:14:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipopersonal`
--

CREATE TABLE `tb_tipopersonal` (
  `IdTipoPer` int(11) NOT NULL,
  `DescripcionTipoPer` varchar(255) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tb_tipopersonal`
--

INSERT INTO `tb_tipopersonal` (`IdTipoPer`, `DescripcionTipoPer`, `DateCreate`, `DateUpdate`) VALUES
(1, 'Responsable', '2023-09-14 11:54:27', '2023-09-14 11:54:27'),
(2, 'Operario', '2023-09-14 11:54:27', '2023-09-14 11:54:27'),
(3, 'Vendedor', '2023-09-14 11:54:27', '2023-09-14 11:54:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipousuario`
--

CREATE TABLE `tb_tipousuario` (
  `IdTipoUsu` int(11) NOT NULL,
  `DescripcionTipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tb_tipousuario`
--

INSERT INTO `tb_tipousuario` (`IdTipoUsu`, `DescripcionTipo`) VALUES
(1, 'Administrador'),
(2, 'Responsable');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `IdUsu` int(11) NOT NULL,
  `IdTipoUsu` int(11) NOT NULL,
  `NombreUsu` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `LastConnection` datetime DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tb_usuario`
--

INSERT INTO `tb_usuario` (`IdUsu`, `IdTipoUsu`, `NombreUsu`, `Nombre`, `Apellido`, `password`, `LastConnection`, `DateCreate`, `DateUpdate`) VALUES
(6, 1, 'admin', 'Administrador', 'administrador', '$argon2id$v=19$m=4096,t=2,p=2$ZURZWG0yNkNOZVJTLlg5Lw$MvzbwXUNlV+Inxssd1nN+A8EN5Il6CdSAs7pTc3szJk', '2024-02-27 16:53:21', '2024-02-16 12:09:23', '2024-02-16 12:09:23');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_almacen`
--
ALTER TABLE `tb_almacen`
  ADD PRIMARY KEY (`IdAlma`) USING BTREE,
  ADD KEY `IdProd` (`IdProd`) USING BTREE;

--
-- Indices de la tabla `tb_almacen_merma`
--
ALTER TABLE `tb_almacen_merma`
  ADD PRIMARY KEY (`IdAlmacenMerma`) USING BTREE;

--
-- Indices de la tabla `tb_categoriaprod`
--
ALTER TABLE `tb_categoriaprod`
  ADD PRIMARY KEY (`IdCate`) USING BTREE;

--
-- Indices de la tabla `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`IdCli`) USING BTREE;

--
-- Indices de la tabla `tb_estado`
--
ALTER TABLE `tb_estado`
  ADD PRIMARY KEY (`IdEstado`) USING BTREE;

--
-- Indices de la tabla `tb_ingreso`
--
ALTER TABLE `tb_ingreso`
  ADD PRIMARY KEY (`IdIng`) USING BTREE,
  ADD KEY `IdPer` (`IdPer`) USING BTREE;

--
-- Indices de la tabla `tb_lote`
--
ALTER TABLE `tb_lote`
  ADD PRIMARY KEY (`IdLote`) USING BTREE,
  ADD KEY `IdPer` (`IdPer`) USING BTREE;

--
-- Indices de la tabla `tb_notapedido`
--
ALTER TABLE `tb_notapedido`
  ADD PRIMARY KEY (`IdNotaP`) USING BTREE,
  ADD KEY `IdPer` (`IdPer`) USING BTREE;

--
-- Indices de la tabla `tb_personal`
--
ALTER TABLE `tb_personal`
  ADD PRIMARY KEY (`IdPer`) USING BTREE,
  ADD KEY `IdTipoPer` (`IdTipoPer`) USING BTREE;

--
-- Indices de la tabla `tb_producto`
--
ALTER TABLE `tb_producto`
  ADD PRIMARY KEY (`IdProd`) USING BTREE,
  ADD KEY `IdCate` (`IdCate`) USING BTREE;

--
-- Indices de la tabla `tb_tipopersonal`
--
ALTER TABLE `tb_tipopersonal`
  ADD PRIMARY KEY (`IdTipoPer`) USING BTREE;

--
-- Indices de la tabla `tb_tipousuario`
--
ALTER TABLE `tb_tipousuario`
  ADD PRIMARY KEY (`IdTipoUsu`) USING BTREE;

--
-- Indices de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`IdUsu`) USING BTREE,
  ADD KEY `IdTipoUsu` (`IdTipoUsu`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_almacen`
--
ALTER TABLE `tb_almacen`
  MODIFY `IdAlma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tb_almacen_merma`
--
ALTER TABLE `tb_almacen_merma`
  MODIFY `IdAlmacenMerma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_categoriaprod`
--
ALTER TABLE `tb_categoriaprod`
  MODIFY `IdCate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `IdCli` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `tb_estado`
--
ALTER TABLE `tb_estado`
  MODIFY `IdEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tb_ingreso`
--
ALTER TABLE `tb_ingreso`
  MODIFY `IdIng` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `tb_lote`
--
ALTER TABLE `tb_lote`
  MODIFY `IdLote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `tb_notapedido`
--
ALTER TABLE `tb_notapedido`
  MODIFY `IdNotaP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `tb_personal`
--
ALTER TABLE `tb_personal`
  MODIFY `IdPer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tb_producto`
--
ALTER TABLE `tb_producto`
  MODIFY `IdProd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `tb_tipopersonal`
--
ALTER TABLE `tb_tipopersonal`
  MODIFY `IdTipoPer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_tipousuario`
--
ALTER TABLE `tb_tipousuario`
  MODIFY `IdTipoUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `IdUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_almacen`
--
ALTER TABLE `tb_almacen`
  ADD CONSTRAINT `tb_almacen_ibfk_1` FOREIGN KEY (`IdProd`) REFERENCES `tb_producto` (`IdProd`);

--
-- Filtros para la tabla `tb_ingreso`
--
ALTER TABLE `tb_ingreso`
  ADD CONSTRAINT `tb_ingreso_ibfk_1` FOREIGN KEY (`IdPer`) REFERENCES `tb_personal` (`IdPer`);

--
-- Filtros para la tabla `tb_lote`
--
ALTER TABLE `tb_lote`
  ADD CONSTRAINT `tb_lote_ibfk_1` FOREIGN KEY (`IdPer`) REFERENCES `tb_personal` (`IdPer`);

--
-- Filtros para la tabla `tb_notapedido`
--
ALTER TABLE `tb_notapedido`
  ADD CONSTRAINT `tb_notapedido_ibfk_1` FOREIGN KEY (`IdPer`) REFERENCES `tb_personal` (`IdPer`);

--
-- Filtros para la tabla `tb_personal`
--
ALTER TABLE `tb_personal`
  ADD CONSTRAINT `tb_personal_ibfk_1` FOREIGN KEY (`IdTipoPer`) REFERENCES `tb_tipopersonal` (`IdTipoPer`);

--
-- Filtros para la tabla `tb_producto`
--
ALTER TABLE `tb_producto`
  ADD CONSTRAINT `tb_producto_ibfk_1` FOREIGN KEY (`IdCate`) REFERENCES `tb_categoriaprod` (`IdCate`);

--
-- Filtros para la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD CONSTRAINT `tb_usuario_ibfk_1` FOREIGN KEY (`IdTipoUsu`) REFERENCES `tb_tipousuario` (`IdTipoUsu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
