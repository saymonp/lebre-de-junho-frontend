<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const toast = useToast()

const handleLogout = async () => {
  try {
    await authStore.logout();
    toast.success({ title: 'Até logo!', message: 'Você saiu da sua conta.' });

    navigateTo('/');
  } catch (error) {
    toast.error({ title: 'Erro', message: 'Não foi possível realizar o logout.' });
  }
};

const contadoresPedidos = ref({
  aPagar: 1,
  preparando: 2,
  aCaminho: 0
})

const enderecos = ref([
  { id: 1, tipo: 'Principal', logradouro: 'Rua dos Arcanos, 777', cidade: 'São Paulo - SP', padrao: true },
  { id: 2, tipo: 'Trabalho', logradouro: 'Av. das Runas, 1060 - Sala 4', cidade: 'São Paulo - SP', padrao: false }
])

</script>

<template>
  <div class="min-h-screen w-full bg-[#0a050f] text-zinc-200 pb-12">
    <NavBar />
    <!-- Header do Perfil (Estilo Shopee / Identidade Lebre) -->
    <div class="relative bg-black/40 border-b border-[#DBC695]/20 pt-8 pb-6 px-4 backdrop-blur-md">
      <div class="max-w-2xl mx-auto flex items-center gap-4">

        <!-- Avatar/Foto -->
        <div
          class="relative w-16 h-16 rounded-full border border-[#DBC695]/40 bg-black/60 flex items-center justify-center overflow-hidden shadow-lg">
          <span class="text-[#DBC695] text-2xl">🐇</span>
        </div>

        <!-- Infos do Usuário -->
        <div class="flex-1">
          <h1 class="kurale text-xl font-bold text-[#DBC695] text-shadow-md">
            {{ authStore.user?.name }}
          </h1>
          <p class="text-xs text-zinc-400 font-mono mt-0.5">{{ authStore.user?.email }}</p>
        </div>

        <!-- Botão Sair -->
        <button @click="handleLogout"
          class="kurale text-xs border border-zinc-700 hover:border-red-400/50 hover:text-red-400 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
          Sair
        </button>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="max-w-2xl mx-auto px-4 mt-6 flex flex-col gap-6">

      <!-- SEÇÃO 1: Meus Pedidos (Estilo Grid Shopee) -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 backdrop-blur-xs">
        <div class="flex justify-between items-center border-b border-[#DBC695]/10 pb-3 mb-4">
          <h2 class="kurale text-sm font-bold text-[#DBC695] tracking-wide flex items-center gap-2">
            Meus Pedidos
          </h2>
          <button @click="navigateTo('/pedidos')"
            class="kurale text-xs text-zinc-400 hover:text-[#DBC695] transition-colors">
            Ver histórico >
          </button>
        </div>

        <!-- Grid de Status de Pedidos -->
        <div class="grid grid-cols-3 gap-2">

          <!-- A Pagar -->
          <button @click="navigateTo('/pedidos?status=pendente')"
            class="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors relative cursor-pointer">
            <div class="relative">
              <span class="text-xl">🪙</span>
              <span v-if="contadoresPedidos.aPagar > 0"
                class="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[16px] text-center">
                {{ contadoresPedidos.aPagar }}
              </span>
            </div>
            <span class="kurale text-xs text-zinc-300">A Pagar</span>
          </button>

          <!-- Preparando -->
          <button @click="navigateTo('/pedidos?status=preparando')"
            class="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors relative cursor-pointer">
            <div class="relative">
              <span class="text-xl">⚗️</span>
              <span v-if="contadoresPedidos.preparando > 0"
                class="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[16px] text-center">
                {{ contadoresPedidos.preparando }}
              </span>
            </div>
            <span class="kurale text-xs text-zinc-300">Preparando</span>
          </button>

          <!-- À Caminho -->
          <button @click="navigateTo('/pedidos?status=enviado')"
            class="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors relative cursor-pointer">
            <div class="relative">
              <span class="text-xl">🌟</span>
              <span v-if="contadoresPedidos.aCaminho > 0"
                class="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[16px] text-center">
                {{ contadoresPedidos.aCaminho }}
              </span>
            </div>
            <span class="kurale text-xs text-zinc-300">A Caminho</span>
          </button>

        </div>
      </div>

      <!-- SEÇÃO 2: Endereços Salvos -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl p-4 backdrop-blur-xs">
        <div class="flex justify-between items-center border-b border-[#DBC695]/10 pb-3 mb-3">
          <h2 class="kurale text-sm font-bold text-[#DBC695] tracking-wide flex items-center gap-2">
            📍 Endereços de Entrega
          </h2>
          <button @click="navigateTo('/perfil/enderecos/novo')" class="kurale text-xs text-[#DBC695] hover:underline">
            + Adicionar
          </button>
        </div>

        <div class="flex flex-col gap-3">
          <div v-for="end in enderecos" :key="end.id"
            class="p-3 rounded-lg bg-black/20 border border-zinc-800 flex justify-between items-start">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="kurale text-xs font-bold text-zinc-300">{{ end.tipo }}</span>
                <span v-if="end.padrao"
                  class="text-[10px] bg-[#DBC695]/10 text-[#DBC695] border border-[#DBC695]/30 px-1.5 py-0.5 rounded">
                  Padrão
                </span>
              </div>
              <p class="text-xs text-zinc-400">{{ end.logradouro }}</p>
              <p class="text-[11px] text-zinc-500">{{ end.cidade }}</p>
            </div>
            <button @click="navigateTo(`/perfil/enderecos/${end.id}`)"
              class="text-zinc-500 hover:text-[#DBC695] text-xs px-1">
              ✏️
            </button>
          </div>
        </div>
      </div>

      <!-- SEÇÃO 3: Links Úteis e Suporte (Lista de Opções) -->
      <div class="bg-black/40 border border-[#DBC695]/10 rounded-xl overflow-hidden backdrop-blur-xs">

        <!-- Suporte -->
        <button @click="navigateTo('/suporte')"
          class="w-full px-4 py-3.5 flex items-center justify-between border-b border-zinc-800/60 hover:bg-white/5 transition-colors text-left cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="text-sm">💬</span>
            <span class="kurale text-xs text-zinc-300 font-medium">Suporte & Atendimento</span>
          </div>
          <span class="text-zinc-600 text-xs">></span>
        </button>

        <!-- Sobre Nós -->
        <button @click="navigateTo('/sobre')"
          class="w-full px-4 py-3.5 flex items-center justify-between hover:bg-white/5 transition-colors text-left cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="kurale text-xs text-zinc-300 font-medium cursor-pointer">Nossa História (Sobre Nós)</span>
          </div>
          <span class="text-zinc-600 text-xs">></span>
        </button>

      </div>

    </div>
  </div>
</template>