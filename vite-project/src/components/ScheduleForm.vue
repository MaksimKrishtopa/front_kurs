<template>
  <form @submit.prevent="handleSubmit">
    <div class="main__form">
    <div>
      <label for="doctor">Врач:</label>
      <select v-model="formData.doctorId" required>
        <option value="" disabled>Выберите врача</option>
        <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
          {{ doctor.surname }} {{ doctor.name }} {{ doctor.patronymic }}
        </option>
      </select>
    </div>
    
    <div>
      <label for="date_and_time">Дата и время:</label>
      <input type="datetime-local" v-model="formData.date_and_time" required />
    </div>
  </div>
  <div class="form__btn">
    <button type="submit">Добавить</button>
  </div>
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
      
    }
  },
  methods: {
    handleSubmit() {
      const dateTimeFormatted = this.formData.date_and_time.replace('T', ' ');
      this.$emit('submit', { ...this.formData, date_and_time: dateTimeFormatted });
    },
  },
};
</script>


<style scoped>
label {
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
}

input, select {
  background-color: #fff;
  color: #343434;
  padding: 5px;
  font-size: 20px;
  border-radius: 5px;
}

input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  display: none;
}

input[type=datetime-local]::-webkit-datetime-edit-hour-field {
  margin-left: 10px;
}


.form__btn {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

button {
  background-color: #fff;
  color: #239AB5;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 20px;
  border: none;
}

button:hover {
  background-color: #e0f7fa;
}

.form__field {
  display: flex;
  justify-content: space-between;
}

.form__actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.main__form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

</style>