<template>
    <div class="login">
        <div class="login__box">
            <div class="login__left-side">
                <div class="login__left-side-container">
                    <v-row class="d-flex justify-center">
                        <div>
                            <h3>SIGN UP</h3>
                            <p>A simple way to track expenses</p>
                            <br>
                        </div>
                        <v-form @submit.prevent="login">
                            <v-row>
                                
                                <v-col cols="6">
                                    <v-text-field v-model="loginForm.firstname" label="First name" hide-details="auto" dense variant="solo-filled"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="loginForm.lastname" label="Last name" hide-details="auto"  variant="solo-filled"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="loginForm.email" label="email" hide-details="auto" variant="solo-filled"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="loginForm.password" label="password" hide-details="auto" variant="solo-filled"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center"> <!-- добавлен класс justify-end для выравнивания кнопки вправо -->
                                    <v-btn type="submit" variant="outlined" color="#19a2ac">
                                        Sign up 
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        <div class="login__line">
                            <p>Or</p>
                            <p class="registr-button"><a href="/login" class="">log in</a></p>
                        </div>
                    </v-row>
                </div>
            </div>
            <div class="login__right-side">
                <img class="texture" src="../../../public/texture.png" alt="man with laptop">
                <div class="login__right-side-imgbox">
                    <div>
                        <h2>Very good
                            works are
                            waiting for
                            you Login
                            Now!!!</h2>
                    </div>
                    <img src="../../../public/manWithLaptop.png" alt="man with laptop">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        const token = 'Bearer 66Kh1iSyLHHhmQGOUjdaFYgZ1bynyrwDCGlmaVXV'; // Ваш токен доступа
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default {
    data() {
        return {
            loginForm: {
                email: 'ewqweq@gmail.com',
                password: '123321QQQ!wqeq'
            },
        }
    },
    methods: {
        async login() {
            try {
                const response = await axiosInstance.post('http://localhost:8000/api/login', this.loginForm);
                localStorage.setItem('token', response.data.token)
                if (response.status === 200) {
                    router.push('/login');
                }
                this.loginForm = {
                    email: '',
                    password: ''
                };
                this.errors = {};
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    // Обработка ошибок валидации
                    this.errors = error.response.data.errors;
                } else {
                    console.error('Login error', error);
                }
            }
        }
    },
}
</script>

<style scoped>

</style>
