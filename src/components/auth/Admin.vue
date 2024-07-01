<template>
    <div class="workspace">
      <div class="workspace__container">
        <div class="workspace__top-block">
          <h2>Clients</h2>
          <p style="margin-top: 10px;">This functionality is available only for the user with id "2" (Admin)</p>
          <div class="py-5">
           
          </div>
        </div>

        <div class="workspace__list">
          <ul>
            <LiElementUsers v-for="client in sortedClients" :key="client.id" :ClientId="client.id"
              :Bio="client.bio" :Phone="client.phone" :firstName="client.first_name" :lastname="client.last_name" :Email="client.email" :Country="client.country"
              :Created_ad="client.created_at" :updateClients="updateClients" />
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import LiElementClient from '../workspace/list/LiElementClient.vue'
  import axios from 'axios';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
import LiElementUsers from '../workspace/list/LiElementUsers.vue';
  
  export default defineComponent({
    name: 'Clients',
    components: {
        LiElementUsers
    },
    data() {
      return {
        nameSortOrder: 'a - z',
        createdAtSortOrder: 'new',
        idSortOrder: 'asc',
        emailSortOrder: 'a - z',
        countrySortOrder: 'a - z',
        sortKey: 'created_at',
        dialog: false,
        clients: [],
        searchQuery: '',
        form: {
          name: '',
          email: '',
          country: '',
          avatar: null
        },
        rules: [
          value => {
            return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
          },
        ]
      };
    },
    methods: {
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
          case 'email':
            this.emailSortOrder = this.emailSortOrder === 'a - z' ? 'z - a' : 'a - z';
            break;
          case 'country':
            this.countrySortOrder = this.countrySortOrder === 'a - z' ? 'z - a' : 'a - z';
            break;
          default:
            break;
        }
  
        this.sortKey = category;
      },
      async updateClients() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${process.env.API_URL}/api/login`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          this.clients = response.data;
        } catch (error) {
          console.error('Ошибка:', error);
        }
      },
      async submitForm() {
        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('email', this.form.email);
        formData.append('country', this.form.country);
        if (this.form.avatar) {
          formData.append('avatar', this.form.avatar);
        }
  
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(`${process.env.API_URL}/api/clients`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 201) {
            this.dialog = false;
            toast("Client created successfully!", {
              "theme": "auto",
              "type": "success",
              "position": "top-center",
              "autoClose": 1800,
              "dangerouslyHTMLString": true
            });
            this.updateClients();
          }
        } catch (error) {
          console.error('Ошибка при отправке формы:', error);
        }
      },
      searchClients() {
        this.sortKey = 'name';
      }
    },
    computed: {
      sortedClients() {
        let filteredArray = this.clients;
  
        if (this.searchQuery) {
          filteredArray = filteredArray.filter(client =>
            client.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
  
        const key = this.sortKey;
  
        switch (key) {
          case 'name':
            filteredArray.sort((a, b) => {
              if (this.nameSortOrder === 'a - z') {
                return a.name.localeCompare(b.name);
              } else {
                return b.name.localeCompare(a.name);
              }
            });
            break;
          case 'created_at':
            filteredArray.sort((a, b) => {
              const dateA = new Date(a.created_at);
              const dateB = new Date(b.created_at);
              if (this.createdAtSortOrder === 'new') {
                return dateB - dateA;
              } else {
                return dateA - dateB;
              }
            });
            break;
          case 'id':
            filteredArray.sort((a, b) => {
              if (this.idSortOrder === 'asc') {
                return a.id - b.id;
              } else if (this.idSortOrder === 'desc') {
                return b.id - a.id;
              }
            });
            break;
          case 'email':
            filteredArray.sort((a, b) => {
              if (this.emailSortOrder === 'a - z') {
                return a.email.localeCompare(b.email);
              } else {
                return b.email.localeCompare(a.email);
              }
            });
            break;
          case 'country':
            filteredArray.sort((a, b) => {
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
  
        return filteredArray;
      }
    },
    mounted() {
      this.updateClients();
    }
  });
  </script>
  