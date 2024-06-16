<template>
    <li class="EstimateElement">
        <v-checkbox class="checkbox"></v-checkbox>
        <p class="name">{{ Estimate.title }}</p>
        <p class="id">#{{ Estimate.id }}</p>
        <p class="cost">{{ Estimate.cost }}</p>
        <p class="created_ad">{{ Estimate.date }}</p>
        <p class="email">{{ Estimate.description }}</p>
        <p class="country" style="margin-left: 10px;">{{ Estimate.type }}</p>
        <EditEstimateDialog :Projects="Projects" :Cost="Cost" :Client="Client" :Estimate="Estimate" 
            :updateProjects="updateProjects"/>
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
import EditEstimateDialog from '../modals/EditEstimtaeDialog.vue';


export default {

    name: "LiElementClient",
    components: {
        SvgIcon,
        EditEstimateDialog
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
        Estimate: Object,
        EstimateId: Number,
        // Estimate: String,
        Title: String,
        Description: String,
        Cost: String,
        DateEst: String,
        Type: String,
        Projects: Array,
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
