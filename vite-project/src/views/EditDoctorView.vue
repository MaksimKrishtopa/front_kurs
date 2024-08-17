<template>
  <div>
    <h1>Edit Doctor</h1>
    <DoctorForm :doctor="doctor" @submit="handleEditDoctor" />
  </div>
</template>

<script>
import DoctorForm from '../components/DoctorForm.vue';

export default {
  components: { DoctorForm },
  data() {
    return {
      doctor: null,
    };
  },
  async created() {
    const doctorId = this.$route.params.id;
    try {
      const response = await fetch(`/api/doctors/${doctorId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch doctor: ' + response.statusText);
      }

      this.doctor = await response.json();
    } catch (error) {
      console.error(error.message);
    }
  },
  methods: {
    async handleEditDoctor(updatedDoctorData) {
      const doctorId = this.$route.params.id;
      try {
        const response = await fetch(`/api/doctors/${doctorId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedDoctorData),
        });

        if (!response.ok) {
          throw new Error('Failed to update doctor: ' + response.statusText);
        }

        const updatedDoctor = await response.json();
        console.log('Doctor updated:', updatedDoctor);
        this.$router.push('/doctors'); // Перенаправление на список врачей после обновления
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