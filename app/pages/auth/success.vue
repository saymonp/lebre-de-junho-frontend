<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isProcessing = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    router.push('/')
    return
  }

  try {
    // 1. Grava o token na store e nos cookies
    authStore.setToken(token)

    // 2. Busca os dados do usuário logado na API usando o token recém-salvo
    await authStore.fetchUser()

    // 3. Redireciona para a home ou página principal
    router.push('/')
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error)
    errorMessage.value = 'Falha ao autenticar sessão. Tente novamente.'
    isProcessing.value = false
  }
})
</script>

<template>
    <div class="bg-[#120A18] min-h-screen text-white">
  <div class="kurale flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <template v-if="isProcessing">
      <div class="kurale animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
      <h1 class="kurale text-xl font-semibold text-gray-200">Finalizando login...</h1>
      <p class="kurale text-sm text-gray-400 mt-1">Aguarde enquanto preparamos o seu acesso.</p>
    </template>

    <template v-else>
      <h1 class="kurale text-xl font-semibold text-red-500 mb-2">Ops! Algo deu errado.</h1>
      <p class="kurale text-sm text-gray-400 mb-4">{{ errorMessage }}</p>
      <NuxtLink 
        to="/login" 
        class="px-6 py-2 bg-amber-500 text-gray-900 font-medium rounded hover:bg-amber-400 transition"
      >
        Voltar para o Login
      </NuxtLink>
    </template>
  </div>
  </div>
</template>