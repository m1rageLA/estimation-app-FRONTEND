<template>
    <div class="workspace">
        <div class="workspace__container">
            <div class="workspace__top-block">
                <h2>My projects</h2>
                <div class="py-5">
                    <v-dialog v-model="dialog" max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn class="text-none font-weight-regular" prepend-icon="$vuetify" text="Edit Profile"
                                variant="outlined" v-bind="activatorProps"></v-btn>
                        </template>

                        <v-card prepend-icon="mdi-account" title="Create item">
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12" md="12" sm="6">
                                        <v-text-field label="Title" hint="Project Title" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="6">
                                        <v-text-field hint="Client Name" label="Clent"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-select
                                            :items="['Single Page Website', 'Business Card Website', 'Landing Page', 'Corporate Website', 'E-commerce Website', 'Portfolio Website', 'Blog', 'News Website', 'Forum/Community Website', 'Educational Website', 'Other...']"
                                            label="Site type*" required></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-autocomplete
                                            :items="['Full Website Development', 'Bug Fixing', 'Performance Optimization', 'Responsive Design', 'UI/UX Design', 'Third-Party Integrations', 'Maintenance and Updates', 'Back-End Development', 'Security and Data Protection', 'Data and System Migration']"
                                            label="Technologies" auto-select-first multiple></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="6">
                                        <v-text-field hint="Total task cost" label="Estimate $"></v-text-field>
                                    </v-col>
                                </v-row>

                                <!-- <small class="text-caption text-medium-emphasis">*indicates required field</small> -->
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

                                <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>

            </div>
            <div class="workspace__list">
                <ul>
                    <div class="list-markup">
                        <p>Image</p>
                        <p>Title</p>
                        <p>Client</p>
                        <p>Estimate</p>
                    </div>
                    <ListElement
                        ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfir_e3zfsT-SFb6FhGHDb7T3QmlMyF_uWmm7dunJ4A&s"
                        ProjectName="First project" Estimate="1448 $" Client="Tymur Rozhkovskyi" />
                    <ListElement
                        ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfir_e3zfsT-SFb6FhGHDb7T3QmlMyF_uWmm7dunJ4A&s"
                        ProjectName="Second" Estimate="608 $" Client="Wladislaw Dawiduk" />
                    <ListElement
                        ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfir_e3zfsT-SFb6FhGHDb7T3QmlMyF_uWmm7dunJ4A&s"
                        ProjectName="Test35" Estimate="1200 $" Client="Dawid Kond" />
                    <ListElement
                        ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfir_e3zfsT-SFb6FhGHDb7T3QmlMyF_uWmm7dunJ4A&s"
                        ProjectName="WebStore" Estimate="2540 $" Client="Jame Smit" />
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import ListElement from './ListElement.vue';

export default defineComponent({
    name: 'Workspace',
    components: {
        ListElement
    },
    data: () => ({
        dialog: false,
    }),
});
</script>
<style lang="scss"></style>