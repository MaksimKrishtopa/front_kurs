<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Specialization Name:</label>
        <input type="text" v-model="formData.name" required />
      </div>
  
      <div>
        <label for="description">Description:</label>
        <textarea v-model="formData.description" required></textarea>
      </div>
  
      <button type="submit">Add Specialization</button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      initialData: {
        type: Object,
        default: () => ({
          name: '',
          description: '',
        }),
      },
    },
    data() {
      return {
        formData: { ...this.initialData },
      };
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', { ...this.formData });
      },
    },
  };
  </script>
  