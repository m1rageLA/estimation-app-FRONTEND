<template>
    <div class="account">
        <EditUserDialog v-if="dialog" :Dialog="dialog" :ImageUrl="ImageUrl" :UserId="2"
            :sendData="handleDataFromChild" />
        <div class="account__container">
            <h2 class="myAccount">My account</h2>
            <div class="account__preview">
                <div class="leftBox">
                    <div class="avatar">
                        <img :src="`http://localhost:8000/storage/${userData.image_url}`" alt="avatar">
                    </div>

                    <div class="info">
                        <h3>{{ userData.first_name }}</h3>
                        <h4>{{ userData.bio }}</h4>
                        <h4>{{ userData.address }}</h4>
                    </div>
                </div>

                <v-btn class="logout" @click="logout()" prepend-icon="mdi mdi-logout" variant="outlined">
                    Logout
                </v-btn>

            </div>
            <div class="account__presonalInfo">

                <h3>Personal information</h3>
                <v-btn @click="dialog = true" class="edit" prepend-icon="mdi mdi-pencil" variant="outlined">
                    Edit
                </v-btn>
                <div class="name">
                    <div>
                        <p class="title">First name</p>
                        <p>{{ userData.first_name }}</p>
                    </div>
                    <div>
                        <p class="title">Last name</p>
                        <p>{{ userData.last_name }}</p>
                    </div>
                    <div>
                        <p class="title">BIO</p>
                        <p>{{ userData.bio }}</p>
                    </div>
                </div>
                <div class="contact">
                    <div>
                        <p class="title">Email</p>
                        <p>{{ userData.email }}</p>
                    </div>
                    <div>
                        <p class="title">Phone</p>
                        <p>{{ userData.phone }}</p>
                    </div>
                    <div>
                        <p class="title">Adress</p>
                        <p>{{ userData.address }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import EditUserDialog from '../workspace/modals/EditUserDialog.vue';

export default {
    name: "Account",
    components: {
        EditUserDialog,
    },
    methods: {
        handleDataFromChild(data) {
            this.dialog = data;
        },
    },
    setup() {
        const dialog = ref(false);
        const router = useRouter(); 
        const userData = ref({});

        const getInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.API_URL}/api/login/${localStorage.getItem('id')}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                userData.value = response.data;
                console.log(userData.value);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const logout = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${process.env.API_URL}/api/logout`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                userData.value = response.data;
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        onMounted(() => {
            getInfo();
        });

        return {
            getInfo,
            logout,
            userData,
            dialog
        };
    }
}
</script>

<style></style>
