<template>
    <div class="workspace">
        <div class="workspace__container">
            <div class="workspace__top-block">
                <h2>Projects </h2>
                <AddProjectDialog v-if="clients.length > 0" :Dialog="dialog" :Dialog2="dialog2"
                    :UpdateProjects="updateProjects" />
            </div>
            <div class="list-markup">
                <p>Select</p>
                <p>Image</p>

                <p>
                    <a href="#" @click.prevent="toggleSortOrder('name')" :class="{ 'active': sortKey === 'name' }">
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
                    <a href="#" @click.prevent="toggleSortOrder('client')" :class="{ 'active': sortKey === 'client' }">
                        Client (<b>{{ clientSortOrder }}</b>)
                    </a>
                </p>
                <p>
                    <a href="#" @click.prevent="toggleSortOrder('estimate')"
                        :class="{ 'active': sortKey === 'estimate' }">
                        Estimate (<b>{{ estimateSortOrder }}</b>)
                    </a>
                </p>

                <p>Edit</p>
            </div>
            <div class="workspace__list">
                <ul>
                    <LiElementProject v-for="projects in sortedClients(sortKey) " :key="projects.id"
                        :ProjectId="projects.id" :ImageUrl="projects.preview" :GetClients="clients"
                        :Estimate="getTotalEstimate(projects.id)" :Title="projects.name" :Client="projects.client"
                        :Created_ad="projects.created_at" :updateProjects="updateProjects" />
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import LiElementProject from '../workspace/list/LiElementProject.vue';
import axios from 'axios';
import 'vue3-toastify/dist/index.css';
import AddClientDialog from './modals/AddClientDialog.vue';
import AddProjectDialog from './modals/AddProjectDialog.vue';


export default defineComponent({
    name: 'Clients',
    components: {
        LiElementProject,
        AddClientDialog,
        AddProjectDialog
    },
    data() {
        return {
            nameSortOrder: 'a - z',
            createdAtSortOrder: 'new',
            idSortOrder: 'asc',
            clientSortOrder: 'a - z',
            countrySortOrder: 'a - z',
            sortKey: 'created_at',
            estimateSortOrder: 'min',
            friends: [],
            isUpdating: false,
            dialog2: false,
            isOpen: false,
        };
    },
    methods: {
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
                    this.estimateSortOrder = this.estimateSortOrder === 'min' ? 'max' : 'min';
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
                        const estimateA = parseFloat(this.getTotalEstimate(a.id));
                        const estimateB = parseFloat(this.getTotalEstimate(b.id));

                        if (this.estimateSortOrder === 'min') {
                            return estimateA - estimateB;
                        } else {
                            return estimateB - estimateA;
                        }
                    });
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
        const getTotalEstimate = (projectId) => {
            const clientEstimates = estimates.value.filter(estimate => estimate.project_id === projectId);
            const total = clientEstimates.reduce((accumulator, estimate) => {
                return accumulator + parseFloat(estimate.cost);
            }, 0);

            return total.toFixed(2);
        }

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
            form,
            rules,
            updateProjects,
            getTotalEstimate,
            updateEstimates,
            updateClients,
        };
    }
});
</script>

<style lang="scss"></style>