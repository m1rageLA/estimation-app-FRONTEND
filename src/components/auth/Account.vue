<template>
    <div class="account">
        <div class="account__container">
            <h2 class="myAccount">My account</h2>
            <div class="account__preview">
                <div class="leftBox">
                    <div class="avatar">
                        <img src="https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg"
                            alt="avatar">
                    </div>

                    <div class="info">
                        <h3>{{ userData.first_name }}</h3>
                        <h4>Product manager !!!!</h4>
                        <h4>Los Angeles !!!!!</h4>
                    </div>
                </div>

                <v-btn class="logout"  @click="logout()" prepend-icon="mdi mdi-logout" variant="outlined">
                    Logout
                </v-btn>
            </div>
            <div class="account__presonalInfo">
                <h3>Personal information</h3>
                <v-btn class="edit" prepend-icon="mdi mdi-pencil" variant="outlined">
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
                        <p>Project manager !!!</p>
                    </div>
                </div>
                <div class="contact">
                    <div>
                        <p class="title">Email</p>
                        <p>{{ userData.email }}</p>
                    </div>
                    <div>
                        <p class="title">Phone</p>
                        <p>(213) 415-226 !!!</p>
                    </div>
                    <div>
                        <p class="title">Adress</p>
                        <p>(213) 415-226 !!!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { onMounted, ref } from 'vue'; // Импорт необходимого хука из Vue 3
export default {
    name: "Account",
    setup() {
        const userData = ref({});
        const getInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.API_URL}/api/login/${2}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                userData.value = response.data;
                console.log(userData.value);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        const logout = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${process.env.API_URL}/api/logout`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                userData.value = response.data;
                console.log(userData.value);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        onMounted(() => {
            getInfo();
        });

        return {
            getInfo,
            logout,
            userData
        };
    }
}
</script>
<style></style>
