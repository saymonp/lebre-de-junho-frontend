<template>
  <!--NavBar-->
  <div class="bg-[#120A18] min-h-screen text-white">
    <div class="bg-black flex justify-between p-4">
      <div>Profile</div>
      <div class="mystery-quest-regular md:text-3xl text-lg">Lebre de Junho</div>
      <div>Cart</div>
    </div>

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
            Crie sua Conta para garantir Descontos
          </div>
          <div class="p-2">
            <button class="bg-black/40 text-center text-[#DBC695] kurale text-sm lg:text-xl text-shadow-lg mt-6 font-bold py-1 px-5 lg:py-2 lg:px-6 rounded-md border outline-1 outline-[#DBC695]
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

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

        <div class="flex-col hover:scale-101 active:scale-99 cursor-pointer">
          <img class="border-[0.5px] outline-[#DBC695]" src="/coelho.avif">
          <p class="kurale text-sm text-center mt-2">Carrot Rabit</p>
          <p class="kurale text-sm text-center text-[#DBC695] ">R$ 89,99</p>
        </div>

        <div class="flex-col hover:scale-101 active:scale-99 cursor-pointer">
          <img class="border-[0.5px] outline-[#DBC695]" src="/espantalho.avif">
          <p class="kurale text-sm text-center mt-2">Jack Espantalho</p>
          <p class="kurale text-sm text-center text-[#DBC695] ">R$ 99,99</p>
        </div>

        <div class="flex-col hover:scale-101 active:scale-99 cursor-pointer">
          <img class="border-[0.5px] outline-[#DBC695]" src="/espantalho.avif">
          <p class="kurale text-sm text-center mt-2">Jack Espantalho</p>
          <p class="kurale text-sm text-center text-[#DBC695] ">R$ 99,99</p>
        </div>

        <div class="flex-col hover:scale-101 active:scale-99 cursor-pointer">
          <img class="border-[0.5px] outline-[#DBC695]" src="/coelho.avif">
          <p class="kurale text-sm text-center mt-2">Carrot Rabit</p>
          <p class="kurale text-sm text-center text-[#DBC695] ">R$ 89,99</p>
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
      
      <div class="flex">

        <div>

          <div class="relative overflow-hidden">

            <img class="object-cover opacity-90 w-full h-50" src="/cristais.jpg" alt="cristais">
            <div class="absolute inset-0 flex flex-col justify-center m-2">
              <p class="kurale capitalize text-xl text-center lg:text-4xl text-white text-shadow">
                Cristais
              </p>
              <p class="kurale capitalize text-xs text-center text-[#DBC695] text-shadow">
                Sinta a Energia Fluir
              </p>
            </div>
            <div class="absolute inset-0 w-1/2 h-15 md:aspect-video bg-black flex flex-col justify-center text-center"></div>
          </div>

        </div>


        <img src="/g2.jpg">
        <img src="/g3.jpg">
      </div>
    </section>
<div class="relative max-w-xl overflow-hidden rounded-lg shadow-lg">
        <!-- The Image -->
        <img class="w-full h-64 object-cover"
          src="https://images.unsplash.com/photo-1782231592083-1f2493394daf?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beach sunset">

        <!-- Dark Gradient Overlay for Readability -->
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- Centered Text Content -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h2 class="text-white text-3xl font-bold tracking-tight">Explore the World</h2>
          <p class="text-slate-200 mt-2 text-sm max-w-sm">Discover hidden beaches and beautiful coastlines around the
            globe.</p>
        </div>
      </div>
  </div>
</template>
