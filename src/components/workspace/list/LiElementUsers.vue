<template>
    <li class="userListElement">
        <p class="email">{{ Email }}</p>
        <p class="id">#{{ ClientId }}</p>
        <p class="created_ad">{{ Created_ad }}</p>
        <p class="bio">{{ Bio }}</p>
        <p class="phone">{{ Phone }}</p>
        <p class="firstName">{{ firstName }}</p>
        <p class="lastname">{{ lastname }}</p>
    </li>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileEditOutline } from '@mdi/js';
import EditClientDialog from '../modals/EditClientDialog.vue';

export default {
    name: "LiElementClient",
    components: {
        SvgIcon,
        EditClientDialog
    },
    props: {
        ClientId: Number,
        Country: String,
        firstName: String,
        lastname: String,
        Email: String,
        Phone: String,
        Bio: String,
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
