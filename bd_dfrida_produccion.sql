-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-07-2024 a las 22:09:42
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
-- Base de datos: `bd_dfrida`
--
CREATE DATABASE IF NOT EXISTS `bd_dfrida` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bd_dfrida`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alamcen_mprima`
--

CREATE TABLE `alamcen_mprima` (
  `idAlmaMprima` int(11) NOT NULL,
  `idMprima` int(11) NOT NULL,
  `codigoMprima` varchar(255) NOT NULL,
  `nombreMprima` varchar(255) NOT NULL,
  `unidadMprima` int(11) NOT NULL,
  `cantidadMprima` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacen_prod`
--

CREATE TABLE `almacen_prod` (
  `idAlmaProd` int(11) NOT NULL,
  `idProd` int(11) NOT NULL,
  `codigoProd` varchar(255) NOT NULL,
  `nombreProd` varchar(255) NOT NULL,
  `unidadProd` int(11) NOT NULL,
  `cantidadProd` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_mprima`
--

CREATE TABLE `categoria_mprima` (
  `idCatMPrima` int(11) NOT NULL,
  `nombreCategoriaMprima` varchar(255) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `categoria_mprima`
--

INSERT INTO `categoria_mprima` (`idCatMPrima`, `nombreCategoriaMprima`, `DateCreate`, `DateUpdate`) VALUES
(1, 'Hilo negro', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Hilooo 3ml', '2024-06-27 13:23:40', '2024-06-27 15:33:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_prod`
--

CREATE TABLE `categoria_prod` (
  `idCatPro` int(11) NOT NULL,
  `nombreCategoriaProd` varchar(255) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `categoria_prod`
--

INSERT INTO `categoria_prod` (`idCatPro`, `nombreCategoriaProd`, `DateCreate`, `DateUpdate`) VALUES
(1, 'Poleras Hombre XL', '0000-00-00 00:00:00', '2024-06-26 13:13:14'),
(5, 'Casca Promo Ln', '2024-06-26 11:46:38', '2024-06-28 11:38:35'),
(6, 'Camisa Escolar S', '2024-06-26 11:47:09', '0000-00-00 00:00:00'),
(16, 'Casca Promo M', '2024-06-26 12:32:03', '0000-00-00 00:00:00'),
(17, 'Casca Promo S', '2024-06-26 12:32:23', '2024-06-26 13:01:23'),
(23, 'Casca Promo Miiii', '2024-06-26 14:46:21', '2024-06-26 15:55:51'),
(28, 'Casca Promo yygg', '2024-06-26 15:18:39', '2024-06-26 15:57:31'),
(31, 'sdgsdg', '2024-06-28 11:39:24', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCli` int(11) NOT NULL,
  `RazonSocialCli` varchar(255) DEFAULT NULL,
  `rucCli` varchar(255) DEFAULT NULL,
  `nombreCli` varchar(255) NOT NULL,
  `correoCli` varchar(255) DEFAULT NULL,
  `direccionCli` varchar(255) DEFAULT NULL,
  `celularCli` int(11) DEFAULT NULL,
  `detalleCli` varchar(255) DEFAULT NULL,
  `EstadoCli` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCli`, `RazonSocialCli`, `rucCli`, `nombreCli`, `correoCli`, `direccionCli`, `celularCli`, `detalleCli`, `EstadoCli`, `DateCreate`, `DateUpdate`) VALUES
(10, 'Impedit qui facilis', 'Exercitation sequi n', 'Carla Mcpherson', 'kygaxud@mailinator.com', 'Qui elit minus veli', 16, 'Voluptas maxime obca', 2, '2024-06-25 09:30:34', '2024-06-25 09:32:33'),
(11, 'Harum reprehenderit ', 'Et provident volupt', 'Ella Myers', 'gafemuz@mailinator.com', 'Eaque aut eaque eius', 94, 'Exercitationem et ni', 1, '2024-06-25 09:31:42', '2024-06-25 09:31:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

CREATE TABLE `cotizacion` (
  `idCoti` int(11) NOT NULL,
  `tituloCoti` varchar(255) NOT NULL,
  `fechaCoti` datetime NOT NULL,
  `razonSocialCoti` varchar(255) NOT NULL,
  `nombreComercialCoti` varchar(255) NOT NULL,
  `rucCoti` int(11) NOT NULL,
  `nombreCoti` varchar(255) NOT NULL,
  `celularCoti` int(11) DEFAULT NULL,
  `correoCoti` varchar(255) DEFAULT NULL,
  `direccionCoti` varchar(255) DEFAULT NULL,
  `detalleCoti` varchar(255) DEFAULT NULL,
  `productsCoti` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`productsCoti`)),
  `productsMprimaCoti` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`productsMprimaCoti`)),
  `totalProductsCoti` decimal(10,2) NOT NULL,
  `totalProductsMprimaCoti` decimal(10,2) NOT NULL,
  `igvCoti` decimal(10,2) NOT NULL,
  `subTotalCoti` decimal(10,2) NOT NULL,
  `totalCoti` decimal(10,2) NOT NULL,
  `estadoCoti` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `cotizacion`
--

INSERT INTO `cotizacion` (`idCoti`, `tituloCoti`, `fechaCoti`, `razonSocialCoti`, `nombreComercialCoti`, `rucCoti`, `nombreCoti`, `celularCoti`, `correoCoti`, `direccionCoti`, `detalleCoti`, `productsCoti`, `productsMprimaCoti`, `totalProductsCoti`, `totalProductsMprimaCoti`, `igvCoti`, `subTotalCoti`, `totalCoti`, `estadoCoti`, `DateCreate`, `DateUpdate`) VALUES
(6, 'Aliquip numquam proi', '2020-12-17 00:00:00', 'Quia dolorum Nam ad ', 'Fugit adipisci in i', 85, 'Proident officia in', 80, 'Atque pariatur Quib', 'Velit perferendis bl', 'Cumque ullam id sunt', '{\"producto0\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto1\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto2\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto3\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"}}', 2902.00, 1266.00, 0.00, 4168.00, 4168.00, 1, '2024-07-02 12:14:38', '0000-00-00 00:00:00'),
(7, 'Rerum dolor fugit h', '2018-08-05 00:00:00', 'Amet eu sint reicie', 'Animi sint exercita', 58, 'In eiusmod omnis qua', 46, 'In consectetur autem', 'Quia eligendi ipsum', 'Repellendus Volupta', '{\"producto0\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto1\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto2\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto3\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto4\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"22\",\"nombreProdMprimaCoti\":\"Hop Powers\",\"unidadProdMprimaCoti\":\"34\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"196.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"}}', 279116.00, 1615.00, 0.00, 280731.00, 280731.00, 1, '2024-07-02 12:15:19', '0000-00-00 00:00:00'),
(8, 'Ea rem adipisci est', '1970-05-14 00:00:00', 'Officia exercitation', 'Pariatur Velit aute', 56, 'Suscipit ad id volu', 40, 'Nulla rerum aut ad e', 'Sint quia quos dict', 'Aspernatur nostrud m', '{\"producto0\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"26\",\"precioProdCoti\":\"19786.00\"},\"producto1\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"96\",\"precioProdCoti\":\"66240.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"5\",\"precioProdMprimaCoti\":\"2365.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"2\",\"precioProdMprimaCoti\":\"320.00\"}}', 86026.00, 2685.00, 0.00, 88711.00, 88711.00, 1, '2024-07-02 12:24:02', '0000-00-00 00:00:00'),
(9, 'werwerqwerqwerqwerqwer', '2024-07-02 00:00:00', '', '', 0, 'asdfasdfasdf', 0, '', '', '', '{\"producto0\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto1\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto2\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto3\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"}}', 2902.00, 1426.00, 0.00, 4328.00, 4328.00, 1, '2024-07-02 12:29:05', '0000-00-00 00:00:00'),
(10, 'Est et autem distin', '1976-12-07 00:00:00', 'Aliquip dolore accus', 'Voluptatibus eos ip', 86, 'Nesciunt qui eu eaq', 70, 'Enim corporis veniam', 'Dicta nostrud iste q', 'Laboriosam dolores ', '{\"producto0\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto1\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto2\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto3\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"}}', 2902.00, 1266.00, 0.00, 4168.00, 4168.00, 1, '2024-07-02 12:30:52', '0000-00-00 00:00:00'),
(11, 'Est at quo quia dolo', '2018-01-21 00:00:00', 'Nulla itaque aut in ', 'Dolor occaecat eos ', 90, 'Dolorem suscipit ips', 49, 'Voluptate impedit n', 'Rerum dolorem eos q', 'Voluptas enim qui mi', '{\"producto0\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"}}', 761.00, 473.00, 0.00, 1234.00, 1234.00, 1, '2024-07-02 12:32:31', '0000-00-00 00:00:00'),
(12, 'Odit temporibus eius', '2010-01-19 00:00:00', 'Excepturi suscipit d', 'Consequuntur quas do', 57, 'Voluptas aliqua Dol', 93, 'Quis sequi voluptatu', 'Non eu odio a magna ', 'Ut fuga Voluptatum ', '{\"producto0\":{\"codProdCoti\":\"30\",\"nombreProdCoti\":\"Sylvester Tuckergggggggg\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"60.00\"},\"producto1\":{\"codProdCoti\":\"31\",\"nombreProdCoti\":\"Arsenio Gilliam\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"92555.00\"},\"producto2\":{\"codProdCoti\":\"33\",\"nombreProdCoti\":\"Kai Griffith\",\"unidadProdCoti\":\"Docena\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"761.00\"},\"producto3\":{\"codProdCoti\":\"34\",\"nombreProdCoti\":\"Jordan Cross\",\"unidadProdCoti\":\"Uni\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"690.00\"},\"producto4\":{\"codProdCoti\":\"29\",\"nombreProdCoti\":\"camisa\",\"unidadProdCoti\":\"1\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"1.00\"},\"producto5\":{\"codProdCoti\":\"16\",\"nombreProdCoti\":\"Simone Chan\",\"unidadProdCoti\":\"51\",\"cantidadProdCoti\":\"1\",\"precioProdCoti\":\"333.00\"}}', '{\"productoPrima0\":{\"codProdMprimaCoti\":\"23\",\"nombreProdMprimaCoti\":\"Teegan Gay\",\"unidadProdMprimaCoti\":\"Metros\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"473.00\"},\"productoPrima1\":{\"codProdMprimaCoti\":\"24\",\"nombreProdMprimaCoti\":\"Robin Dunn\",\"unidadProdMprimaCoti\":\"Uni\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"160.00\"},\"productoPrima2\":{\"codProdMprimaCoti\":\"22\",\"nombreProdMprimaCoti\":\"Hop Powers\",\"unidadProdMprimaCoti\":\"34\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"196.00\"},\"productoPrima3\":{\"codProdMprimaCoti\":\"21\",\"nombreProdMprimaCoti\":\"Maya Fuller\",\"unidadProdMprimaCoti\":\"78\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"20.00\"},\"productoPrima4\":{\"codProdMprimaCoti\":\"20\",\"nombreProdMprimaCoti\":\"Ulla Yang\",\"unidadProdMprimaCoti\":\"65\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"555.00\"},\"productoPrima5\":{\"codProdMprimaCoti\":\"20\",\"nombreProdMprimaCoti\":\"Ulla Yang\",\"unidadProdMprimaCoti\":\"65\",\"cantidadProdMprimaCoti\":\"1\",\"precioProdMprimaCoti\":\"555.00\"}}', 94400.00, 1959.00, 0.00, 96359.00, 96359.00, 1, '2024-07-02 14:51:03', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desecho_merma`
--

CREATE TABLE `desecho_merma` (
  `idDeseMerma` int(11) NOT NULL,
  `idMerma` int(11) NOT NULL,
  `codigoMprima` varchar(255) NOT NULL,
  `nombreMprima` varchar(255) NOT NULL,
  `unidadMprima` int(11) NOT NULL,
  `cantidadMprima` decimal(10,2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ficha_proceso`
--

CREATE TABLE `ficha_proceso` (
  `idFichaProc` int(11) NOT NULL,
  `tituloFichaProc` varchar(255) NOT NULL,
  `nombreFichaProc` varchar(255) NOT NULL,
  `docFichaProc` varchar(255) DEFAULT NULL,
  `procesoFichaProcJson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`procesoFichaProcJson`)),
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ficha_tecnica`
--

CREATE TABLE `ficha_tecnica` (
  `idFichaTec` int(11) NOT NULL,
  `nombreFichaTec` varchar(255) NOT NULL,
  `docFichaTec` varchar(255) DEFAULT NULL,
  `EstadoFichaTec` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso_mprima`
--

CREATE TABLE `ingreso_mprima` (
  `idIngMprima` int(11) NOT NULL,
  `idMprima` int(11) NOT NULL,
  `codigoMprima` varchar(255) NOT NULL,
  `nombreMprima` varchar(255) NOT NULL,
  `unidadMprima` int(11) NOT NULL,
  `cantidadMprima` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso_prod`
--

CREATE TABLE `ingreso_prod` (
  `idIngProd` int(11) NOT NULL,
  `idProd` int(11) NOT NULL,
  `codigoProd` varchar(255) NOT NULL,
  `nombreProd` varchar(255) NOT NULL,
  `unidadProd` int(11) NOT NULL,
  `cantidadProd` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia_prima`
--

CREATE TABLE `materia_prima` (
  `idMprima` int(11) NOT NULL,
  `idCatMprima` int(11) NOT NULL,
  `codigoMprima` varchar(255) NOT NULL,
  `nombreMprima` varchar(255) NOT NULL,
  `detalleMprima` varchar(255) DEFAULT NULL,
  `unidadMprima` varchar(255) NOT NULL,
  `precioMprima` decimal(10,2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `materia_prima`
--

INSERT INTO `materia_prima` (`idMprima`, `idCatMprima`, `codigoMprima`, `nombreMprima`, `detalleMprima`, `unidadMprima`, `precioMprima`, `DateCreate`, `DateUpdate`) VALUES
(1, 1, 'Nisi maxime delectus', 'Cain Odonnell', 'Exercitation commodi', '0', 774.00, '2024-06-27 10:24:19', '0000-00-00 00:00:00'),
(2, 1, 'Est et ea sit obcaec', 'Guy Carr', 'Tempora quis quia ip', '0', 344.00, '2024-06-27 10:24:34', '0000-00-00 00:00:00'),
(3, 1, 'Minus harum ea atque', 'Marcia Odom', 'In et ullamco facili', '0', 261.00, '2024-06-27 10:24:40', '0000-00-00 00:00:00'),
(4, 1, 'Sunt dolore rerum qu', 'Dakota Browning', 'Mollit ratione lorem', '0', 598.00, '2024-06-27 10:24:46', '0000-00-00 00:00:00'),
(12, 2, 'Rerum adipisci provi', 'alex', 'Dicta enim dolore to', '90', 519.00, '2024-06-27 15:05:05', '0000-00-00 00:00:00'),
(13, 2, '	Sunt dolore rerum qu', 'EPEPE', 'Dolor deleniti eiusm', '10', 542.00, '2024-06-27 15:05:50', '0000-00-00 00:00:00'),
(15, 2, '', '', '', '0', 0.00, '2024-06-27 15:44:19', '0000-00-00 00:00:00'),
(16, 2, 'Error nihil beatae e', 'tellaaaaaaaa', 'Ratione earum ea duc', '21', 1.00, '2024-06-28 17:28:02', '0000-00-00 00:00:00'),
(17, 2, 'Error nihil beatae egggg', 'tellaaaaaaaayyyy', 'Ratione earum ea duc', '21', 1.00, '2024-06-28 17:28:10', '0000-00-00 00:00:00'),
(19, 1, 'Molestiae et sit qu', 'Megan Taylor', 'Consequatur Omnis u', '21', 183.00, '2024-06-28 17:28:38', '0000-00-00 00:00:00'),
(20, 2, 'Ipsam nesciunt dese', 'Ulla Yang', 'Reprehenderit paria', '65', 555.00, '2024-06-28 17:32:51', '0000-00-00 00:00:00'),
(21, 2, 'Voluptatem Irure ev', 'Maya Fuller', 'Facere nostrum nihil', '78', 20.00, '2024-06-28 17:37:10', '0000-00-00 00:00:00'),
(22, 1, 'Non omnis adipisci c', 'Hop Powers', 'Veniam nobis aut re', '34', 196.00, '2024-06-28 17:38:32', '0000-00-00 00:00:00'),
(23, 2, 'Sed voluptas duis qu', 'Teegan Gay', 'Asperiores dolorum m', 'Metros', 473.00, '2024-07-01 15:33:39', '0000-00-00 00:00:00'),
(24, 2, 'Officia et eiusmod q', 'Robin Dunn', 'Deserunt adipisicing', 'Uni', 160.00, '2024-07-01 15:33:55', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `merma`
--

CREATE TABLE `merma` (
  `idMerma` int(11) NOT NULL,
  `idProcOp` int(11) NOT NULL,
  `idSalMprima` int(11) DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `idCli` int(11) NOT NULL,
  `idProd` int(11) NOT NULL,
  `idFichaTec` int(11) DEFAULT NULL,
  `idFichaProc` int(11) DEFAULT NULL,
  `tituloPedido` varchar(255) NOT NULL,
  `nombrePedido` varchar(255) NOT NULL,
  `fechaPedido` date NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso_operativo`
--

CREATE TABLE `proceso_operativo` (
  `idProcOp` int(11) NOT NULL,
  `idTipoProc` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `idSalMprima` int(11) NOT NULL,
  `descripcionProcOp` varchar(255) NOT NULL,
  `estadoProcOp` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso_operativo_fin`
--

CREATE TABLE `proceso_operativo_fin` (
  `idProcOpFin` int(11) NOT NULL,
  `idTipoProc` int(11) NOT NULL,
  `idProcOp` int(11) NOT NULL,
  `descripcionProcOpFin` varchar(255) NOT NULL,
  `estadoProcOpFin` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion`
--

CREATE TABLE `produccion` (
  `idProduccion` int(11) NOT NULL,
  `idProcOpFin` int(11) NOT NULL,
  `idPedido` int(11) DEFAULT NULL,
  `estadoProduccion` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProd` int(11) NOT NULL,
  `idCatPro` int(11) NOT NULL,
  `codigoProd` varchar(255) NOT NULL,
  `nombreProd` varchar(255) NOT NULL,
  `detalleProd` varchar(255) NOT NULL,
  `unidadProd` varchar(255) NOT NULL,
  `precioProd` decimal(10,2) DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProd`, `idCatPro`, `codigoProd`, `nombreProd`, `detalleProd`, `unidadProd`, `precioProd`, `DateCreate`, `DateUpdate`) VALUES
(16, 17, 'Accusantium ut volup', 'Simone Chan', 'Velit ut voluptatum', '51', 333.00, '2024-06-26 15:43:57', '0000-00-00 00:00:00'),
(29, 6, '123456', 'camisa', 'asdas', '1', 1.00, '2024-06-28 15:12:39', '0000-00-00 00:00:00'),
(30, 17, 'Anim dolor recusanda', 'Sylvester Tuckergggggggg', 'Veniam pariatur Re', '1', 60.00, '2024-07-01 12:45:09', '0000-00-00 00:00:00'),
(31, 28, 'Magnam consequat Qu', 'Arsenio Gilliam', 'Ab perspiciatis in ', '1', 92555.00, '2024-07-01 12:45:38', '0000-00-00 00:00:00'),
(33, 5, 'Corrupti ipsa sed ', 'Kai Griffith', 'Quis veritatis dolor', 'Docena', 761.00, '2024-07-01 15:30:54', '0000-00-00 00:00:00'),
(34, 31, 'Dignissimos possimus', 'Jordan Cross', 'Quas ut amet aperia', 'Uni', 690.00, '2024-07-01 15:31:23', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prod_merma`
--

CREATE TABLE `prod_merma` (
  `idProdMerma` int(11) NOT NULL,
  `idMerma` int(11) NOT NULL,
  `idProd` int(11) DEFAULT NULL,
  `cantidadProdMerma` int(11) NOT NULL,
  `estadoProdMerma` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `idProv` int(11) NOT NULL,
  `razonSocialProv` varchar(255) DEFAULT NULL,
  `rucProv` int(11) DEFAULT NULL,
  `nombreProv` varchar(255) DEFAULT NULL,
  `correoProv` varchar(255) DEFAULT NULL,
  `direccionProv` varchar(255) DEFAULT NULL,
  `celularProv` int(11) DEFAULT NULL,
  `detalleProv` varchar(255) DEFAULT NULL,
  `estadoProv` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`idProv`, `razonSocialProv`, `rucProv`, `nombreProv`, `correoProv`, `direccionProv`, `celularProv`, `detalleProv`, `estadoProv`, `DateCreate`, `DateUpdate`) VALUES
(5, 'vende telas', 2147483647, 'telas suavecitas', 'telas_suavecitas@gmail.com', 'su local xd', 32654654, 'suavecitas', 1, '2024-06-25 12:02:03', '2024-06-25 12:02:16'),
(6, 'Dolore aspernatur cu', 74, 'Eiusmod nisi necessi', 'Iste qui blanditiis ', 'Labore nisi pariatur', 54, 'Similique recusandae', 1, '2024-06-28 11:58:58', '2024-06-28 11:58:58'),
(7, 'Impedit praesentium', 61, 'Consectetur molestia', 'Qui quas in suscipit', 'Qui voluptate repreh', 1, 'Exercitationem animi', 1, '2024-06-28 11:59:03', '2024-06-28 11:59:03'),
(8, 'Eos aute itaque cill', 14, 'Dolore aliquip qui v', 'Est provident mole', 'Cupidatat reprehende', 81, 'Reiciendis molestiae', 1, '2024-06-28 11:59:09', '2024-06-28 11:59:09'),
(9, 'Numquam rerum dicta ', 8, 'Aut ut anim sed sunt', 'Autem aut rerum ulla', 'Sed enim dolore nost', 87, 'Autem qui deserunt s', 1, '2024-06-28 11:59:14', '2024-06-28 11:59:14'),
(11, 'Et sit culpa inven', 83, 'Dolores sed nihil it', 'Quae recusandae Nos', 'Velit aute similique', 38, 'Vitae commodo quis d', 1, '2024-06-28 11:59:25', '2024-06-28 11:59:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_mprima`
--

CREATE TABLE `salida_mprima` (
  `idSalMprima` int(11) NOT NULL,
  `idMprima` int(11) NOT NULL,
  `codigoMprima` varchar(255) NOT NULL,
  `nombreMprima` varchar(255) NOT NULL,
  `unidadMprima` int(11) NOT NULL,
  `cantidadMprima` int(11) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_prod`
--

CREATE TABLE `salida_prod` (
  `idSalProd` int(11) NOT NULL,
  `idPedido` int(11) DEFAULT NULL,
  `idCli` int(11) DEFAULT NULL,
  `idProd` int(11) NOT NULL,
  `codigoProd` varchar(255) NOT NULL,
  `nombreProd` varchar(255) NOT NULL,
  `unidadProd` int(11) NOT NULL,
  `cantidadProd` decimal(10,2) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_proceso`
--

CREATE TABLE `tipo_proceso` (
  `idTipoProc` int(11) NOT NULL,
  `idFichaProc` int(11) DEFAULT NULL,
  `descripcionTipoProc` varchar(255) NOT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `idTipoUsu` int(11) NOT NULL,
  `descripcionTipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`idTipoUsu`, `descripcionTipo`) VALUES
(1, 'Administrador'),
(2, 'Administrativo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsu` int(11) NOT NULL,
  `idTipoUsu` int(11) NOT NULL,
  `nombreUsu` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `LastConnection` datetime DEFAULT NULL,
  `DateCreate` datetime NOT NULL,
  `DateUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsu`, `idTipoUsu`, `nombreUsu`, `nombre`, `apellido`, `password`, `LastConnection`, `DateCreate`, `DateUpdate`) VALUES
(1, 1, 'dfrida', 'Administrador', 'administrador', '$argon2id$v=19$m=4096,t=2,p=2$ZURZWG0yNkNOZVJTLlg5Lw$MvzbwXUNlV+Inxssd1nN+A8EN5Il6CdSAs7pTc3szJk', '2024-07-02 09:17:09', '2024-02-16 12:09:23', '2024-02-16 12:09:23'),
(5, 2, 'pifon', 'Zachary', 'Sanchez', '$argon2id$v=19$m=4096,t=2,p=2$QWlNbHdhbjIyOHBZZ0JPZw$OL62fqH6i/HJLy8xedIjdm1FknOiTL83vEBqZsw1Etg', '2024-07-02 10:49:25', '2024-06-25 16:19:29', '2024-06-25 16:19:29');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alamcen_mprima`
--
ALTER TABLE `alamcen_mprima`
  ADD PRIMARY KEY (`idAlmaMprima`),
  ADD KEY `idMprima` (`idMprima`);

--
-- Indices de la tabla `almacen_prod`
--
ALTER TABLE `almacen_prod`
  ADD PRIMARY KEY (`idAlmaProd`),
  ADD KEY `idProd` (`idProd`);

--
-- Indices de la tabla `categoria_mprima`
--
ALTER TABLE `categoria_mprima`
  ADD PRIMARY KEY (`idCatMPrima`);

--
-- Indices de la tabla `categoria_prod`
--
ALTER TABLE `categoria_prod`
  ADD PRIMARY KEY (`idCatPro`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCli`);

--
-- Indices de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD PRIMARY KEY (`idCoti`);

--
-- Indices de la tabla `desecho_merma`
--
ALTER TABLE `desecho_merma`
  ADD PRIMARY KEY (`idDeseMerma`),
  ADD KEY `idMerma` (`idMerma`);

--
-- Indices de la tabla `ficha_proceso`
--
ALTER TABLE `ficha_proceso`
  ADD PRIMARY KEY (`idFichaProc`);

--
-- Indices de la tabla `ficha_tecnica`
--
ALTER TABLE `ficha_tecnica`
  ADD PRIMARY KEY (`idFichaTec`);

--
-- Indices de la tabla `ingreso_mprima`
--
ALTER TABLE `ingreso_mprima`
  ADD PRIMARY KEY (`idIngMprima`),
  ADD KEY `idMprima` (`idMprima`);

--
-- Indices de la tabla `ingreso_prod`
--
ALTER TABLE `ingreso_prod`
  ADD PRIMARY KEY (`idIngProd`),
  ADD KEY `idProd` (`idProd`);

--
-- Indices de la tabla `materia_prima`
--
ALTER TABLE `materia_prima`
  ADD PRIMARY KEY (`idMprima`),
  ADD KEY `idCatMprima` (`idCatMprima`);

--
-- Indices de la tabla `merma`
--
ALTER TABLE `merma`
  ADD PRIMARY KEY (`idMerma`),
  ADD KEY `idProcOp` (`idProcOp`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idCli` (`idCli`),
  ADD KEY `idProd` (`idProd`),
  ADD KEY `idFichaTec` (`idFichaTec`),
  ADD KEY `idFichaProc` (`idFichaProc`);

--
-- Indices de la tabla `proceso_operativo`
--
ALTER TABLE `proceso_operativo`
  ADD PRIMARY KEY (`idProcOp`),
  ADD KEY `idTipoProc` (`idTipoProc`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idSalMprima` (`idSalMprima`);

--
-- Indices de la tabla `proceso_operativo_fin`
--
ALTER TABLE `proceso_operativo_fin`
  ADD PRIMARY KEY (`idProcOpFin`),
  ADD KEY `idTipoProc` (`idTipoProc`),
  ADD KEY `idProcOp` (`idProcOp`);

--
-- Indices de la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD PRIMARY KEY (`idProduccion`),
  ADD KEY `idProcOpFin` (`idProcOpFin`),
  ADD KEY `idPedido` (`idPedido`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProd`),
  ADD KEY `idCatPro` (`idCatPro`);

--
-- Indices de la tabla `prod_merma`
--
ALTER TABLE `prod_merma`
  ADD PRIMARY KEY (`idProdMerma`),
  ADD KEY `idMerma` (`idMerma`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`idProv`);

--
-- Indices de la tabla `salida_mprima`
--
ALTER TABLE `salida_mprima`
  ADD PRIMARY KEY (`idSalMprima`),
  ADD KEY `idMprima` (`idMprima`);

--
-- Indices de la tabla `salida_prod`
--
ALTER TABLE `salida_prod`
  ADD PRIMARY KEY (`idSalProd`),
  ADD KEY `idProd` (`idProd`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idCli` (`idCli`);

--
-- Indices de la tabla `tipo_proceso`
--
ALTER TABLE `tipo_proceso`
  ADD PRIMARY KEY (`idTipoProc`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`idTipoUsu`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsu`),
  ADD KEY `idTipoUsu` (`idTipoUsu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alamcen_mprima`
--
ALTER TABLE `alamcen_mprima`
  MODIFY `idAlmaMprima` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `almacen_prod`
--
ALTER TABLE `almacen_prod`
  MODIFY `idAlmaProd` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria_mprima`
--
ALTER TABLE `categoria_mprima`
  MODIFY `idCatMPrima` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `categoria_prod`
--
ALTER TABLE `categoria_prod`
  MODIFY `idCatPro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCli` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  MODIFY `idCoti` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `desecho_merma`
--
ALTER TABLE `desecho_merma`
  MODIFY `idDeseMerma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ficha_proceso`
--
ALTER TABLE `ficha_proceso`
  MODIFY `idFichaProc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ficha_tecnica`
--
ALTER TABLE `ficha_tecnica`
  MODIFY `idFichaTec` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingreso_mprima`
--
ALTER TABLE `ingreso_mprima`
  MODIFY `idIngMprima` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingreso_prod`
--
ALTER TABLE `ingreso_prod`
  MODIFY `idIngProd` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materia_prima`
--
ALTER TABLE `materia_prima`
  MODIFY `idMprima` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `merma`
--
ALTER TABLE `merma`
  MODIFY `idMerma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proceso_operativo`
--
ALTER TABLE `proceso_operativo`
  MODIFY `idProcOp` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proceso_operativo_fin`
--
ALTER TABLE `proceso_operativo_fin`
  MODIFY `idProcOpFin` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `produccion`
--
ALTER TABLE `produccion`
  MODIFY `idProduccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `prod_merma`
--
ALTER TABLE `prod_merma`
  MODIFY `idProdMerma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `idProv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `salida_mprima`
--
ALTER TABLE `salida_mprima`
  MODIFY `idSalMprima` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `salida_prod`
--
ALTER TABLE `salida_prod`
  MODIFY `idSalProd` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_proceso`
--
ALTER TABLE `tipo_proceso`
  MODIFY `idTipoProc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `idTipoUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alamcen_mprima`
--
ALTER TABLE `alamcen_mprima`
  ADD CONSTRAINT `alamcen_mprima_ibfk_1` FOREIGN KEY (`idMprima`) REFERENCES `materia_prima` (`idMprima`);

--
-- Filtros para la tabla `almacen_prod`
--
ALTER TABLE `almacen_prod`
  ADD CONSTRAINT `almacen_prod_ibfk_1` FOREIGN KEY (`idProd`) REFERENCES `producto` (`idProd`);

--
-- Filtros para la tabla `desecho_merma`
--
ALTER TABLE `desecho_merma`
  ADD CONSTRAINT `desecho_merma_ibfk_1` FOREIGN KEY (`idMerma`) REFERENCES `merma` (`idMerma`);

--
-- Filtros para la tabla `ingreso_mprima`
--
ALTER TABLE `ingreso_mprima`
  ADD CONSTRAINT `ingreso_mprima_ibfk_1` FOREIGN KEY (`idMprima`) REFERENCES `materia_prima` (`idMprima`);

--
-- Filtros para la tabla `ingreso_prod`
--
ALTER TABLE `ingreso_prod`
  ADD CONSTRAINT `ingreso_prod_ibfk_1` FOREIGN KEY (`idProd`) REFERENCES `producto` (`idProd`);

--
-- Filtros para la tabla `materia_prima`
--
ALTER TABLE `materia_prima`
  ADD CONSTRAINT `materia_prima_ibfk_1` FOREIGN KEY (`idCatMprima`) REFERENCES `categoria_mprima` (`idCatMPrima`);

--
-- Filtros para la tabla `merma`
--
ALTER TABLE `merma`
  ADD CONSTRAINT `merma_ibfk_1` FOREIGN KEY (`idProcOp`) REFERENCES `proceso_operativo` (`idProcOp`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCli`) REFERENCES `cliente` (`idCli`),
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`idProd`) REFERENCES `producto` (`idProd`),
  ADD CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`idFichaTec`) REFERENCES `ficha_tecnica` (`idFichaTec`),
  ADD CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`idFichaProc`) REFERENCES `ficha_proceso` (`idFichaProc`);

--
-- Filtros para la tabla `proceso_operativo`
--
ALTER TABLE `proceso_operativo`
  ADD CONSTRAINT `proceso_operativo_ibfk_1` FOREIGN KEY (`idTipoProc`) REFERENCES `tipo_proceso` (`idTipoProc`),
  ADD CONSTRAINT `proceso_operativo_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  ADD CONSTRAINT `proceso_operativo_ibfk_3` FOREIGN KEY (`idSalMprima`) REFERENCES `salida_mprima` (`idSalMprima`);

--
-- Filtros para la tabla `proceso_operativo_fin`
--
ALTER TABLE `proceso_operativo_fin`
  ADD CONSTRAINT `proceso_operativo_fin_ibfk_1` FOREIGN KEY (`idTipoProc`) REFERENCES `tipo_proceso` (`idTipoProc`),
  ADD CONSTRAINT `proceso_operativo_fin_ibfk_2` FOREIGN KEY (`idProcOp`) REFERENCES `proceso_operativo` (`idProcOp`);

--
-- Filtros para la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`idProcOpFin`) REFERENCES `proceso_operativo_fin` (`idProcOpFin`),
  ADD CONSTRAINT `produccion_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idCatPro`) REFERENCES `categoria_prod` (`idCatPro`);

--
-- Filtros para la tabla `prod_merma`
--
ALTER TABLE `prod_merma`
  ADD CONSTRAINT `prod_merma_ibfk_1` FOREIGN KEY (`idMerma`) REFERENCES `merma` (`idMerma`);

--
-- Filtros para la tabla `salida_mprima`
--
ALTER TABLE `salida_mprima`
  ADD CONSTRAINT `salida_mprima_ibfk_1` FOREIGN KEY (`idMprima`) REFERENCES `materia_prima` (`idMprima`);

--
-- Filtros para la tabla `salida_prod`
--
ALTER TABLE `salida_prod`
  ADD CONSTRAINT `salida_prod_ibfk_1` FOREIGN KEY (`idProd`) REFERENCES `producto` (`idProd`),
  ADD CONSTRAINT `salida_prod_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  ADD CONSTRAINT `salida_prod_ibfk_3` FOREIGN KEY (`idCli`) REFERENCES `cliente` (`idCli`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idTipoUsu`) REFERENCES `tipo_usuario` (`idTipoUsu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
