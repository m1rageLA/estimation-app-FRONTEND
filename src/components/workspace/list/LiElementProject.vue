<template>
    <li class="listElement">
        <v-checkbox class="checkbox"></v-checkbox>
        <div class="preview">
            <img :src="`http://localhost:8000/storage/${ImageUrl}`" alt="avatar" />
        </div>
        <p class="name">{{ Title }}</p>
        <p class="id">#{{ ProjectId }}</p>
        <p class="created_ad">{{ Created_ad }}</p>
        <p class="email">{{ getClientName }}</p>
        <p class="country" style="margin-left: 10px;">{{ Estimate }}</p>
        <EditProjectDialog :ProjectId="ProjectId" :Title="Title" :Client="getClientName" :Estimate="Estimate"
            :ImageUrl="ImageUrl" :updateProjects="updateProjects" :GetClients="GetClients" />
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
        ProjectId: Number,
        Estimate: String,
        Title: String,
        Client: String,
        ImageUrl: String,
        Created_ad: String,
        GetClients: Array,
        updateProjects: {
            type: Function,
            required: true
        },
    },
    computed: {
        getClientName() {
            const client = this.GetClients.find(c => c.id === parseInt(this.Client));
            if (client) {
                return client.name;
            }
            return 'ewq';
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
