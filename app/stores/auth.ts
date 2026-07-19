import type { User, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/Users';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useCookie<User | null>('user') || null,
    token: useCookie('access_token').value || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(userData: User, tokenData: string) {
      const userCookie = useCookie<User | null>('user')
      const tokenCookie = useCookie('access_token')

      // Nuxt transforma o objeto User em texto no navegador sozinho
      userCookie.value = userData
      tokenCookie.value = tokenData

      this.user = userData
      this.token = tokenData
    },
    async fetchUser() {
      const { $api } = useNuxtApp()
      if (!this.token) return;
      try {
        const response = await $api<User>('/user');
        this.user = response;
      } catch (error) {
        this.logout(); // Se o token for inválido/expirado, limpa tudo
      }
    },
    async login(credentials: LoginRequest): Promise<LoginResponse> {
      const { $api } = useNuxtApp()
      const response = await $api<LoginResponse>('/login', { body: credentials, method: 'POST' });
      this.setUser(response.user, response.access_token);
      return response;
    },
    async register(credentials: RegisterRequest): Promise<LoginResponse> {
      const { $api } = useNuxtApp()
      const response = await $api<LoginResponse>('/register', { body: credentials, method: 'POST' });
      this.setUser(response.user, response.access_token);
      return response;
    },
    async sendEmailToVerify(): Promise<{ message: string }> {
      const { $api } = useNuxtApp()
      const response = await $api<{ message: string }>('/send-email-verify', { method: 'POST' });
      return response;
    },
    async logout() {
      const { $api } = useNuxtApp()
      const response = await $api<{ message: string }>('/logout', { method: 'POST' });

      this.token = null;
      this.user = null;
      const userCookie = useCookie('user')
      const tokenCookie = useCookie('token')
      userCookie.value = null
      tokenCookie.value = null

      return response;
    },
    async deleteAccount() {
      const { $api } = useNuxtApp()
      const response = await $api<any>('/user', { method: 'DELETE' });
      if (response.status === 200) {
        this.token = null;
        this.user = null;
        const userCookie = useCookie('user')
        const tokenCookie = useCookie('token')
        userCookie.value = null
        tokenCookie.value = null
      }
      return response.data;
    },
    async solicitarRecuperacao(data: { email: string }) {
      const { $api } = useNuxtApp()
      const response = await $api<any>('/recover-password-request', { body: data, method: 'POST' });

      return response.data;
    },
    async redefinirSenha(data: { email: string, token: string, new_password: string }) {
      const { $api } = useNuxtApp()
      const response = await $api<any>('/reset-password', { body: data, method: 'POST' });
      this.setUser(response.data.user, response.data.access_token);
    },
    async verifyEmail(data: { email: string, token: string }) {
      const { $api } = useNuxtApp()
      const response = await $api<any>('/verify/email', { body: data, method: 'POST' });
      this.setUser(response.data.user, response.data.access_token);
    },
    async update(data: User) {
      const { $api } = useNuxtApp()
      const response = await $api<{ message: string }>('/user', { body: data, method: 'PUT' });
      return response;
    },
  }
});