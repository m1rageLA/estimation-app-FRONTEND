<template>
    <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn class="text-none font-weight-regular" prepend-icon="mdi mdi-plus" text="Add project"
                variant="outlined" v-bind="activatorProps"></v-btn>
        </template>
        <v-card prepend-icon="mdi-account" title="Add project item">
            <v-card-text>
                <v-form @submit.prevent="submitForm">
                    <v-row dense>
                        <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model="form.name" label="Title" hint="Web site" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model="form.description" label="Description"
                                hint="Project about creating neural networks" required></v-text-field>
                        </v-col>
                        <v-autocomplete v-model="form.client" :disabled="isUpdating" :items="clients"
                            color="blue-grey-lighten-2" item-title="name" item-value="id" label="Client" chips
                            closable-chips>
                            <template v-slot:chip="{ props, item }">
                                <v-chip v-bind="props"
                                    :prepend-avatar="'http://localhost:8000/storage/' + item.raw.avatar"
                                    :text="item.raw.name"></v-chip>
                            </template>
                            <template v-slot:item="{ props, item }">
                                <v-list-item v-bind="props"
                                    :prepend-avatar="'http://localhost:8000/storage/' + item.raw.avatar"
                                    :subtitle="item.raw.country" :title="item.raw.name"></v-list-item>
                            </template>
                            <template v-slot:prepend-item>
                                <v-btn class="my-2 ml-4 text-none font-weight-regular" prepend-icon="mdi mdi-plus"
                                    text="Quick add" @click="dialog2 = true" variant="outlined"></v-btn>
                            </template>
                        </v-autocomplete>
                        <v-col cols="12">
                            <v-file-input v-model="form.preview" :rules="rules"
                                accept="image/png, image/jpeg, image/bmp" label="Preview" placeholder="Pick an avatar"
                                prepend-icon="mdi-camera"></v-file-input>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
                        <v-btn color="primary" text="Save" variant="tonal" type="submit">Save</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
            <AddClientDialog v-if="dialog2" :IsOpen="dialog2" :sendData="handleDataFromChild" />
            <v-divider></v-divider>
        </v-card>
    </v-dialog>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import AddClientDialog from '../modals/AddClientDialog.vue';

export default {
    name: 'AddProjectDialog',
    components: {
        AddClientDialog,
    },
    props: {
        Dialog: Boolean,
        Dialog2: Boolean,
        UpdateProjects: {
            type: Function,
            required: true
        }

    },
    methods: {
        handleDataFromChild(data) {
            this.dialog2 = data;
            this.updateClients();
        },
    },
    setup(props) {
        const dialog = ref(props.Dialog);
        const dialog2 = ref(props.Dialog2);
        const clients = ref([]);
        const form = ref({
            name: '',
            description: '',
            client: null,
            preview: null,
        });
        const isUpdating = ref(false);

        const submitForm = async () => {
            const formData = new FormData();
            formData.append('name', form.value.name);
            formData.append('client', form.value.client);
            formData.append('description', form.value.estimate);
            if (form.value.preview) {
                formData.append('preview', form.value.preview);
            }
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${process.env.API_URL}api/projects`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    dialog.value = false;
                    toast("Client created successfully!", {
                        "theme": "auto",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 1800,
                        "dangerouslyHTMLString": true
                    });
                    props.UpdateProjects();
                }
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
            }
        };
        const updateClients = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.API_URL}api/clients`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                clients.value = response.data;
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        onMounted(() => {
            updateClients();
        });

        return {
            dialog,
            dialog2,
            form,
            isUpdating,
            clients,
            submitForm,
            updateClients
        }
    },
}
</script>

<style scoped></style>
