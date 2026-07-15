import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    // Se o usuário NÃO estiver autenticado, barra a navegação
    if (!authStore.isAuthenticated) {
        return navigateTo('/')
    }
})