<template>
    <li class="listElement">
        <v-checkbox class="checkbox"></v-checkbox>
        <div class="avatar">
            <img :src="ImageUrl" alt="avatar" v-if="ImageUrl" />
        </div>
        <p class="name">{{ Name }}</p>
        <p class="id">#{{ ClientId }}</p>
        <p class="created_ad">{{ Created_ad }}</p>
        <p class="email">{{ Email }}</p>
        <p class="country" style="margin-left: 10px;">{{ Country }}</p>
        <v-dialog v-model="dialog" max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="text-none font-weight-regular" icon="$vuetify" variant="text" v-bind="activatorProps">
                    <svg-icon style="opacity: 65%;" type="mdi" :path="path"></svg-icon>
                </v-btn>
            </template>
            <v-card prepend-icon="mdi-account" title="Edit client item">
                <v-card-text>
                    <v-form @submit.prevent="updateClient">
                        <v-row dense>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.name" label="Full name" hint="Tymur Rozhkovskyi"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.email" hint="example@gmail.com"
                                    label="Email"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.country" hint="United kingdom"
                                    label="Country"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-file-input @change="uploadImage" v-model="form.avatar" :rules="rules"
                            accept="image/png, image/jpeg, image/bmp" label="Avatar" placeholder="Pick an avatar"
                            prepend-icon="mdi-camera"></v-file-input>
                        <v-card-actions>
                            <v-btn @click="deleteClient" style="opacity: 70%;" icon="mdi mdi-delete"
                                variant="text"></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
                            <v-btn text="Save" color="primary" variant="tonal" type="submit"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
            </v-card>
        </v-dialog>
        <v-dialog fullscreen hide-overlay transition="scale-transition">
            <v-card class="pa-6 text-center">
                <v-alert v-if="successMessage" type="success">{{ successMessage }}</v-alert>
                <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
                <v-btn @click="closeNotificationDialog" color="primary">Close</v-btn>
            </v-card>
        </v-dialog>
    </li>
</template>

<script>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileEditOutline } from '@mdi/js';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: "LiElementClient",
    components: {
        SvgIcon
    },
    props: {
        ClientId: Number,
        Country: String,
        Name: String,
        Email: String,
        ImageUrl: String,
        Created_ad: String,
        updateClients: {
            type: Function,
            required: true
        },
    },
    data() {
        return {
            path: mdiFileEditOutline,
            dialog: false,
        }
    },
    setup(props) {
        const form = ref({
            name: props.Name,
            email: props.Email,
            country: props.Country,
            avatar: props.ImageUrl,
        });
        return {
            form
        }
    },
    methods: {
        async deleteClient() {
            try {
                const response = await axios.delete(`http://localhost:8000/api/clients/${this.ClientId}`);

                if (response.status === 200) {
                    toast("Client deleted successfully!", {
                        "theme": "auto",
                        "type": "info",
                        "position": "top-center",
                        "autoClose": 1800,
                        "dangerouslyHTMLString": true
                    });
                    this.dialog = false;
                    this.updateClients();
                } else {
                    console.error('Error deleting client:', response.status);
                }
            } catch (error) {
                if (error.response) {
                    toast(`The issue is on the server side, status: ${error.response.status}`, {
                        "theme": "auto",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 1800,
                        "dangerouslyHTMLString": true
                    });
                } else if (error.request) {
                    toast(error.request, {
                        "theme": "auto",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 1800,
                        "dangerouslyHTMLString": true
                    });
                } else {
                    toast(error.message, {
                        "theme": "auto",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 1800,
                        "dangerouslyHTMLString": true
                    });
                }
            }
        },

        async updateClient() {
            const clientData = {
                name: this.form.name,
                email: this.form.email,
                country: this.form.country,
                avatar: this.form.avatar
            };
            axios.put(`http://localhost:8000/api/clients/${this.ClientId}`, clientData)
                .then(response => {
                    toast("Client updated successfully!", {
                        "theme": "auto",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 1800,
                        "dangerouslyHTMLString": true
                    });
                    this.dialog = false;
                    this.updateClients();
                    console.log(clientData);
                })
                .catch(error => {
                    console.error(error.response.data.errors);
                    toast(error.request, {
                        "theme": "auto",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 1800,
                        "dangerouslyHTMLString": true
                    });
                });
        },

        async uploadImage() {
            if (!this.form.avatar === null) {
                console.log("1");
                toast("Please select an image to upload.", {
                    theme: "auto",
                    type: "error",
                    position: "top-center",
                    autoClose: 1800,
                    dangerouslyHTMLString: true
                });
                return;
            } else {
                const formData = new FormData();
                formData.append('image', this.form.avatar);
                console.log(formData);
                try {
                    const response = await axios.post('http://localhost:8000/api/images', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log("-->", response.data.image_name);
                    this.form.avatar = response.data.image_name;
                    toast("Image uploaded successfully!", {
                        theme: "auto",
                        type: "success",
                        position: "top-center",
                        autoClose: 1800,
                        dangerouslyHTMLString: true
                    });
                } catch (error) {
                    console.error('Error uploading image:', error);
                    toast("Failed to upload image.", {
                        theme: "auto",
                        type: "error",
                        position: "top-center",
                        autoClose: 1800,
                        dangerouslyHTMLString: true
                    });
                }
            }
        }

    }
}
</script>

<style scoped></style>