export interface News {
  id: number;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateNewsDTO {
  title: string;
  content: string;
  isActive?: boolean;
}

export interface UpdateNewsDTO {
  title?: string;
  content?: string;
  isActive?: boolean;
}
