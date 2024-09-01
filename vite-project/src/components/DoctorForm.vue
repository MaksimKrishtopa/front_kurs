<template>
  <form @submit.prevent="addDoctor">
    <div class="form__container">
      <div class="form__field">
        <label for="surname">Фамилия:</label>
        <input type="text" id="surname" v-model="surname" required />
      </div>
      <div class="form__field">
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form__field">
        <label for="patronymic">Отчество:</label>
        <input type="text" id="patronymic" v-model="patronymic" required />
      </div>
      <div class="form__field">
        <label for="gender">Пол:</label>
        <select id="gender" v-model="gender" required>
          <option value="" disabled>Выберите пол</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
      </div>
      <div class="form__field">
        <label for="date_of_birth">Дата рождения:</label>
        <input type="date" id="date_of_birth" v-model="date_of_birth" required />
      </div>
      <div class="form__field">
        <label for="specialization_id">Специализация:</label>
        <select id="specialization_id" v-model="specialization_id" required>
          <option value="" disabled>Выберите специализацию</option>
          <!-- Варианты специализаций должны быть загружены динамически -->
          <option v-for="specialization in specializations" :key="specialization.id" :value="specialization.id">
            {{ specialization.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="form__actions">
      <button type="submit">Редактировать</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'; // Импортируем useStore

export default {
  name: 'DoctorForm',
  setup() {
    const store = useStore(); // Получаем доступ к store
    
    const surname = ref('');
    const name = ref('');
    const patronymic = ref('');
    const gender = ref('');
    const date_of_birth = ref('');
    const specialization_id = ref('');

    const addDoctor = async () => {
      try {
    const response = await fetch('http://localhost:80/api/doctors/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + store.getters.userToken,
      },
      body: JSON.stringify({
        surname: surname.value,
        name: name.value,
        patronymic: patronymic.value,
        gender: gender.value,
        date_of_birth: date_of_birth.value,
        specialization_id: Number(specialization_id.value),
      }),
    });
 
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка:', errorData);
      throw new Error('Не удалось добавить врача: ' + response.statusText);
    }

    alert('Врач успешно добавлен!');
  } catch (error) {
    console.error('Ошибка при добавлении врача:', error);
  }
    };

    return {
      surname,
      name,
      patronymic,
      gender,
      date_of_birth,
      specialization_id,
      addDoctor
    };
  }
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

.form__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 40px;
  border-radius: 10px;
  gap: 15px;
  background-color: #239AB5;
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
</style>