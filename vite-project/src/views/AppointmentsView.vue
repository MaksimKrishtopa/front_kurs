<template>
  <div class="container appointments-container">
    <aside class="sidebar">
      <ul>
        <li><router-link to="/appointments">Мои записи</router-link></li>
        <li><router-link to="/appointment-form">Записаться на прием</router-link></li>
      </ul>
    </aside>
    <section class="appointments-content">
      <h1>ФИО пользователя</h1>
      <div class="appointment-card" v-for="n in 10" :key="n">
        <div class="appointment-details">
          <p>Запись #{{ n }}</p>
          <p>Вид услуги</p>
          <p>Врач: ФИО</p>
        </div>
        <div class="appointment-info">
          <p>Информация о записи</p>
        </div>
        <div class="appointment-actions">
          <p>Дата</p>
          <button @click="cancelAppointment">Отменить</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppointmentsView',
  methods: {
    cancelAppointment() {
      // Логика отмены записи
      alert('Запись отменена');
    }
  }
}
</script>

<style scoped>
.appointments-container {
  display: flex;
  gap: 25px;

}

.sidebar {
  width: 285px;
  background-color: #239AB5;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-radius: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}


.sidebar a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
}

.router-link-active {
  border-bottom: 3px solid #fff; 
}

.appointments-content {
  height: calc(100vh - 100px);
  flex: 1;
  padding: 20px;
  background-color: #239AB5;
  overflow-y: auto;
  border-radius: 10px;
}

.appointments-content h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 30px;
  color: #fff;
}

.appointment-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  color: #343434;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.appointment-details,
.appointment-info,
.appointment-actions {
  flex: 1;
}

.appointment-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.appointment-actions button {
  margin-top: 40px;
  background-color: #239AB5;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.appointment-actions button:hover {
  background-color: rgb(183, 57, 57);
  transition: .35s;
}
</style>
