<template>

  <div class="bg-[#120A18] min-h-screen text-white">
    <NavBar />
    <div class="flex flex-col gap-4">

      <!-- 1. Imagem Principal (Grande) com Moldura de Vitral / Mística -->
      <div
        class="relative w-full aspect-[4/5] bg-[#120A18] rounded-t-full rounded-b-none border border-[#DBC695]/30 overflow-hidden shadow-xl">
        <img :src="activeImage" alt="Imagem do produto"
          class="w-full h-full object-cover transition-all duration-500" />

        <!-- Badge sutil de categoria ou destaque místico -->
        <span
          class="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-[#DBC695] kurale text-xs px-3 py-1 rounded-full border border-[#DBC695]/20 tracking-wider">
          Edição Exclusiva
        </span>
      </div>

      <!-- 2. Carrossel de Miniaturas Embaixo -->
      <div class="flex gap-3 mx-auto">
        <button v-for="(img, index) in productImages" :key="index" @click="activeImage = img"
          class="relative aspect-[4/5] bg-[#120A18] rounded-md overflow-hidden border transition-all duration-300 focus:outline-none"
          :class="activeImage === img ? 'border-[#DBC695] ring-1 ring-[#DBC695]' : 'border-gray-800 opacity-60 hover:opacity-100'">
          <img :src="img" :alt="`Miniatura ${index + 1}`" class="w-full h-32 object-cover" />
        </button>
      </div>

    </div>



    <section class="lg:max-w-3xl max-sm:max-w-xs mx-auto">
      <div class="flex flex-col space-y-2">
        <div class="flex justify-between items-center">
          <h2 class="kurale font-extrabold text-4xl mt-5 mb-1">Carrot Bunny</h2>
          <IconBag />
        </div>
        <div class="flex gap-3 items-center">
          <p class="kurale text-xl text-[#DBC695] line-through">R$ 89,99</p>
          <p class="kurale text-2xl text-[#DBC695] font-extrabold">R$ 76,50</p>
        </div>
        <p class="kurale text-lg capitalize">15% de desconto no pix</p>

        <button class="bg-black/40 text-center text-[#DBC695] kurale text-lg lg:text-xl text-shadow-lg mt-5 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97">
          Adicionar ao Carrinho
        </button>
      </div>
      <div class="flex flex-col">
        <h2 class="kurale font-extrabold text-2xl mt-5 mb-1">Nota da Criadora</h2>
        <p class="kurale text-2sm">Tecido ponto a ponto, o Carot Bunny é muito mais do que um amigurumi comum, ele é um
          amuleto de afeto e
          presença.
        </p>
      </div>
      <div>
        <h2 @click="showMore = !showMore" class="kurale font-extrabold text-xl mt-5 mb-1">Dimensões e Materiais {{ showMore ? '▲' : '▼' }}</h2>
        <ul v-if="showMore" class="list-disc">
          <li>
            <p class="kurale text-2sm">Altura: 18 cm (da ponta das orelhas até a base)</p>
          </li>
          <li>
            <p class="kurale text-2sm">Largura: 10 cm</p>
          </li>
          <li>
            <p class="kurale text-2sm">Material: Fio 100% algodão hipoalergênico, enchimento de fibra siliconada macia e
              olhos de segurança com
              trava.</p>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="kurale font-extrabold text-xl mt-5 mb-1">✨ Quer fazer em Casa? Enviamos o <span
            class="uppercase">Diagrama (PDF)</span></h2>
        <p class="kurale text-2xl text-[#DBC695] font-extrabold">R$ 9,99</p>
        <button class="bg-black/40 text-center text-[#DBC695] kurale text-lg lg:text-xl text-shadow-lg mt-5 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97">
          Adicionar ao Carrinho
        </button>
      </div>
      <div>
        <h2 class="kurale font-extrabold text-xl mt-7 mb-1">Calcular Frete</h2>
        <div class="flex items-center gap-2 mt-2">
          <input type="number" placeholder="CEP..."
            class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">
          
            <button class="bg-black/40 text-center text-[#DBC695] kurale text-lg lg:text-xl text-shadow-lg font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
                transition-all duration-300
                hover:scale-102 active:scale-97">
            Calcular
          </button>
        </div>

      </div>
    </section>

    <Footer />
  </div>


  <div id="default-carousel" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-base md:h-96">
      <!-- Item 1 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img src="https://images.unsplash.com/photo-1782231592083-1f2493394daf"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 2 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img src="https://images.unsplash.com/photo-1782231592083-1f2493394daf"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 3 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img src="https://images.unsplash.com/photo-1782231592083-1f2493394daf"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 4 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img src="https://images.unsplash.com/photo-1782231592083-1f2493394daf"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 5 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
        <img src="https://images.unsplash.com/photo-1782231592083-1f2493394daf"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
    </div>
    <!-- Slider indicators -->
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      <button type="button" class="w-3 h-3 rounded-base" aria-current="true" aria-label="Slide 1"
        data-carousel-slide-to="0"></button>
      <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 2"
        data-carousel-slide-to="1"></button>
      <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 3"
        data-carousel-slide-to="2"></button>
      <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 4"
        data-carousel-slide-to="3"></button>
      <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 5"
        data-carousel-slide-to="4"></button>
    </div>
    <!-- Slider controls -->
    <button type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev>
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
          height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m15 19-7-7 7-7" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next>
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
          height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m9 5 7 7-7 7" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>



<script setup lang="ts">
import { ref } from 'vue'

// Array simulando as fotos que virão da sua API do Laravel (ex: g1.jpg, g2.jpg, cristais.jpg)
const productImages = ref([
  '/coelho.avif',
  '/coelho1.avif',
  '/coelho2.avif'
])

// Define a primeira imagem da lista como a ativa por padrão
const activeImage = ref(productImages.value[0])

const showMore = ref(false)
</script>