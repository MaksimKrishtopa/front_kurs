<template>
  <div class="container">
    <div class="header">
      <div class="header-item">+ Врача</div>
      <h1>Добавление специализации</h1>
      <div class="header-item">+ Специализацию</div>
    </div>
    <SpecializationForm @submit="handleAddSpecialization" />

  </div>
</template>

<script>
import SpecializationForm from '../components/SpecializationForm.vue';

export default {
  components: { SpecializationForm },
  data() {
    return {

    };
  },
  methods: {
  async handleAddSpecialization(specializationData) {
    console.log('Sending specialization data:', specializationData); 

    try {
      const response = await fetch('http://localhost:80/api/specializations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + this.$store.getters.userToken,
        },
        body: JSON.stringify(specializationData),
      });


    } catch (error) {
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
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  color: white;
}

.header-item {
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 20px;
}

.success-message {
  color: green;
  margin-top: 20px;
}
</style>
