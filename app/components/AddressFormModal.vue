<template>
    <div v-show="isOpen"
        class="fixed z-50 inset-0 m-auto flex flex-col justify-start items-center bg-black/90 w-11/12 max-w-lg h-fit max-h-[90vh] p-6 lg:p-8 overflow-y-auto shadow-lg border outline-1 outline-[#DBC695]">

        <!-- Título -->
        <div class="text-center text-white px-2 kurale text-3xl lg:text-4xl text-shadow-lg mb-6">
            {{ isEditing ? 'Atualizar Endereço' : 'Novo Endereço' }}
        </div>

        <div class="w-full flex flex-col gap-4 text-zinc-300">

            <!-- Linha 1: Título do Endereço (Casa/Trabalho) -->
            <div class="flex flex-col">
                <label class="kurale text-sm mb-1">Título do Endereço *</label>
                <input type="text" placeholder="Ex: Casa, Trabalho" v-model="addressData.titulo"
                    class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
            </div>

            <!-- Linha 2: Destinatário -->
            <div class="flex flex-col">
                <label class="kurale text-sm mb-1">Nome do Destinatário *</label>
                <input type="text" placeholder="Quem irá receber a encomenda" v-model="addressData.destinatario"
                    class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
            </div>

            <!-- Linha 3: Telefone e CEP (Lado a Lado) -->
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <label class="kurale text-sm mb-1">Telefone *</label>
                    <input type="text" placeholder="(55) 99999-9999" v-model="addressData.telefone"
                        class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
                </div>
                <div class="flex flex-col">
                    <label class="kurale text-sm mb-1">CEP *</label>
                    <input type="text" placeholder="98700-000" v-model="addressData.cep" @blur="buscarCep"
                        class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
                </div>
            </div>

            <!-- Linha 4: Logradouro -->
            <div class="flex flex-col">
                <label class="kurale text-sm mb-1">Rua / Logradouro *</label>
                <input type="text" placeholder="Rua, Avenida, etc." v-model="addressData.logradouro"
                    class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
            </div>

            <!-- Linha 5: Número e Complemento (Lado a Lado) -->
            <div class="grid grid-cols-3 gap-4">
                <div class="flex flex-col col-span-1">
                    <label class="kurale text-sm mb-1">Número *</label>
                    <input type="text" placeholder="123 ou S/N" v-model="addressData.numero"
                        class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
                </div>
                <div class="flex flex-col col-span-2">
                    <label class="kurale text-sm mb-1">Complemento</label>
                    <input type="text" placeholder="Apto, Bloco, Fundos..." v-model="addressData.complemento"
                        class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
                </div>
            </div>

            <!-- Linha 6: Bairro, Cidade e Estado -->
            <div class="grid grid-cols-12 gap-4">
                <div class="flex flex-col col-span-5">
                    <label class="kurale text-sm mb-1">Bairro *</label>
                    <input type="text" placeholder="Bairro" v-model="addressData.bairro"
                        class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
                </div>
                <div class="flex flex-col col-span-5">
                    <label class="kurale text-sm mb-1">Cidade *</label>
                    <input type="text" placeholder="Cidade" v-model="addressData.cidade"
                        class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600">
                </div>
                <div class="flex flex-col col-span-2">
                    <label class="kurale text-sm mb-1">UF *</label>
                    <input type="text" placeholder="RS" maxlength="2" v-model="addressData.estado"
                        class="border border-slate-700 bg-zinc-900/50 text-white text-sm rounded-xl focus:border-[#DBC695] focus:outline-none block w-full px-3 py-2 shadow-xs placeholder:text-zinc-600 text-center uppercase">
                </div>
            </div>

            <!-- Linha 7: Endereço Padrão Checkbox -->
            <div class="mt-2">
                <label class="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" v-model="addressData.padrao"
                        class="accent-[#DBC695] rounded border-zinc-700 bg-zinc-800 text-black focus:ring-[#DBC695]" />
                    <span class="kurale text-xs text-zinc-300 leading-tight">
                        Definir como endereço padrão para entregas
                    </span>
                </label>
            </div>

        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4 mt-6">
            <button
                class="bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white kurale text-sm font-bold py-1 px-5 rounded-md border border-zinc-700 transition-all duration-300"
                @click="isOpen = false">
                Cancelar
            </button>

            <button class="bg-black/40 text-center text-[#DBC695] kurale text-sm font-bold py-1 px-5 rounded-md border outline-1 outline-[#DBC695]
        transition-all duration-300 hover:scale-102 active:scale-97 disabled:opacity-50" :disabled="isLoading"
                @click="handleSave">
                {{ isLoading ? 'Salvando...' : 'Salvar' }}
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { CreateAddressRequest, Address } from '@/types/Addresses'

const addressStore = useAddressStore();
const toast = useToast();
const isLoading = ref(false);

const isOpen = defineModel<boolean>('isOpen', { default: false });

const isEditing = computed(() => !!props.addressToEdit?.id);

// 2. Recebe o endereço a ser editado (se for nulo, o componente entra em modo de Criação)
const props = defineProps<{
    addressToEdit?: Address | null;
}>();

const addressData = ref<CreateAddressRequest>({
    titulo: '',
    destinatario: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    complemento: '',
    padrao: false
});
const resetForm = () => {
    addressData.value = {
        titulo: '',
        destinatario: '',
        telefone: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        complemento: '',
        padrao: false
    }
}

watch(() => props.addressToEdit, (newVal) => {
    if (newVal && newVal.id) {
        // Modo Edição: Copia os dados para evitar alterar o objeto original por referência
        addressData.value = { ...newVal };
    } else {
        // Modo Criação: Reseta o formulário
        resetForm();
    }
}, { immediate: true });



const emit = defineEmits(['saved']);

// Busca de CEP Automática (Opcional - Usando viaCEP como facilitador de UX)
const buscarCep = async () => {
    const cepLimpo = addressData.value.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
        const data = await $fetch<any>(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        if (!data.erro) {
            addressData.value.logradouro = data.logradouro;
            addressData.value.bairro = data.bairro;
            addressData.value.cidade = data.localidade;
            addressData.value.estado = data.uf;
        }
    } catch (e) {
        // Falha silenciosa ou log de desenvolvimento
    }
};

const handleSave = async () => {
    // Validação básica de campos obrigatórios
    const requiredFields: (keyof CreateAddressRequest)[] = [
        'titulo', 'destinatario', 'telefone', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'
    ];

    for (const field of requiredFields) {
        if (!addressData.value[field]) {
            toast.info({ title: 'Atenção', message: 'Por favor, preencha todos os campos obrigatórios (*).' });
            return;
        }
    }

    try {
        isLoading.value = true;

        if (isEditing.value && props.addressToEdit?.id) {
            // ROTA DE ATUALIZAÇÃO (PUT)
            addressStore.updateAddress(props.addressToEdit?.id, addressData.value);
            toast.success({ title: 'Sucesso', message: 'Endereço atualizado com sucesso!' });
        } else {
            // ROTA DE CRIAÇÃO (POST)
            addressStore.createAddress(addressData.value);
            toast.success({ title: 'Sucesso', message: 'Endereço cadastrado com sucesso!' });
        }

        emit('saved'); // Avisa o pai para recarregar a lista
        isOpen.value = false;
        resetForm();

    } catch (error: any) {
        const errorMessage = error.data?.message || 'Ocorreu um erro ao salvar o endereço.';
        toast.error({ title: 'Erro', message: errorMessage });
    } finally {
        isLoading.value = false;
    }
};
</script>