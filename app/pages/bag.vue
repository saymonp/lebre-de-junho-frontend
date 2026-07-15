<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { ref, computed } from 'vue'

interface ItemCarrinho {
  id: number
  nome: string
  variacao: string
  preco: number
  quantidade: number
  imagem: string
  selecionado: boolean
  estoque: number
}

// Lista de itens simulada do carrinho místico
const itens = ref<ItemCarrinho[]>([
  {
    id: 1,
    nome: 'Grimório de Couro e Runas Antigas',
    variacao: 'Folhas Envelhecidas (A5)',
    preco: 189.90,
    quantidade: 1,
    imagem: '', // Deixe vazio para usar o fallback temático
    selecionado: true,
    estoque: 5
  },
  {
    id: 2,
    nome: 'Poção do Recomeço (Frasco Decorativo)',
    variacao: 'Essência de Lavanda & Ametista',
    preco: 54.00,
    quantidade: 2,
    imagem: '',
    selecionado: false,
    estoque: 3
  }
])

// Selecionar/Deselecionar Todos
const seletorTodos = computed({
  get: () => itens.value.length > 0 && itens.value.every(item => item.selecionado),
  set: (val) => {
    itens.value.forEach(item => item.selecionado = val)
  }
})

// Contadores e Cálculos reativos
const totalItensSelecionados = computed(() => {
  return itens.value.filter(item => item.selecionado).length
})

const subtotal = computed(() => {
  return itens.value
    .filter(item => item.selecionado)
    .reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
})

// Funções de controle de quantidade
const alterarQuantidade = (item: ItemCarrinho, mudança: number) => {
  const novaQtd = item.quantidade + mudança
  if (novaQtd >= 1 && novaQtd <= item.estoque) {
    item.quantidade = novaQtd
  }
}

const removerItem = (id: number) => {
  itens.value = itens.value.filter(item => item.id !== id)
}

const checkout = () => {
  if (totalItensSelecionados.value === 0) return
  navigateTo('/checkout')
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#0a050f] text-zinc-200 pb-32">
    <NavBar />
    <!-- Topo / Cabeçalho da Tela -->
    <div class="bg-black/40 border-b border-[#DBC695]/20 pt-6 pb-4 px-4 sticky top-0 backdrop-blur-md z-30">
      <div class="max-w-2xl mx-auto flex items-center justify-between">
        <h1 class="kurale text-lg font-bold text-[#DBC695] tracking-wide flex items-center gap-2">
          🛒 Carrinho de Compras
        </h1>
        <span class="text-xs text-zinc-400 font-mono">({{ itens.length }} itens)</span>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="max-w-2xl mx-auto px-4 mt-4 flex flex-col gap-3">

      <!-- Estado Alternativo: Carrinho Vazio -->
      <div v-if="itens.length === 0" class="flex flex-col items-center justify-center py-16 text-center gap-4">
        <span class="text-4xl">🐇</span>
        <p class="kurale text-zinc-400 text-sm">Seu baú de compras está vazio por enquanto...</p>
        <button @click="navigateTo('/')"
          class="kurale text-xs text-[#DBC695] border border-[#DBC695] px-4 py-2 rounded-md hover:bg-[#DBC695]/10 transition-colors">
          Explorar a Loja
        </button>
      </div>

      <template v-else>
        <!-- BARRA SELECIONAR TODOS (Padrão Shopee) -->
        <div
          class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 flex items-center justify-between backdrop-blur-xs">
          <label class="flex items-center gap-3 cursor-pointer select-none">
            <input v-model="seletorTodos" type="checkbox" class="w-4 h-4 rounded-sm accent-[#DBC695] cursor-pointer">
            <span class="kurale text-xs text-zinc-300 font-bold">Selecionar Todos</span>
          </label>
          <span class="text-[11px] text-zinc-500 font-mono">Estoque verificado</span>
        </div>

        <!-- LISTA DE PRODUTOS -->
        <div v-for="item in itens" :key="item.id"
          class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 flex gap-3 backdrop-blur-xs relative">
          <!-- Checkbox Individual -->
          <div class="flex items-center justify-center">
            <input v-model="item.selecionado" type="checkbox"
              class="w-4 h-4 rounded-sm accent-[#DBC695] cursor-pointer">
          </div>

          <!-- Imagem do Produto -->
          <div
            class="w-20 h-20 bg-black/60 border border-[#DBC695]/20 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            <img v-if="item.imagem" :src="item.imagem" :alt="item.nome" class="w-full h-full object-cover" />
            <span v-else class="text-[#DBC695] text-2xl">✨</span>
          </div>

          <!-- Detalhes do Produto -->
          <div class="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <h2 class="kurale text-xs font-bold text-zinc-200 truncate pr-4">
                {{ item.nome }}
              </h2>
              <span
                class="text-[10px] bg-zinc-900/80 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-md inline-block mt-1">
                Var: {{ item.variacao }}
              </span>
            </div>

            <div class="flex justify-between items-end mt-2">
              <!-- Preço Formatado -->
              <span class="text-sm font-bold text-[#DBC695] font-mono">
                R$ {{ item.preco.toFixed(2) }}
              </span>

              <!-- Seletor de Quantidade (Estilo Shopee Boxed) -->
              <div class="flex items-center border border-zinc-700 bg-black/30 rounded-md overflow-hidden">
                <button @click="alterarQuantidade(item, -1)" :disabled="item.quantidade <= 1"
                  class="w-7 h-7 flex items-center justify-center text-xs text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer">
                  -
                </button>
                <span class="w-8 text-center text-xs font-mono text-white border-x border-zinc-700 leading-7">
                  {{ item.quantidade }}
                </span>
                <button @click="alterarQuantidade(item, 1)" :disabled="item.quantidade >= item.estoque"
                  class="w-7 h-7 flex items-center justify-center text-xs text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer">
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Botão Excluir Flutuante Lateral -->
          <button @click="removerItem(item.id)"
            class="absolute top-3 right-3 text-zinc-600 hover:text-red-400 text-xs transition-colors cursor-pointer"
            title="Remover item">
            🗑️
          </button>
        </div>
      </template>

    </div>

    <!-- FOOTER FIXO DE COMPRA (Padrão de Checkout de Aplicativo / Shopee) -->
    <div v-if="itens.length > 0"
      class="fixed bottom-0 left-0 right-0 bg-[#0f0a17]/90 border-t border-[#DBC695]/30 backdrop-blur-lg px-4 py-3 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div class="max-w-2xl mx-auto flex items-center justify-between gap-4">

        <!-- Lado Esquerdo: Infos de Preço -->
        <div class="flex flex-col">
          <span class="text-[10px] text-zinc-400 kurale">
            Total selecionado ({{ totalItensSelecionados }})
          </span>
          <div class="flex items-baseline gap-1">
            <span class="text-[10px] text-[#DBC695] font-mono font-bold">R$</span>
            <span class="text-xl font-black text-[#DBC695] font-mono tracking-tight">
              {{ subtotal.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Lado Direito: Botão de Ação -->
        <button @click="checkout" :disabled="totalItensSelecionados === 0"
          class="bg-black/40 text-center text-[#DBC695] kurale text-xs text-shadow-lg font-bold py-3 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-97 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed uppercase tracking-wider shrink-0">
          Finalizar Pedido
        </button>

      </div>
    </div>

  </div>
</template>