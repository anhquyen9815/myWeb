export interface AttributeDefinition {
  id: number;
  name: string;
  displayName: string;
  dataType?: string;
  displayOrder: number;
  categoryId: number;
}
export interface CreateAttributeDefinitionDTO {
  name?: string;
  displayName?: string;
  dataType?: string;
  displayOrder?: number;
  categoryId?: number;
}

export interface UpdateAttributeDefinitionDTO {
  name?: string;
  displayName?: string;
  dataType?: string;
  displayOrder?: number;
  categoryId?: number;
}

export interface OptionFilter {
  page?: number,
  size?: number,
  categoryId?: number,
  keySearch?: string,
}

export interface Response {
  total: number;
  page: number;
  size: number;
  items: AttributeDefinition[]
}
