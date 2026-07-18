import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    // 1. Se o usuário NÃO estiver autenticado, barra e manda para a Home (ou login)
    if (!authStore.isAuthenticated) {
        return navigateTo('/')
    }

    // 2. Se estiver autenticado, mas NÃO for admin, redireciona para a Home ou página de erro
    if (authStore.user?.is_admin) {
        // Redireciona para a página inicial ou uma tela de "Não Autorizado"
        return navigateTo('/')
    }
})