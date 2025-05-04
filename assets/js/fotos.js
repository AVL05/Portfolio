/**
 * FOTOS.JS - Datos de las fotografías
 * 
 * Estructura de cada foto:
 * {
 *   src: 'ruta/imagen.webp',
 *   category: 'categoria',
 *   title: 'Título de la foto',
 *   location: 'Ubicación',
 *   date: 'YYYY-MM-DD',
 *   tags: 'tag1,tag2,tag3',
 *   camera: 'Modelo de cámara',
 *   lens: 'Objetivo usado',
 *   iso: 'ISO',
 *   aperture: 'f/',
 *   shutterSpeed: '1/XXX'
 * }
 */

const fotosData = [
    // =============================================
    // NATURALEZA
    // =============================================
    { 
        src: 'fotos/naturaleza/foto1.webp',
        category: 'naturaleza', 
        title: 'Vall de Boí', 
        location: 'Lleida, España',
        date: '2023-06-15',
        tags: 'paisaje,montañas,verano',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '100',
        aperture: 'f/8',
        shutterSpeed: '1/250'
    },
    { 
        src: 'fotos/naturaleza/foto2.webp', 
        category: 'naturaleza', 
        title: 'Descenso del río Sella',
        location: 'Asturias, España',
        date: '2023-08-22',
        tags: 'rio,agua,verano',
        camera: 'Canon EOS R6',
        lens: 'RF 15-35mm f/2.8L',
        iso: '200',
        aperture: 'f/5.6',
        shutterSpeed: '1/500'
    },
    { 
        src: 'fotos/naturaleza/foto3.webp', 
        category: 'naturaleza', 
        title: 'Cascada Cola de Caballo',
        location: 'Ordesa, España',
        date: '2023-05-30',
        tags: 'cascada,agua,paisaje',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '100',
        aperture: 'f/11',
        shutterSpeed: '1/4'
    },
    { 
        src: 'fotos/naturaleza/foto4.webp', 
        category: 'naturaleza', 
        title: 'Caballos salvajes',
        location: 'Picos de Europa, España',
        date: '2023-07-18',
        tags: 'fauna,animales,paisaje',
        camera: 'Canon EOS R6',
        lens: 'RF 70-200mm f/2.8L',
        iso: '400',
        aperture: 'f/4',
        shutterSpeed: '1/1000'
    },
    { 
        src: 'fotos/naturaleza/foto5.webp', 
        category: 'naturaleza', 
        title: 'Pájaro en vuelo',
        location: 'Albufera, Valencia',
        date: '2023-04-12',
        tags: 'fauna,aves,naturaleza',
        camera: 'Canon EOS R6',
        lens: 'RF 100-500mm f/4.5-7.1L',
        iso: '800',
        aperture: 'f/7.1',
        shutterSpeed: '1/2000'
    },
    { 
        src: 'fotos/naturaleza/foto7.webp', 
        category: 'naturaleza', 
        title: 'Picos de Europa',
        location: 'Asturias, España',
        date: '2023-09-05',
        tags: 'montañas,paisaje,nubes',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '100',
        aperture: 'f/8',
        shutterSpeed: '1/320'
    },
    { 
        src: 'fotos/naturaleza/foto8.webp', 
        category: 'naturaleza', 
        title: 'Puesta de sol en Picos de Europa',
        location: 'Asturias, España',
        date: '2023-09-06',
        tags: 'atardecer,paisaje,montañas',
        camera: 'Canon EOS R6',
        lens: 'RF 15-35mm f/2.8L',
        iso: '100',
        aperture: 'f/11',
        shutterSpeed: '1/60'
    },
    { 
        src: 'fotos/naturaleza/foto9.webp', 
        category: 'naturaleza', 
        title: 'Cumbres nevadas',
        location: 'Picos de Europa, España',
        date: '2023-01-15',
        tags: 'nieve,montañas,invierno',
        camera: 'Canon EOS R6',
        lens: 'RF 70-200mm f/2.8L',
        iso: '200',
        aperture: 'f/8',
        shutterSpeed: '1/500'
    },
    { 
        src: 'fotos/naturaleza/foto10.webp', 
        category: 'naturaleza', 
        title: 'Amanecer en las montañas',
        location: 'Picos de Europa, España',
        date: '2023-06-22',
        tags: 'amanecer,paisaje,montañas',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '100',
        aperture: 'f/8',
        shutterSpeed: '1/125'
    },
    { 
        src: 'fotos/naturaleza/foto11.webp', 
        category: 'naturaleza', 
        title: 'Rosa silvestre',
        location: 'Valencia, España',
        date: '2023-05-18',
        tags: 'flora,flores,primavera',
        camera: 'Canon EOS R6',
        lens: 'RF 100mm f/2.8L Macro',
        iso: '100',
        aperture: 'f/2.8',
        shutterSpeed: '1/400'
    },

    // =============================================
    // RETRATOS
    // =============================================
    { 
        src: 'fotos/retratos/foto1.webp', 
        category: 'retratos', 
        title: 'Mare de Deu (Torrent)',
        location: 'Valencia, España',
        date: '2023-10-12',
        tags: 'tradicion,cultura,retrato',
        camera: 'Canon EOS R6',
        lens: 'RF 85mm f/1.2L',
        iso: '400',
        aperture: 'f/2',
        shutterSpeed: '1/250'
    },
    { 
        src: 'fotos/retratos/foto2.webp', 
        category: 'retratos', 
        title: 'Mirada intensa',
        location: 'Estudio, Valencia',
        date: '2023-11-05',
        tags: 'estudio,retrato,blanco-y-negro',
        camera: 'Canon EOS R6',
        lens: 'RF 50mm f/1.2L',
        iso: '200',
        aperture: 'f/2.8',
        shutterSpeed: '1/200'
    },
    { 
        src: 'fotos/retratos/foto3.webp', 
        category: 'retratos', 
        title: 'Sonrisa espontánea',
        location: 'Parque Central, Valencia',
        date: '2023-09-18',
        tags: 'exterior,retrato,natural',
        camera: 'Canon EOS R6',
        lens: 'RF 85mm f/1.2L',
        iso: '400',
        aperture: 'f/1.8',
        shutterSpeed: '1/500'
    },

    // =============================================
    // URBANO
    // =============================================
    { 
        src: 'fotos/urbano/foto1.webp', 
        category: 'urbano', 
        title: 'Ponte Luís I (Oporto)',
        location: 'Oporto, Portugal',
        date: '2023-03-12',
        tags: 'arquitectura,puente,nocturna',
        camera: 'Canon EOS R6',
        lens: 'RF 15-35mm f/2.8L',
        iso: '800',
        aperture: 'f/4',
        shutterSpeed: '1/30'
    },
    { 
        src: 'fotos/urbano/foto2.webp', 
        category: 'urbano', 
        title: 'Casas antiguas',
        location: 'Oporto, Portugal',
        date: '2023-03-13',
        tags: 'arquitectura,calles,color',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '200',
        aperture: 'f/8',
        shutterSpeed: '1/250'
    },
    { 
        src: 'fotos/urbano/foto3.webp', 
        category: 'urbano', 
        title: 'Vistas desde el puente',
        location: 'Oporto, Portugal',
        date: '2023-03-14',
        tags: 'paisaje-urbano,rio,arquitectura',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '100',
        aperture: 'f/8',
        shutterSpeed: '1/320'
    },
    { 
        src: 'fotos/urbano/foto4.webp', 
        category: 'urbano', 
        title: 'Catedral de Oporto',
        location: 'Oporto, Portugal',
        date: '2023-03-15',
        tags: 'arquitectura,iglesia,historia',
        camera: 'Canon EOS R6',
        lens: 'RF 15-35mm f/2.8L',
        iso: '200',
        aperture: 'f/5.6',
        shutterSpeed: '1/200'
    },
    { 
        src: 'fotos/urbano/foto5.webp', 
        category: 'urbano', 
        title: 'Calles de Braga',
        location: 'Braga, Portugal',
        date: '2023-04-02',
        tags: 'calles,urbano,gente',
        camera: 'Canon EOS R6',
        lens: 'RF 35mm f/1.8',
        iso: '400',
        aperture: 'f/4',
        shutterSpeed: '1/125'
    },
    { 
        src: 'fotos/urbano/foto6.webp', 
        category: 'urbano', 
        title: 'Ayuntamiento de Oporto',
        location: 'Oporto, Portugal',
        date: '2023-03-16',
        tags: 'arquitectura,edificio,historia',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '100',
        aperture: 'f/8',
        shutterSpeed: '1/250'
    },
    { 
        src: 'fotos/urbano/foto7.webp', 
        category: 'urbano', 
        title: 'Ayuntamiento de Braga',
        location: 'Braga, Portugal',
        date: '2023-04-03',
        tags: 'arquitectura,edificio,plaza',
        camera: 'Canon EOS R6',
        lens: 'RF 15-35mm f/2.8L',
        iso: '200',
        aperture: 'f/5.6',
        shutterSpeed: '1/320'
    },
    { 
        src: 'fotos/urbano/foto8.webp', 
        category: 'urbano', 
        title: 'Puesta de sol en Oporto',
        location: 'Oporto, Portugal',
        date: '2023-03-17',
        tags: 'atardecer,rio,paisaje-urbano',
        camera: 'Canon EOS R6',
        lens: 'RF 70-200mm f/2.8L',
        iso: '100',
        aperture: 'f/8',
        shutterSpeed: '1/125'
    },
    { 
        src: 'fotos/urbano/foto9.webp', 
        category: 'urbano', 
        title: 'Luces de navidad',
        location: 'Oporto, Portugal',
        date: '2022-12-15',
        tags: 'navidad,luces,nocturna',
        camera: 'Canon EOS R6',
        lens: 'RF 50mm f/1.2L',
        iso: '800',
        aperture: 'f/2',
        shutterSpeed: '1/60'
    },
    { 
        src: 'fotos/urbano/foto10.webp', 
        category: 'urbano', 
        title: 'Camino de Santiago',
        location: 'Galicia, España',
        date: '2023-07-22',
        tags: 'paisaje-urbano,camino,historia',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '200',
        aperture: 'f/5.6',
        shutterSpeed: '1/400'
    },
    { 
        src: 'fotos/urbano/foto11.webp', 
        category: 'urbano', 
        title: 'Canal de agua',
        location: 'Oporto, Portugal',
        date: '2023-03-18',
        tags: 'arquitectura,agua,reflejos',
        camera: 'Canon EOS R6',
        lens: 'RF 24-105mm f/4L',
        iso: '100',
        aperture: 'f/8',
        shutterSpeed: '1/200'
    }
];

// Hacer los datos accesibles globalmente
if (typeof window !== 'undefined') {
    window.fotosData = fotosData;
}