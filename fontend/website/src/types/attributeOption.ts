import type { AttributeDefinition } from "./attributeDefinition";

export interface AttributeOption {
  id: number;
  attributeDefinitionId: number;
  attributeDefinition?: AttributeDefinition
  valueKey: string;
  label: string;
  displayOrder: number;
}
export interface CreateAttributeOptionDTO {
  attributeDefinitionId?: number;
  attributeDefinition?: AttributeDefinition
  valueKey?: string;
  label?: string;
  displayOrder?: number;
}

export interface UpdateAttributeOptionDTO {
  attributeDefinitionId?: number;
  attributeDefinition?: AttributeDefinition
  valueKey?: string;
  label?: string;
  displayOrder?: number;
}

export interface OptionFilterttributeOption {
  page?: number,
  size?: number,
  attributeDefinitionId?: number,
  keySearch?: string,
}

export interface Response {
  total: number;
  page: number;
  size: number;
  items: AttributeOption[]
}


