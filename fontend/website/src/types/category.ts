export interface Category {
  id: number;
  name: string;
  slug: string;
  image:string;
  parentId?: number;
  isActive: boolean;
}

export interface CreateCategoryDTO {
  name: string;
  slug?: string;
  parentId?: number;
  isActive?: boolean;
}

export interface UpdateCategoryDTO {
  name?: string;
  slug?: string;
  parentId?: number;
  isActive?: boolean;
}
