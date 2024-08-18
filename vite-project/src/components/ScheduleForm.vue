<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="doctor">Doctor:</label>
        <select v-model="formData.doctorId" required>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }}
          </option>
        </select>
      </div>
      
      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="formData.date" required />
      </div>
  
      <button type="submit">Add Schedule</button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      initialData: {
        type: Object,
        default: () => ({
          doctorId: '',
          date: '',
          time: '',
          duration: '',
        }),
      },
    },
    data() {
      return {
        formData: { ...this.initialData },
        doctors: [],
      };
    },
    async created() {
      try {
        const response = await fetch('/api/doctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors: ' + response.statusText);
        }
        this.doctors = await response.json();
      } catch (error) {
        console.error(error.message);
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', { ...this.formData });
      },
    },
  };
  </script>
  