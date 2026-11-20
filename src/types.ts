export type BadgeType =
  | 'mais-pedido'
  | 'recomendado'
  | 'novidade'
  | 'serve-2'
  | 'serve-4'
  | 'especial-blackball'
  | 'picante'
  | 'vegetariano'
  | 'chef-choice';

export interface Category {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  iconName: string;
  order: number;
}

export interface DishOption {
  name: string;
  price: number;
  description?: string;
}

export interface Dish {
  id: string;
  slug?: string;
  name: string;
  category: string; // Category ID matching Category.id
  categoryName?: string;
  description?: string;
  fullDescription?: string;
  price: number;
  priceUnit?: string; // e.g. "/ hora", "unidade"
  secondaryPrice?: { label: string; price: number }; // e.g. { label: 'Unidade avulsa', price: 2.50 }
  options?: DishOption[];
  quantity?: string; // e.g. "600 gramas", "12 unidades", "10 unidades"
  video?: string; // Direct MP4 video URL (ready for actual files)
  image?: string; // High-res poster/fallback photo (ready for actual files)
  poster?: string;
  serves?: string; // e.g. "Serve 2 a 3 pessoas"
  weight?: string; // e.g. "600g"
  prepTime?: string;
  ingredients?: string[];
  sides?: string[]; // Acompanhamentos inclusos
  sauces?: string[]; // Molhos inclusos
  allergens?: string[]; // Alérgenos
  badges?: BadgeType[];
  featured?: boolean;
  pairing?: string; // Sugestão de bebida/chopp da casa
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isAddon?: boolean; // Para itens adicionais como molhos
  keywords?: string[]; // Palavras-chave para busca enriquecida
}

export interface TableInfo {
  tableNumber: string;
  guestName?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  activeBadgeFilter: string | null;
  onlyVegetarian: boolean;
  onlySpicy: boolean;
  forSharingOnly: boolean;
}

