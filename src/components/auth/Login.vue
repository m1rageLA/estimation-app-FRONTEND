<template>
    <div class="login">
        <div class="login__box">
            <div class="login__left-side">
                <div class="login__left-side-container">
                    <v-row class="d-flex justify-center">
                        <div>
                            <h3>LOGIN</h3>
                            <p>A simple way to track expenses</p>
                            <br>
                        </div>
                        <v-col cols="12">
                            <v-text-field label="email" variant="solo-filled"></v-text-field>
                            <v-text-field label="password" variant="solo-filled"></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <v-btn variant="outlined" color="#19a2ac">
                                Login Now
                            </v-btn>
                        </v-col>
                        <div class="login__line">
                            <p>Or</p>
                            <p class="registr-button"><a href="#" class="">sign up</a></p>
                            
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
export default {

}
</script>
<style lang="">

</style>
