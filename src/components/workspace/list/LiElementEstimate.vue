<template>
    <li class="EstimateElement">
        <v-checkbox class="checkbox"></v-checkbox>
        <p class="name">{{ Title }}</p>
        <p class="id">#{{ EstimateId }}</p>
        <p class="cost">{{ Cost }}</p>
        <p class="created_ad">{{ DateEst }}</p>
        <p class="email">{{ Description }}</p>
        <p class="country" style="margin-left: 10px;">{{ Estimate }}</p>
        <EditProjectDialog :ProjectId="ProjectId" :Title="Title" :Client="Client" :Estimate="Estimate" 
            :updateProjects="updateProjects"  :Description="Description"/>
        <v-dialog v-model="notificationDialog" fullscreen hide-overlay transition="scale-transition">
            <v-card class="pa-6 text-center">
                <v-alert v-if="successMessage" type="success">{{ successMessage }}</v-alert>
                <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
                <v-btn @click="closeNotificationDialog" color="primary">Close</v-btn>
            </v-card>
        </v-dialog>
    </li>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileEditOutline } from '@mdi/js';
import 'vue3-toastify/dist/index.css';
import EditProjectDialog from '../modals/EditProjectDialog.vue';


export default {

    name: "LiElementClient",
    components: {
        SvgIcon,
        EditProjectDialog
    },
    data() {
        return {
            path: mdiFileEditOutline,
            dialog: false,
            name: this.Name,
            client: this.Client,
            country: this.Country,
        }
    },
    props: {
        EstimateId: Number,
        Estimate: String,
        Title: String,
        Description: String,
        Cost: String,
        DateEst: String,
        Created_ad: String,
        updateProjects: {
            type: Function,
            required: true
        },
    },
    methods: {
        emitUpdateClients() {
            this.$emit('update-clients');
        },
        async deleteClient() {
            try {
                await deleteItem(this.ProjectId);
                this.dialog = false;
                this.updateProjects();
            } catch (error) {
                console.error(error);
            }
        },
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
    async updateProject() {
        const projectData = {
            name: this.form.name,
            client: this.form.client,
            country: this.form.country,
            avatar: this.form.avatar
        };
        try {
            const response = await updateItem(`projects/${this.ProjectId}`, projectData);
            if (response.ok) {
                this.updateProjects();
            }
            this.dialog = false;
            this.updateProjects();
        } catch (error) {
            console.log(error);
        }
    },
}
</script>

<style lang="">

</style>
