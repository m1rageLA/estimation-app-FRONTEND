<template>
    <div class="workspace">
        <div class="workspace__container">
            <div class="workspace__top-block">
                <h2>Estimates</h2>
                <AddEstimateDialog :Dialog="dialog" :UpdateProjects="updateProjects" />
            </div>
            <div class="list-markup">
                <p></p>


                <p>
                    <a href="#" @click.prevent="toggleSortOrder('name')" :class="{ 'active': sortKey === 'name' }">
                        Title (<b>{{ nameSortOrder }}</b>)
                    </a>
                </p>
                <p>Image</p>
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
                    <a href="#" @click.prevent="toggleSortOrder('client')" :class="{ 'active': sortKey === 'client' }">
                        Client (<b>{{ clientSortOrder }}</b>)
                    </a>
                </p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('estimate')"
                        :class="{ 'active': sortKey === 'estimate' }">
                        Estimate (<b>{{ countrySortOrder }}</b>)
                    </a>
                </p>

                <p>Edit</p>
            </div>
            <div class="workspace__list">
                <EstimateBox v-for="project in sortedClients(sortKey)" :key="project.id" class="estimate-box"
                    :ProjectName="project.name" :ClientName="project.client" :ClientId="project.client"
                    :GetClients="clients" :Estimates="estimates" :Projects="project.id" :Dialog="dialog">
                    <!-- Фильтрация и отображение LiElementEstimate -->
                    <LiElementEstimate v-for="estimate in filteredEstimates(project.id)" :key="estimate.id"
                        :Projects="projects" :Estimate="estimate" :EstimateId="estimate.id" :Title="estimate.title" :ProjectId="project.id"
                        :Description="estimate.description" :DateEst="estimate.date"
                        :Cost="estimate.cost" :Type="estimate.cost" :Created_ad="estimate.created_at" :updateProjects="updateProjects" />

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
            createdAtSortOrder: 'new',
            idSortOrder: 'asc',
            clientSortOrder: 'a - z',
            countrySortOrder: 'a - z',
            sortKey: 'created_at',
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
        // close with parent and child (Closures funct.)
        handleDataFromChild(data) {
            this.dialog2 = data;
            this.updateClients();
        },
        openDialog() {
            this.dialog2 = true;
        },
        toggleSortOrder(category) {
            switch (category) {
                case 'name':
                    this.nameSortOrder = this.nameSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'id':
                    this.idSortOrder = this.idSortOrder === 'asc' ? 'desc' : 'asc';
                    break;
                case 'created_at':
                    this.createdAtSortOrder = this.createdAtSortOrder === 'new' ? 'old' : 'new';
                    break;
                case 'client':
                    this.clientSortOrder = this.clientSortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                case 'estimate':
                    this.countrySortOrder = this.countrySortOrder === 'a - z' ? 'z - a' : 'a - z';
                    break;
                default:
                    break;
            }

            this.sortKey = category;
        },
        sortedClients() {
            let sortedArray = this.projects.slice();
            const key = this.sortKey;

            switch (key) {
                case 'name':
                    sortedArray.sort((a, b) => {
                        if (this.nameSortOrder === 'a - z') {
                            return a.name.localeCompare(b.name);
                        } else {
                            return b.name.localeCompare(a.name);
                        }
                    });
                    break;
                case 'id':
                    sortedArray.sort((a, b) => {
                        if (this.idSortOrder === 'asc') {
                            return a.id - b.id;
                        } else if (this.idSortOrder === 'desc') {
                            return b.id - a.id;
                        }
                    });
                    break;
                case 'created_at':
                    sortedArray.sort((a, b) => {
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        if (this.createdAtSortOrder === 'new') {
                            return dateB - dateA;
                        } else {
                            return dateA - dateB;
                        }
                    });
                    break;
                case 'client':
                    sortedArray.sort((a, b) => {
                        if (this.clientSortOrder === 'a - z') {
                            return a.client.localeCompare(b.client);
                        } else {
                            return b.client.localeCompare(a.client);
                        }
                    });
                    break;
                case 'estimate':
                    sortedArray.sort((a, b) => {
                        if (this.countrySortOrder === 'a - z') {
                            return a.country.localeCompare(b.country);
                        } else {
                            return b.country.localeCompare(a.country);
                        }
                    });
                    break;
                default:
                    break;
            }

            return sortedArray;
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
        };
    }
});
</script>

<style lang="scss"></style>