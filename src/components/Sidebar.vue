<!-- <template class="qwe" style="width: 20%;">
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent class="sidebar" style="width: 20%;">
 -->

<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" class="sidebar" permanent @click="rail = false">
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" class="liElement"
                    title="John Leider" nav color="white">
                    <template v-slot:append>
                        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
                    </template>
                </v-list-item>

                <v-divider style="color: white;"></v-divider>

                <v-list density="compact" nav>
                    <v-list-item :to="'/home'" prepend-icon="mdi-home-city" title="Home" value="home" class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi-home-city</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item :to="'/account'" prepend-icon="mdi-account" title="My Account" value="account"
                        class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi-account</v-icon>
                        </template>
                    </v-list-item>

                    <v-list-item :to="'/clients'" prepend-icon="mdi-account-group-outline" title="Clients"
                        value="Clients" class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi-account-group-outline</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item :to="'/projects'" prepend-icon="mdi mdi-sitemap-outline" title="Projects"
                        value="Projects" class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi mdi-sitemap-outline</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item :to="'/estimation'" prepend-icon="mdi mdi-google-analytics" title="Estimation"
                        value="Projects" class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi mdi-google-analytics</v-icon>
                        </template>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 250px"></v-main>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            drawer: true,
            rail: true, // Set rail to false initially
        };
    },
};
</script>

<style></style>
