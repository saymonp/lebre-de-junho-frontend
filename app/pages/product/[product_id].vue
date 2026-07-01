<template>

  <div class="bg-[#120A18] min-h-screen text-white">
    <NavBar />
    <div class="flex flex-col gap-4">

      <!-- 1. Imagem Principal (Grande) com Moldura de Vitral / Mística -->
      <div
        class="lg:max-w-sm lg:mx-auto relative w-full aspect-[4/5] bg-[#120A18] rounded-t-full rounded-b-none border border-[#DBC695]/30 overflow-hidden shadow-xl">
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
        <div class="flex justify-between items-center mt-7 mb-5">
          <h2 class="kurale font-extrabold text-4xl ">Carrot Bunny</h2>
          <IconShare class="w-8 h-8 cursor-pointer"/>
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
        <h2 @click="showMore = !showMore" class="kurale font-extrabold text-xl mt-5 mb-1 cursor-pointer">Dimensões e Materiais {{ showMore ? '▲' : '▼' }}</h2>
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