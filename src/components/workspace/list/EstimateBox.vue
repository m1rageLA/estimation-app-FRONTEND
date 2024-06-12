<template>
    <ul class="estimate-box">
        <div class="top-info">
            <div class="top-info__left">
                <p>{{ ProjectName }}</p>
                <v-menu v-model="menu" location="top start" origin="top start" transition="scale-transition">
                    <template v-slot:activator="{ props }">
                        <v-chip v-bind="props" link pill>
                            <v-avatar start>
                                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                            </v-avatar>

                            {{ ClientName }}
                        </v-chip>
                    </template>

                    <v-card width="300">
                        <v-list bg-color="black">
                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-avatar image="https://cdn.vuetifyjs.com/images/john.png"></v-avatar>
                                </template>

                                <v-list-item-title>{{ ClientName }}</v-list-item-title>

                                <v-list-item-subtitle>john@google.com</v-list-item-subtitle>

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
            <v-btn class="my-2 ml-4 text-none font-weight-regular" prepend-icon="mdi mdi-plus" text="Add estimate"
                @click="dialog2 = true" variant="outlined"></v-btn>
        </div>
        <slot class="slot"></slot>
    </ul>
</template>
<script>
export default {
    name: "EstimateBox",
    props: {
        ProjectName: String,
        ClientName: String,
    },
    data: () => ({
        menu: false,
    }),
}
</script>
<style lang="">

</style>