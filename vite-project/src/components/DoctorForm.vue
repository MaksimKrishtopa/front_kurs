<template>
  <form @submit.prevent="handleSubmit">
    <div class="form__container">
      <div class="form__field">
        <label for="surname">Фамилия:</label>
        <input type="text" id="surname" v-model="localDoctor.surname" required />
      </div>
      <div class="form__field">
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="localDoctor.name" required />
      </div>
      <div class="form__field">
        <label for="patronymic">Отчество:</label>
        <input type="text" id="patronymic" v-model="localDoctor.patronymic" required />
      </div>
      <div class="form__field">
        <label for="gender">Пол:</label>
        <select id="gender" v-model="localDoctor.gender" required>
          <option value="" disabled>Выберите пол</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
      </div>
      <div class="form__field">
        <label for="date_of_birth">Дата рождения:</label>
        <input type="date" id="date_of_birth" v-model="localDoctor.date_of_birth" required />
      </div>
      <div class="form__field">
        <label for="specialization_id">Специализация:</label>
        <select id="specialization_id" v-model="localDoctor.specialization_id" required>
          <option value="" disabled>Выберите специализацию</option>
          <option v-for="specialization in specializations" :key="specialization.id" :value="specialization.id">
            {{ specialization.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="form__actions">
      <button type="submit">{{ isEditMode ? 'Редактировать' : 'Добавить' }}</button>
    </div>
  </form>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'DoctorForm',
  props: {
    doctor: {
      type: Object,
      default: () => ({
        surname: '',
        name: '',
        patronymic: '',
        gender: '',
        date_of_birth: '',
        specialization_id: '',
      }),
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const localDoctor = ref({ ...props.doctor });
    const specializations = ref([]);
    const store = useStore();

    const loadSpecializations = async () => {
      try {
        const response = await fetch('http://localhost:80/api/doctors/create', {
          headers: store.getters.config.headers
        });
        if (!response.ok) {
          throw new Error('Failed to load specializations: ' + response.statusText);
        }
        const data = await response.json();
        if (data.status) {
          specializations.value = data.data || [];
        } else {
          console.error('Error loading specializations:', data.message);
        }
      } catch (error) {
        console.error('Error loading specializations:', error.message);
      }
    };

    onMounted(() => {
      loadSpecializations();
    });

    watch(() => props.doctor, (newVal) => {
      localDoctor.value = { ...newVal };
    });

    const handleSubmit = () => {
      emit('submit', localDoctor.value);
    };

    return {
      localDoctor,
      specializations,
      handleSubmit,
    };
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

input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
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