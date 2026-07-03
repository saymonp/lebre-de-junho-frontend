<script setup lang="ts">
import { ref } from 'vue'
// import { useAuthStore } from '@/stores/auth'; // Mantendo sua store Pinia configurada

// const authStore = useAuthStore();

const email = ref('')
const isLoading = ref(false)
const emailEnviado = ref(false)
const errorMessage = ref('')

const handleRecuperarSenha = async () => {
  if (!email.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    //await authStore.solicitarRecuperacao({ email: email.value });
    emailEnviado.value = true
  } catch (error) {
    errorMessage.value = 'Ocorreu um erro ao processar sua solicitação.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="relative min-h-screen w-full bg-[#0a050f] flex items-center justify-center p-4 overflow-hidden">
    
    <!-- Efeito de Brilho de Fundo Místico (Aura Roxa/Dourada sutil) -->
    <div class="absolute w-[500px] h-[500px] bg-[#DBC695]/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

    <!-- Container do Formulário Estilo Janela Mística -->
    <div class="relative z-10 bg-black/60 backdrop-blur-xl border border-[#DBC695]/30 rounded-xl p-8 w-full max-w-[400px] shadow-2xl">

      <div class="flex flex-col items-center gap-4">
        
        <!-- Ícone Temático Central -->
        <div class="w-12 h-12 rounded-full bg-black/40 border border-[#DBC695]/30 flex items-center justify-center mb-1">
          <span class="text-[#DBC695] text-xl">🗝️</span>
        </div>

        <h2 class="kurale text-[#DBC695] font-black text-2xl text-center text-shadow-lg">
          Recuperar Senha
        </h2>

        <!-- ESTADO 1: Formulário de Envio -->
        <template v-if="!emailEnviado">
          <p class="kurale text-zinc-300 text-center text-sm leading-relaxed">
            Esqueceu seus dados? Digite seu e-mail cadastrado para enviarmos um link de redefinição.
          </p>

          <div class="w-full mt-2 flex flex-col">
            <label class="kurale text-xs text-zinc-400 mb-1 ml-1">E-mail Cadastrado</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Ex: seu-email@provedor.com"
              @keyup.enter="handleRecuperarSenha" 
              :disabled="isLoading"
              class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50"
            >
          </div>

          <p v-if="errorMessage" class="kurale text-red-400 text-xs text-center font-medium mt-1">
            {{ errorMessage }}
          </p>

          <div class="p-2 w-full">
            <button 
              @click="handleRecuperarSenha" 
              :disabled="isLoading || !email"
              class="w-full bg-black/40 text-center text-[#DBC695] kurale text-sm text-shadow-lg font-bold py-2 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-97 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Enviando Link...' : 'Enviar Link de Recuperação' }}
            </button>
          </div>
        </template>

        <!-- ESTADO 2: Feedback de Sucesso -->
        <template v-else>
          <div class="p-4 rounded-lg bg-[#DBC695]/5 border border-[#DBC695]/20 text-center my-2">
            <p class="kurale text-[#DBC695] font-bold text-sm mb-2">E-mail enviado!</p>
            <p class="kurale text-zinc-300 text-xs leading-relaxed">
              Se o endereço <span class="text-white font-semibold">{{ email }}</span> constar em nosso sistema, você receberá um link de acesso em instantes.
            </p>
          </div>

          <button @click="emailEnviado = false" class="kurale mt-2 text-xs text-[#DBC695] hover:underline">
            Não recebeu? Tentar novamente
          </button>
        </template>

        <div class="w-full h-[1px] bg-[#DBC695]/10 my-2"></div>

        <!-- Navegação padrão do Nuxt usando o navigateTo -->
        <button 
          @click="navigateTo('/')"
          class="kurale cursor-pointer text-xs text-zinc-400 hover:text-white transition-colors tracking-wider font-bold"
        >
          Voltar para a Home
        </button>

      </div>
    </div>
  </div>
</template>