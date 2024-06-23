<template>
  <div class="workspace">
    <div class="workspace__container">
      <div class="workspace__top-block">
        <h2>Clients</h2>
        <div class="py-5">
          <v-dialog v-model="dialog" max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <div class="workspace__button-container">
                <div>
                  <v-btn class="text-none font-weight-regular" prepend-icon="mdi mdi-plus" text="Add client"
                    variant="outlined" v-bind="activatorProps"></v-btn>
                </div>
                <div class="workspace__button-container-input">
                  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
                    rel="stylesheet">
                  <div id="searchBox" class="mobile-form">
                    <form @submit.prevent="searchClients" class="search-form" id="searchform" method="get">
                      <span id="noEasy"><input class="sb-search-submit" type="submit" value="">
                        <span class="sb-icon-search"></span></span>
                      <input v-model="searchQuery" id="sbox" name="q"
                        onblur="if (this.placeholder == '') {this.placeholder = 'search';}"
                        onfocus="if (this.placeholder == 'search') {this.placeholder = '';}" placeholder="Search"
                        type="text" x-webkit-speech="">
                    </form>
                  </div>
                </div>
              </div>
            </template>
            <v-card prepend-icon="mdi-account" title="Add client item">
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-row dense>
                    <v-col cols="12" md="12" sm="6">
                      <v-text-field v-model="form.name" label="Full name" hint="Tymur Rozhkovskyi"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="6">
                      <v-text-field v-model="form.email" hint="example@gmail.com" label="Email"
                        type="email"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="6">
                      <v-text-field v-model="form.country" hint="United kingdom" label="Country"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="6">
                      <v-file-input v-model="form.avatar" :rules="rules" accept="image/png, image/jpeg, image/bmp"
                        label="Avatar" placeholder="Pick an avatar" prepend-icon="mdi-camera"></v-file-input>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
                    <v-btn color="primary" text="Save" variant="tonal" type="submit" @click="updateClient">Save</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div class="list-markup">
        <p>Select</p>
        <p>Image</p>
        <p>
          <a href="#" @click.prevent="toggleSortOrder('name')" :class="{ 'active': sortKey === 'name' }">
            Name (<b>{{ nameSortOrder }}</b>)
          </a>
        </p>
        <p>
          <a href="#" @click.prevent="toggleSortOrder('id')" :class="{ 'active': sortKey === 'id' }">
            #id (<b>{{ idSortOrder }}</b>)
          </a>
        </p>
        <p>
          <a href="#" @click.prevent="toggleSortOrder('created_at')" :class="{ 'active': sortKey === 'created_at' }">
            Created at (<b>{{ createdAtSortOrder }}</b>)
          </a>
        </p>
        <p>
          <a href="#" @click.prevent="toggleSortOrder('email')" :class="{ 'active': sortKey === 'email' }">
            Email (<b>{{ emailSortOrder }}</b>)
          </a>
        </p>
        <p>
          <a href="#" @click.prevent="toggleSortOrder('country')" :class="{ 'active': sortKey === 'country' }">
            Country (<b>{{ countrySortOrder }}</b>)
          </a>
        </p>
        <p>Edit</p>
      </div>
      <div class="workspace__list">
        <ul>
          <LiElementClient v-for="client in sortedClients" :key="client.id" :ClientId="client.id"
            :ImageUrl="client.avatar" :Name="client.name" :Email="client.email" :Country="client.country"
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

export default defineComponent({
  name: 'Clients',
  components: {
    LiElementClient
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
        const response = await axios.get(`${process.env.API_URL}/api/clients`, {
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
