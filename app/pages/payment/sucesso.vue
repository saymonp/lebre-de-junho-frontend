<script setup lang="ts">
import { ref } from 'vue'

// Dados simulados do pedido recém-pago e aprovado
const pedido = ref({
  codigo: '#LJ-2026-7754',
  data: '03/07/2026',
  metodoPagamento: 'Pix',
  valorTotal: 176.41,
  previsaoEntrega: '4 a 8 dias úteis',
  rastreamentoDisponivel: 'Em breve no seu e-mail'
})

const acompanharPedido = () => {
  navigateTo('/perfil/pedidos')
}

const voltarParaLoja = () => {
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#0a050f] text-zinc-200 pb-12 flex flex-col justify-between">
    
    <!-- Conteúdo Centralizado de Sucesso -->
    <div class="max-w-md mx-auto px-4 mt-12 flex flex-col gap-6 text-center items-center w-full">
      
      <!-- Ícone Animado de Sucesso Místico -->
      <div class="relative flex items-center justify-center">
        <!-- Pulsação de fundo -->
        <div class="absolute w-20 h-20 bg-emerald-500/20 rounded-full animate-ping opacity-75"></div>
        <!-- Círculo principal -->
        <div class="relative w-20 h-20 rounded-full bg-black/60 border-2 border-emerald-500 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          ✨
        </div>
      </div>

      <!-- Textos Principais -->
      <div class="space-y-2">
        <h1 class="kurale text-xl font-black text-emerald-400 tracking-wide">
          Pagamento Confirmado!
        </h1>
        <p class="kurale text-xs text-[#DBC695]">
          O caldeirão já está aceso e preparando seu pedido.
        </p>
        <p class="text-[11px] text-zinc-400 max-w-xs leading-relaxed mx-auto">
          Obrigado por comprar na Lebre de Junho. Seu pagamento via Pix foi validado instantaneamente pela nossa guilda.
        </p>
      </div>

      <!-- Card com Detalhes do Pedido (Estilo Recibo Shopee) -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-5 backdrop-blur-xs w-full text-left space-y-3">
        <h2 class="kurale text-xs font-bold text-zinc-300 border-b border-zinc-900 pb-2 uppercase tracking-wider">
          Resumo da Compra
        </h2>
        
        <div class="space-y-2 font-mono text-xs text-zinc-400">
          <div class="flex justify-between">
            <span>Código do Pedido:</span>
            <span class="text-zinc-200 font-bold">{{ pedido.codigo }}</span>
          </div>
          <div class="flex justify-between">
            <span>Data da Operação:</span>
            <span class="text-zinc-200">{{ pedido.data }}</span>
          </div>
          <div class="flex justify-between">
            <span>Meio de Envio:</span>
            <span class="text-zinc-200">Correios (PAC)</span>
          </div>
          <div class="flex justify-between">
            <span>Previsão de Entrega:</span>
            <span class="text-amber-400 font-bold">{{ pedido.previsaoEntrega }}</span>
          </div>
          <div class="flex justify-between border-t border-zinc-900 pt-2 text-zinc-300">
            <span class="kurale font-bold">Total Pago (Pix):</span>
            <span class="text-[#DBC695] font-bold">R$ {{ pedido.valorTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Aviso sobre o Rastreamento -->
      <div class="bg-zinc-950/60 border border-zinc-900 rounded-lg p-3 w-full flex items-center gap-3 text-left">
        <span class="text-base">📦</span>
        <div class="flex flex-col">
          <span class="kurale text-[11px] text-zinc-300 font-bold">Código de Rastreio</span>
          <span class="text-[10px] text-zinc-500">{{ pedido.rastreamentoDisponivel }}</span>
        </div>
      </div>

    </div>

    <!-- Botões de Ação Finais Fixados no Pé da Página -->
    <div class="max-w-md mx-auto px-4 w-full flex flex-col gap-2 mt-8">
      <button 
        @click="acompanharPedido"
        class="w-full text-center bg-black/40 text-[#DBC695] kurale text-xs text-shadow-lg font-bold py-3.5 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-101 active:scale-99 cursor-pointer uppercase tracking-wider"
      >
        🔍 Acompanhar Pedido
      </button>
      
      <button 
        @click="voltarParaLoja"
        class="w-full text-center text-zinc-500 hover:text-zinc-300 text-xs py-2 transition-colors cursor-pointer font-medium"
      >
        Voltar para a Página Inicial
      </button>
    </div>

  </div>
</template>