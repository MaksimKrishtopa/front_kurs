<template>
  <div class="container">
    <div class="header">
      <h1>Добавление врача</h1>
    </div>
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
        const response = await fetch('http://localhost:80/api/doctors/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + this.$store.getters.userToken,
          },
          body: JSON.stringify(doctorData),
        });

        if (!response.ok) {
          throw new Error('Не удалось добавить врача: ' + response.statusText);
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

.header {
  display: flex;
  justify-content: center;
}

h1 {
  text-align: center;
  color: white;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 50px;
}
.header-item {
  color: white;
  font-size: 18px;
  cursor: pointer;
}
</style>
