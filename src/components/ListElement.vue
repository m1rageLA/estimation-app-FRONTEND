<template>
    <li class="listElement">
        <img :src="ImageUrl" alt="website"></img>
        <p>{{ ProjectName }}</p>
        <p>{{ Client }}</p>
        <p>{{ Estimate }}</p>
        <v-dialog v-model="dialog" max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn class="text-none font-weight-regular" icon="$vuetify"
                    variant="text" v-bind="activatorProps">
                    <svg-icon style="opacity: 65%;" type="mdi" :path="path"></svg-icon>
                </v-btn>
            </template>
            <v-card prepend-icon="mdi-account" title="Add client item">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="12" sm="6">
                            <v-text-field label="Full name" hint="Tymur Rozhkovskyi" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="6">
                            <v-text-field hint="example@gmail.com" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="6">
                            <v-text-field hint="United kingdom" label="Country"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" label="Avatar"
                        placeholder="Pick an avatar" prepend-icon="mdi-camera"></v-file-input>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </li>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileEditOutline } from '@mdi/js';
export default {

    name: "ListElement",
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdiFileEditOutline,
            dialog: false,
        }
    },
    props: {
        ProjectName: String,
        Estimate: Number,
        Client: String,
        ImageUrl: String
    }
}
</script>
<style lang="">

</style>