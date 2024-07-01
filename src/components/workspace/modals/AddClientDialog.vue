<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog2" max-width="500" persistent>
            <v-card title="Quick action">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular" prepend-icon="mdi mdi-plus" text="Add client"
                        variant="outlined" v-bind="activatorProps"></v-btn>
                </template>
                <v-card prepend-icon="mdi-account" title="Add client item">
                    <v-card-text>
                        <v-form @submit.prevent="submitForm">
                            <v-row dense>
                                <v-col cols="12" md="12" sm="6">
                                    <v-text-field v-model="form.name" label="Full name" hint="Tymur Rozhkovskyi"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" sm="6">
                                    <v-text-field v-model="form.email" hint="example@gmail.com" label="Email"
                                        type="email"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" sm="6">
                                    <v-text-field v-model="form.country" hint="United kingdom"
                                        label="Country"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" sm="6">
                                    <v-file-input v-model="form.avatar" :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp" label="Avatar"
                                        placeholder="Pick an avatar" prepend-icon="mdi-camera"></v-file-input>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text="Close" variant="plain" @click="closeModal()"></v-btn>
                                <v-btn color="primary" text="Save" variant="tonal" type="submit">Save</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
    name: 'AddClientDialog',
    props: {
        IsOpen: Boolean,
        sendData: {
            type: Function,
            required: true
        },
    },
    setup(props) {

        const dialog2 = ref(props.IsOpen);
        console.log(dialog2);
        const form = ref({
            name: '',
            email: '',
            country: '',
            avatar: null
        });

        const submitForm = async () => {
            const formData = new FormData();
            formData.append('name', form.value.name);
            formData.append('email', form.value.email);
            formData.append('country', form.value.country);
            if (form.value.avatar) {
                formData.append('avatar', form.value.avatar);
            }

            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${process.env.API_URL}api/clients`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    toast("Client created successfully!", {
                        "theme": "auto",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 1800,
                        "dangerouslyHTMLString": true
                    });
                    closeModal();
                }
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
            }
        };

        const closeModal = () => {
            dialog2.value = false;
            props.sendData(false);
        };
        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        return {
            dialog2,
            form,
            submitForm,
            closeModal
        };
    }
});
</script>

<style scoped>
/* Ваши стили */
</style>
