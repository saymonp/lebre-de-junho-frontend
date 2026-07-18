import { defineStore } from 'pinia'
import type { Product, SaveProductRequest } from '@/types/Products'
import type { ProductPaginationResponse } from '@/types/PaginatedResponse';

export const useProductStore = defineStore('products', () => {
    // Chamado apenas UMA vez para a store inteira no Nuxt
    const { $api } = useNuxtApp()

    // --- ACTIONS ---

    // Lista os produtos
    async function indexProducts(): Promise<ProductPaginationResponse> {
        return await $api<ProductPaginationResponse>('/products', {
            method: 'GET'
        })
    }

    // Busca detalhes de um produto específico
    async function showProduct(productId: number): Promise<{ data: Product }> {
        return await $api<{ data: Product }>(`/products/${productId}`, {
            method: 'GET'
        })
    }

    // Cria um novo produto
    async function createProduct(data: SaveProductRequest): Promise<{ data: Product }> {
        return await $api<{ data: Product }>('/products', {
            body: data,
            method: 'POST'
        })
    }

    // Atualiza um produto existente
    async function updateProduct(productId: number, data: SaveProductRequest): Promise<{ data: Product }> {
        return await $api<{ data: Product }>(`/products/${productId}`, {
            body: data,
            method: 'PUT'
        })
    }

    // Remove um produto
    async function deleteProduct(productId: number): Promise<{ message: string }> {
        return await $api<{ message: string }>(`/products/${productId}`, {
            method: 'DELETE'
        })
    }

    return {
        indexProducts,
        showProduct,
        createProduct,
        updateProduct,
        deleteProduct
    }
})