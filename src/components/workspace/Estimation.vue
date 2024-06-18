<!-- TO-DO сделать сортировку проетков по клиентам -->
<!-- TO-DO сделать сортировку проетков по клиентам -->
<!-- TO-DO сделать сортировку проетков по клиентам -->


<template>
    <div class="workspace">
        <div class="workspace__container">
            <div class="workspace__top-block">
                <h2>Estimates</h2>
                <AddEstimateDialog v-if="projects.length > 0" :Dialog="dialog" :Projects="projects"
                    :UpdateProjects="updateProjects" :UpdateEstimates="updateEstimates" />
            </div>
            <div class="list-markup-estimate">
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('projectName')"
                        :class="{ 'active': sortKey === 'projectName' }">
                        Project Name (<b>{{ projectNameSortOrder }}</b>)
                    </a>
                </p>

                <p>
                    <a href="#" @click.prevent="toggleSortOrder('projectDate')"
                        :class="{ 'active': sortKey === 'projectDate' }">
                        Project Date (<b>{{ projectDateSortOrder }}</b>)
                    </a>
                </p>

                <p>
                    <a href="#" @click.prevent="toggleSortOrder('clientName')"
                        :class="{ 'active': sortKey === 'clientName' }">
                        Client Name (<b>{{ clientNameSortOrder }}</b>)
                    </a>
                </p>

            </div>
            <div class="workspace__list">
                <EstimateBox v-for="project in sortedList(sortKey)" :key="project.id" class="estimate-box"
                    :ProjectName="project.name" :ClientName="project.client" :ClientId="project.client"
                    :GetClients="clients" :Estimates="estimates" :Projects="project.id" :Dialog="dialog">
                    <div class="list_estimateBox">
                        <p>Select</p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrderEstimate('name')"
                                :class="{ 'active': sortKeyEstimate === 'name' }">
                                Title (<b>{{ nameSortOrder }}</b>)
                            </a>
                        </p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrderEstimate('id')"
                                :class="{ 'active': sortKeyEstimate === 'id' }">
                                #id (<b>{{ idSortOrder }}</b>)
                            </a>
                        </p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrderEstimate('created_at')"
                                :class="{ 'active': sortKeyEstimate === 'created_at' }">
                                Date (<b>{{ createdAtSortOrder }}</b>)
                            </a>
                        </p>
                        <p>Description</p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrderEstimate('estimate')"
                                :class="{ 'active': sortKeyEstimate === 'estimate' }">
                                Estimate (<b>{{ estimateSortOrder }}</b>)
                            </a>
                        </p>
                        <p>
                            <a href="#" @click.prevent="toggleSortOrderEstimate('type')"
                                :class="{ 'active': sortKeyEstimate === 'type' }">
                                Type (<b>{{ typeSortOrder }}</b>)
                            </a>
                        </p>
                        <p>Edit</p>
                    </div>
                    <LiElementEstimate v-for="estimate in sortedEstimates(project.id)" :key="estimate.id"
                        :Projects="projects" :Estimate="estimate" :EstimateId="estimate.id"
                        :UpdateEstimates="updateEstimates" :Title="estimate.title" :ProjectId="project.id"
                        :Description="estimate.description" :DateEst="estimate.date" :Cost="estimate.cost"
                        :Type="estimate.type" :Created_ad="estimate.created_at" :updateProjects="updateProjects" />
                </EstimateBox>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import LiElementEstimate from '../workspace/list/LiElementEstimate.vue';
import axios from 'axios';
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
            createdAtSortOrder: 'new',
            idSortOrder: 'asc',
            estimateSortOrder: 'min',
            typeSortOrder: 'fixed',
            projectNameSortOrder: 'a - z',
            clientNameSortOrder: 'a - z',
            projectDateSortOrder: 'new',
            sortKey: 'projectName',
            sortKeyEstimate: 'name',
            projects: [],
            clients: [],
            estimates: [],
        };
    },
    methods: {
        toggleSortOrder(category) {
            switch (category) {
                case 'clientName':
                    this.clientNameSortOrder = this.clientNameSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'projectName':
                    this.projectNameSortOrder = this.projectNameSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'projectDate':
                    this.projectDateSortOrder = this.projectDateSortOrder === 'new' ? 'old' : 'new';
                    break;
                default:
                    break;
            }
            this.sortKey = category;
        },

        toggleSortOrderEstimate(category) {
            switch (category) {
                case 'name':
                    this.nameSortOrder = this.nameSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'id':
                    this.idSortOrder = this.idSortOrder === 'asc' ? 'dec' : 'asc';
                    break;
                case 'created_at':
                    this.createdAtSortOrder = this.createdAtSortOrder === 'new' ? 'old' : 'new';
                    break;
                case 'type':
                    this.typeSortOrder = this.typeSortOrder === 'fixed' ? 'hourly' : 'fixed';
                    break;
                case 'estimate':
                    this.estimateSortOrder = this.estimateSortOrder === 'min' ? 'max' : 'min';
                    break;
                default:
                    break;
            }
            this.sortKeyEstimate = category;
        },
        sortedList(sortKey) {
            let sortedArray = this.projects.slice();
            switch (sortKey) {
                case 'clientName':
                    sortedArray.sort((a, b) => {
                        return this.clientNameSortOrder === 'a - z' ? a.client.localeCompare(b.client) : b.client.localeCompare(a.client);
                    });
                    break;
                case 'projectName':
                    sortedArray.sort((a, b) => {
                        return this.projectNameSortOrder === 'a - z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                    });
                    break;
                case 'projectDate':
                    sortedArray.sort((a, b) => {
                        return this.projectDateSortOrder === 'new' ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at);
                    });
                    break;
                default:
                    break;
            }
            return sortedArray;
        },

        sortedEstimates(projectId) {
            let sortedArray = this.estimates.filter(estimate => estimate.project_id === projectId).slice();
            switch (this.sortKeyEstimate) {
                case 'name':
                    sortedArray.sort((a, b) => {
                        return this.nameSortOrder === 'a - z' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                    });
                    break;
                case 'id':
                    sortedArray.sort((a, b) => {
                        return this.idSortOrder === 'asc' ? a.id - b.id : b.id - a.id;
                    });
                    break;
                case 'created_at':
                    sortedArray.sort((a, b) => {
                        return this.createdAtSortOrder === 'new' ? a.created_at.localeCompare(b.created_at) : b.created_at.localeCompare(a.created_at);
                    });
                    break;
                case 'type':
                    sortedArray.sort((a, b) => {
                        return this.typeSortOrder === 'fixed' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
                    });
                    break;
                case 'estimate':
                    sortedArray.sort((a, b) => {
                        return this.estimateSortOrder === 'min' ? a.cost - b.cost : b.cost - a.cost;
                    });
                    break;
                default:
                    break;
            }
            return sortedArray;
        },
    },
    setup() {
        const projects = ref([]);
        const clients = ref([]);
        const estimates = ref([]);

        const updateProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/projects');
                projects.value = response.data;
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const updateClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clients');
                clients.value = response.data;
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const updateEstimates = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/estimates');
                estimates.value = response.data;
            } catch (error) {
                console.error('Error:', error);
            }
        };

        onMounted(() => {
            updateProjects();
            updateClients();
            updateEstimates();
        });

        return {
            projects,
            clients,
            estimates,
            updateProjects,
            updateClients,
            updateEstimates,
        };
    },
});
</script>
