export interface GasStation {
  id: number;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  fullAddress: string;
  phone: string;
  rating: number;
  lastUpdated: string;
  reviews: Array<{
    user: string;
    date: string;
    content: string;
  }>;
  fuelTypes: string[];
  isSelfService: boolean;
  price: {
    regular: number;
    midgrade?: number;
    premium?: number;
    diesel?: number;
  };
}

export interface Review {
  user: string;
  date: string;
  content: string;
}
