 <template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" class="sidebar" permanent @click="rail = false">
                <v-list-item :prepend-avatar="'http://localhost:8000/storage/' + avatarUrl"
                    class="liElement" :title="username" nav color="white">
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
                        value="Estimation" class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi mdi-google-analytics</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item :to="'/admin'" prepend-icon="mdi mdi-google-analytics" title="Admin" value="Admin"
                        class="liElement">
                        <template #prepend>
                            <v-icon color="white">mdi mdi-shield-crown</v-icon>
                        </template>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 250px"></v-main>
        </v-layout>
    </v-card>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "Sidebar",
    setup() {
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
        return {
            getInfo,
        }
    },
    data() {
        return {
            drawer: true,
            rail: true, // Set rail to false initially
            avatarUrl: localStorage.getItem('user_imgUrl'),
            username: localStorage.getItem('user_name'),
        };
    },
};
</script>

<style></style>
