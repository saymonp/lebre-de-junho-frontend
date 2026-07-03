<template>
  <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-6 backdrop-blur-xs w-full">
    
    <!-- Topo do Painel de Encomendas -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DBC695]/10 pb-4 mb-6">
      <div>
        <h2 class="kurale text-lg font-bold text-[#DBC695] tracking-wide flex items-center gap-2">
          📜 Pergaminho de Encomendas
        </h2>
        <p class="text-xs text-zinc-400 mt-0.5 font-sans">
          Acompanhe os pedidos de seus clientes, prazos de confecção e envios.
        </p>
      </div>
      
      <!-- Botão para Ações Globais (Ex: Exportar Relatório) -->
      <button 
        @click="console.log('Imprimir relatórios')"
        class="bg-black/40 text-center text-zinc-300 kurale text-xs font-bold py-2 px-4 rounded-md border border-zinc-700 hover:border-[#DBC695] hover:text-[#DBC695] transition-all duration-300 cursor-pointer shadow-md flex items-center gap-2 shrink-0"
      >
        🖨️ Exportar Lista
      </button>
    </div>

    <!-- Tabela / Lista de Encomendas -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr class="border-b border-zinc-800 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
            <th class="pb-3 pl-2">Cliente / Data</th>
            <th class="pb-3">Data do Pedido</th>
            <th class="pb-3">Prazo (Fabricação)</th>
            <th class="pb-3">Status</th>
            <th class="pb-3 pr-2 text-right">Detalhes</th>
          </tr>
        </thead>
        
        <tbody class="divide-y divide-zinc-900 text-sm">
          <tr 
            v-for="(encomenda, index) in encomendas" 
            :key="index"
            class="hover:bg-white/[0.02] transition-colors group"
          >
            <!-- 1. Cliente e Data -->
            <td class="py-3.5 pl-2">
              <div class="flex flex-col">
                <span class="kurale text-xs font-bold text-zinc-200 group-hover:text-[#DBC695] transition-colors">
                  {{ encomenda.cliente }}
                </span>
                <span class="text-[10px] text-zinc-500 font-mono mt-0.5">
                  {{ encomenda.data }}
                </span>
              </div>
            </td>

            <!-- 2. Produto -->
            <td class="py-3.5 font-medium text-zinc-300 text-xs">
              {{ encomenda.produto }}
            </td>

            <!-- 3. Prazo de Fabricação (Data Alvo) -->
            <td class="py-3.5">
              <span class="font-mono text-xs font-bold text-amber-400/80 bg-amber-500/5 border border-amber-500/10 px-2 py-1 rounded-md">
                {{ encomenda.prazoFabricacao }}
              </span>
            </td>

            <!-- 4. Status com Badge Dinâmico -->
            <td class="py-3.5">
              <span 
                class="text-[10px] px-2.5 py-0.5 rounded-full font-bold border tracking-wide"
                :class="{
                  'bg-indigo-500/10 border-indigo-500/30 text-indigo-400': encomenda.status === 'Enviado',
                  'bg-emerald-500/10 border-emerald-500/30 text-emerald-400': encomenda.status === 'Entregue',
                  'bg-amber-500/10 border-amber-500/30 text-amber-400': !['Enviado', 'Entregue'].includes(encomenda.status)
                }"
              >
                {{ encomenda.status }}
              </span>
            </td>

            <!-- 5. Ações Contextuais -->
            <td class="py-3.5 pr-2 text-right">
              <button 
                @click="navigateTo(`/admin/encomenda/${index}`)"
                class="text-[10px] uppercase font-bold text-zinc-500 hover:text-[#DBC695] border border-transparent hover:border-[#DBC695]/30 bg-black/30 px-3 py-1.5 rounded transition-all cursor-pointer"
              >
                Ver Ficha
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup lang="ts">
const encomendas = [
  { 
    cliente: 'Saymon', 
    data: '03/07/2026', 
    produto: 'Amigurumi Carot Bunny', 
    prazoFabricacao: '10/07/2026', 
    status: 'Enviado' 
  },
  { 
    cliente: 'Saymon', 
    data: '03/07/2026', 
    produto: 'Amigurumi Espantalho Jack', 
    prazoFabricacao: '10/07/2026', 
    status: 'Entregue' 
  }
];
</script>