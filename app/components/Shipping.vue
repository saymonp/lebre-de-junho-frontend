<script setup lang="ts">
import { ref } from 'vue'
import { useShippingStore } from '@/stores/shipping'

const shippingStore = useShippingStore()
const cep = ref('')

const props = defineProps<{
    id: number
    quantity: number;
}>();

const itemsNoCarrinho = computed(() => {
    return [
        {
            id: props.id,
            quantity: props.quantity
        }
    ]
});

const handleCalculate = () => {
    const cleanCep = cep.value.replace(/\D/g, '')
    if (cleanCep.length === 8) {
        shippingStore.fetchShippingOptions(cleanCep, itemsNoCarrinho.value)
    }
}

onUnmounted(() => {
    shippingStore.clearShippingData() 
    cep.value = ''
})
</script>

<template>
    <div class="max-w-md bg-neutral-900 border-[0.5px] border-[#DBC695]/20 p-5 rounded">
        <label class="kurale text-sm text-[#DBC695] block mb-2">Calcular Frete</label>

        <div class="flex gap-2 mb-4">
            <input v-model="cep" placeholder="00000-000" maxlength="9"
                class="bg-neutral-800 border-[0.5px] border-neutral-700 text-white p-2 rounded w-full focus:outline-none focus:border-[#DBC695]"
                @input="cep = cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2')" />
            <button @click="handleCalculate" :disabled="shippingStore.loading"
                class="bg-[#DBC695] hover:bg-[#cbb584] px-5 rounded text-neutral-950 font-medium text-sm transition-colors">
                {{ shippingStore.loading ? '...' : 'OK' }}
            </button>
        </div>

        <!-- Lista de Transportadoras Retornadas -->
        <div v-if="shippingStore.shippingOptions.length > 0" class="space-y-2">
            <div v-for="opcao in shippingStore.shippingOptions" :key="opcao.id"
                @click="shippingStore.selectedOption = opcao" :class="[
                    'border-[0.5px] p-3 rounded cursor-pointer flex justify-between items-center transition-all',
                    shippingStore.selectedOption?.id === opcao.id
                        ? 'border-[#DBC695] bg-[#DBC695]/5'
                        : 'border-neutral-800 bg-neutral-800/40 hover:border-neutral-700'
                ]">
                <div>
                    <p class="text-sm font-medium text-white">{{ opcao.company }} ({{ opcao.name }})</p>
                    <p class="text-xs text-neutral-400">Entrega em até {{ opcao.delivery_time }} dias úteis</p>
                </div>
                <p class="kurale text-sm text-[#DBC695]">R$ {{ opcao.price.toFixed(2) }}</p>
            </div>
        </div>
    </div>
</template>