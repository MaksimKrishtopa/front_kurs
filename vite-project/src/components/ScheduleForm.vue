<template>
  <form @submit.prevent="addSchedule">
    <div>
      <label for="doctor">Doctor:</label>
      <select style="background-color: black" v-model="doctorId" required>
        <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
          {{ doctor.surname }} {{ doctor.name }} {{ doctor.patronymic }}
        </option>
      </select>
    </div>

    <div>
      <label for="date">Date:</label>
      <input type="date" v-model="date" required />
    </div>

    <button type="submit">Add Schedule</button>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ScheduleForm',
  setup() {
    const store = useStore();

    const doctorId = ref('');
    const date = ref('');
    const doctors = ref([]);

    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:80/api/doctors', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + store.getters.userToken,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch doctors: ' + response.statusText);
        }
        doctors.value = await response.json();
      } catch (error) {
        console.error(error.message);
      }
    };

    const addSchedule = async () => {
      try {
        const response = await fetch('http://localhost:80/api/graph/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + store.getters.userToken,
          },
          body: JSON.stringify({
            doctorId: doctorId.value,
            date: date.value,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Ошибка:', errorData);
          throw new Error('Не удалось добавить расписание: ' + response.statusText);
        }

        alert('Расписание успешно добавлено!');
      } catch (error) {
        console.error('Ошибка при добавлении расписания:', error);
      }
    };

    onMounted(fetchDoctors);

    return {
      doctorId,
      date,
      doctors,
      addSchedule,
    };
  },
};
</script>

<style scoped>
/* Добавьте свои стили здесь */
</style>
