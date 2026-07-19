<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const isLoading = ref(true)
const sucesso = ref(false)
const errorMsgLocal = ref('')

const formData = reactive({
  email: '',
  token: ''
})

onMounted(async () => {
  formData.email = route.query.email as string || ''
  formData.token = route.query.token as string || ''

  if (!formData.token || !formData.email) {
    isLoading.value = false
    errorMsgLocal.value = 'Link de validação inválido, corrompido ou incompleto.'
    return
  }

  try {
    await authStore.verifyEmail({
      email: formData.email,
      token: formData.token
    })

    sucesso.value = true

    setTimeout(() => {
      navigateTo('/perfil')
    }, 3000)

  } catch (error) {
    errorMsgLocal.value = 'Não foi possível validar seu e-mail. O link pode ter expirado ou já ter sido utilizado.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="relative min-h-screen w-full bg-[#0a050f] flex items-center justify-center p-4 overflow-hidden">
    
    <!-- Efeito de Brilho de Fundo Místico (Aura Dourada sutil) -->
    <div class="absolute w-[500px] h-[500px] bg-[#DBC695]/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

    <!-- Container Estilo Janela Mística -->
    <div class="relative z-10 bg-black/60 backdrop-blur-xl border border-[#DBC695]/30 rounded-xl p-8 w-full max-w-[400px] shadow-2xl">
      
      <div class="flex flex-col items-center gap-4">
        
        <!-- Ícone Temático Central Dinâmico -->
        <div class="w-12 h-12 rounded-full bg-black/40 border border-[#DBC695]/30 flex items-center justify-center mb-1">
          <span v-if="isLoading" class="text-[#DBC695] text-xl animate-spin block">⏳</span>
          <span v-else-if="sucesso" class="text-[#DBC695] text-xl">✨</span>
          <span v-else class="text-red-400 text-xl">❌</span>
        </div>

        <h2 class="kurale text-[#DBC695] font-black text-2xl text-center text-shadow-lg">
          {{ isLoading ? 'Validando Acesso' : sucesso ? 'E-mail Confirmado' : 'Ops, algo deu errado' }}
        </h2>

        <!-- ESTADO 1: Carregando / Processando -->
        <template v-if="isLoading">
          <p class="kurale text-zinc-300 text-center text-sm leading-relaxed mb-2">
            Estamos lendo os pergaminhos e confirmando a autenticidade da sua conta. Aguarde um instante...
          </p>
          <div class="w-full h-1 bg-zinc-800 rounded-full overflow-hidden relative">
            <div class="absolute inset-0 bg-[#DBC695] w-1/3 rounded-full animate-ping"></div>
          </div>
        </template>

        <!-- ESTADO 2: Sucesso e Redirecionamento -->
        <template v-else-if="sucesso">
          <div class="p-4 rounded-lg bg-[#DBC695]/10 border border-[#DBC695]/30 text-center my-2 w-full">
            <p class="kurale text-[#DBC695] font-bold text-sm mb-2">Sua conta está ativa!</p>
            <p class="kurale text-zinc-300 text-xs leading-relaxed">
              O e-mail <span class="text-[#DBC695] font-medium">{{ formData.email }}</span> foi validado com sucesso na Lebre de Junho.
            </p>
          </div>

          <p class="kurale text-[#DBC695] text-[11px] uppercase tracking-wider animate-pulse mt-2">
            Preparando seu espaço...
          </p>
        </template>

        <!-- ESTADO 3: Erro / Token Inválido -->
        <template v-else>
          <p class="kurale text-red-400 text-center text-sm leading-relaxed mb-2">
            {{ errorMsgLocal }}
          </p>

          <div class="p-2 w-full mt-2">
            <button 
              @click="navigateTo('/')" 
              class="w-full bg-black/40 text-center text-[#DBC695] kurale text-sm text-shadow-lg font-bold py-2 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-97"
            >
              Voltar para o Login
            </button>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>