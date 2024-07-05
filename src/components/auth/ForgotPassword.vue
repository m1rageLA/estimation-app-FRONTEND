<template>
    <div class="login">
        <div class="login__box">
            <div class="login__left-side">
                <div class="login__left-side-container">
                    <v-row class="d-flex justify-center">
                        <div>
                            <h3>Forgot Password</h3>
                            <p style="text-align: center;">Enter your email and we'll send a link to reset your
                                password.</p>
                            <br>
                        </div>
                        <v-form @submit.prevent="reset">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="loginForm.email" label="email" hide-details="auto"
                                        variant="solo-filled"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center">
                                    <v-btn type="submit" variant="outlined" color="#19a2ac">
                                        Submit
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        <div class="login__line">
                            <p>Or</p>
                            <p class="registr-button"><a href="/registration" class="">Back to login</a></p>
                        </div>
                    </v-row>
                </div>
            </div>
            <div class="login__right-side login__right-side--reset">
                <img class="texture" src="texture.png" alt="man with laptop">
                <div class="login__right-side-imgbox login__right-side-imgbox--reset">
                    <div>
                        <h2>Very good
                            works are
                            waiting for
                            you Login
                            Now!!!</h2>
                    </div>
                    <img src="manWithLaptop.png" alt="man with laptop">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loginForm: {
                email: '',
            },
        }
    },

    methods: {
        async reset() {
            try {
                const response = await axios.post(`http://localhost:8000/api/password/email`, this.loginForm);
                if (response.status === 200) {
                    this.$router.push('/account');
                }
                this.loginForm = {
                    email: '',
                    password: ''
                };
                this.errors = {};
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errors = error.response.data.errors;
                } else {
                    console.error('Login error', error);
                }
            }
        }
    },
}
</script>

<style scoped></style>
