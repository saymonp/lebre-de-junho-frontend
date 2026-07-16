import { defineStore } from 'pinia'
import type { PresignedUrlResponse } from '@/types/Uploads'

export const useUploadStore = defineStore('uploads', () => {
    const { $api } = useNuxtApp()
    const config = useRuntimeConfig()

    /**
     * Faz o fluxo completo de upload de um arquivo usando Presigned URL.
     * Retorna a URL pública final
     */
    async function uploadFile(file: File, folder: string = 'gallery'): Promise<string> {
        try {
            // 1. Solicita a Presigned URL ao backend Laravel
            // Enviamos o nome original do arquivo e o tipo (ex: image/png) para o backend assinar corretamente
            const { upload_url, file_url } = await $api<PresignedUrlResponse>('/products/uploads/presigned-url', {
                method: 'POST',
                body: {
                    filename: file.name,
                    content_type: file.type,
                    folder: folder
                }
            })

            // 2. Faz o upload direto do arquivo (Binary/Blob) para o MinIO usando a URL assinada
            // Usamos o 'fetch' nativo ou $fetch sem passar pela instância customizada $api,
            const response = await fetch(upload_url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type
                }
            })

            if (!response.ok) {
                throw new Error(`Falha ao enviar arquivo direto para o storage. Status: ${response.status}`)
            }

            // 3. Retorna a URL final que salvamos na tabela de produtos
            return file_url

        } catch (error) {
            console.error('Erro no fluxo de upload com Presigned URL:', error)
            throw error
        }
    }

    return {
        uploadFile
    }
})