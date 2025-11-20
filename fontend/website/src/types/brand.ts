export interface Brand {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  origin: string;
  isActive: boolean;
}

export interface CreateBrandDTO {
  name: string;
  slug?: string;
  logoUrl?: string;
  origin?: string;
  isActive?: boolean;
}

export interface UpdateBrandDTO {
  name?: string;
  slug?: string;
  logoUrl?: string;
  origin?: string;
  isActive?: boolean;
}
