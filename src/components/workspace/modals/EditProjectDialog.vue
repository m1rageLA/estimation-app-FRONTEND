<template>
    <div>
        <v-btn @click="dialog = true" icon="mdi mdi-file-edit-outline" variant="text">
        </v-btn>
        <v-dialog v-model="dialog" max-width="500">
            <v-card prepend-icon="mdi-account" title="Edit client item">
                <v-card-text>
                    <v-form @submit.prevent="updateProject">
                        <v-row dense>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.title" label="Title" hint="Open AI" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.description" hint="Project about creating neural networks"
                                    label="Description"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.сlient" hint="Tyler Durden" label="Client"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-file-input @change="getNewImageName" v-model="form.preview" :rules="rules"
                            accept="image/png, image/jpeg, image/bmp" label="Avatar" placeholder="Pick an avatar"
                            prepend-icon="mdi-camera">
                        </v-file-input>
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

export default {
    name: "EditProjectDialog",
    props: {
        ProjectId: Number,
        Title: String,
        Client: String,
        Estimate: String,
        ImageUrl: String,
        updateProjects: Function,
    },
    data() {
        return {
            dialog: false,
            form: {
                title: this.Title,
                сlient: this.Client,
                estimate: this.Estimate,
                preview: this.ImageUrl,
            },
            rules: [(v) => !!v || 'Required.']
        }
    },
    watch: {
        dialog(val) {
            if (val) {
                this.form.title = this.Title;
                this.form.client = this.Client;
                this.form.estimate = this.Estimate;
                this.form.preview = this.ImageUrl;
            }
        }
    },
    methods: {
        async deleteClient() {
            try {
                await deleteItem(`projects/${this.ProjectId}`);
                this.dialog = false;
                this.updateProjects();
            } catch (error) {
                console.error(error);
            }
        },
        async getNewImageName() {
            try {
                const imageName = await uploadImage(this.form.preview);
                this.form.preview = imageName;
            } catch (error) {
                console.error(error);
            }
        },
        async updateProject() {
            const projectData = {
                name: this.form.title,
                client: this.form.client,
                description: this.form.description,
                preview: this.form.preview
            };
            try {
                await updateItem(`projects/${this.ProjectId}`, projectData);
                this.dialog = false;
                this.updateProjects();
             
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style scoped></style>
