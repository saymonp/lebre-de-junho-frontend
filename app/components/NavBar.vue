<template>
    <div class="bg-black flex justify-between p-4">
        <IconProfile v-if="authStore.isAuthenticated"  @click="profileMenu = !profileMenu" />
        <IconProfile v-else @click="isLogin = !isLogin" />
        <Transition enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <div v-if="profileMenu" ref="target"
                            class="absolute left-0 ml-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl py-2 mt-8 z-[200]">

                            <RouterLink to="/perfil"
                                class="kurale block px-4 py-2 text-base text-zinc-300 hover:bg-black/10 hover:text-[#DBC695] transition-colors"
                                @click="profileMenu = false">
                                Meu Perfil
                            </RouterLink>

                            <div class="h-[1px] bg-white/5 my-1"></div>

                            <button @click="handleLogout"
                                class="kurale w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                Sair
                            </button>
                <li v-if="authStore.user?.roles.includes('admin')">
                    <RouterLink to="/admin/dashboard"
                        class="block cursor-pointer p-2.5 text-white no-underline ml-2.5 hover:text-[#DBC695]">
                        <a class="kurale font-bold text-zinc-100">Administrador</a>
                    </RouterLink>
                </li>
                </div>
                </Transition>
        <NuxtLink :to="'/'">
            <div class="mystery-quest-regular md:text-3xl text-lg">Lebre de Junho</div>
        </NuxtLink>
        <NuxtLink :to="'/bag'">
            <IconBag />
        </NuxtLink>
    </div>

    <div v-show="isCriarConta"
        class="fixed z-50 inset-0 m-auto flex flex-col justify-center items-center bg-black/90 w-75 h-fit lg:w-150 lg:h-fit p-8 overflow-hidden shadow-lg border outline-1 outline-[#DBC695]">
        <div class="text-center text-white px-2 kurale text-3xl lg:text-5xl text-shadow-lg">
            Crie sua Conta
        </div>
        <label class="kurale text-2sm m-2 mt-5">Nome</label>
        <input type="text" placeholder="" v-model="registerData.name"
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

        <label class="kurale text-2sm m-2 mt-5">Email</label>
        <input type="text" placeholder="" v-model="registerData.email"
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

        <label class="kurale text-2sm m-2 mt-5">Senha</label>
        <input type="password" placeholder="" v-model="registerData.password"
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

        <div class="flex flex-col gap-4 mt-10">
            <label class="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required v-model="registerData.aceitou_termos"
                    class="mt-1 accent-[#DBC695] rounded border-zinc-700 bg-zinc-800 text-black focus:ring-[#DBC695]" />
                <span class="kurale text-xs text-zinc-300 leading-tight">
                    Li e estou de acordo com os
                    <a href="/termos-de-uso" target="_blank" class="text-[#DBC695] hover:underline font-bold">Termos de
                        Uso</a>
                    e com a
                    <a href="/privacidade" target="_blank" class="text-[#DBC695] hover:underline font-bold">Política
                        de Privacidade</a>. *
                </span>
            </label>

        </div>
        <button class="mt-5 text-base text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer"
            @click="loginWithGoogle">
            Ou entrar com Google
        </button>
        <div class="p-2">
            <button class="bg-black/40 text-center text-[#DBC695] kurale text-sm lg:text-xl text-shadow-lg mt-6 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97" :disabled="isLoading" @click="handleRegister">
                {{ isLoading ? 'Cadastrando...' : 'Criar Conta' }}
            </button>
        </div>
    </div>
    <div v-if="isCriarConta" @click="isCriarConta = false" class="fixed inset-0 bg-black/10 backdrop-blur-xs z-40">
    </div>

    <div v-show="isLogin"
        class="fixed z-50 inset-0 m-auto flex flex-col justify-center items-center bg-black/90 w-75 h-fit lg:w-140 lg:h-fit p-8 overflow-hidden shadow-lg border outline-1 outline-[#DBC695]">
        <div class="text-center text-white px-2 kurale text-3xl lg:text-5xl text-shadow-lg">
            Entrar
        </div>

        <label class="kurale text-2sm m-2 mt-5">Email</label>
        <input type="text" placeholder="" v-model="loginData.email"
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

        <label class="kurale text-2sm m-2 mt-5">Senha</label>
        <input type="password" placeholder="" v-model="loginData.password"
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">
        <button class="mt-5 text-lg text-zinc-200 hover:text-white flex items-center gap-2 cursor-pointer" @click="loginWithGoogle">
            Ou entrar com Google
        </button>
        <p class="text-sm text-zinc-400 text-center mt-1">Ao entrar com o Google você aceita os termos de 
        <a href="/termos-de-uso" target="_blank" class="text-[#DBC695] hover:underline font-bold text-sm">Termos de
                        Uso</a>
                    e com a
                    <a href="/privacidade" target="_blank" class="text-[#DBC695] hover:underline font-bold text-sm">Política
                        de Privacidade</a></p>
        <div class="p-2">
            <button @click="$router.push('/recuperar-senha')" class="kurale mt-2 text-xs text-zinc-300 hover:text-white flex items-center gap-2">
                Esqueceu a senha?
            </button>
            <button class="bg-black/40 text-center text-[#DBC695] kurale text-sm lg:text-xl text-shadow-lg mt-6 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97"
                @click="handleLogin">
                Entrar
            </button>
        </div>
    </div>
    <div v-if="isLogin" @click="isLogin = false" class="fixed inset-0 bg-black/10 backdrop-blur-xs z-40">
    </div>
</template>

<script setup lang="ts">
import type { LoginRequest, RegisterRequest } from '@/types/Users';
const toast = useToast()
const isCriarConta = defineModel<boolean>('isCriarConta', { default: false });
const isLogin = defineModel<boolean>('isLogin', { default: false });
const isLoading = ref(false);
const authStore = useAuthStore();

const profileMenu = ref(false);

const registerData = ref<RegisterRequest>({
    name: '',
    email: '',
    password: '',
    aceitou_termos: false
});

const loginData = ref<LoginRequest>({
    email: '',
    password: ''
});

const handleRegister = async () => {
    if (!registerData.value.aceitou_termos) {
        toast.info({
            title: 'Incompleto',
            message: 'Você precisa aceitar os Termos de Uso e Política de Privacidade para continuar.'
        });
        return;
    }
    if (!registerData.value.name || !registerData.value.email || !registerData.value.password) {
        toast.info({
            title: 'Atenção',
            message: 'Por favor, preencha todos os campos do formulário.'
        });
        return;
    }
    try {
        isLoading.value = true;

        const response = await authStore.register(registerData.value);

        toast.success({
            title: 'Bem-vindo(a)!',
            message: 'Sua conta foi criada com sucesso. Aproveite a loja!'
        });

        // Limpa os campos do formulário e fecha a modal de cadastro
        registerData.value = {
            name: '',
            email: '',
            password: '',
            aceitou_termos: false
        };
        isCriarConta.value = false;

    } catch (error: any) {
        // Captura erros de validação vindos do Laravel (Ex: e-mail já cadastrado, senha curta)
        const errorMessage = error.data?.message || 'Ocorreu um erro ao tentar criar sua conta.';

        toast.error({
            title: 'Falha no Cadastro',
            message: errorMessage
        });
    } finally {
        isLoading.value = false;
    }
}

const handleLogin = async () => {
    if (!loginData.value.email || !loginData.value.password) {
        toast.info({
            title: 'Atenção',
            message: 'Por favor, preencha todos os campos do formulário.'
        });
        return;
    }
    try {
        isLoading.value = true;

        const response = await authStore.login(loginData.value);

        toast.success({
            title: 'Bem-vindo(a)!',
            message: 'Você entrou na sua conta. Aproveite a loja!'
        });

        // Limpa os campos do formulário e fecha a modal de login
        loginData.value = {
            email: '',
            password: ''
        };
        isLogin.value = false;

    } catch (error: any) {
        // Captura erros de validação vindos do Laravel
        const errorMessage = error.data?.message || 'Ocorreu um erro ao entrar na conta.';

        toast.error({
            title: 'Falha no Login',
            message: errorMessage
        });
    } finally {
        isLoading.value = false;
    }
}

// Redirecionamento para o OAuth do Google
const loginWithGoogle = () => {
    if (!registerData.value.aceitou_termos) {
        toast.info({
            title: 'Incompleto',
            message: 'Você precisa aceitar os Termos de Uso e Política de Privacidade para continuar.'
        });
        return;
    }
    // Redireciona diretamente o navegador do usuário para a rota do Laravel que inicia o Socialite
    const config = useRuntimeConfig();
    window.location.href = `${config.public.apiBase}/auth/google`;
};

const handleLogout = async () => {
    try {
        await authStore.logout();
        profileMenu.value = false;
        toast.success({ title: 'Até logo!', message: 'Você saiu da sua conta.' });

        // Redireciona para a home se o usuário deslogar em uma página protegida
        navigateTo('/');
    } catch (error) {
        toast.error({ title: 'Erro', message: 'Não foi possível realizar o logout.' });
    }
};

</script>