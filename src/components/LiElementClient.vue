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
                        <v-file-input @change="getNewImageName" v-model="form.avatar" :rules="rules"
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
import uploadImage from '../scripts/uploadImage'
import deleteItem from '../scripts/deleteItem'
import updateItem from '../scripts/updateItem';

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
                await deleteItem(this.ClientId);
                this.dialog = false;
                this.updateClients();
            } catch (error) {
                console.error(error);
            }
        },
        async getNewImageName() {
            try {
                const imageName = await uploadImage(this.form.avatar);
                console.log(imageName);
                this.form.avatar = imageName;
            } catch (error) {
                console.error(error);
            }
        },
        async updateClient() {
            const clientData = {
                name: this.form.name,
                email: this.form.email,
                country: this.form.country,
                avatar: this.form.avatar
            };
            if (!isValidEmail(clientData.email)) {
                toast("Invalid email!", {
                    theme: "auto",
                    type: "error",
                    position: "top-center",
                    autoClose: 1800,
                    dangerouslyHTMLString: true,
                });
                return;
            }
            try {
                const response = await updateItem(`clients/${this.ClientId}`, clientData);
                if (response.ok) {
                    this.updateClients();
                }
                this.dialog = false;
                this.updateClients();
            } catch (error) {
                console.log(error);
            }
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
        },
    }
}
</script>

<style scoped></style>../scripts/updateItem