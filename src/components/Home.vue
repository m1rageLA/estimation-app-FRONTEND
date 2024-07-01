<template>
    <header class="header">
        <div class="header__container">
            <div class="header__left-box">
                <h2>LOGO</h2>
                <ul>
                    <li><a class="active" href="/home">Home</a></li>
                    <li><a href="">About us</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>

            <div class="header__buttons-box">
                <!-- V-IF (is token) -->
                <router-link v-if="checkToken()" to="/clients">
                    <v-btn class="header__button" variant="tonal">
                        WORKSPACE
                    </v-btn>
                </router-link>

                <!-- ELSE (no token) -->
                <router-link v-if="!checkToken()" to="/login">
                    <v-btn class="header__button" variant="tonal">
                        LOG IN
                    </v-btn>
                </router-link>
                <router-link v-if="!checkToken()" to="/registration">
                    <v-btn class="header__button" color="#00aebecd" variant="tonal">
                        SIGN UP
                    </v-btn>
                </router-link>
            </div>
        </div>
        <div class="main">
            
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        checkToken() {
            const token = localStorage.getItem('token');
            return !!token;
        }
    }
}
</script>

<style></style>
