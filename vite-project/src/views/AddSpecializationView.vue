<template>
  <div>
    <h1>Add Specialization</h1>
    <SpecializationForm @submit="handleAddSpecialization" />
  </div>
</template>

<script>
import SpecializationForm from '../components/SpecializationForm.vue';

export default {
  components: { SpecializationForm },
  methods: {
    async handleAddSpecialization(specializationData) {
      try {
        const response = await fetch('http://localhost:80/api/specializations/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(specializationData),
        });

        if (!response.ok) {
          throw new Error('Failed to add specialization: ' + response.statusText);
        }

        const newSpecialization = await response.json();
        console.log('Specialization added:', newSpecialization);
        this.$router.push('/specializations'); // Перенаправление на список специализаций после добавления
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>


<style scoped>

  main {
    background-color: black;
  }

  form {
    background-color: black;
  }

  h1 {
    background-color: black;
  }

</style>