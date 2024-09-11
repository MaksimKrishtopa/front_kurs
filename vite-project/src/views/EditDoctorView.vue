<template>
  <div class="container">
    <h1>Редактирование данных врача</h1>
    <DoctorForm :doctor="doctor" :specializations="specializations" :isEditMode="true" @submit="handleEditDoctor" />
  </div>
</template>

<script>
import DoctorForm from '../components/DoctorForm.vue';

export default {
  components: { DoctorForm },
  data() {
    return {
      doctor: null,
      specializations: [],
    };
  },
  async created() {
    const doctorId = this.$route.params.id;
    try {
      const doctorResponse = await fetch(`/api/doctors/${doctorId}`);
      if (!doctorResponse.ok) {
        throw new Error('Failed to fetch doctor: ' + doctorResponse.statusText);
      }
      this.doctor = await doctorResponse.json();

    
      const specializationsResponse = await fetch('http://localhost:80/api/doctors/create');
      if (!specializationsResponse.ok) {
        throw new Error('Failed to load specializations: ' + specializationsResponse.statusText);
      }
      const data = await specializationsResponse.json();
      if (data.status) {
        this.specializations = data.data || [];
      } else {
        console.error('Error loading specializations:', data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  methods: {
    async handleEditDoctor(updatedDoctorData) {
      try {
        const response = await fetch(`/api/doctors/${updatedDoctorData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$store.getters.userToken}`,
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

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  background-image: url('data:image/svg+xml;utf8,');
  }
</style>