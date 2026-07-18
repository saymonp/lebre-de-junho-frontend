export interface PresignedUrlResponse {
  upload_url: string; // A URL temporária PUT do arquivo
  file_url: string;   // A URL que será salva no banco de dados
}