export interface DialogResponse<T> {
  isSuccessful: boolean;
  data: T;
}

export interface PaginatorOptions {
  size: number;
  page: number;
}

export interface PaginationLink {
  totalPages: number;
  totalObjects: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLink;
}
