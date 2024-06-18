<template>
    <div>
        <v-btn @click="dialog = true" icon="mdi mdi-file-edit-outline" variant="text"></v-btn>
        <v-dialog v-model="dialog" max-width="500">
            <v-card prepend-icon="mdi-account" title="Edit estimate item">
                <v-card-text>
                    <v-form @submit.prevent="updateProject">
                        <v-row dense>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.title" label="Title" hint="Web site"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.description" label="Description"
                                    hint="Project about creating neural networks" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-autocomplete v-model="form.project_id" :items="Projects" color="blue-grey-lighten-2"
                                    item-title="title" item-value="id" label="Project" chips closable-chips>
                                    <template v-slot:chip="{ props, item }">
                                        <v-chip v-bind="props"
                                            :prepend-avatar="'http://localhost:8000/storage/' + item.raw.preview"
                                            :text="item.raw.name"></v-chip>
                                    </template>
                                    <template v-slot:item="{ props, item }">
                                        <v-list-item v-bind="props"
                                            :prepend-avatar="'http://localhost:8000/storage/' + item.raw.preview"
                                            :subtitle="item.raw.client" :title="item.raw.name"></v-list-item>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-date-input v-model="form.date" label="Date input"
                                    :allowed-dates="allowedDates"></v-date-input>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-text-field v-model="form.cost" label="Estimate" hint="1400$" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" sm="6">
                                <v-radio-group inline v-model="form.type">
                                    <v-radio label="Hourly" value="hourly"></v-radio>
                                    <v-radio label="Fixed price" value="fixed"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-btn @click="deleteClient" style="opacity: 70%;" icon="mdi mdi-delete"
                                variant="text"></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" variant="plain" @click="dialog = false">Close</v-btn>
                            <v-btn color="primary" text="Save" variant="tonal" type="submit">Save</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import uploadImage from '../../../scripts/uploadImage';
import deleteItem from '../../../scripts/deleteItem';
import updateItem from '../../../scripts/updateItem';
import { VDateInput } from 'vuetify/labs/VDateInput';

export default {
    name: "EditProjectDialog",
    props: {
        Estimate: Object,
        ImageUrl: String,
        updateProjects: Function,
        Projects: Array,
        Cost: String,
        UpdateEstimates: {
            type: Function,
            required: true
        },
    },
    components: {
        VDateInput
    },
    data() {
        return {
            dialog: false,
            form: {
                id: this.Estimate.id,
                title: this.Estimate.title,
                description: this.Estimate.description,
                preview: this.ImageUrl,
                type: this.Estimate.type,
                cost: this.Estimate.cost,
                project_id: this.Estimate.project_id,
                date: new Date(this.Estimate.date),
            },
            rules: [(v) => !!v || 'Required.']
        }
    },
    watch: {
        dialog(val) {
            if (val) {
                this.form = {
                    id: this.Estimate.id,
                    title: this.Estimate.title,
                    description: this.Estimate.description,
                    estimate: this.Estimate.estimate,
                    preview: this.ImageUrl,
                    type: this.Estimate.type,
                    cost: this.Estimate.cost,
                    project_id: this.Estimate.project_id,
                    date: new Date(this.Estimate.date),
                };
            }
        }
    },

    methods: {
        allowedDates(date) {
            const parsedDate = new Date(date);
            return parsedDate >= new Date('2023-01-01') && parsedDate <= new Date('2024-12-31');
        },
        async deleteClient() {
            try {
                await deleteItem(`estimates/${this.form.id}`);
                this.dialog = false;
                this.UpdateEstimates();
                this.updateProjects();
            } catch (error) {
                console.error(error);
            }
        },
        async getNewImageName() {
            try {
                const imageName = await uploadImage(this.form.preview);
                this.form.preview = imageName;
            } catch (error) {
                console.error(error);
            }
        },
        async updateProject() {
            if (!this.form.project_id) {
                console.error('Please select a project');
                return;
            }
            const isoDate = new Date(this.form.date.getTime() - (this.form.date.getTimezoneOffset() * 60000))
                .toISOString()
                .split('T')[0];

            const estimateData = {
                title: this.form.title,
                description: this.form.description,
                preview: this.form.preview,
                type: this.form.type,
                cost: this.form.cost,
                project_id: this.form.project_id,
                date: isoDate,
            };

            try {
                await updateItem(`estimates/${this.Estimate.id}`, estimateData);
                this.dialog = false;
                this.UpdateEstimates();
                this.updateEstimates();
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>

<style scoped></style>
