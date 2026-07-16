import type { CreateAddressRequest, Address } from '@/types/Addresses';
import type { AddressPaginationResponse } from '@/types/PaginatedResponse';

export const useAddressStore = defineStore('addresses', () => {
    // Chamado apenas UMA vez para a store inteira.
    const { $api } = useNuxtApp()

    // --- ACTIONS ---

    async function createAddress(data: CreateAddressRequest): Promise<Address> {
        return await $api<Address>('/addresses', {
            body: data,
            method: 'POST'
        })
    }

    async function updateAddress(addressId: number, data: CreateAddressRequest): Promise<Address> {
        return await $api<Address>(`/addresses/${addressId}`, {
            body: data,
            method: 'PUT'
        })
    }

    async function indexAddresses(): Promise<AddressPaginationResponse> {
        return await $api<AddressPaginationResponse>('/addresses', {
            method: 'GET'
        })
    }

    async function deleteAddress(addressId: number): Promise<{ message: string }> {
        return await $api<{ message: string }>(`/addresses/${addressId}`, {
            method: 'DELETE'
        })
    }

    async function showAddress(addressId: number): Promise<Address> {
        return await $api<Address>(`/addresses/${addressId}`, {
            method: 'GET'
        })
    }

    // No padrão Setup, precisa RETORNAR as funções
    return {
        createAddress,
        updateAddress,
        indexAddresses,
        deleteAddress,
        showAddress,
    }
})