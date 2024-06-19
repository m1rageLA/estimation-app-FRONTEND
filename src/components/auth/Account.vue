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
                        <h3>Jack Adams</h3>
                        <h4>Product manager</h4>
                        <h4>Los Angeles, California, USA</h4>
                    </div>
                </div>

                <v-btn class="logout" prepend-icon="mdi mdi-logout" variant="outlined">
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
                        <p>Joahn Loager</p>
                    </div>
                    <div>
                        <p class="title">Last name</p>
                        <p>Product manager</p>
                    </div>
                    <div>
                        <p class="title">BIO</p>
                        <p>Project manager</p>
                    </div>
                </div>
                <div class="contact">
                    <div>
                        <p class="title">Email</p>
                        <p>jackadams32@gmail.com</p>
                    </div>
                    <div>
                        <p class="title">Phone</p>
                        <p>(213) 415-226</p>
                    </div>
                    <div>
                        <p class="title">Adress</p>
                        <p>Project manager</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Account",
}
</script>
<style></style>