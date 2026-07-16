export interface Product {
  id: number;
  name: string;
  description: string;
  cover_photo_path: string | null;
  diagram: string | null;
  price: number;
  promotional_price: number | null;
  discount_pix: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  stock: number;
  in_stock: boolean;
  days_to_create: number;
  categories?: string[]; // Array de strings graças ao pluck() do Resource
  materials?: string[];  // Array de strings graças ao pluck() do Resource
  photos?: string[];     // Array de URLs das fotos adicionais
  created_at: string;
  updated_at: string;
}

// O que o frontend envia para criar ou atualizar
export interface SaveProductRequest {
  name: string;
  description: string;
  cover_photo_path: string | null;
  price: number;
  promotional_price?: number | null;
  discount_pix?: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  diagram?: string | null;
  stock: number;
  days_to_create: number;
  category: string[];       // Array de strings (novas ou existentes)
  material?: string[];      // Array de strings (novas ou existentes)
  photos_paths?: string[];  // Array de URLs das fotos do S3 (presigned)
}
