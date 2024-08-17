<template>
  <div>
    <h1>Add Doctor</h1>
    <DoctorForm @submit="handleAddDoctor" />
  </div>
</template>

<script>
import DoctorForm from '../components/DoctorForm.vue';

export default {
  components: { DoctorForm },
  methods: {
    async handleAddDoctor(doctorData) {
      try {
        const response = await fetch('/api/doctors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(doctorData),
        });

        if (!response.ok) {
          throw new Error('Failed to add doctor: ' + response.statusText);
        }

        const newDoctor = await response.json();
        console.log('Doctor added:', newDoctor);
        this.$router.push('/doctors'); // Перенаправление на список врачей после добавления
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