<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Dados simulados do pedido gerado
const codigoPix = ref('00020101021226830014br.gov.bcb.pix25656lebredejunho2026prod77754321051234567890')
const valorFinal = ref(176.41) // Exemplo com o desconto de 15% já aplicado
const tempoRestante = ref(900) // 15 minutos em segundos
const copiado = ref(false)
let timer: any = null

// Formata o cronômetro (MM:SS)
const tempoFormatado = computed(() => {
  const minutos = Math.floor(tempoRestante.value / 60)
  const segundos = tempoRestante.value % 60
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
})

// Função para copiar o código Pix
const copiarCodigo = async () => {
  try {
    await navigator.clipboard.writeText(codigoPix.value)
    copiado.value = true
    setTimeout(() => {
      copiado.value = false
    }, 3000)
  } catch (err) {
    console.error('Erro ao copiar código:', err)
  }
}

// Inicializa o contador regressivo
onMounted(() => {
  timer = setInterval(() => {
    if (tempoRestante.value > 0) {
      tempoRestante.value--
    } else {
      clearInterval(timer)
      // Aqui você pode redirecionar ou mudar o estado para "Expirado"
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="min-h-screen w-full bg-[#0a050f] text-zinc-200 pb-12">
    
    <!-- Topo Simplificado -->
    <div class="bg-black/40 border-b border-[#DBC695]/20 pt-6 pb-4 px-4 sticky top-0 backdrop-blur-md z-30">
      <div class="max-w-md mx-auto text-center">
        <h1 class="kurale text-lg font-bold text-[#DBC695] tracking-wide">
          ⚡ Pagamento do Pedido
        </h1>
      </div>
    </div>

    <!-- Conteúdo Centralizado -->
    <div class="max-w-md mx-auto px-4 mt-6 flex flex-col gap-5 text-center">
      
      <!-- Card de Sucesso e Cronômetro -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-6 backdrop-blur-xs flex flex-col items-center gap-2">
        <div class="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl mb-1">
          ✅
        </div>
        <h2 class="kurale text-base font-bold text-[#DBC695]">Pedido Reservado!</h2>
        <p class="text-xs text-zinc-400 max-w-xs leading-relaxed">
          Obrigado pelo seu pedido. Finalize o pagamento via Pix antes que o tempo expire para garantir seus itens.
        </p>

        <!-- Contador Regressivo -->
        <div class="mt-3 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono flex items-center gap-2">
          <span>⏳ O código expira em:</span>
          <span class="text-amber-400 font-bold">{{ tempoFormatado }}</span>
        </div>
      </div>

      <!-- Área do Valor e Detalhe do Desconto -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 backdrop-blur-xs">
        <span class="text-[11px] text-zinc-500 kurale uppercase tracking-wider">Total com 15% de Desconto</span>
        <div class="text-2xl font-black text-[#DBC695] font-mono mt-1">
          R$ {{ valorFinal.toFixed(2) }}
        </div>
      </div>

      <!-- Bloco Copia e Cola -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-5 backdrop-blur-xs flex flex-col gap-4">
        <h3 class="kurale text-xs font-bold text-zinc-300 text-left uppercase tracking-wider">
          Código Pix Copia e Cola
        </h3>

        <!-- Caixa de Texto com o Token (Truncada para não quebrar o layout) -->
        <div class="w-full p-3 bg-black/60 border border-zinc-800 rounded-lg text-left select-all break-all font-mono text-[11px] text-zinc-400 max-h-16 overflow-y-auto custom-scrollbar">
          {{ codigoPix }}
        </div>

        <!-- Botão de Ação Dinâmico -->
        <button 
          @click="copiarCodigo"
          class="w-full text-center kurale text-xs text-shadow-lg font-bold py-3 px-6 rounded-md border outline-1 transition-all duration-300 active:scale-97 cursor-pointer"
          :class="copiado 
            ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400 outline-emerald-400' 
            : 'bg-black/40 text-[#DBC695] border-[#DBC695] outline-[#DBC695] hover:scale-102'"
        >
          {{ copiado ? '✓ Código Copiado!' : '📋 Copiar Código Pix' }}
        </button>
      </div>

      <!-- Instruções de Uso (Passo a Passo Rápido) -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-5 backdrop-blur-xs text-left">
        <h3 class="kurale text-xs font-bold text-[#DBC695] mb-3 uppercase tracking-wider">Como pagar?</h3>
        
        <ul class="space-y-3 text-xs text-zinc-400">
          <li class="flex gap-3">
            <span class="font-mono text-[#DBC695] font-bold">1.</span>
            <p>Abra o aplicativo do seu banco ou instituição financeira.</p>
          </li>
          <li class="flex gap-3">
            <span class="font-mono text-[#DBC695] font-bold">2.</span>
            <p>Acesse a seção do **Pix** e escolha a opção **"Pix Copia e Cola"**.</p>
          </li>
          <li class="flex gap-3">
            <span class="font-mono text-[#DBC695] font-bold">3.</span>
            <p>Cole o código copiado acima, confirme os dados da *Lebre de Junho* e conclua o pagamento.</p>
          </li>
        </ul>
      </div>

      <!-- Atalho de Voltar -->
      <button @click="navigateTo('/perfil')" class="kurale text-xs text-zinc-500 hover:text-[#DBC695] transition-colors mt-2 cursor-pointer">
        Voltar para o meu Perfil
      </button>

    </div>
  </div>
</template>

<style scoped>
/* Estilização sutil da barra de rolagem da caixinha do token se necessário */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(219, 198, 149, 0.2);
  border-radius: 2px;
}
</style>