export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  type: 'poster' | 'frame';
  sizes: { label: string; price: number }[];
  frameTypes?: { label: string; price: number }[];
  description: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedFrame?: string;
  totalPrice: number;
}



const sizes = [
  { label: 'A4', price: 0 },
  { label: 'A3', price: 200 },
  { label: 'A2', price: 450 },
];

const frameTypes = [
  { label: 'No Frame', price: 0 },
  { label: 'Black Frame', price: 350 },
  { label: 'White Frame', price: 350 },
  { label: 'Wooden Frame', price: 500 },
  { label: 'Premium Gold Frame', price: 750 },
];

export const products: Product[] = [
  {
    id: '1', title: 'The Dark Knight Rises', price: 299, originalPrice: 499,
    image: 'https://i.pinimg.com/736x/e7/0f/35/e70f35bfac95e8a099bddaca3e28b323.jpg',
    category: 'Posters', subcategory: 'Movie Posters', type: 'poster',
    sizes, frameTypes, description: 'Premium quality movie poster printed on 300GSM matte paper with vibrant colors and sharp details.',
    rating: 4.8, reviews: 124, isBestSeller: true,
  },
  {
    id: '2', title: 'Inception Dreams', price: 349, originalPrice: 599,
    image: 'https://i.pinimg.com/736x/53/aa/e2/53aae2d75c78004c1cf5b5abfb10d520.jpg',
    category: 'Posters', subcategory: 'Movie Posters', type: 'poster',
    sizes, frameTypes, description: 'Mind-bending movie poster with stunning visual design.',
    rating: 4.9, reviews: 89, isBestSeller: true,
  },
  {
    id: '3', title: 'Interstellar Journey', price: 249,
    image: 'https://i.pinimg.com/736x/f9/22/92/f92292a99ff0041db6b2eb57a99b968f.jpg',
    category: 'Posters', subcategory: 'Movie Posters', type: 'poster',
    sizes, frameTypes, description: 'Epic space adventure poster with breathtaking imagery.',
    rating: 4.5, reviews: 56, isNew: true,
  },
  {
    id: '4', title: 'Iron Man Mark VII', price: 399, originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=600&h=800&fit=crop',
    category: 'Frames', subcategory: 'Marvel Frames', type: 'frame',
    sizes, frameTypes, description: 'Stunning Marvel artwork in a premium frame.',
    rating: 4.7, reviews: 73,
  },
  {
    id: '5', title: 'WWE Championship Belt', price: 349,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop',
    category: 'Posters', subcategory: 'WWE Posters', type: 'poster',
    sizes, frameTypes, description: 'Iconic WWE championship poster for wrestling fans.',
    rating: 4.6, reviews: 41, isNew: true,
  },
  {
    id: '6', title: 'Cyberpunk City', price: 299, originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=800&fit=crop',
    category: 'Posters', subcategory: 'Gaming Posters', type: 'poster',
    sizes, frameTypes, description: 'Futuristic gaming-inspired poster with neon aesthetics.',
    rating: 4.8, reviews: 98, isBestSeller: true,
  },
  {
    id: '7', title: 'Naruto Shippuden', price: 279, originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
    category: 'Frames', subcategory: 'Anime Frames', type: 'frame',
    sizes, frameTypes, description: 'High-quality anime artwork framed with precision.',
    rating: 4.9, reviews: 156,
  },
  {
    id: '8', title: 'Football Legend', price: 349,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop',
    category: 'Posters', subcategory: 'Sports Posters', type: 'poster',
    sizes, frameTypes, description: 'Celebrate the beautiful game with this stunning sports poster.',
    rating: 4.4, reviews: 32, isNew: true,
  },
  {
    id: '9', title: 'Hustle Hard', price: 199, originalPrice: 349,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=800&fit=crop',
    category: 'Posters', subcategory: 'Motivational Posters', type: 'poster',
    sizes, frameTypes, description: 'Motivational poster to keep you inspired every day.',
    rating: 4.7, reviews: 87,
  },
  {
    id: '10', title: 'Avengers Assemble', price: 449, originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=800&fit=crop',
    category: 'Frames', subcategory: 'Marvel Frames', type: 'frame',
    sizes, frameTypes, description: 'Epic Avengers artwork in a premium display frame.',
    rating: 4.9, reviews: 203, isBestSeller: true,
  },
  {
    id: '11', title: 'Zelda Kingdom', price: 299,
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&h=800&fit=crop',
    category: 'Frames', subcategory: 'Gaming Frames', type: 'frame',
    sizes, frameTypes, description: 'Adventure awaits with this gaming masterpiece frame.',
    rating: 4.6, reviews: 67, isNew: true,
  },
  {
    id: '12', title: 'One Piece Crew', price: 329, originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&h=800&fit=crop',
    category: 'Posters', subcategory: 'Anime Posters', type: 'poster',
    sizes, frameTypes, description: 'Set sail with the Straw Hat crew in this vibrant anime poster.',
    rating: 4.8, reviews: 145,
  },
];

export const categories = {
  Frames: ['Movie Frames', 'Marvel Frames', 'WWE Frames', 'Gaming Frames', 'Anime Frames', 'Sports Frames'],
  Posters: ['Movie Posters', 'Marvel Posters', 'WWE Posters', 'Gaming Posters', 'Anime Posters', 'Motivational Posters'],
};
