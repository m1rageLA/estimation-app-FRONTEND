<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent class="sidebar">
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"  class="liElement" title="John Leider" nav
                    color="white">
                    <template v-slot:append>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi-home-city</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-account" title="My Account" value="account" class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi-account</v-icon>
                        </template>
                    </v-list-item>

                    <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi-account-group-outline</v-icon>
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
            rail: false, // Set rail to false initially
        };
    },
};
</script>

<style></style>
