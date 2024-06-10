<template>
    <li class="listElement">
        <v-checkbox class="checkbox"></v-checkbox>
        <div class="avatar">
            <img :src="`http://localhost:8000/storage/${ImageUrl}`" alt="avatar" v-if="ImageUrl" />
        </div>
        <p class="name">{{ Name }}</p>
        <p class="id">#{{ ClientId }}</p>
        <p class="created_ad">{{ Created_ad }}</p>
        <p class="email">{{ Email }}</p>
        <p class="country" style="margin-left: 10px;">{{ Country }}</p>
        <EditClientDialog :ClientId="ClientId" :Name="Name" :Email="Email" :Country="Country" :ImageUrl="ImageUrl"
            :updateClients="updateClients" />
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
import EditClientDialog from './workspace/modals/EditClientDialog.vue';

export default {
    name: "LiElementClient",
    components: {
        SvgIcon,
        EditClientDialog
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
            notificationDialog: false,
            successMessage: '',
            errorMessage: ''
        }
    },
    methods: {
        closeNotificationDialog() {
            this.notificationDialog = false;
        }
    }
}
</script>

<style scoped></style>
