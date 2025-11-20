export interface Warranty {
    id: number;
    name: string;
    description: string;
    periodMonths: number;
    IndexShow: number;
    isActive: boolean;
}

export interface CreateWarrantyDTO {
    name?: string;
    description?: string;
    periodMonths?: number;
    indexShow?: number;
    isActive?: boolean;
}

export interface UpdateWarrantyDTO {
    name?: string;
    description?: string;
    periodMonths?: number;
    indexShow?: number;
    isActive?: boolean;
}
