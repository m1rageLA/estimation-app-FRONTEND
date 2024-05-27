<template>
  <div class="workspace">
    <div class="workspace__container">
      <div class="workspace__top-block">
        <h2>Clients</h2>
        <div class="py-5">
          <v-dialog v-model="dialog" max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn class="text-none font-weight-regular" prepend-icon="mdi mdi-plus" text="Add client" variant="outlined"
                v-bind="activatorProps"></v-btn>
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
        </div>
      </div>
      <div class="list-markup">
        <p>Image</p>
        <p><a href="">Name (<b>a - z</b>)</a></p>
        <p><a href="">Created at (<b>new</b>)</a></p>
        <p><a href="">Email (<b>a - z</b>)</a></p>
        <p>Edit</p>
      </div>
      <ul class="workspace__list">
        <ul>
          <ListElement v-for="client in clients" :key="client.id" :ImageUrl="client.imageUrl" :ProjectName="client.name"
            :Estimate="client.email" :Client="client.created_at" />
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import ListElement from '../ListElement.vue';
import axios from 'axios';

export default defineComponent({
  name: 'Clients',
  components: {
    ListElement
  },
  setup() {
    const dialog = ref(false);
    const clients = ref([]);
    const rules = [
      value => {
        return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
      },
    ];

    const getAllClients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clients');
        clients.value = response.data;
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    onMounted(() => {
      getAllClients();
    });

    return {
      dialog,
      clients,
      rules,
      getAllClients,
    };
  }
});
</script>

<style lang="scss"></style>