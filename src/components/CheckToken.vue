<template>
</template>

<script>
export default {
    name: 'CheckToken',
    setup() {
        const isAuthenticated = () => {
            const token = localStorage.getItem('token');
            return !!token;
        };

        isAuthenticated();

        return {
            isAuthenticated
        };
    }
};
</script>

<style lang="">
  </style>