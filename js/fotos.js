// Definición de categorías
const CATEGORIES = {
    NATURALEZA: 'naturaleza',
    RETRATOS: 'retratos',
    URBANO: 'urbano',
    CIUDAD: 'ciudad'
};

// Datos de las fotos (rutas estandarizadas)
const fotosData = [
    // Fotos de naturaleza
    { 
        src: 'img/naturaleza/foto1.jpg',
        category: CATEGORIES.NATURALEZA, 
        title: 'Vall de Boí' 
    },
    { 
        src: 'img/naturaleza/foto2.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Descenso del río Sella' 
    },
    { 
        src: 'img/naturaleza/foto3.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Cascada Cola de Caballo' 
    },
    { 
        src: 'img/naturaleza/foto4.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Caballos' 
    },
    { 
        src: 'img/naturaleza/foto5.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Pájaro' 
    },
    { 
        src: 'img/naturaleza/foto7.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Picos de Europa' 
    },
    { 
        src: 'img/naturaleza/foto8.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Puesta de sol Picos de Europa' 
    },
    { 
        src: 'img/naturaleza/foto9.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Picos de Europa' 
    },
    { 
        src: 'img/naturaleza/foto10.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Puesta de sol Picos de Europa' 
    },
    { 
        src: 'img/naturaleza/foto11.jpg', 
        category: CATEGORIES.NATURALEZA, 
        title: 'Rosa' 
    }, 
    // Fotos de retratos
    { 
        src: 'img/retratos/foto1.jpg', 
        category: CATEGORIES.RETRATOS, 
        title: 'Mare de Déu (Torrent)' 
    },
{ 
        src: 'img/retratos/foto2.jpg', 
        category: CATEGORIES.RETRATOS, 
        title: 'Mare de Déu (Torrent)' 
    },

    // Fotos urbanas
    { 
        src: 'img/urbano/foto1.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Ponte Luís I (Oporto)' 
    },
    { 
        src: 'img/urbano/foto2.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Casas antiguas' 
    },
    { 
        src: 'img/urbano/foto3.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Ponte Luís I (Oporto)' 
    },
    { 
        src: 'img/urbano/foto4.jpg', 
        category: CATEGORIES.CIUDAD, 
        title: 'Ponte Luís I (Oporto)' 
    },
    { 
        src: 'img/urbano/foto5.jpg', 
        category: CATEGORIES.CIUDAD, 
        title: 'Braga' 
    },
    { 
        src: 'img/urbano/foto6.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Ayuntamiento Oporto' 
    },
    { 
        src: 'img/urbano/foto7.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Ayuntamiento Braga' 
    },
    { 
        src: 'img/urbano/foto8.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Catedral Oporto' 
    },
    { 
        src: 'img/urbano/foto9.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Puesta de sol en Oporto' 
    },
    { 
        src: 'img/urbano/foto10.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Luces de navidad' 
    },
    { 
        src: 'img/urbano/foto11.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Camino de Santiago' 
    },
    { 
        src: 'img/urbano/foto12.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Sin título' 
    },
    { 
        src: 'img/urbano/foto13.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Canal de agua' 
    },
    { 
        src: 'img/urbano/foto14.jpg', 
        category: CATEGORIES.URBANO, 
        title: 'Ponte Luís I (Oporto)' 
    }
];

window.fotosData = fotosData;
window.CATEGORIES = CATEGORIES;