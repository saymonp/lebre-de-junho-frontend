<template>
  <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-6 backdrop-blur-xs w-full">
    
    <!-- Topo do Painel de Produtos -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DBC695]/10 pb-4 mb-6">
      <div>
        <h2 class="kurale text-lg font-bold text-[#DBC695] tracking-wide flex items-center gap-2">
          Produtos
        </h2>
        <p class="text-xs text-zinc-400 mt-0.5 font-sans">
          Gerencie suas criações artesanais e disponibilidades de estoque.
        </p>
      </div>
      
      <!-- Botão para Cadastrar Novo Item -->
      <button 
        @click="navigateTo('/admin/produto')"
        class="bg-black/40 text-center text-[#DBC695] kurale text-xs font-bold py-2 px-4 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer shadow-md flex items-center gap-2 shrink-0"
      >
        <span>＋</span> Cadastrar Novo Produto
      </button>
    </div>

    <!-- Tabela / Lista de Produtos Gerencial -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500 font-mono">
            <th class="pb-3 pl-2">Miniatura</th>
            <th class="pb-3">Nome da Peça</th>
            <th class="pb-3">Valor de Troca</th>
            <th class="pb-3">Status</th>
            <th class="pb-3 pr-2 text-right">Ações</th>
          </tr>
        </thead>
        
        <tbody class="divide-y divide-zinc-900 text-sm">
          <tr 
            v-for="(produto, index) in produtos?.data" 
            :key="index"
            class="hover:bg-white/[0.02] transition-colors group"
          >
            <!-- 1. Miniatura Fallback -->
            <td class="py-3.5 pl-2">
              <div class="w-10 h-10 bg-black/60 border border-[#DBC695]/20 rounded-lg flex items-center justify-center text-lg shadow-inner shrink-0">
                🧶
              </div>
            </td>

            <!-- 2. Nome do Produto -->
            <td class="py-3.5 font-medium text-zinc-200">
              <span class="kurale block text-xs font-bold group-hover:text-[#DBC695] transition-colors">
                {{ produto.name }}
              </span>
            </td>

            <!-- 3. Preço / Valor -->
            <td class="py-3.5 font-mono text-xs text-[#DBC695] font-bold">
              {{ produto.price }}
            </td>

            <!-- 4. Status com Badge Dinâmico -->
            <td class="py-3.5">
              <span 
                class="text-[10px] px-2.5 py-0.5 rounded-full font-bold border"
                :class="produto.in_stock === true 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'"
              >
                {{ produto.in_stock ? 'Pronta Entrega' : 'Sob Encomenda' }}
              </span>
            </td>

            <!-- 5. Ações Rápidas -->
            <td class="py-3.5 pr-2 text-right space-x-2">
              <button 
                @click="navigateTo(`/admin/produto/${produto.id}`)"
                class="text-xs text-zinc-400 hover:text-[#DBC695] transition-colors p-1 cursor-pointer"
                title="Editar Produto"
              >
                ✏️
              </button>
              <button 
                @click="console.log('Remover:', produto.name)"
                class="text-xs text-zinc-600 hover:text-red-400 transition-colors p-1 cursor-pointer"
                title="Deletar Produto"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()

const loading = ref(false)

const {
  data: initialData,
  status,
  error,
  refresh
} = await useAsyncData('products-list', () => productStore.indexProducts());
const produtos = computed(() => initialData.value);

//const produtos = [
//  { nome: 'Amigurumi Carot Bunny', valor: 'R$ 85,99', status: 'Pronta Entrega' },
//  { nome: 'Amigurumi Espantalho Jack', valor: 'R$ 85,99', status: 'Sob Encomenda' }
//];
</script>