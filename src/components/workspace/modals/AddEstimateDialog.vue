<template>
    <div class="py-5">
        <v-dialog v-model="dialog" max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="text-none font-weight-regular" prepend-icon="mdi mdi-plus" text="Add estimate"
                    variant="outlined" v-bind="activatorProps"></v-btn>
            </template>
            <v-card prepend-icon="mdi-account" title="Add estimate item">
                <v-card-text>
                    <v-form @submit.prevent="submitForm">
                        <v-row dense>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.title" label="Title" hint="Web site"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.description" label="Description"
                                    hint="Project about creating neural networks" required></v-text-field>
                            </v-col>

                            <v-autocomplete v-model="form.project_id" :disabled="isUpdating" :items="projects"
                                color="blue-grey-lighten-2" item-title="title" item-value="id" label="Project" chips
                                closable-chips>
                                <template v-slot:chip="{ props, item }">
                                    <v-chip v-bind="props"
                                        :prepend-avatar="'http://localhost:8000/storage/' + item.raw.preview"
                                        :text="item.raw.name"></v-chip>
                                </template>
                                <template v-slot:item="{ props, item }">
                                    <v-list-item v-bind="props"
                                        :prepend-avatar="'http://localhost:8000/storage/' + item.raw.preview"
                                        :subtitle="item.raw.client" :title="item.raw.name"></v-list-item>
                                </template>
                            </v-autocomplete>

                            <v-col cols="12" md="12" sm="6">
                                <v-date-input v-model="form.date" label="Date input"></v-date-input>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.cost" label="Estimate" hint="1400$" required></v-text-field>
                            </v-col>

                            <!-- 'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'cost' => 'required|numeric|min:0',
            'project_id' => 'required|exists:projects,id',
            'date' => 'sometimes|required|date' -->

                            <v-radio-group inline v-model="form.type">
                                <v-radio label="Hourly" value="hourly"></v-radio>
                                <v-radio label="Fixed price" value="fixed"></v-radio>
                            </v-radio-group>

                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
                            <v-btn color="primary" text="Save" variant="tonal" type="submit">Save</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AddClientDialog from '../modals/AddClientDialog.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { VDateInput } from 'vuetify/labs/VDateInput'

export default {
    name: 'AddEstimateDialog',
    components: {
        AddClientDialog,
        VDateInput,
    },
    props: {
        Dialog: Boolean,
        UpdateProjects: {
            type: Function,
            required: true
        },
    },
    setup(props) {
        const dialog = ref(props.Dialog);
        const clients = ref([]);
        const projects = ref([]);
        const form = ref({
            title: '',
            description: '',
            type: '',
            cost: '',
            project_id: null,
            date: null,
        });
        const isUpdating = ref(false);

        const submitForm = async () => {
            const formData = new FormData();
            formData.append('title', form.value.title);
            formData.append('description', form.value.description);
            formData.append('type', form.value.type);
            formData.append('cost', form.value.cost);
            formData.append('project_id', form.value.project_id);
            formData.append('date', form.value.date.toISOString());

            try {
                const response = await axios.post('http://localhost:8000/api/estimates', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
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
                    updateClients();
                }
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
            }
        };
        const updateClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clients');
                clients.value = response.data;
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        const updateProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/projects');
                projects.value = response.data;
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        onMounted(() => {
            updateClients();
            updateProjects();
        });

        return {
            dialog,
            form,
            isUpdating,
            clients,
            projects,
            submitForm,
            updateClients
        }
    },
}
</script>

<style scoped></style>
        
