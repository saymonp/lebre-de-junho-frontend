<template>
    <div class="bg-[#120A18] min-h-screen text-white">
        <NavBar />
        <section class="lg:max-w-3xl max-sm:max-w-xs mx-auto py-10 pb-20">
            <h1 class="kurale text-2xl text-[#DBC695] mb-6">{{ isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto' }}
            </h1>

            <form @submit.prevent="submitForm" class="w-full flex flex-col gap-5">

                <div class="w-full flex flex-col">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Nome</label>
                    <input v-model="form.name" type="text" placeholder="Um nome Mágico..." required
                        class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="w-full flex flex-col">
                        <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Preço (R$)</label>
                        <input v-model.number="form.price" type="number" step="0.01" min="0" placeholder="89.00"
                            required
                            class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                    </div>

                    <div class="w-full flex flex-col">
                        <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Preço Promocional (R$ - Opcional)</label>
                        <input v-model.number="form.promotional_price" type="number" step="0.01" min="0"
                            placeholder="79.00"
                            class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="w-full flex flex-col">
                        <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Desconto PIX (%)</label>
                        <input v-model.number="form.discount_pix" type="number" min="0" max="100" placeholder="10"
                            class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                    </div>

                    <div class="w-full flex flex-col">
                        <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Estoque</label>
                        <input v-model.number="form.stock" type="number" min="0" placeholder="5" required
                            class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="w-full flex flex-col">
                        <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Dias para Produção (Fazer sob
                            encomenda)</label>
                        <input v-model.number="form.days_to_create" type="number" min="0" placeholder="3" required
                            class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                    </div>

                    <div class="w-full flex flex-col">
                        <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Categorias (Separadas por vírgula)</label>
                        <input v-model="categoriesInput" type="text" placeholder="Decoração, Quarto Infantil, Amigurumi"
                            required
                            class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                    </div>
                </div>

                <div class="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
                    <h3 class="kurale text-sm text-[#DBC695]">Dimensões e Peso (Essencial para o Cálculo de Frete)</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div class="flex flex-col">
                            <label class="text-xs text-zinc-400 mb-1">Peso (Kg)</label>
                            <input v-model.number="form.weight" type="number" step="0.001" min="0" placeholder="0.250"
                                required
                                class="bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block w-full px-3 py-2">
                        </div>
                        <div class="flex flex-col">
                            <label class="text-xs text-zinc-400 mb-1">Altura (cm)</label>
                            <input v-model.number="form.height" type="number" step="0.1" min="0" placeholder="15"
                                required
                                class="bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block w-full px-3 py-2">
                        </div>
                        <div class="flex flex-col">
                            <label class="text-xs text-zinc-400 mb-1">Largura (cm)</label>
                            <input v-model.number="form.width" type="number" step="0.1" min="0" placeholder="10"
                                required
                                class="bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block w-full px-3 py-2">
                        </div>
                        <div class="flex flex-col">
                            <label class="text-xs text-zinc-400 mb-1">Comprimento (cm)</label>
                            <input v-model.number="form.length" type="number" step="0.1" min="0" placeholder="10"
                                required
                                class="bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block w-full px-3 py-2">
                        </div>
                    </div>
                </div>

                <div class="w-full flex flex-col">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Nota da Criadora</label>
                    <textarea v-model="form.description" rows="3" placeholder="Uma descrição inspiradora..." required
                        class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">
                    </textarea>
                </div>

                <div class="w-full flex flex-col">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Diagrama (PDF - Opcional)</label>
                    <label
                        class="w-fit bg-black/40 text-center text-[#DBC695] kurale text-sm text-shadow-lg font-bold py-2 px-6 rounded-md border border-[#DBC695] outline-1 outline-[#DBC695] transition-all duration-300 hover:scale-102 active:scale-97 cursor-pointer block select-none">
                        Upload PDF
                        <input type="file" accept="application/pdf" @change="handleUpload" class="hidden">
                    </label>
                </div>

                <div v-if="diagramas.length > 0" class="flex flex-wrap gap-3 p-1">
                    <div v-for="(d, index) in diagramas" :key="index" class="group">
                        <span
                            class="kurale text-sm text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                            📜 {{ d.file.name }}
                            <button @click.prevent="removeDiagrama(index)"
                                class="text-red-400 hover:text-red-300 transition-colors ml-2 font-bold"
                                title="Remover Diagrama">
                                ×
                            </button>
                        </span>
                    </div>
                </div>

                <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1">Materiais do Produto</label>
                    <input v-model="newMaterial" @keydown.enter.prevent="addMaterial" type="text" enterkeyhint="done"
                        placeholder="Escreva o material e aperte Enter para adicionar"
                        class="w-full bg-black/40 border border-zinc-700 text-white text-sm rounded-xl focus:border-[#DBC695] outline-none block px-3 py-2.5 shadow-xs placeholder:text-zinc-600 transition-colors disabled:opacity-50">

                    <div class="flex flex-wrap gap-2 mt-3">
                        <span v-for="(m, index) in materiais" :key="index"
                            class="kurale text-sm bg-[#DBC695]/10 text-[#DBC695] border border-[#DBC695]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                            {{ m }}
                            <button type="button" @click="removeMaterial(index)"
                                class="hover:text-red-400 transition-colors font-bold text-base">&times;</button>
                        </span>
                    </div>
                </div>

                <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <label class="kurale text-xs text-zinc-400 mb-1 ml-1 block">Fotos da Galeria (A primeira será a
                        Capa)</label>

                    <label
                        class="border border-dashed border-zinc-700 hover:border-[#DBC695]/50 text-center rounded-xl block w-full px-3 py-6 cursor-pointer transition-colors bg-black/20 group">
                        <span class="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors block">
                            Clique para selecionar fotos da galeria
                        </span>
                        <input type="file" multiple accept="image/*" @change="handlePhotoUpload" class="hidden">
                    </label>

                    <div v-if="fotos.length > 0" class="flex flex-wrap gap-3 mt-4">
                        <div v-for="(foto, index) in fotos" :key="index"
                            class="relative w-20 h-20 rounded-xl overflow-hidden border border-zinc-800 bg-black/40 group">
                            <img :src="foto.preview" alt="Preview" class="w-full h-full object-cover">

                            <span v-if="index === 0"
                                class="absolute bottom-0 left-0 right-0 bg-[#DBC695] text-[#120A18] text-[9px] font-bold text-center py-0.5">
                                CAPA
                            </span>

                            <button @click.prevent="removePhoto(index)"
                                class="absolute top-0 right-0 bg-black/75 hover:bg-red-500 text-white transition-colors text-xs font-bold w-5 h-5 flex items-center justify-center rounded-bl-xl">
                                ×
                            </button>
                        </div>
                    </div>
                </div>

                <div class="w-full mt-4">
                    <button :disabled="loading" type="submit"
                        class="w-full bg-[#DBC695] hover:bg-[#c9b483] text-[#120A18] text-center kurale text-sm font-bold py-3 px-6 rounded-xl transition-all duration-300 active:scale-98 disabled:opacity-40 disabled:hover:bg-[#DBC695] disabled:cursor-not-allowed">
                        {{ loading ? 'Salvando e Enviando Imagens...' : 'Salvar Produto' }}
                    </button>
                </div>

            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'admin' // middleware/admin.ts
})
import { ref, reactive } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRoute } from '#app'
import { useUploadStore } from '@/stores/uploads'

const uploadStore = useUploadStore()
// Access the current route object
const route = useRoute()
// Extract the 'id' parameter (matches the [id].vue filename)
const productIdToEdit = route.params.id

const toast = useToast();
const productStore = useProductStore()

const isEditing = computed(() => !!productIdToEdit);

// Controle de Loading
const loading = ref(false)

// controle do upload de imagens
const uploadingToS3 = ref(false)

// String separada por vírgula que vamos explodir em array antes de enviar
const categoriesInput = ref('')

// Estado reativo principal do formulário
const form = reactive({
    name: '',
    description: '',
    price: null as number | null,
    promotional_price: null as number | null,
    discount_pix: 0,
    weight: null as number | null,
    height: null as number | null,
    width: null as number | null,
    length: null as number | null,
    stock: null as number | null,
    days_to_create: 0,
})
// Gerenciamento de Materiais (Tags)
const materiais = ref<string[]>([])
const newMaterial = ref<string>('')
watch(() => productIdToEdit, async (newVal) => {
    if (newVal && isEditing) {
        // Modo Edição: Copia os dados para evitar alterar o objeto original por referência
        const productData = await productStore.showProduct(Number(newVal));
        Object.assign(form, productData.data);
        if (productData.data.materials) {
            materiais.value = productData.data.materials;
        }
        if (productData.data.categories) {
            categoriesInput.value = productData.data.categories?.join(', ');
        }
    }
}, { immediate: true });


const addMaterial = () => {
    const value = newMaterial.value.trim()
    if (value && !materiais.value.includes(value)) {
        materiais.value.push(value)
        newMaterial.value = ''
    }
}

const removeMaterial = (index: number) => {
    materiais.value.splice(index, 1)
}

// Interfaces e Controle de Fotos
interface FotoUpload {
    file: File
    preview: string
}
const fotos = ref<FotoUpload[]>([])

const handlePhotoUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files) return

    const filesArray = Array.from(target.files)
    filesArray.forEach(file => {
        fotos.value.push({
            file,
            preview: URL.createObjectURL(file)
        })
    })
    target.value = ''
}

const removePhoto = (index: number) => {
    if (fotos.value[index]) {
        URL.revokeObjectURL(fotos.value[index].preview)
        fotos.value.splice(index, 1)
    }
}

// Interfaces e Controle de Diagramas
interface DiagramaUpload {
    file: File
}
const diagramas = ref<DiagramaUpload[]>([])

const handleUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files) return

    const filesArray = Array.from(target.files)
    filesArray.forEach(file => {
        diagramas.value.push({ file })
    })
    target.value = ''
}

const removeDiagrama = (index: number) => {
    if (diagramas.value[index]) {
        diagramas.value.splice(index, 1)
    }
}

/**
 * Submissão do Formulário
 */
const submitForm = async () => {
    try {
        loading.value = true

        // 1. Processamento e Upload dos Arquivos (S3)
        let diagramUrl: string | null = null
        if (diagramas.value.length > 0) {
            diagramUrl = await uploadStore.uploadFile(diagramas.value[0]!.file, 'diagrams')
        }

        const uploadedPhotosPaths: string[] = []
        for (const foto of fotos.value) {
            const url = await uploadStore.uploadFile(foto.file, 'gallery')
            uploadedPhotosPaths.push(url)
        }

        // A primeira foto do array é definida como Capa
        const coverPhotoPath = uploadedPhotosPaths.length > 0 ? uploadedPhotosPaths[0] : null

        // Se houver mais de uma foto, as fotos adicionais vão para o array auxiliar (galeria)
        const galleryPhotosPaths = uploadedPhotosPaths.slice(1)

        // 2. Formata Categorias (Explode string por vírgula e limpa espaços vazios)
        const formattedCategories = categoriesInput.value
            .split(',')
            .map(c => c.trim())
            .filter(c => c !== '')

        // 3. Monta a Payload de Envio baseada no seu SaveProductRequest
        const payload = {
            name: form.name,
            description: form.description,
            price: Number(form.price),
            promotional_price: form.promotional_price ? Number(form.promotional_price) : null,
            discount_pix: Number(form.discount_pix),
            weight: Number(form.weight),
            height: Number(form.height),
            width: Number(form.width),
            length: Number(form.length),
            stock: Number(form.stock),
            days_to_create: Number(form.days_to_create),
            category: formattedCategories,
            material: materiais.value,
            cover_photo_path: coverPhotoPath!,
            photos_paths: galleryPhotosPaths,
            diagram: diagramUrl
        }

        // 4. Executa a action do Pinia que bate no Backend Laravel
        const response = await productStore.createProduct(payload)

        alert('Produto criado com sucesso!')

        // Redireciona de volta para a listagem ou catálogo (opcional)
        // useRouter().push('/admin/products')

    } catch (error) {
        console.error('Erro ao salvar produto:', error)
        alert('Ocorreu um erro ao salvar o produto. Verifique os campos.')
    } finally {
        loading.value = false
    }
}
</script>