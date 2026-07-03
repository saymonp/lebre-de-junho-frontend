<template>
    <div class="bg-[#120A18] min-h-screen text-white">
        <NavBar />
        <section class="lg:max-w-3xl max-sm:max-w-xs mx-auto">


            <div class="w-full flex flex-col gap-4">
                <div class="w-full flex flex-col">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Nome</label>
                    <input type="text" placeholder="Um nome Mágico..."
                        class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                </div>

                <div class="w-full flex flex-col">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Status</label>
                    <select placeholder="Sob Encomenda"
                        class="kurale w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                        <option>Sob Encomenda</option>
                        <option>Envio Imediato</option>
                        <option>Sem Estoque</option>
                    </select>
                </div>
                <div class="w-full flex flex-col">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Preço</label>
                    <input type="number" placeholder="89,00..."
                        class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                </div>

                <div class="w-full flex flex-col">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Nota da Criadora</label>
                    <textarea type="text" rows="3" placeholder="Uma descrição inspiradora..."
                        class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                                        </textarea>
                </div>
            </div>
            <div class="w-full flex flex-col mt-4">
                <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Diagrama (PDF)</label>
                <label
                    class="w-fit bg-black/40 text-center text-[#DBC695] kurale text-sm text-shadow-lg font-bold py-2 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-97 cursor-pointer block select-none">
                    Upload

                    <input type="file" multiple accept="application/pdf" @change="handleUpload" class="hidden">
                </label>

            </div>
            <div v-if="diagramas.length > 0" class="flex flex-wrap gap-3 mt-3 p-1">
                <div v-for="(d, index) in diagramas" :key="index" class="group">
                    <!-- Diagramas -->
                    <span class="kurale text-sm">📜 {{ d.file.name }} <button @click.prevent="removeDiagrama(index)"
                            class="bg-black/70 hover:bg-red-500/80 text-white transition-colors text-lg font-bold w-5 h-5 rounded-bl-xl"
                            title="Remover Diagrama">
                            ×
                        </button></span>
                </div>
            </div>



            <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-2 mt-4">
                <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Materiais</label>
                <input v-model="newMaterial" @keyup.enter.prevent="addMaterial" type="text" enterkeyhint="done"
                    placeholder="Enter para adicionar"
                    class="border border-slate-700-medium text-heading text-sm rounded-xl focus:border-slate-700 block w-full px-3 py-2 shadow-xs placeholder:text-body">

                <div class="flex flex-wrap gap-2 mt-3">
                    <span v-for="(m, index) in materiais" :key="index" class="kurale text-base">
                        {{ m }} <button @click="removeMaterial(index)"
                            class="hover:text-white transition-colors text-lk">×</button>
                    </span>
                </div>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-2 mt-4">
                <label class="kurale text-xs text-zinc-400 mb-1 ml-1 block">Fotos do Produto</label>

                <!-- Input Invisível acionado pelo Label Estilizado (Estilo Dropzone) -->
                <label
                    class="border border-dashed border-slate-700 hover:border-[#DBC695]/50 text-center rounded-xl block w-full px-3 py-4 cursor-pointer transition-colors bg-black/20 group">
                    <span class="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        Clique para selecionar fotos
                    </span>
                    <input type="file" multiple accept="image/*" @change="handlePhotoUpload" class="hidden">
                </label>

                <!-- Grade de Previews das Imagens Carregadas -->
                <div v-if="fotos.length > 0" class="flex flex-wrap gap-3 mt-3 p-1">
                    <div v-for="(foto, index) in fotos" :key="index"
                        class="relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-800 bg-black/40 group">
                        <!-- Imagem de Preview -->
                        <img :src="foto.preview" alt="Preview" class="w-full h-full object-cover">

                        <!-- Botão de Remover sobreposto na imagem (X) -->
                        <button @click.prevent="removePhoto(index)"
                            class="absolute top-0 right-0 bg-black/70 hover:bg-red-500/80 text-white transition-colors text-xs font-bold w-5 h-5 flex items-center justify-center rounded-bl-xl"
                            title="Remover Foto">
                            ×
                        </button>
                    </div>
                </div>
            </div>
            <div class="p-2 w-full mt-2">
                <button
                    class="w-full bg-black/40 text-center text-[#DBC695] kurale text-sm text-shadow-lg font-bold py-2 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-97 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed">
                    Salvar Produto
                </button>
            </div>



        </section>
    </div>
</template>

<script setup lang="ts">
const materiais = ref<string[]>([])
const newMaterial = ref<string>('')

const addMaterial = () => {
    const value = newMaterial.value.trim();

    // Evita tags vazias ou duplicadas
    if (value && !materiais.value.includes(value)) {
        // Adiciona ao array de tags que será enviado ao backend
        materiais.value.push(value);
        newMaterial.value = ''; // Limpa o input
    }
}

const removeMaterial = (index: number) => {
    materiais.value.splice(index, 1);
};

interface FotoUpload {
    file: File
    preview: string
}

const fotos = ref<FotoUpload[]>([]);

// Gerencia a seleção de novas imagens
const handlePhotoUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files) return

    const filesArray = Array.from(target.files)

    filesArray.forEach(file => {
        fotos.value.push({
            file,
            preview: URL.createObjectURL(file) // Cria URL temporária para exibir na tela
        })
    })

    // Limpa o input para permitir selecionar o mesmo arquivo novamente se necessário
    target.value = ''
}

// Remove a imagem do array e limpa a memória do navegador
const removePhoto = (index: number) => {
    // Boa prática para evitar vazamento de memória (Memory Leak) com blobs
    if (fotos.value[index]) {
        URL.revokeObjectURL(fotos.value[index].preview)

        fotos.value.splice(index, 1)
    }
}

interface DiagramaUpload {
    file: File
}
const diagramas = ref<DiagramaUpload[]>([]);

// Gerencia o upload de diagramas
const handleUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files) return

    const filesArray = Array.from(target.files)

    filesArray.forEach(file => {
        diagramas.value.push({
            file
        })
    })

    // Limpa o input para permitir selecionar o mesmo arquivo novamente se necessário
    target.value = ''
}

const removeDiagrama = (index: number) => {
    if (diagramas.value[index]) {
        diagramas.value.splice(index, 1)
    }
}
</script>