<template>
  <!--NavBar-->
  <div class="bg-[#120A18] min-h-screen text-white">
    <NavBar v-model:isCriarConta="isCriarConta" />

    <div>
      <div class="relative flex justify-center items-center w-full aspect-[4/5] md:aspect-video bg-[#150522]">
        <img src="/homeDes.jpg" class="hidden lg:flex lg:w-full w-full h-full object-cover"
          alt="Lebre de Junho Desktop">
        <img src="/homeT.jpg" class="lg:hidden block w-full h-full object-cover" alt="Lebre de Junho Mobile">
        <div
          class="absolute inset-0 m-auto flex flex-col justify-center items-center bg-black/70 w-75 h-75 lg:w-140 lg:h-90 overflow-hidden shadow-lg border outline-1 outline-[#DBC695]">
          <div class="text-center text-white px-2 kurale text-3xl lg:text-5xl text-shadow-lg">
            Bem vindo à
          </div>
          <div class="text-center text-white mystery-quest text-3xl lg:text-5xl mt-5 text-shadow-lg">
            Lebre de Junho
          </div>
          <div class="text-center text-[#DBC695] px-2 mt-5 kurale text-xl lg:text-2xl text-shadow-lg">
            {{ authStore.isAuthenticated ? 'Veja Nossos Produtos em Destaque' : 'Crie sua Conta para garantir Descontos'
            }}
          </div>
          <div class="p-2">
            <button v-if="authStore.isAuthenticated" @click="isCriarConta = !isCriarConta" class="bg-black/40 text-center text-[#DBC695] kurale text-sm lg:text-xl text-shadow-lg mt-6 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97">
              Ver Produtos
            </button>
            <button v-else @click="isCriarConta = !isCriarConta" class="bg-black/40 text-center text-[#DBC695] kurale text-sm lg:text-xl text-shadow-lg mt-6 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97">
              Criar Conta
            </button>
          </div>
        </div>

      </div>
    </div>

    <section class="lg:max-w-3xl max-sm:max-w-xs mx-auto">
      <p class="kurale text-center text-xl lg:text-2xl font-bold mt-5 mb-5">Conheça nossas peças exclusivas feitas à mão
      </p>

      <div v-if="status === 'pending'" class="kurale text-sm animate-pulse text-[#DBC695]">
        Carregando peças...
      </div>

      <div v-else-if="status === 'error'" class="kurale text-sm text-red-500">
        Houve um erro: {{ error?.message }}
      </div>
      <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

        <div v-for="produto in produtos?.data" class="flex-col hover:scale-101 active:scale-99 cursor-pointer">
          <NuxtLink :to="`product/${1}`">
            <img class="border-[0.5px] outline-[#DBC695]" :src=produto.cover_photo_path! >
          </NuxtLink>
          <p class="kurale text-sm text-center mt-2">{{ produto.name }}</p>
          <p class="kurale text-sm text-center text-[#DBC695] ">R$ {{ produto.price }}</p>
        </div>

      </div>
    </section>

    <section class="mt-5 relative w-full min-h-[300px] lg:min-h-[400px] flex items-center overflow-hidden bg-[#120A18]">
      <img class="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" src="/bg-stars.avif"
        alt="Fundo estelar">
      <div class="relative mx-auto px-6 lg:px-12 flex items-center gap-8 lg:gap-12">

        <div class="mx-auto relative shrink-0">
          <img
            class="w-32 h-44 lg:w-48 lg:h-64 object-cover border-[0.5px] border-[#DBC695] rounded-t-full rounded-b-none shadow-xl"
            src="/fantasma.avif" alt="Novo produto fantasma">
        </div>

        <div class="flex flex-col justify-center items-start">
          <h2 class="kurale capitalize text-2xl lg:text-4xl text-white text-shadow">
            Novos produtos em breve
          </h2>
          <p class="kurale text-sm lg:text-base text-[#DBC695] mt-2">
            Assine nossa newsletter para ficar informado
          </p>
          <button class="bg-black/40 text-center text-[#DBC695] kurale text-sm lg:text-xl text-shadow-lg mt-6 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97">
            Assinar
          </button>
        </div>

      </div>
    </section>

    <section class="lg:max-w-3xl max-sm:max-w-xs mx-auto">
      <div class="flex gap-2 justify-center lg:justify-around">

        <div
          class="relative overflow-hidden rounded-lg border border-[#DBC695]/30 hover:scale-101 active:scale-99 cursor-pointer">

          <img class="object-cover opacity-90 w-full h-50" src="/cristais.jpg" alt="cristais">

          <div
            class="absolute inset-0 m-auto w-4/5 h-20 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center rounded border border-[#DBC695]/20 p-1">
            <p class="kurale capitalize text-xl lg:text-3xl text-white text-shadow-lg">
              Cristais
            </p>
            <p class="kurale text-[10px] lg:text-sm text-center text-[#DBC695]/90 tracking-wider mt-1">
              Sinta a Energia Fluir
            </p>
          </div>

        </div>

        <div
          class="relative overflow-hidden rounded-lg border border-[#DBC695]/30 hover:scale-101 active:scale-99 cursor-pointer">
          <img class="w-full h-50 object-cover rounded-lg" src="/velas2.jpg" alt="velas">
          <div
            class="absolute inset-0 m-auto w-4/5 h-20 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center rounded border border-[#DBC695]/20 p-1">
            <p class="kurale capitalize text-xl lg:text-3xl text-white text-shadow-lg">
              Velas
            </p>
            <p class="kurale text-[10px] lg:text-sm text-center text-[#DBC695]/90 tracking-wider mt-1">
              Aroma Mágico
            </p>
          </div>
        </div>
      </div>
    </section>
    <footer class="w-full bg-[#0a050f] border-t border-[#DBC695]/20 py-8 mt-12">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <span class="mystery-quest text-xl text-white tracking-wider">
            Lebre de Junho
          </span>
          <p class="kurale text-xs text-gray-500 mt-1">
            © 2026 Todos os direitos reservados.
          </p>
        </div>

        <div class="flex flex-col items-center md:items-end gap-2 text-sm">
          <a href="https://instagram.com/lebredejunho" target="_blank" rel="noopener noreferrer"
            class="kurale text-[#DBC695] hover:text-white transition-colors duration-300 flex items-center gap-1 group">
            <span>@lebredejunho</span>
            <span class="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>

          <p class="kurale text-xs text-gray-400">
            Desenvolvido por
            <a href="mailto:contact@saymontrevisan.dev"
              class="text-white hover:text-[#DBC695] underline underline-offset-4 decoration-[#DBC695]/40 hover:decoration-[#DBC695] transition-colors duration-300">
              Saymon
            </a>
          </p>
        </div>

      </div>
    </footer>
  </div>

</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const productStore = useProductStore()
const isCriarConta = ref(false);

const authStore = useAuthStore();

const {
  data: initialData,
  status,
  error,
  refresh
} = await useAsyncData('products-list', () => productStore.indexProducts());
const produtos = computed(() => initialData.value);
</script>
