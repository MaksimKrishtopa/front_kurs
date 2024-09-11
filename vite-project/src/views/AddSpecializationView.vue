<template>
  <div class="container">
    <div class="header">
      <h1>Добавление специализации</h1>
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

      this.$router.push('/doctors');
    } catch (error) {
    }
  },
},
};
</script>

<style scoped>


h1 {
  text-align: center;
  color: white;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 50px;
}

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

</style>
