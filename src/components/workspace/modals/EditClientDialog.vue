<template>
    <div>
        <v-btn @click="dialog = true" icon="mdi mdi-file-edit-outline" variant="text">
        </v-btn>
        <v-dialog v-model="dialog" max-width="500">
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
                                <v-text-field v-model="form.country" hint="United Kingdom"
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
    </div>
</template>

<script>
import uploadImage from '../../../scripts/uploadImage';
import deleteItem from '../../../scripts/deleteItem';
import updateItem from '../../../scripts/updateItem';
import { toast } from 'vue3-toastify';

export default {
    props: {
        ClientId: Number,
        Name: String,
        Email: String,
        Country: String,
        ImageUrl: String,
        updateClients: Function,
    },
    data() {
        return {
            dialog: false,
            form: {
                name: this.Name,
                email: this.Email,
                country: this.Country,
                avatar: this.ImageUrl,
            },
            rules: [(v) => !!v || 'Required.']
        }
    },
    watch: {
        dialog(val) {
            if (val) {
                this.form.name = this.Name;
                this.form.email = this.Email;
                this.form.country = this.Country;
                this.form.avatar = this.ImageUrl;
            }
        }
    },
    methods: {
        async deleteClient() {
            try {
                await deleteItem(`clients/${this.ClientId}`);
                this.dialog = false;
                this.updateClients();
            } catch (error) {
                console.error(error);
            }
        },
        async getNewImageName() {
            try {
                const imageName = await uploadImage(this.form.avatar);
                this.form.avatar = imageName;
            } catch (error) {
                console.error(error);
            }
        },
        async updateClient() {
            const checkAvatar = () => {
                if (this.form.avatar != null) {
                    return this.form.avatar;
                }
                else {
                    return this.form.avatar = this.ImageUrl;
                }
            }
            const clientData = {
                name: this.form.name,
                email: this.form.email,
                country: this.form.country,
                avatar: checkAvatar()
            };
            if (!this.isValidEmail(clientData.email)) {
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
                await updateItem(`clients/${this.ClientId}`, clientData);
                this.updateClients();
                this.dialog = false;
            } catch (error) {
                console.log(error);
            }
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
}
</script>

<style scoped></style>
