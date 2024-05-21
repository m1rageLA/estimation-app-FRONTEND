<template lang="">
    <li class="listElement">
        <img :src="ImageUrl" alt="website"></img>
        <p>{{ProjectName}}</p>
        <p>{{Estimate}}</p>
        <p>{{Client}}</p>
    </li>
</template>
<script>
export default {
    name: "ListElement",
    props: {
        ProjectName: String,
        Estimate: Number,
        Client: String,
        ImageUrl: String
    }
}
</script>
<style lang="">

</style>