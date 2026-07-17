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

    /**
     * Deleta um arquivo do S3/MinIO a partir da sua URL pública.
     */
    async function deleteFileByUrl(fileUrl: string): Promise<void> {
        if (!fileUrl) return

        try {
            // 1. Solicita a URL assinada de deleção para o backend do Laravel
            // (Ajuste o endpoint `/api/uploads/presigned-delete` conforme sua api)
            const { delete_url } = await $fetch<{ delete_url: string }>('/products/uploads/presigned-delete', {
                method: 'POST',
                body: { file_url: fileUrl }
            })

            // 2. Executa a requisição DELETE direta para o MinIO/S3
            const response = await fetch(delete_url, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error(`Falha ao deletar arquivo do storage: ${response.statusText}`)
            }

            console.log(`Arquivo deletado com sucesso: ${fileUrl}`)
        } catch (error) {
            console.error('Erro ao deletar arquivo:', error)
            throw error
        }
    }

    return {
        uploadFile,
        deleteFileByUrl
    }
})