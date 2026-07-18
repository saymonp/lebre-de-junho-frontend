<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const tabs = ['Encomendas', 'Gerenciar Produtos'];
const activeTab = ref('Encomendas');


</script>
<template>
    <div class="bg-[#120A18] min-h-screen text-white">
        <NavBar />
        <section class="lg:max-w-3xl max-sm:max-w-xs mx-auto">
            <header class="mt-5 flex items-baseline justify-between">
                <h1 class="kurale font-extrabold text-4xl">Painel de Admnistrador</h1>
                <p class="kurale text-2xl text-[#DBC695] font-extrabold">Olá {{ authStore.user?.name }}</p>
            </header>

            <div class="flex border-b border-white/10 mb-8 mt-8 overflow-x-auto">
                <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
                    class="kurale px-6 py-3 text-base font-black uppercase tracking-widest transition-all relative"
                    :class="activeTab === tab ? 'text-[#DBC695]' : 'text-zinc-500 hover:text-zinc-300'">
                    {{ tab }}
                    <!-- Linha indicadora ativa -->
                    <div v-if="activeTab === tab"
                        class="kurale absolute bottom-0 left-0 w-full h-0.5 bg-[#DBC695] shadow-[0_0_10px_[#DBC695]]">
                    </div>
                </button>
            </div>

        </section>
        <!-- Conteúdo Dinâmico -->
        <section class="lg:max-w-3xl max-sm:max-w-sm mx-auto">
            <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div v-if="activeTab === 'Encomendas'">
                    <Encomendas />
                </div>
                <div v-if="activeTab === 'Gerenciar Produtos'">
                    <Produtos />
                </div>
            </div>
        </section>
    </div>

</template>