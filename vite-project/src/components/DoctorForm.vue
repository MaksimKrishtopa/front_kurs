<template>
  <form @submit.prevent="addDoctor">
    <div>
      <label for="surname">Фамилия:</label>
      <input type="text" id="surname" v-model="surname" required />
    </div>
    <div>
      <label for="name">Имя:</label>
      <input type="text" id="name" v-model="name" required />
    </div>
    <div>
      <label for="patronymic">Отчество:</label>
      <input type="text" id="patronymic" v-model="patronymic" required />
    </div>
    <div>
      <label for="gender">Пол:</label>
      <select id="gender" v-model="gender" required>
        <option value="" disabled>Выберите пол</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
      </select>
    </div>
    <div>
      <label for="date_of_birth">Дата рождения:</label>
      <input type="date" id="date_of_birth" v-model="date_of_birth" required />
    </div>
    <div>
      <label for="specialization_id">ID специализации:</label>
      <input type="number" id="specialization_id" v-model="specialization_id" required />
    </div>
    <button type="submit">Добавить врача</button>
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
  </style>
  