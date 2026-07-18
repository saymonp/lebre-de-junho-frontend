<script setup lang="ts">
definePageMeta({
  middleware: 'admin' // Usa o arquivo middleware/admin.ts
})
import { ref, computed } from 'vue'

// Simulação de dados vindos da rota do Nuxt (ex: /dashboard/encomendas/:id)
const encomenda = ref({
  codigo: '#LJ-2026-7754',
  dataCriacao: '03/07/2026 às 14:20',
  status: 'Em Produção', // Opções: 'Pendente', 'Em Produção', 'Enviado', 'Entregue'
  prazoFabricacao: '10/07/2026',
  valorTotal: 176.41,
  metodoPagamento: 'Pix Instantâneo',
  
  cliente: {
    nome: 'Saymon',
    email: 'saymon@email.com',
    telefone: '(55) 99999-1234',
    endereco: 'Rua dos Arcanos, 777 - Grimório Central, Vila Imperial - Ijuí/RS - CEP 98700-000'
  },
  
  itens: [
    { nome: 'Amigurumi Carot Bunny', quantidade: 1, valor: 85.99, tipo: 'Pronta Entrega' },
    { nome: 'Amigurumi Espantalho Jack', quantidade: 1, valor: 85.99, tipo: 'Sob Encomenda' }
  ],
  
  historico: [
    { data: '03/07/2026 14:22', mensagem: 'Produção iniciada.' },
    { data: '03/07/2026 14:21', mensagem: 'Pagamento via Pix confirmado automaticamente.' },
    { data: '03/07/2026 14:20', mensagem: 'Pedido registrado no pergaminho do servidor.' }
  ]
})

// Estados para controle de ações da Dashboard
const novoStatus = ref(encomenda.value.status)
const codigoRastreio = ref('')
const salvando = ref(false)

const atualizarStatus = () => {
  salvando.value = true
  // Simula o salvamento no backend Laravel
  setTimeout(() => {
    encomenda.value.status = novoStatus.value
    salvando.value = false
    alert('Status da encomenda atualizado com sucesso!')
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#0a050f] text-zinc-200 pb-16 pt-4 px-4">
    <div class="max-w-3xl mx-auto flex flex-col gap-4">
      
      <!-- HEADER: Identificação da Encomenda -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 backdrop-blur-xs">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="kurale text-lg font-bold text-[#DBC695] tracking-wide">
              Encomenda {{ encomenda.codigo }}
            </h1>
            <span 
              class="text-[10px] px-2.5 py-0.5 rounded-full font-bold border tracking-wide uppercase"
              :class="{
                'bg-amber-500/10 border-amber-500/30 text-amber-400': encomenda.status === 'Em Produção',
                'bg-indigo-500/10 border-indigo-500/30 text-indigo-400': encomenda.status === 'Enviado',
                'bg-emerald-500/10 border-emerald-500/30 text-emerald-400': encomenda.status === 'Entregue',
                'bg-zinc-500/10 border-zinc-500/30 text-zinc-400': encomenda.status === 'Pendente'
              }"
            >
              {{ encomenda.status }}
            </span>
          </div>
          <p class="text-[11px] text-zinc-500 font-mono mt-1">
            Iniciada em: {{ encomenda.dataCriacao }}
          </p>
        </div>

        <button 
          @click="navigateTo('/admin/dashboard')"
          class="text-xs text-zinc-400 hover:text-[#DBC695] border border-zinc-800 hover:border-[#DBC695]/30 bg-black/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          ← Voltar para a Lista
        </button>
      </div>

      <!-- GRID PRINCIPAL: 2 Colunas no Desktop -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <!-- COLUNA DA ESQUERDA: Detalhes do Cliente e Itens (Ocupa 2 colunas) -->
        <div class="md:col-span-2 flex flex-col gap-4">
          
          <!-- BLOCO 1: Ficha do Comprador -->
          <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-5 backdrop-blur-xs">
            <h2 class="kurale text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider flex items-center gap-1">
              👤 Destinatário Cliente
            </h2>
            <div class="space-y-2 text-xs">
              <p class="text-zinc-200 font-bold font-mono text-sm">{{ encomenda.cliente.nome }}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400 font-mono text-[11px]">
                <p>{{ encomenda.cliente.telefone }}</p>
                <p>{{ encomenda.cliente.email }}</p>
              </div>
              <div class="border-t border-zinc-900/60 pt-2 mt-2">
                <span class="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">Endereço Postal</span>
                <p class="text-zinc-400 leading-relaxed font-sans text-[11px]">{{ encomenda.cliente.endereco }}</p>
              </div>
            </div>
          </div>

          <!-- BLOCO 2: Itens do Pedido -->
          <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-5 backdrop-blur-xs">
            <h2 class="kurale text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider flex items-center gap-1">
              Itens da Encomenda
            </h2>
            <div class="divide-y divide-zinc-900/80">
              <div 
                v-for="(item, i) in encomenda.itens" 
                :key="i"
                class="py-3 flex justify-between items-center first:pt-0 last:pb-0"
              >
                <div>
                  <h3 class="kurale text-xs font-bold text-zinc-200">{{ item.nome }}</h3>
                  <span 
                    class="text-[9px] px-1.5 py-0.2 border rounded mt-1 inline-block font-mono"
                    :class="item.tipo === 'Pronta Entrega' ? 'border-emerald-500/20 text-emerald-400/80 bg-emerald-500/5' : 'border-amber-500/20 text-amber-400/80 bg-amber-500/5'"
                  >
                    {{ item.tipo }}
                  </span>
                </div>
                <div class="text-right font-mono text-xs">
                  <p class="text-zinc-500">x{{ item.quantidade }}</p>
                  <p class="text-[#DBC695] font-bold mt-0.5">R$ {{ (item.valor * item.quantidade).toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Totalizador do Recibo -->
            <div class="border-t border-zinc-900 pt-3 mt-3 flex justify-between items-baseline text-xs font-mono">
              <span class="text-zinc-500">Total Pago via {{ encomenda.metodoPagamento }}:</span>
              <span class="text-base text-[#DBC695] font-bold">R$ {{ encomenda.valorTotal.toFixed(2) }}</span>
            </div>
          </div>

          <!-- BLOCO 3: Histórico de Produção / Logs do Sistema -->
          <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-5 backdrop-blur-xs">
            <h2 class="kurale text-xs font-bold text-zinc-400 mb-4 uppercase tracking-wider flex items-center gap-1">
              📜 Histórico
            </h2>
            <div class="relative pl-4 border-l border-zinc-800 space-y-4 font-mono text-[11px]">
              <div 
                v-for="(log, idx) in encomenda.historico" 
                :key="idx"
                class="relative"
              >
                <!-- Ponto na linha temporal -->
                <span class="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-[#DBC695] ring-4 ring-[#0a050f]"></span>
                <p class="text-[10px] text-zinc-500">{{ log.data }}</p>
                <p class="text-zinc-300 mt-0.5 leading-relaxed font-sans text-xs">{{ log.mensagem }}</p>
              </div>
            </div>
          </div>

        </div>

        <!-- COLUNA DA DIREITA: Painel de Controle e Gestão (Ocupa 1 coluna) -->
        <div class="flex flex-col gap-4">
          
          <!-- BLOCO 4: Gerenciador de Status (Ações do Administrador) -->
          <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-5 backdrop-blur-xs sticky top-4">
            <h2 class="kurale text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider flex items-center gap-1">
              Painel de Controle
            </h2>
            
            <div class="space-y-4">
              <!-- Seletor de Status -->
              <div>
                <label class="kurale text-[11px] text-zinc-500 mb-1 block">Alterar Status Atual</label>
                <select 
                  v-model="novoStatus"
                  class="bg-black/60 border border-zinc-800 text-zinc-200 text-xs rounded-xl block w-full px-3 py-2 focus:border-[#DBC695] outline-none font-mono"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Em Produção">Em Produção</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregue">Entregue</option>
                </select>
              </div>

              <!-- Data Alvo Invisível de Encomenda -->
              <div class="p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl text-center">
                <span class="text-[10px] text-zinc-500 font-mono block">Prazo Estimado de confecção</span>
                <span class="text-sm font-bold text-amber-400 font-mono mt-1 block">⏳ {{ encomenda.prazoFabricacao }}</span>
              </div>

              <!-- Input Opcional de Rastreio (Aparece se mudar para enviado) -->
              <div v-if="novoStatus === 'Enviado' || encomenda.status === 'Enviado'">
                <label class="kurale text-[11px] text-zinc-500 mb-1 block">Código de Rastreamento Correios</label>
                <input 
                  v-model="codigoRastreio" 
                  type="text" 
                  placeholder="EX: QB123456789BR"
                  class="bg-black/60 border border-zinc-800 text-zinc-200 text-xs rounded-xl block w-full px-3 py-2 focus:border-[#DBC695] outline-none font-mono"
                >
              </div>

              <!-- Botão Salvar Modificações -->
              <button 
                @click="atualizarStatus"
                :disabled="salvando"
                class="w-full text-center bg-black/40 text-[#DBC695] kurale text-xs text-shadow-lg font-bold py-2.5 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-98 disabled:opacity-40 cursor-pointer uppercase tracking-wider"
              >
                {{ salvando ? 'Atualizando...' : 'Gravar Alterações' }}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>