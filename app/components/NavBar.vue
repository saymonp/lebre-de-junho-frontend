<template>
    <div class="bg-black flex justify-between p-4">
        <IconProfile @click="isLogin = !isLogin" />
        <NuxtLink :to="'/'">
            <div class="mystery-quest-regular md:text-3xl text-lg">Lebre de Junho</div>
        </NuxtLink>
        <IconBag />
    </div>

    <div v-show="isCriarConta"
        class="fixed z-50 inset-0 m-auto flex flex-col justify-center items-center bg-black/90 w-75 h-150 lg:w-150 lg:h-90 p-8 overflow-hidden shadow-lg border outline-1 outline-[#DBC695]">
        <div class="text-center text-white px-2 kurale text-3xl lg:text-5xl text-shadow-lg">
            Crie sua Conta
        </div>
        <label class="kurale text-2sm m-2 mt-5">Nome</label>
        <input type="text" placeholder=""
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

        <label class="kurale text-2sm m-2 mt-5">Email</label>
        <input type="text" placeholder=""
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

        <label class="kurale text-2sm m-2 mt-5">Senha</label>
        <input type="text" placeholder=""
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

        <div class="flex flex-col gap-4 mt-10">
            <label class="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required
                    class="mt-1 accent-[#DBC695] rounded border-zinc-700 bg-zinc-800 text-black focus:ring-[#DBC695]" />
                <span class="kurale text-xs text-zinc-300 leading-tight">
                    Li e estou de acordo com os
                    <a href="/termos" target="_blank" class="text-[#DBC695] hover:underline font-bold">Termos de
                        Uso</a>
                    e com a
                    <a href="/privacidade" target="_blank" class="text-[#DBC695] hover:underline font-bold">Política
                        de Privacidade</a>. *
                </span>
            </label>

        </div>
        <button class="mt-5 text-xs text-zinc-300 hover:text-white flex items-center gap-2">
            Ou entrar com Google
        </button>
        <div class="p-2">
            <button class="bg-black/40 text-center text-[#DBC695] kurale text-sm lg:text-xl text-shadow-lg mt-6 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97">
                Criar Conta
            </button>
        </div>
    </div>
    <div v-if="isCriarConta" @click="isCriarConta = false" class="fixed inset-0 bg-black/10 backdrop-blur-xs z-40">
    </div>

    <div v-show="isLogin"
        class="fixed z-50 inset-0 m-auto flex flex-col justify-center items-center bg-black/90 w-75 h-100 lg:w-140 lg:h-90 p-8 overflow-hidden shadow-lg border outline-1 outline-[#DBC695]">
        <div class="text-center text-white px-2 kurale text-3xl lg:text-5xl text-shadow-lg">
            Entrar
        </div>

        <label class="kurale text-2sm m-2 mt-5">Email</label>
        <input type="text" placeholder=""
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

        <label class="kurale text-2sm m-2 mt-5">Senha</label>
        <input type="text" placeholder=""
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">
        <button class="mt-5 text-xs text-zinc-300 hover:text-white flex items-center gap-2">
            Ou entrar com Google
        </button>
        <div class="p-2">
            <button class="bg-black/40 text-center text-[#DBC695] kurale text-sm lg:text-xl text-shadow-lg mt-6 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97">
                Entrar
            </button>
        </div>
    </div>
    <div v-if="isLogin" @click="isLogin = false" class="fixed inset-0 bg-black/10 backdrop-blur-xs z-40">
    </div>
</template>

<script setup lang="ts">
const isCriarConta = defineModel<boolean>('isCriarConta', { default: false });
const isLogin = defineModel<boolean>('isLogin', { default: false });
</script>