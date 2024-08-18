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

        this.$router.push('/specializations');
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
</style>