<script setup lang="ts">
import { ref, computed } from 'vue'

interface ItemCheckout {
  id: number
  nome: string
  variacao: string
  preco: number
  quantidade: number
  imagem: string
}

// 1. Dados simulados do endereço ativo
const enderecoSelecionado = ref({
  tipo: 'Principal',
  destinatario: 'Alquimista Viajante',
  telefone: '(11) 99999-8888',
  logradouro: 'Rua dos Arcanos, 777 - Grimório Central',
  bairro: 'Vila Imperial',
  cidadeEstado: 'São Paulo - SP',
  cep: '01234-567'
})

// 2. Itens trazidos do carrinho
const itensCheckout = ref<ItemCheckout[]>([
  {
    id: 1,
    nome: 'Grimório de Couro e Runas Antigas',
    variacao: 'Folhas Envelhecidas (A5)',
    preco: 189.90,
    quantidade: 1,
    imagem: ''
  }
])

// 3. Opções de Pagamento e Seleção
const metodoPagamento = ref<'pix' | 'cartao' | 'boleto'>('pix')
const valorFrete = ref(15.00)

// 4. Cálculos Reativos de Valores
const subtotalProdutos = computed(() => {
  return itensCheckout.value.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
})

const descontoPix = computed(() => {
  // 15% de desconto se escolher Pix
  return metodoPagamento.value === 'pix' ? subtotalProdutos.value * 0.15 : 0
})

const totalFinal = computed(() => {
  return subtotalProdutos.value + valorFrete.value - descontoPix.value
})

const handleFinalizarCompra = () => {
  isLoading.value = true
  // Simular processamento do pedido
  setTimeout(() => {
    isLoading.value = false
    if (metodoPagamento.value === 'pix') {
      navigateTo('/payment/pix-copia-cola')
    } else {
      navigateTo('/payment/sucesso')
    }
  }, 1500)
}

const isLoading = ref(false)
</script>

<template>
  <div class="min-h-screen w-full bg-[#0a050f] text-zinc-200 pb-32">
    <NavBar />
    <!-- Topo simplificado de Checkout -->
    <div class="bg-black/40 border-b border-[#DBC695]/20 pt-6 pb-4 px-4 sticky top-0 backdrop-blur-md z-30">
      <div class="max-w-2xl mx-auto">
        <h1 class="kurale text-lg font-bold text-[#DBC695] tracking-wide">
          🔮 Confirmar Pedido
        </h1>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="max-w-2xl mx-auto px-4 mt-4 flex flex-col gap-3">
      
      <!-- SEÇÃO 1: Endereço de Entrega (Destaque Shopee) -->
      <div 
        @click="navigateTo('/perfil/enderecos')"
        class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 backdrop-blur-xs relative cursor-pointer hover:border-[#DBC695]/30 transition-colors"
      >
        <!-- Linha colorida decorativa na borda (Padrão Shopee adaptado para ouro/roxo) -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DBC695] via-[#0a050f] to-[#DBC695] rounded-t-xl"></div>
        
        <div class="flex items-center gap-2 text-[#DBC695] mb-2 mt-1">
          <span class="text-sm">📍</span>
          <h2 class="kurale text-xs font-black tracking-wider uppercase">Endereço de Entrega</h2>
        </div>

        <div class="text-xs text-zinc-300 space-y-1">
          <p class="font-bold text-zinc-200">
            {{ enderecoSelecionado.destinatario }} <span class="text-zinc-500 font-mono font-normal ml-2">{{ enderecoSelecionado.telefone }}</span>
          </p>
          <p class="text-zinc-400">{{ enderecoSelecionado.logradouro }}, {{ enderecoSelecionado.bairro }}</p>
          <p class="text-zinc-400">{{ enderecoSelecionado.cidadeEstado }} - CEP {{ enderecoSelecionado.cep }}</p>
        </div>
        
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">></span>
      </div>

      <!-- SEÇÃO 2: Resumo dos Itens do Pedido -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 backdrop-blur-xs">
        <h3 class="kurale text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider">Itens Solicitados</h3>
        
        <div class="divide-y divide-zinc-900">
          <div 
            v-for="item in itensCheckout" 
            :key="item.id" 
            class="flex gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div class="w-14 h-14 bg-black/60 border border-[#DBC695]/20 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
              <img v-if="item.imagem" :src="item.imagem" alt="Item" class="w-full h-full object-cover" />
              <span v-else class="text-[#DBC695] text-xl">✨</span>
            </div>

            <div class="flex-1 min-w-0 flex flex-col justify-between">
              <h4 class="kurale text-xs font-bold text-zinc-200 truncate">{{ item.nome }}</h4>
              <p class="text-[10px] text-zinc-500">Var: {{ item.variacao }}</p>
              <div class="flex justify-between items-center mt-1">
                <span class="text-xs font-mono text-[#DBC695]">R$ {{ item.preco.toFixed(2) }}</span>
                <span class="text-xs text-zinc-400 font-mono">x{{ item.quantidade }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SEÇÃO 3: Métodos de Pagamento (Com Regra de Desconto) -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 backdrop-blur-xs">
        <h3 class="kurale text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider">Método de Pagamento</h3>
        
        <div class="flex flex-col gap-2">
          
          <!-- PIX -->
          <label 
            class="flex items-center justify-between p-3 rounded-lg border bg-black/20 cursor-pointer transition-colors"
            :class="metodoPagamento === 'pix' ? 'border-[#DBC695] bg-[#DBC695]/5' : 'border-zinc-800'"
          >
            <div class="flex items-center gap-3">
              <input type="radio" v-model="metodoPagamento" value="pix" class="accent-[#DBC695]">
              <div class="flex flex-col">
                <span class="kurale text-xs font-bold text-zinc-200 flex items-center gap-1">
                  ⚡ Pix Instantâneo
                </span>
                <span class="text-[10px] text-emerald-400 font-medium">Ganhe 15% de desconto no valor dos produtos</span>
              </div>
            </div>
            <span class="text-lg">📱</span>
          </label>

          <!-- Cartão de Crédito -->
          <label 
            class="flex items-center justify-between p-3 rounded-lg border bg-black/20 cursor-pointer transition-colors"
            :class="metodoPagamento === 'cartao' ? 'border-[#DBC695] bg-[#DBC695]/5' : 'border-zinc-800'"
          >
            <div class="flex items-center gap-3">
              <input type="radio" v-model="metodoPagamento" value="cartao" class="accent-[#DBC695]">
              <div class="flex flex-col">
                <span class="kurale text-xs font-bold text-zinc-200">Cartão de Crédito</span>
                <span class="text-[10px] text-zinc-500">Em até 6x sem juros no portal</span>
              </div>
            </div>
            <span class="text-lg">💳</span>
          </label>

          <!-- Boleto -->
          <label 
            class="flex items-center justify-between p-3 rounded-lg border bg-black/20 cursor-pointer transition-colors"
            :class="metodoPagamento === 'boleto' ? 'border-[#DBC695] bg-[#DBC695]/5' : 'border-zinc-800'"
          >
            <div class="flex items-center gap-3">
              <input type="radio" v-model="metodoPagamento" value="boleto" class="accent-[#DBC695]">
              <div class="flex flex-col">
                <span class="kurale text-xs font-bold text-zinc-200">Boleto Bancário</span>
                <span class="text-[10px] text-zinc-500">Processamento em até 3 dias úteis</span>
              </div>
            </div>
            <span class="text-lg">📄</span>
          </label>

        </div>
      </div>

      <!-- SEÇÃO 4: Detalhamento do Recibo de Valores -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 backdrop-blur-xs space-y-2 font-mono text-xs text-zinc-400">
        <div class="flex justify-between">
          <span>Subtotal dos Itens:</span>
          <span class="text-zinc-200">R$ {{ subtotalProdutos.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Envio / Frete Postal:</span>
          <span class="text-zinc-200">R$ {{ valorFrete.toFixed(2) }}</span>
        </div>
        <div v-if="descontoPix > 0" class="flex justify-between text-emerald-400">
          <span>Desconto de Alquimia (Pix 15%):</span>
          <span>- R$ {{ descontoPix.toFixed(2) }}</span>
        </div>
      </div>

    </div>

    <!-- BARRA FIXA INFERIOR DE CONCLUSÃO (Padrão de Fechamento Shopee) -->
    <div class="fixed bottom-0 left-0 right-0 bg-[#0f0a17]/95 border-t border-[#DBC695]/30 backdrop-blur-lg px-4 py-3 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div class="max-w-2xl mx-auto flex items-center justify-between gap-4">
        
        <!-- Display de Preço Final Unificado -->
        <div class="flex flex-col">
          <span class="text-[10px] text-zinc-400 kurale">Valor Total a Pagar</span>
          <div class="flex items-baseline gap-1">
            <span class="text-[10px] text-[#DBC695] font-mono font-bold">R$</span>
            <span class="text-xl font-black text-[#DBC695] font-mono tracking-tight">
              {{ totalFinal.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Botão de Ação Crucial -->
        <button 
          @click="handleFinalizarCompra"
          :disabled="isLoading"
          class="bg-black/40 text-center text-[#DBC695] kurale text-xs text-shadow-lg font-bold py-3 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-97 disabled:opacity-40 uppercase tracking-wider shrink-0"
        >
          {{ isLoading ? 'Processando...' : 'Fazer Pedido' }}
        </button>

      </div>
    </div>

  </div>
</template>