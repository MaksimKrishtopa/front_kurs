<template>
  <div class="container">
    <h1>Редактирование данных врача</h1>
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

        this.$router.push('/doctors');
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #189AB4;
  border-radius: 10px;
  padding: 20px;
  max-width: 800px;
  margin: 50px auto;
}

h1 {
  text-align: center;
  color: white;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 50px;
}
</style>