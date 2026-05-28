export interface Pizza {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number; // Base price for personal / small / first size
  sizes: {
    size: string;
    priceAdd: number;
    slices?: number;
  }[];
  crusts: string[];
  image: string;
  rating: number;
  isPopular: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  tags?: string[];
}

export interface CartItem {
  id: string; // Unique ID for cart item (pizzaId + size + crust + extras hash)
  pizza: Pizza;
  selectedSize: string;
  selectedCrust: string;
  quantity: number;
  addedExtras: { name: string; price: number }[];
  unitPrice: number;
  totalPrice: number;
}

export interface SpecialDeal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  code: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  city: string;
  date: string;
}

export interface StoreBranch {
  id: string;
  name: string;
  address: string;
  phone: string;
  timings: string;
}
