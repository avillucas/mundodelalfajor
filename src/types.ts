export type Category = 'Clásicos' | 'Premium' | 'Artesanales' | 'Triples' | 'Especiales';
export type Flavor = 'Dulce de Leche' | 'Fruta' | 'Chocolate' | 'Maicena' | 'Maní' | 'Marroc' | 'Nuez' | 'Mousse' | 'Varios';
export type LidType = 'Chocolate Negro' | 'Chocolate Blanco' | 'Maicena' | 'Glaseado' | 'Sin Cobertura';

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  description: string;
  price: number; // Base price in ARS
  image: string;
  category: Category;
  flavor: Flavor;
  lidType: LidType;
}

export interface CartItem extends Product {
  quantity: number;
}

const getPlaceholderImage = (id: string) => {
  const images = [
    'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1621236304195-06bb1d5f48ae?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&q=80&w=800'
  ];
  return images[parseInt(id.replace(/\D/g, '')) % images.length];
};

export const PRODUCTS: Product[] = [
  { id: '1', sku: 'ALF001', name: 'Jorgito Negro', brand: 'Jorgito', description: 'Alfajor clásico bañado en chocolate con dulce de leche.', price: 1600, image: getPlaceholderImage('1'), category: 'Clásicos', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '2', sku: 'ALF002', name: 'Jorgito Blanco', brand: 'Jorgito', description: 'Versión clásica con baño de repostería blanco.', price: 1600, image: getPlaceholderImage('2'), category: 'Clásicos', flavor: 'Dulce de Leche', lidType: 'Chocolate Blanco' },
  { id: '3', sku: 'ALF003', name: 'Jorgito Fruta', brand: 'Jorgito', description: 'Alfajor relleno de dulce de membrillo o fruta.', price: 1600, image: getPlaceholderImage('3'), category: 'Especiales', flavor: 'Fruta', lidType: 'Glaseado' },
  { id: '4', sku: 'ALF004', name: 'Jorgito Sin TACC', brand: 'Jorgito', description: 'Opción apta para celíacos manteniendo el sabor tradicional.', price: 1600, image: getPlaceholderImage('4'), category: 'Especiales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '5', sku: 'ALF005', name: 'Jorgelín Negro', brand: 'Jorgelín', description: 'Versión triple con tres capas de galletita y mucho relleno.', price: 1600, image: getPlaceholderImage('5'), category: 'Triples', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '6', sku: 'ALF006', name: 'Jorgelín Blanco', brand: 'Jorgelín', description: 'Versión triple con baño blanco y abundante relleno.', price: 1600, image: getPlaceholderImage('6'), category: 'Triples', flavor: 'Dulce de Leche', lidType: 'Chocolate Blanco' },
  { id: '7', sku: 'ALF007', name: 'Capitán Negro', brand: 'Capitán del Espacio', description: 'El legendario alfajor artesanal de Quilmes bañado en chocolate.', price: 1600, image: getPlaceholderImage('7'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '8', sku: 'ALF008', name: 'Capitán Blanco', brand: 'Capitán del Espacio', description: 'Versión clásica de Quilmes con baño de repostería blanco.', price: 1600, image: getPlaceholderImage('8'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Blanco' },
  { id: '9', sku: 'ALF009', name: 'Rasta Negro', brand: 'Rasta', description: 'Alfajor estilo uruguayo con galleta crocante y mucho relleno.', price: 1600, image: getPlaceholderImage('9'), category: 'Premium', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '10', sku: 'ALF010', name: 'Rasta Blanco', brand: 'Rasta', description: 'Alfajor estilo uruguayo con baño blanco y galleta crocante.', price: 1600, image: getPlaceholderImage('10'), category: 'Premium', flavor: 'Dulce de Leche', lidType: 'Chocolate Blanco' },
  { id: '11', sku: 'ALF011', name: 'Rasta Maizena', brand: 'Rasta', description: 'Tradicional de fécula de maíz con coco rallado y dulce de leche.', price: 1600, image: getPlaceholderImage('11'), category: 'Clásicos', flavor: 'Maicena', lidType: 'Maicena' },
  { id: '12', sku: 'ALF012', name: 'Cachafaz Negro', brand: 'Cachafaz', description: 'Alfajor premium con chocolate genuino y dulce de leche selecto.', price: 1600, image: getPlaceholderImage('12'), category: 'Premium', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '13', sku: 'ALF013', name: 'Cachafaz Blanco', brand: 'Cachafaz', description: 'Alfajor premium con baño blanco de alta calidad.', price: 1600, image: getPlaceholderImage('13'), category: 'Premium', flavor: 'Dulce de Leche', lidType: 'Chocolate Blanco' },
  { id: '14', sku: 'ALF014', name: 'Cachafaz Maizena', brand: 'Cachafaz', description: 'Versión premium del clásico de maizena, muy tierno.', price: 1600, image: getPlaceholderImage('14'), category: 'Premium', flavor: 'Maicena', lidType: 'Maicena' },
  { id: '15', sku: 'ALF015', name: 'Juanote', brand: 'Juanote', description: 'Alfajor artesanal de gran tamaño y calidad.', price: 1600, image: getPlaceholderImage('15'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '16', sku: 'ALF016', name: 'Juanote Bon o Bon', brand: 'Juanote', description: 'Alfajor artesanal relleno con crema de maní Bon o Bon.', price: 1600, image: getPlaceholderImage('16'), category: 'Artesanales', flavor: 'Maní', lidType: 'Chocolate Negro' },
  { id: '17', sku: 'ALF017', name: 'Juanote Recoleta', brand: 'Juanote', description: 'Variedad artesanal premium de la línea Juanote.', price: 1600, image: getPlaceholderImage('17'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '18', sku: 'ALF018', name: 'Juanote Milka', brand: 'Juanote', description: 'Alfajor artesanal con el suave chocolate Milka.', price: 1600, image: getPlaceholderImage('18'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '19', sku: 'ALF019', name: 'Block', brand: 'Cofler', description: 'Inspirado en la famosa tableta de chocolate con maní.', price: 1600, image: getPlaceholderImage('19'), category: 'Especiales', flavor: 'Maní', lidType: 'Chocolate Negro' },
  { id: '20', sku: 'ALF020', name: 'Chocotorta', brand: 'Bagley', description: 'Sabor inspirado en el postre clásico de galletitas y queso crema.', price: 1600, image: getPlaceholderImage('20'), category: 'Especiales', flavor: 'Mousse', lidType: 'Chocolate Negro' },
  { id: '21', sku: 'ALF021', name: 'Shot', brand: 'Milka', description: 'Alfajor con chocolate con leche y trozos de maní.', price: 1600, image: getPlaceholderImage('21'), category: 'Especiales', flavor: 'Maní', lidType: 'Chocolate Negro' },
  { id: '22', sku: 'ALF022', name: 'Terrabusi', brand: 'Terrabusi', description: 'Clásico alfajor de chocolate de marca líder argentina.', price: 1600, image: getPlaceholderImage('22'), category: 'Clásicos', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '23', sku: 'ALF023', name: 'Oreo', brand: 'Oreo', description: 'Alfajor con el sabor y la textura de las galletitas Oreo.', price: 1600, image: getPlaceholderImage('23'), category: 'Especiales', flavor: 'Mousse', lidType: 'Chocolate Negro' },
  { id: '24', sku: 'ALF024', name: 'Dantelli Marroc', brand: 'Dantelli', description: 'Alfajor gourmet con relleno tipo Marroc.', price: 1600, image: getPlaceholderImage('24'), category: 'Premium', flavor: 'Marroc', lidType: 'Chocolate Negro' },
  { id: '25', sku: 'ALF025', name: 'Dantelli Dulce de Leche', brand: 'Dantelli', description: 'Variedad clásica premium de Dantelli.', price: 1600, image: getPlaceholderImage('25'), category: 'Premium', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '26', sku: 'ALF026', name: 'Dantelli Frutilla', brand: 'Dantelli', description: 'Alfajor gourmet con toque de mermelada de frutilla.', price: 1600, image: getPlaceholderImage('26'), category: 'Premium', flavor: 'Fruta', lidType: 'Chocolate Negro' },
  { id: '27', sku: 'ALF027', name: 'Dantelli Avellana', brand: 'Dantelli', description: 'Alfajor gourmet con crema de avellanas.', price: 1600, image: getPlaceholderImage('27'), category: 'Premium', flavor: 'Marroc', lidType: 'Chocolate Negro' },
  { id: '28', sku: 'ALF028', name: 'Dantelli DDL y Frutilla', brand: 'Dantelli', description: 'Combinación de dulce de leche y frutos rojos.', price: 1600, image: getPlaceholderImage('28'), category: 'Premium', flavor: 'Fruta', lidType: 'Chocolate Negro' },
  { id: '29', sku: 'ALF029', name: 'La Recoba', brand: 'La Recoba', description: 'Alfajor tradicional con baño de chocolate intenso.', price: 1600, image: getPlaceholderImage('29'), category: 'Clásicos', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '30', sku: 'ALF030', name: 'Pepitos', brand: 'Pepitos', description: 'Alfajor con chispas de chocolate inspirado en las galletitas.', price: 1600, image: getPlaceholderImage('30'), category: 'Especiales', flavor: 'Chocolate', lidType: 'Chocolate Negro' },
  { id: '31', sku: 'ALF031', name: 'Arrollito Dinamita', brand: 'Dinamita', description: 'Alfajor cilíndrico con exceso de relleno.', price: 1600, image: getPlaceholderImage('31'), category: 'Especiales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '32', sku: 'ALF032', name: 'Arrollito Bomba', brand: 'Bomba', description: 'Formato arrollado con cobertura de chocolate.', price: 1600, image: getPlaceholderImage('32'), category: 'Especiales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '33', sku: 'ALF033', name: 'Monje Negro', brand: 'Monje Negro', description: 'Alfajor artesanal con chocolate amargo premium.', price: 1600, image: getPlaceholderImage('33'), category: 'Artesanales', flavor: 'Chocolate', lidType: 'Chocolate Negro' },
  { id: '34', sku: 'ALF034', name: 'Milka', brand: 'Milka', description: 'Suave alfajor con el característico chocolate suizo.', price: 1600, image: getPlaceholderImage('34'), category: 'Clásicos', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '35', sku: 'ALF035', name: 'Vauquita', brand: 'Vauquita', description: 'Alfajor relleno con el clásico dulce de leche sólido.', price: 1600, image: getPlaceholderImage('35'), category: 'Especiales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '36', sku: 'ALF036', name: 'Orense', brand: 'Orense', description: 'Alfajor gourmet con receta de pastelería fina.', price: 1600, image: getPlaceholderImage('36'), category: 'Premium', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '37', sku: 'ALF037', name: 'Gula', brand: 'Gula', description: 'Alfajor de gran tamaño para los más exigentes.', price: 1600, image: getPlaceholderImage('37'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '38', sku: 'ALF038', name: 'Chocolate Duway', brand: 'Duway', description: 'Alfajor artesanal con baño de chocolate premium.', price: 1600, image: getPlaceholderImage('38'), category: 'Artesanales', flavor: 'Chocolate', lidType: 'Chocolate Negro' },
  { id: '39', sku: 'ALF039', name: 'Chalteños', brand: 'Chalteños', description: 'Alfajores regionales con sabores de la Patagonia.', price: 1600, image: getPlaceholderImage('39'), category: 'Artesanales', flavor: 'Varios', lidType: 'Chocolate Negro' },
  { id: '40', sku: 'ALF040', name: 'Mini Torta Águila', brand: 'Águila', description: 'Clásico alfajor con el chocolate amargo Águila.', price: 1600, image: getPlaceholderImage('40'), category: 'Clásicos', flavor: 'Mousse', lidType: 'Chocolate Negro' },
  { id: '41', sku: 'ALF041', name: 'Fantoche', brand: 'Fantoche', description: 'El creador del alfajor triple original.', price: 1600, image: getPlaceholderImage('41'), category: 'Triples', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '42', sku: 'ALF042', name: 'La Olla De Cobre', brand: 'La Olla de Cobre', description: 'Alfajor premium artesanal de San Antonio de Areco.', price: 1600, image: getPlaceholderImage('42'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '43', sku: 'ALF043', name: 'La Goulue', brand: 'La Goulue', description: 'Alfajores de autor con rellenos de vino y gourmet.', price: 1600, image: getPlaceholderImage('43'), category: 'Premium', flavor: 'Varios', lidType: 'Chocolate Negro' },
  { id: '44', sku: 'ALF044', name: 'Señor Alfajor', brand: 'Señor Alfajor', description: 'Calidad premium con ingredientes seleccionados.', price: 1600, image: getPlaceholderImage('44'), category: 'Premium', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '45', sku: 'ALF045', name: 'Milagros Del Cielo', brand: 'Milagros del Cielo', description: 'Premiado mundialmente como el mejor alfajor.', price: 1600, image: getPlaceholderImage('45'), category: 'Premium', flavor: 'Varios', lidType: 'Chocolate Negro' },
  { id: '46', sku: 'ALF046', name: 'La Pulpería De Uribe', brand: 'La Pulpería de Uribe', description: 'Sabor tradicional de campo con mucho dulce de leche.', price: 1600, image: getPlaceholderImage('46'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '47', sku: 'ALF047', name: 'Del Montañés', brand: 'Del Montañés', description: 'Alfajor artesanal de las zonas cordilleranas.', price: 1600, image: getPlaceholderImage('47'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '48', sku: 'ALF048', name: 'Entre Dos', brand: 'Entre Dos', description: 'Alfajor premium mendocino reconocido por su innovación.', price: 1600, image: getPlaceholderImage('48'), category: 'Premium', flavor: 'Varios', lidType: 'Chocolate Negro' },
  { id: '49', sku: 'ALF049', name: 'Thionis Chocolate', brand: 'Thionis', description: 'Calidad platense en alfajores de chocolate fino.', price: 1600, image: getPlaceholderImage('49'), category: 'Premium', flavor: 'Chocolate', lidType: 'Chocolate Negro' },
  { id: '50', sku: 'ALF050', name: 'Chocolezza', brand: 'Chocolezza', description: 'Alfajor mendocino con chocolate de alta gama.', price: 1600, image: getPlaceholderImage('50'), category: 'Premium', flavor: 'Chocolate', lidType: 'Chocolate Negro' },
  { id: '51', sku: 'ALF051', name: 'La Maga', brand: 'La Maga', description: 'Alfajores artesanales con sabor a costa atlántica.', price: 1600, image: getPlaceholderImage('51'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '52', sku: 'ALF052', name: 'Montemar Alfajores', brand: 'Montemar', description: 'Clásico alfajor de la costa con receta familiar.', price: 1600, image: getPlaceholderImage('52'), category: 'Clásicos', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '53', sku: 'ALF053', name: 'Dulce Cobo', brand: 'Dulce Cobo', description: 'Alfajores premium de Mar de Cobo.', price: 1600, image: getPlaceholderImage('53'), category: 'Premium', flavor: 'Varios', lidType: 'Chocolate Negro' },
  { id: '54', sku: 'ALF054', name: 'Parador Atalaya', brand: 'Atalaya', description: 'El famoso alfajor de la ruta 2 con masa tierna.', price: 1600, image: getPlaceholderImage('54'), category: 'Artesanales', flavor: 'Dulce de Leche', lidType: 'Chocolate Negro' },
  { id: '55', sku: 'ALF055', name: 'Tofi', brand: 'Tofi', description: 'Alfajor relleno con suave mousse de chocolate.', price: 1600, image: getPlaceholderImage('55'), category: 'Clásicos', flavor: 'Mousse', lidType: 'Chocolate Negro' },
  { id: '56', sku: 'ALF056', name: 'Bon o bon', brand: 'Bon o bon', description: 'Bañado con la clásica pasta de maní Bon o Bon.', price: 1600, image: getPlaceholderImage('56'), category: 'Especiales', flavor: 'Maní', lidType: 'Chocolate Negro' }
];
