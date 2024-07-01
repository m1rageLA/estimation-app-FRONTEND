<template>
    <ul class="estimate-box">
        <div class="top-info">
            <div class="top-info__left">
                <p>{{ ProjectName }}</p>
                <v-menu v-model="menu" location="top start" origin="top start" transition="scale-transition">
                    <template v-slot:activator="{ props }">
                        <v-chip v-bind="props" link pill>
                            <v-avatar start>
                                <v-img :src="getClientAvatarUrl"></v-img>
                            </v-avatar>
                            {{ getClientName }}
                        </v-chip>
                    </template>

                    <v-card width="300">
                        <v-list bg-color="black">
                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-avatar>
                                        <v-img :src="getClientAvatarUrl"></v-img>
                                    </v-avatar>
                                </template>
                                <v-list-item-title>{{ getClientName }}</v-list-item-title>
                                <v-list-item-subtitle>{{ getClientEmail }}</v-list-item-subtitle>
                                <template v-slot:append>
                                    <v-list-item-action>
                                        <v-btn variant="text" icon @click="menu = false">
                                            <v-icon>mdi-close-circle</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </div>
        </div>
                <slot class="slot"></slot>
        <div class="bottom-info">
            <p>total: {{ totalEstimate }}</p>
        </div>
    </ul>
</template>

<script>

export default {
    name: "EstimateBox",
    props: {
        ProjectName: String,
        ClientName: String,
        ClientId: String,
        GetClients: Array, 
        Estimates: Array, 
        Projects: Number, 
        Dialog: Boolean,
    },
    computed: {
        getClientAvatarUrl() {
            const client = this.GetClients.find(c => c.id === parseInt(this.ClientId));
            if (client) {
                return `${process.env.API_URL}/storage/${client.avatar}`;
            }
            return ''; 
        },
        getClientName() {
            const client = this.GetClients.find(c => c.id === parseInt(this.ClientId));
            if (client) {
                return client.name;
            }
            return ''; 
        },
        getClientEmail() {
            const client = this.GetClients.find(c => c.id === parseInt(this.ClientId));
            if (client) {
                return client.email;
            }
            return ''; 
        },
        totalEstimate() {
            const clientEstimates = this.Estimates.filter(estimate => estimate.project_id === this.Projects);

            const total = clientEstimates.reduce((accumulator, estimate) => {
                return accumulator + parseFloat(estimate.cost);
            }, 0);

            return total.toFixed(2);
        },
    },
    data() {
        return {
            menu: false,
        };
    },
};
</script>

<style lang="scss">
</style>
