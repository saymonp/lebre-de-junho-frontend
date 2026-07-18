import { defineStore } from 'pinia'

interface ShippingOption {
    id: number
    name: string
    company: string
    price: number
    delivery_time: number
}

export const useShippingStore = defineStore('shipping', {
    state: () => ({
        shippingOptions: [] as ShippingOption[],
        selectedOption: null as ShippingOption | null,
        loading: false
    }),
    actions: {
        async fetchShippingOptions(postalCode: string, items: { id: number, quantity: number }[]) {
            this.loading = true
            this.shippingOptions = []
            this.selectedOption = null

            try {
                // Envia para o backend
                const { $api } = useNuxtApp()
                const data = await $api<ShippingOption[]>('/shipping/calculate', {
                    method: 'POST',
                    body: {
                        postal_code: postalCode.replace(/\D/g, ''), // Limpa máscara
                        items
                    }
                })

                this.shippingOptions = data
                if (data.length > 0) {
                    this.selectedOption = data[0]! // Seleciona automaticamente o mais barato
                }
            } catch (error) {
                console.error('Erro ao calcular frete:', error)
            } finally {
                this.loading = false
            }
        },
        clearShippingData() {
            this.shippingOptions = []
            this.selectedOption = null
        }
    }
})