<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="doctor">Doctor:</label>
      <select v-model="formData.doctorId" required>
        <option value="" disabled>Выберите врача</option>
        <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
          {{ doctor.surname }} {{ doctor.name }} {{ doctor.patronymic }}
        </option>
      </select>
    </div>
    
    <div>
      <label for="date_and_time">Date and Time:</label>
      <input type="datetime-local" v-model="formData.date_and_time" required />
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
        date_and_time: '',
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
      const response = await fetch('http://localhost:80/api/doctors', {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + this.$store.getters.userToken,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch doctors: ' + response.statusText);
      }
      const doctorsData = await response.json();
      this.doctors = doctorsData.data;
    } catch (error) {
      console.error('Ошибка при загрузке данных врачей:', error.message);
    }
  },
  methods: {
    handleSubmit() {
      const dateTime = `${this.formData.date}T${this.formData.time}:00`; // Форматирование в ISO строку
      this.$emit('submit', { ...this.formData, date_and_time: dateTime });
    },
  },
};
</script>
