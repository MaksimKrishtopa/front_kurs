<template>
  <div>
    <h1>Add Schedule</h1>
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
        const response = await fetch('/api/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scheduleData),
        });

        if (!response.ok) {
          throw new Error('Failed to add schedule: ' + response.statusText);
        }

        const newSchedule = await response.json();
        console.log('Schedule added:', newSchedule);
        this.$router.push('/schedules'); // Перенаправление на список расписаний после добавления
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>

<style scoped>

  main {
    background-color: black;
  }

  form {
    background-color: black;
  }

  h1 {
    background-color: black;
  }

</style>