<template>
    <div class="workspace">
        <div class="workspace__container">
            <div class="workspace__top-block">
                <h2>Estimates</h2>
                <AddEstimateDialog v-if="projects.length > 0" :Dialog="dialog" :Projects="projects"
                    :UpdateProjects="updateProjects" :UpdateEstimates="updateEstimates" />
            </div>
            <div class="list-markup-estimate">
                <p></p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('clientName')"
                        :class="{ 'active': sortKey === 'clientName' }">
                        Project date (<b>{{ nameSortOrder }}</b>)
                    </a>
                </p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('projectName')"
                        :class="{ 'active': sortKey === 'projectName' }">
                        Project name (<b>{{ idSortOrder }}</b>)
                    </a>
                </p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('clientName')"
                        :class="{ 'active': sortKey === 'clientName' }">
                        Client (<b>{{ nameSortOrder }}</b>)
                    </a>
                </p>

                <!-- <p>
                    <a href="#" @click.prevent="toggleSortOrder('created_at')"
                        :class="{ 'active': sortKey === 'created_at' }">
                        Estimate (<b>{{ createdAtSortOrder }}</b>)
                    </a>
                </p> -->
            </div>
            <div class="workspace__list">
                <EstimateBox v-for="project in sortedList(sortKey)" :key="project.id" class="estimate-box"
                    :ProjectName="project.name" :ClientName="project.client" :ClientId="project.client"
                    :GetClients="clients" :Estimates="estimates" :Projects="project.id" :Dialog="dialog">
                    <div class="list_estimateBox">
                        <p>Select</p>

                        <p>
                            <a href="#" @click.prevent="toggleSortOrder('name')"
                                :class="{ 'active': sortKey === 'name' }">
                                Title (<b>{{ nameSortOrder }}</b>)
                            </a>
                        </p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrder('id')" :class="{ 'active': sortKey === 'id' }">
                                #id (<b>{{ idSortOrder }}</b>)
                            </a>
                        </p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrder('created_at')"
                                :class="{ 'active': sortKey === 'created_at' }">
                                Created at (<b>{{ createdAtSortOrder }}</b>)
                            </a>
                        </p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrder('client')"
                                :class="{ 'active': sortKey === 'client' }">
                                Client (<b>{{ clientSortOrder }}</b>)
                            </a>
                        </p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrder('estimate')"
                                :class="{ 'active': sortKey === 'estimate' }">
                                Estimate (<b>{{ estimateSortOrder }}</b>)
                            </a>
                        </p>

                        <p>Type</p>
                        <p>Edit</p>
                    </div>

                    <LiElementEstimate v-for="estimate in filteredEstimates(project.id)" :key="estimate.id"
                        :Projects="projects" :Estimate="estimate" :EstimateId="estimate.id"
                        :UpdateEstimates="updateEstimates" :Title="estimate.title" :ProjectId="project.id"
                        :Description="estimate.description" :DateEst="estimate.date" :Cost="estimate.cost"
                        :Type="estimate.cost" :Created_ad="estimate.created_at" :updateProjects="updateProjects" />

                </EstimateBox>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import LiElementEstimate from '../workspace/list/LiElementEstimate.vue';
import axios from 'axios';
import 'vue3-toastify/dist/index.css';
import AddClientDialog from './modals/AddClientDialog.vue';
import AddProjectDialog from './modals/AddProjectDialog.vue';
import AddEstimateDialog from './modals/AddEstimateDialog.vue';
import EstimateBox from './list/EstimateBox.vue';


export default defineComponent({
    name: 'Clients',
    components: {
        LiElementEstimate,
        AddClientDialog,
        AddProjectDialog,
        AddEstimateDialog,
        EstimateBox,
    },
    data() {
        return {
            nameSortOrder: 'a - z',
            createdAtSortOrder: 'a - z',
            idSortOrder: 'a - z',
            sortKey: 'projectName',
            friends: [],
            isUpdating: false,
            dialog2: false,
            isOpen: false,
        };
    },
    methods: {
        filteredEstimates(projectId) {
            return this.estimates.filter(estimate => estimate.project_id === projectId);
        },
        handleDataFromChild(data) {
            this.dialog2 = data;
            this.updateClients();
        },
        openDialog() {
            this.dialog2 = true;
        },
        toggleSortOrder(category) {
            switch (category) {
                case 'clientName':
                    this.nameSortOrder = this.nameSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'projectName':
                    this.idSortOrder = this.idSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'created_at':
                    this.createdAtSortOrder = this.createdAtSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                default:
                    break;
            }

            this.sortKey = category;
        },
        sortedList(sortKey) {
            if (sortKey === 'clientName' || sortKey === 'projectName') {
                console.log("CLIENT&&PROJECT SORT TYPE");
                let sortedArray = this.projects.slice();
                const key = this.sortKey;

                switch (sortKey) {
                    case 'clientName':
                        sortedArray.sort((a, b) => {
                            if (this.nameSortOrder === 'a - z') {
                                return a.client.localeCompare(b.client); // Sort by client name ascending
                            } else {
                                return b.client.localeCompare(a.client); // Sort by client name descending
                            }
                        });
                        break;
                    case 'projectName':
                        sortedArray.sort((a, b) => {
                            if (this.idSortOrder === 'a - z') {
                                return a.name.localeCompare(b.name); // Sort by project name ascending
                            } else {
                                return b.name.localeCompare(a.name); // Sort by project name descending
                            }
                        });
                        break;
                    default:
                        break;
                }

                return sortedArray;
            } else if (sortKey === 'estimateName') {
                console.log("ESTIMATE SORT TYPE");
            }
        }

    },
    setup() {
        const dialog = ref(false);
        const dialog2 = ref(false);
        const projects = ref([]);
        const clients = ref([]);
        const estimates = ref([]);
        const form = ref({
            name: '',
            client: '',
            description: '',
            preview: ''
        });
        const rules = [
            value => {
                return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
            },
        ];
        const updateProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/projects');
                projects.value = response.data;
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        const updateClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clients');
                clients.value = response.data;
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        const updateEstimates = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/estimates');
                estimates.value = response.data;
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        onMounted(() => {
            updateProjects();
            updateClients();
            updateEstimates();
        });

        return {
            dialog,
            dialog2,
            projects,
            clients,
            estimates,
            form,
            rules,
            updateProjects,
            updateClients,
            updateEstimates
        };
    }
});
</script>

<style lang="scss"></style>