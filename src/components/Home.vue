<template>
    <div class="home">
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
        </header>
        <br>
        <main class="main">
            <div class="main__content-block--v1">
                <div class="main__content-block--left">
                    <div class="main__content-block-text-item">
                        <p>Developers Community:</p>
                        <h3>Find Like-minded Individuals!</h3>
                    </div>
                    <div class="main__content-block-item">
                        <div class="mdi mdi-code-tags ico" style="color: white;"></div>
                        <div>
                            <h4>Developers Community: </h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in
                                hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
                                ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                            </p>
                        </div>
                        <div class="main__content-block-particles">
                            <div class="v1"></div>
                            <div class="v2"></div>
                            <div class="v3"></div>
                        </div>
                    </div>
                </div>
                <div class="main__content-block--right">
                    <img src="logo.png" alt="">
                </div>
            </div>
            <div class="main__content-block--v2">
                <div class="main__content-block--left">
                    <h3>Developers Community: </h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in
                        hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
                        ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                    </p>
                </div>
                <div class="main__content-block--right">
                    <div class="main__content-block-item">
                        <div class="mdi mdi-code-tags ico" style="color: white;"></div>
                        <div>
                            <h4>Developers Community: </h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in
                                hendrerit urna. Pellentesque sit amet sapien fringilla.
                            </p>
                        </div>
                        <div class="main__content-block-particles">
                            <div class="v1"></div>
                            <div class="v2"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main__content-block--v3">
                <h3>Example of workpspace</h3>
                <img src="esample.png" alt="example of workspace">
            </div>
        </main>
        <footer class="footer">
            
        </footer>
    </div>
    
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
