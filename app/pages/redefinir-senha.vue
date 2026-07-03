<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
//import { useAuthStore } from '@/stores/auth'; // Mantendo sua store Pinia

const route = useRoute()
//const authStore = useAuthStore();
const isLoading = ref(false)
const sucesso = ref(false)
const errorMsgLocal = ref('')

const formData = reactive({
  email: '',
  token: '',
  new_password: '',
  confirm_password: ''
})

onMounted(() => {
  // Captura os parâmetros da URL nativamente no Nuxt 3
  formData.email = route.query.email as string || ''
  formData.token = route.query.token as string || ''

  // Se vier sem token ou email, avisa o usuário
  if (!formData.token || !formData.email) {
    errorMsgLocal.value = 'Link de recuperação inválido ou incompleto.'
  }
})

// Validação reativa antes de enviar para o Laravel
const isFormValido = computed(() => {
  return (
    formData.new_password.length >= 8 &&
    formData.new_password === formData.confirm_password &&
    formData.token &&
    formData.email
  )
})

const handleResetSenha = async () => {
  if (!isFormValido.value) {
    if (formData.new_password !== formData.confirm_password) {
      errorMsgLocal.value = 'As senhas digitadas não coincidem.'
    }
    return
  }

  isLoading.value = true
  errorMsgLocal.value = ''

  try {
    //await authStore.redefinirSenha({
     //  email: formData.email,
      // token: formData.token,
      // new_password: formData.new_password
    // })

    sucesso.value = true

    // Redireciona de forma nativa no Nuxt após 2 segundos
    setTimeout(() => {
      navigateTo('/perfil')
    }, 2000)

  } catch (error) {
    errorMsgLocal.value = 'Erro ao redefinir a senha. O token pode ter expirado.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="relative min-h-screen w-full bg-[#0a050f] flex items-center justify-center p-4 overflow-hidden">
    
    <!-- Efeito de Brilho de Fundo Místico (Aura Dourada sutil) -->
    <div class="absolute w-[500px] h-[500px] bg-[#DBC695]/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

    <!-- Container Estilo Janela Mística -->
    <div class="relative z-10 bg-black/60 backdrop-blur-xl border border-[#DBC695]/30 rounded-xl p-8 w-full max-w-[400px] shadow-2xl">
      
      <div class="flex flex-col items-center gap-4">
        
        <!-- Ícone Temático Central -->
        <div class="w-12 h-12 rounded-full bg-black/40 border border-[#DBC695]/30 flex items-center justify-center mb-1">
          <span class="text-[#DBC695] text-xl">🔮</span>
        </div>

        <h2 class="kurale text-[#DBC695] font-black text-2xl text-center text-shadow-lg">
          Nova Senha
        </h2>

        <!-- ESTADO 1: Formulário de Preenchimento -->
        <template v-if="!sucesso">
          <p class="kurale text-zinc-300 text-center text-sm leading-relaxed mb-2">
            Quase lá! Digite e confirme sua nova senha de acesso abaixo.
          </p>

          <div class="w-full flex flex-col gap-4">
            <div class="w-full flex flex-col">
              <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Nova Senha</label>
              <input 
                v-model="formData.new_password" 
                type="password" 
                placeholder="Mínimo 8 caracteres"
                :disabled="isLoading"
                class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50"
              >
            </div>

            <div class="w-full flex flex-col">
              <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Confirme a Senha</label>
              <input 
                v-model="formData.confirm_password" 
                type="password" 
                placeholder="Repita a senha digitada"
                @keyup.enter="handleResetSenha"
                :disabled="isLoading"
                class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50"
              >
            </div>
          </div>

          <p v-if="errorMsgLocal" class="kurale text-red-400 text-xs text-center font-medium mt-1">
            {{ errorMsgLocal }}
          </p>

          <div class="p-2 w-full mt-2">
            <button 
              @click="handleResetSenha" 
              :disabled="isLoading || !isFormValido"
              class="w-full bg-black/40 text-center text-[#DBC695] kurale text-sm text-shadow-lg font-bold py-2 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-97 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Atualizando Senha...' : 'Redefinir Senha' }}
            </button>
          </div>
        </template>

        <!-- ESTADO 2: Sucesso e Redirecionamento -->
        <template v-else>
          <div class="p-4 rounded-lg bg-[#DBC695]/10 border border-[#DBC695]/30 text-center my-2 w-full">
            <p class="kurale text-[#DBC695] font-bold text-sm mb-2">Senha alterada com sucesso!</p>
            <p class="kurale text-zinc-300 text-xs leading-relaxed">
              Sua credencial foi atualizada e você já está autenticado na Lebre de Junho.
            </p>
          </div>

          <p class="kurale text-[#DBC695] text-[11px] uppercase tracking-wider animate-pulse mt-2">
            Conectando ao seu espaço...
          </p>
        </template>

      </div>
    </div>
  </div>
</template>