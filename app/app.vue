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
        <img src="/homeDes.jpg" class="hidden lg:flex lg:w-full w-full h-full object-cover" alt="Lebre de Junho Desktop">
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

    <div class="lg:max-w-3xl max-sm:max-w-xs mx-auto min-h-screen">
      <p class="kurale text-center text-xl lg:text-2xl font-bold mt-5 mb-5">Conheça nossas peças exclusivas feitas à mão</p>

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
        <div class="flex-col">
          <img class="border-[0.5px] outline-[#DBC695]" src="/coelho.avif">
          <p class="kurale text-sm text-center mt-2">Carrot Rabit</p>
          <p class="kurale text-sm text-center text-[#DBC695]">R$ 89,99</p>
        </div>
      </div>
    </div>
  </div>
</template>
