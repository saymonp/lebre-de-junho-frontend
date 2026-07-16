import type { Address } from './Addresses'; // Importe a interface que criamos anteriormente
import type { Product } from './Products';

// 1. Interface auxiliar para os links gerados pelo Laravel Paginator
export interface PaginatorLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

// 2. Interface genérica de paginação do Laravel
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginatorLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

// 3. Interface específica para a paginação de Endereços
export type AddressPaginationResponse = PaginatedResponse<Address>;
export type ProductPaginationResponse = PaginatedResponse<Product>;