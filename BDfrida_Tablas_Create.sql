--ver tabla creada
--SHOW CREATE TABLE salida_mprima;

--eliminar clave foranea 
--ALTER TABLE salida_mprima DROP FOREIGN KEY salida_mprima_ibfk_1;

--eliminar campo de tabla 
--ALTER TABLE tabla
--DROP COLUMN campo;

--agrear campo a tabla
--ALTER TABLE tabla
--ADD COLUMN campo tipo;

--eliminar una tabla
--Drop TABLE alamcen_mprima;

--agregar cclave foranea
--ALTER TABLE tipo_proceso
--ADD CONSTRAINT fk_idFichaProc FOREIGN KEY (idFichaProc) REFERENCES ficha_proceso(idFichaProc);
-----------------------------------------------------
ALTER TABLE pedido
ADD COLUMN idFichaTec int (11) DEFAULT NULL;

ALTER TABLE pedido
ADD CONSTRAINT fk_idFichaTec FOREIGN KEY (idFichaTec) REFERENCES ficha_tecnica (idFichaTec);

CREATE TABLE
    `tipo_Usuario` (
        `idTipoUsu` int (11) NOT NULL AUTO_INCREMENT,
        `descripcionTipo` varchar(255) NOT NULL,
        PRIMARY KEY (`idTipoUsu`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

INSERT INTO
    `tipo_Usuario` (`descripcionTipo`)
VALUES
    ('Administrador'),
    ('Administrativo');

CREATE TABLE
    `usuario` (
        `idUsu` int (11) NOT NULL AUTO_INCREMENT,
        `idTipoUsu` int (11) NOT NULL,
        `nombreUsu` varchar(255) NOT NULL,
        `nombre` varchar(255) NOT NULL,
        `apellido` varchar(255) NOT NULL,
        `password` varchar(255) NOT NULL,
        `LastConnection` datetime DEFAULT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idUsu`),
        FOREIGN KEY (`idTipoUsu`) REFERENCES `tipo_Usuario` (`idTipoUsu`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

INSERT INTO
    `usuario` (
        `idTipoUsu`,
        `nombreUsu`,
        `nombre`,
        `apellido`,
        `password`,
        `LastConnection`,
        `DateCreate`,
        `DateUpdate`
    )
VALUES
    (
        1,
        'dfrida',
        'Administrador',
        'administrador',
        '$argon2id$v=19$m=4096,t=2,p=2$ZURZWG0yNkNOZVJTLlg5Lw$MvzbwXUNlV+Inxssd1nN+A8EN5Il6CdSAs7pTc3szJk',
        '2024-02-27 16:53:21',
        '2024-02-16 12:09:23',
        '2024-02-16 12:09:23'
    );

CREATE TABLE
    `categoria_Prod` (
        `idCatPro` int (11) NOT NULL AUTO_INCREMENT,
        `nombreCategoriaProd` varchar(255) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idCatPro`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `producto` (
        `idProd` int (11) NOT NULL AUTO_INCREMENT,
        `idCatPro` int (11) NOT NULL,
        `codigoProd` varchar(255) NOT NULL,
        `nombreProd` varchar(255) NOT NULL,
        `detalleProd` varchar(255) NOT NULL,
        `unidadProd` int (11) NOT NULL,
        `precioProd` decimal(10, 2) DEFAULT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idProd`),
        FOREIGN KEY (`idCatPro`) REFERENCES `categoria_Prod` (`idCatPro`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `categoria_Mprima` (
        `idCatMPrima` int (11) NOT NULL AUTO_INCREMENT,
        `nombreCategoriaMprima` varchar(255) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idCatMPrima`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `materia_prima` (
        `idMprima` int (11) NOT NULL AUTO_INCREMENT,
        `idCatMprima` int (11) NOT NULL,
        `codigoMprima` varchar(255) NOT NULL,
        `nombreMprima` varchar(255) NOT NULL,
        `detalleMprima` varchar(255) DEFAULT NULL,
        `unidadMprima` varchar(255) NOT NULL,
        `precioMprima` decimal(10, 2) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idMprima`),
        FOREIGN KEY (`idCatMprima`) REFERENCES `categoria_Mprima` (`idCatMPrima`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `cliente` (
        `idCli` int (11) NOT NULL AUTO_INCREMENT,
        `RazonSocialCli` varchar(255) DEFAULT NULL,
        `rucCli` varchar(255) DEFAULT NULL,
        `nombreCli` varchar(255) NOT NULL,
        `correoCli` varchar(255) DEFAULT NULL,
        `direccionCli` varchar(255) DEFAULT NULL,
        `celularCli` int (11) DEFAULT NULL,
        `detalleCli` varchar(255) DEFAULT NULL,
        `EstadoCli` int (11) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idCli`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `cotizacion` (
        `idCoti` int (11) NOT NULL AUTO_INCREMENT,
        `tituloCoti` varchar(255) NOT NULL,
        `fechaCoti` date NOT NULL,
        `razonSocialCoti` varchar(255) NOT NULL,
        `nombreComercialCoti` varchar(255) NOT NULL,
        `rucCoti` int (11) NOT NULL,
        `nombreCoti` varchar(255) NOT NULL,
        `celularCoti` int (11) DEFAULT NULL,
        `correoCoti` varchar(255) DEFAULT NULL,
        `direccionCoti` varchar(255) DEFAULT NULL,
        `detalleCoti` varchar(255) DEFAULT NULL,
        `productsCoti` JSON NOT NULL,
        `productsMprimaCoti` JSON NOT NULL,
        `totalProductsCoti` decimal(10, 2) NOT NULL,
        `totalProductsMprimaCoti` decimal(10, 2) NOT NULL,
        `igvCoti` decimal(10, 2) NOT NULL,
        `subTotalCoti` decimal(10, 2) NOT NULL,
        `totalCoti` decimal(10, 2) NOT NULL,
        `estadoCoti` int (11) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idCoti`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `proveedores` (
        `idProv` int (11) NOT NULL AUTO_INCREMENT,
        `razonSocialProv` varchar(255) NOT NULL,
        `rucProv` int (11) NOT NULL,
        `nombreProv` varchar(255) NOT NULL,
        `correoProv` varchar(255) DEFAULT NULL,
        `direccionProv` varchar(255) DEFAULT NULL,
        `celularProv` int (11) DEFAULT NULL,
        `detalleProv` varchar(255) DEFAULT NULL,
        `EstadoProv` int (11) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idProv`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `ficha_Tecnica` (
        `idFichaTec` int (11) NOT NULL AUTO_INCREMENT,
        `nombreFichaTec` varchar(255) NOT NULL,
        `fechaFichaTec` date (255) NOT NULL,
        `clienteFichaTec` varchar(255) NOT NULL,
        `descripcionFichaTec` varchar(255) NOT NULL,
        `codigoFichaTec` varchar(255) NOT NULL,
        `nombreSoliFichaTec` varchar(255) NOT NULL,
        `celularFichaTec` varchar(255) NOT NULL,
        `correoFichaTec` varchar(255) NOT NULL,
        `detalleFichaTec` varchar(255) NOT NULL,
        `docFichaTec` JSON NOT NULL,
        `estadoFichaTec` int (11) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idFichaTec`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `ficha_Proceso` (
        `idFichaProc` int (11) NOT NULL AUTO_INCREMENT,
        `tituloFichaProc` varchar(255) NOT NULL,
        `productoFichaProc` varchar(255) NOT NULL,
        `detalleFichaProc` varchar(255) NOT NULL,
        `procesoFichaProcJson` JSON NOT NULL,
        `docFichaProc` varchar(255) DEFAULT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idFichaProc`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `pedido` (
        `idPedido` int (11) NOT NULL AUTO_INCREMENT,
        `idCli` int (11) NOT NULL,
        `idProd` int (11) NOT NULL,
        `idFichaTec` int (11) DEFAULT NULL,
        `idFichaProc` int (11) DEFAULT NULL,
        `tituloPedido` VARCHAR(255) NOT NULL,
        `nombrePedido` VARCHAR(255) NOT NULL,
        `fechaPedido` DATE NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idPedido`),
        FOREIGN KEY (`idCli`) REFERENCES `cliente` (`idCli`),
        FOREIGN KEY (`idProd`) REFERENCES `producto` (`idProd`),
        FOREIGN KEY (`idFichaTec`) REFERENCES `ficha_Tecnica` (`idFichaTec`),
        FOREIGN KEY (`idFichaProc`) REFERENCES `ficha_Proceso` (`idFichaProc`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `ingreso_mprima` (
        `idIngMprima` int (11) NOT NULL AUTO_INCREMENT,
        `nombreIngMprima` varchar(255) NOT NULL,
        `fechaIngMprima` date NOT NULL,
        `igvIngMprima` varchar(5) NOT NULL,
        `subTotalIngMprima` varchar(50) NOT NULL,
        `totalIngMprima` varchar(50) NOT NULL,
        `ingJsonMprima` JSON NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idIngMprima`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `almacen_mprima` (
        `idAlmaMprima` int (11) NOT NULL AUTO_INCREMENT,
        `idMprima` int (11) NOT NULL,
        `codigoMprimaAlma` varchar(255) NOT NULL,
        `nombreMprimaAlma` varchar(255) NOT NULL,
        `unidadMprimaAlma` varchar(255) NOT NULL,
        `cantidadMprimaAlma` varchar(255) NOT NULL,
        `precioMprimaAlma` varchar(255) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idAlmaMprima`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `salida_mprima` (
        `idSalMprima` int (11) NOT NULL AUTO_INCREMENT,
        `idProcOp` int (11) DEFAULT NULL,
        `nombreSalMprima` varchar(255) NOT NULL,
        `fechaSalMprima` date NOT NULL,
        `igvSalMprima` varchar(5) NOT NULL,
        `subTotalSalMprima` varchar(50) NOT NULL,
        `totalSalMprima` varchar(50) NOT NULL,
        `salJsonMprima` JSON NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idSalMprima`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `ingreso_prod` (
        `idIngProd` int (11) NOT NULL AUTO_INCREMENT,
        `nombreIngProd` varchar(255) NOT NULL,
        `fechaIngProd` date NOT NULL,
        `igvIngProd` varchar(5) NOT NULL,
        `subTotalIngProd` varchar(50) NOT NULL,
        `totalIngProd` varchar(50) NOT NULL,
        `ingJsonProd` JSON NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idIngProd`),
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `almacen_Prod` (
        `idAlmaProd` int (11) NOT NULL AUTO_INCREMENT,
        `idProd` int (11) NOT NULL,
        `codigoProdAlma` varchar(255) NOT NULL,
        `nombreProdAlma` varchar(255) NOT NULL,
        `unidadProdAlma` varchar(255) NOT NULL,
        `cantidadProdAlma` varchar(255) NOT NULL,
        `precioProdAlma` varchar(255) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idAlmaProd`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `salida_Prod` (
        `idSalProd` int (11) NOT NULL AUTO_INCREMENT,
        `idPedido` int (11) DEFAULT NULL,
        `nombreSalProd` varchar(255) NOT NULL,
        `fechaSalProd` date NOT NULL,
        `igvSalProd` varchar(5) NOT NULL,
        `subTotalSalProd` varchar(50) NOT NULL,
        `totalSalProd` varchar(50) NOT NULL,
        `salJsonProd` JSON NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idSalProd`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `tipo_Proceso` (
        `idTipoProc` int (11) NOT NULL AUTO_INCREMENT,
        `idFichaProc` int (11) DEFAULT NULL,
        `descripcionTipoProc` varchar(255) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idTipoProc`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `proceso_Operativo` (
        `idProcOp` int (11) NOT NULL AUTO_INCREMENT,
        `idTipoProc` int (11) NOT NULL,
        `idPedido` int (11) NOT NULL,
        `idSalMprima` int (11) NOT NULL,
        `descripcionProcOp` varchar(255) NOT NULL,
        `estadoProcOp` int (11) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idProcOp`),
        FOREIGN KEY (`idTipoProc`) REFERENCES `tipo_Proceso` (`idTipoProc`),
        FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
        FOREIGN KEY (`idSalMprima`) REFERENCES `salida_Mprima` (`idSalMprima`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `proceso_Operativo_Fin` (
        `idProcOpFin` int (11) NOT NULL AUTO_INCREMENT,
        `idTipoProc` int (11) NOT NULL,
        `idProcOp` int (11) NOT NULL,
        `descripcionProcOpFin` varchar(255) NOT NULL,
        `estadoProcOpFin` int (11) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idProcOpFin`),
        FOREIGN KEY (`idTipoProc`) REFERENCES `tipo_Proceso` (`idTipoProc`),
        FOREIGN KEY (`idProcOp`) REFERENCES `proceso_Operativo` (`idProcOp`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `produccion` (
        `idProduccion` int (11) NOT NULL AUTO_INCREMENT,
        `idProcOpFin` int (11) NOT NULL,
        `idPedido` int (11) DEFAULT NULL,
        `estadoProduccion` int (11) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idProduccion`),
        FOREIGN KEY (`idProcOpFin`) REFERENCES `proceso_Operativo_Fin` (`idProcOpFin`),
        FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `merma` (
        `idMerma` int (11) NOT NULL AUTO_INCREMENT,
        `idProcOp` int (11) NOT NULL,
        `idSalMprima` int (11) DEFAULT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idMerma`),
        FOREIGN KEY (`idProcOp`) REFERENCES `proceso_Operativo` (`idProcOp`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `prod_Merma` (
        `idProdMerma` int (11) NOT NULL AUTO_INCREMENT,
        `idMerma` int (11) NOT NULL,
        `idProd` int (11) DEFAULT NULL,
        `cantidadProdMerma` int (11) NOT NULL,
        `estadoProdMerma` int (11) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idProdMerma`),
        FOREIGN KEY (`idMerma`) REFERENCES `merma` (`idMerma`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE
    `desecho_Merma` (
        `idDeseMerma` int (11) NOT NULL AUTO_INCREMENT,
        `idMerma` int (11) NOT NULL,
        `codigoMprima` varchar(255) NOT NULL,
        `nombreMprima` varchar(255) NOT NULL,
        `unidadMprima` int (11) NOT NULL,
        `cantidadMprima` decimal(10, 2) NOT NULL,
        `DateCreate` datetime NOT NULL,
        `DateUpdate` datetime NOT NULL,
        PRIMARY KEY (`idDeseMerma`),
        FOREIGN KEY (`idMerma`) REFERENCES `merma` (`idMerma`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = DYNAMIC;