export interface ProductModelGroup {
    id: number;
    name: string;
    brandId: number;
    categoryId: number;
    description: string;
    image: string;
}

export interface CreateProductModelGroupDTO {
    name: string;
    brandId?: number;
    categoryId?: number;
    description?: string;
    image?: string;
}

export interface UpdateProductModelGroupDTO {
    name: string;
    brandId?: number;
    categoryId?: number;
    description?: string;
    image?: string;
}


