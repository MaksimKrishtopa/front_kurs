<template>
  <div class="container">
    <div class="header">
      <div class="header-item">+ Врача</div>
      <h1>Добавление расписания</h1>
      <div class="header-item">+ Специализацию</div>
    </div>
    <ScheduleForm @submit="handleAddSchedule" />
  </div>
</template>

<script>
import ScheduleForm from '../components/ScheduleForm.vue';

export default {
  components: { ScheduleForm },
  methods: {
    async handleAddSchedule(scheduleData) {
      try {
        const response = await fetch('http://localhost:80/api/graph/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + this.$store.getters.userToken,
          },
          body: JSON.stringify({
            doctor_id: scheduleData.doctorId,
            date_and_time: scheduleData.date_and_time,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Ошибка сервера:', errorData);
          alert('Ошибка при создании расписания: ' + JSON.stringify(errorData.errors));
          throw new Error('Не удалось добавить расписание: ' + errorData.message);
        }

        alert('Расписание успешно добавлено!');
        this.$router.push('/schedules');
      } catch (error) {
        console.error('Ошибка при добавлении расписания:', error);
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