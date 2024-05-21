<template>
    <div class="workspace">
        <div class="workspace__container">
            <div class="workspace__top-block">
                <v-btn prepend-icon="$vuetify" variant="outlined">
                    Add new estimate
                </v-btn>
            </div>
            <div class="workspace__list">
                <ul>
                    <ListElement
                        ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfir_e3zfsT-SFb6FhGHDb7T3QmlMyF_uWmm7dunJ4A&s"
                        ProjectName="First" Estimate="258" Client="TymurR" />
                    <ListElement
                        ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfir_e3zfsT-SFb6FhGHDb7T3QmlMyF_uWmm7dunJ4A&s"
                        ProjectName="First" Estimate="258" Client="TymurR" />
                    <ListElement
                        ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfir_e3zfsT-SFb6FhGHDb7T3QmlMyF_uWmm7dunJ4A&s"
                        ProjectName="First" Estimate="258" Client="TymurR" />
                    <ListElement
                        ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfir_e3zfsT-SFb6FhGHDb7T3QmlMyF_uWmm7dunJ4A&s"
                        ProjectName="First" Estimate="258" Client="TymurR" />
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
    }
});
</script>
<style lang="scss"></style>