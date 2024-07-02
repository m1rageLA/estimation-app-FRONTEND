<template>
    <div>
        <v-dialog v-model="dialog" max-width="600" persistent="false">
            <v-card prepend-icon="mdi-account" title="Edit user data">
                <v-card-text>
                    <v-form @submit.prevent="updateUser">
                        <v-row dense>
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field v-model="form.first_name" label="First name" hint="Tymur"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field v-model="form.last_name" label="Last name" hint="Rozhkovskyi"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field v-model="form.phone" label="Phone" hint="+48 604 781"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field v-model="form.address" label="Adress" hint="Sidorska 97A"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="12">
                                <v-text-field v-model="form.bio" hint="Lorem..." label="BIO"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <v-text-field v-model="form.email" hint="example@gmail.com"
                                    label="Email"></v-text-field>
                            </v-col>

                        </v-row>
                        <v-file-input @change="getNewImageName" v-model="form.image_url" :rules="rules"
                            accept="image/png, image/jpeg, image/bmp" label="Avatar" placeholder="Pick an avatar"
                            prepend-icon="mdi-camera"></v-file-input>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" variant="plain" @click="closeModal"></v-btn>
                            <v-btn text="Save" color="primary" variant="tonal" type="submit"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import uploadImage from '../../../scripts/uploadImage'; // Assuming correctly imported
import deleteItem from '../../../scripts/deleteItem';
import updateItem from '../../../scripts/updateItem';

export default {
    props: {
        Dialog: Boolean,
        UserId: Number,
        FirstName: String,
        LastName: String,
        Email: String,
        UserData: Object,
        sendData: {
            type: Function,
            required: true
        },
    },
    data() {
        return {
            form: {
                first_name: this.UserData.first_name,
                last_name: this.UserData.last_name,
                email: this.UserData.email,
                phone: this.UserData.phone,
                address: this.UserData.address,
                bio: this.UserData.bio,
                image_url: '',
                password: ''
            },
            rules: [(v) => !!v || 'Required.']
        };
    },
    setup(props) {
        const dialog = ref(props.Dialog);

        const closeModal = () => {
            dialog.value = false;
            props.sendData(false);
        };

        return {
            dialog,
            closeModal
        };
    },
    methods: {
        async deleteClient() {
            try {
                await deleteItem(`clients/${this.UserId}`);
                this.dialog = false;
                // this.updateClients(); // Define updateClients method if needed
                toast.success("Client deleted successfully!");
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete client");
            }
        },
        async getNewImageName() {
            try {
                const imageName = await uploadImage(this.form.image_url);
                this.form.image_url = imageName;
            } catch (error) {
                console.error(error);
                toast.error("Failed to upload image");
            }
        },
        async updateUser() {
            const checkAvatar = () => {
                if (this.form.image_url !== '') {
                    return this.form.image_url;
                } else {
                    return '';
                }
            };

            const clientData = {
                first_name: this.form.first_name,
                last_name: this.form.last_name,
                password: this.form.password,
                image_url: checkAvatar(),
                bio: this.form.bio,
                phone: this.form.phone,
                address: this.form.address
            };

            if (this.form.email) {
                clientData.email = this.form.email;
            }

            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(
                    `${process.env.API_URL}api/update`,
                    clientData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                toast.success("Client updated successfully!");
                localStorage.setItem('user_imgUrl', response.data.user.image_url);
                localStorage.setItem('user_name', response.data.user.first_name + " " + response.data.user.last_name);
                this.closeModal()
            } catch (error) {
                console.error(error);
                toast.error("Failed to update client");
            }
        }
    }
};
</script>

<style scoped></style>
