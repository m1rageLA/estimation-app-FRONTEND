<template>
    <div class="workspace">
        <div class="workspace__container">
            <div class="workspace__top-block">
                <h2>Projects </h2>
                <div class="py-5">
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
                                            <v-text-field v-model="form.name" label="Title" hint="Web site"
                                                required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12" sm="6">
                                            <v-text-field v-model="form.description" label="Description"
                                                hint="Description" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-autocomplete v-model="form.client" :disabled="isUpdating"
                                                :items="clients" color="blue-grey-lighten-2" item-title="name"
                                                item-value="name" label="Client" chips closable-chips>
                                                <template v-slot:chip="{ props, item }">
                                                    <v-chip v-bind="props"
                                                        :prepend-avatar="'http://localhost:8000/storage/' + item.raw.avatar"
                                                        :text="item.raw.name"></v-chip>
                                                </template>

                                                <template v-slot:item="{ props, item }">
                                                    <v-list-item v-bind="props"
                                                        :prepend-avatar="'http://localhost:8000/storage/' + item.raw.avatar"
                                                        :subtitle="item.raw.country"
                                                        :title="item.raw.name"></v-list-item>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-file-input v-model="form.preview" :rules="rules"
                                                accept="image/png, image/jpeg, image/bmp" label="Preview"
                                                placeholder="Pick an avatar" prepend-icon="mdi-camera"></v-file-input>
                                        </v-col>
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
            </div>
            <div class="list-markup">
                <p></p>
                <p>Image</p>

                <p>
                    <a href="#" @click.prevent="toggleSortOrder('name')" :class="{ 'active': sortKey === 'name' }">
                        Title (<b>{{ nameSortOrder }}</b>)
                    </a>
                </p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('id')" :class="{ 'active': sortKey === 'id' }">
                        #id (<b>{{ idSortOrder }}</b>)
                    </a>
                </p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('created_at')"
                        :class="{ 'active': sortKey === 'created_at' }">
                        Created at (<b>{{ createdAtSortOrder }}</b>)
                    </a>
                </p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('client')" :class="{ 'active': sortKey === 'client' }">
                        Client (<b>{{ clientSortOrder }}</b>)
                    </a>
                </p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('estimate')"
                        :class="{ 'active': sortKey === 'estimate' }">
                        Estimate (<b>{{ countrySortOrder }}</b>)
                    </a>
                </p>

                <p>Edit</p>
            </div>
            <ul class="workspace__list">
                <ul>
                    <LiElementProject v-for="projects in sortedClients(sortKey) " :key="projects.id"
                        :ClientId="projects.id"
                        :ImageUrl="projects.preview ? `http://localhost:8000/storage/${projects.preview}` : ''"
                        :Name="projects.name" :Email="projects.client" :Country="projects.estimate"
                        :Created_ad="projects.created_at" :updateClients="updateProjects" />
                </ul>

            </ul>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import LiElementProject from '../LiElementProject.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
    name: 'Clients',
    components: {
        LiElementProject
    },
    data() {
        return {
            nameSortOrder: 'a - z',
            createdAtSortOrder: 'new',
            idSortOrder: 'asc',
            clientSortOrder: 'a - z',
            countrySortOrder: 'a - z',
            sortKey: 'created_at',
            friends: [],
            isUpdating: false, 
        };
    },
    methods: {
        toggleSortOrder(category) {
            switch (category) {
                case 'name':
                    this.nameSortOrder = this.nameSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'id':
                    this.idSortOrder = this.idSortOrder === 'asc' ? 'desc' : 'asc';
                    break;
                case 'created_at':
                    this.createdAtSortOrder = this.createdAtSortOrder === 'new' ? 'old' : 'new';
                    break;
                case 'client':
                    this.clientSortOrder = this.clientSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'estimate':
                    this.countrySortOrder = this.countrySortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                default:
                    break;
            }

            this.sortKey = category;
        },
        sortedClients() {
            let sortedArray = this.projects.slice();
            const key = this.sortKey;

            switch (key) {
                case 'name':
                    sortedArray.sort((a, b) => {
                        if (this.nameSortOrder === 'a - z') {
                            return a.name.localeCompare(b.name);
                        } else {
                            return b.name.localeCompare(a.name);
                        }
                    });
                    break;
                case 'id':
                    sortedArray.sort((a, b) => {
                        if (this.idSortOrder === 'asc') {
                            return a.id - b.id;
                        } else if (this.idSortOrder === 'desc') {
                            return b.id - a.id;
                        }
                    });
                    break;
                case 'created_at':
                    sortedArray.sort((a, b) => {
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        if (this.createdAtSortOrder === 'new') {
                            return dateB - dateA;
                        } else {
                            return dateA - dateB;
                        }
                    });
                    break;
                case 'client':
                    sortedArray.sort((a, b) => {
                        if (this.clientSortOrder === 'a - z') {
                            return a.client.localeCompare(b.client);
                        } else {
                            return b.client.localeCompare(a.client);
                        }
                    });
                    break;
                case 'estimate':
                    sortedArray.sort((a, b) => {
                        if (this.countrySortOrder === 'a - z') {
                            return a.country.localeCompare(b.country);
                        } else {
                            return b.country.localeCompare(a.country);
                        }
                    });
                    break;
                default:
                    break;
            }

            return sortedArray;
        }
    },
    setup() {
        const dialog = ref(false);
        const projects = ref([]);
        const clients = ref([]);
        const form = ref({
            name: '',
            client: '',
            description: '',
            preview: 'https://static.thenounproject.com/png/194055-200.png'
        });

        const rules = [
            value => {
                return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
            },
        ];

        const updateProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/projects');
                projects.value = response.data;
            } catch (error) {
                console.error('Ошибка:', error);
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

        const submitForm = async () => {
            const formData = new FormData();
            formData.append('name', form.value.name);
            formData.append('client', form.value.client);

            formData.append('description', form.value.estimate);
            if (form.value.preview) {
                formData.append('preview', form.value.preview);
            }
            console.log(form.value);

            try {
                const response = await axios.post('http://localhost:8000/api/projects', formData, {
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
                    updateProjects();
                    updateClients();
                }
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
            }
        };

        onMounted(() => {
            updateProjects();
            updateClients();
        });

        return {
            dialog,
            projects,
            clients,
            form,
            rules,
            updateProjects,
            submitForm
        };
    }
});
</script>

<style lang="scss"></style>