<template>
  <div class="container registerform__container">
    <form @submit.prevent="register">
      <h1>Регистрация</h1>
      <div class="input-group">
        <label for="surname">Фамилия</label>
        <input type="text" id="surname" v-model="surname" required />
      </div>
      <div class="input-group">
        <label for="name">Имя</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="input-group">
        <label for="patronymic">Отчество</label>
        <input type="text" id="patronymic" v-model="patronymic" required />
      </div>
      <div class="input-group gender_dob">
        <div>
        <label for="gender">Пол</label>
        <select id="gender" v-model="gender" required>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>
        <div>
        <label for="date_of_birth">Дата рождения</label>
        <input type="date" id="date_of_birth" v-model="dateOfBirth" required />
      </div>
      </div>
      <div class="input-group">
        <label for="phone">Телефон</label>
        <input type="tel" id="phone" v-model="phone" required />
      </div>
      <div class="input-group">
        <label for="email">Почта</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Создать аккаунт</button>
      <router-link to="/login">Уже есть аккаунт?</router-link>
    </form>
  </div>
</template>

  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'RegisterForm',
    setup() {
      const router = useRouter()
      const email = ref('')
      const password = ref('')
      const confirmPassword = ref('')
  
      const register = async () => {
        if (password.value !== confirmPassword.value) {
          alert('Passwords do not match!')
          return
        }
        try {
          const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value
            })
          });
          const data = await response.json();
          router.push('/login')
        } catch (error) {
          console.error('Registration error', error);
        }
      }
  
      return {
        email,
        password,
        confirmPassword,
        register
      }
    }
  }
  </script>
  
  <style scoped>

  h1 {
    font-size: 28px;
    font-weight: 600;
    padding-bottom: 45px;
  }
  
  .registerform__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  form {
    background-color: #239AB5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 45px 75px 110px 75px;
    border-radius: 10px;
    gap: 10px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    background-color: #fff;
    color: #343434;
    padding: 5px;
    font-size: 18px;
    border-radius: 5px;
  }

  label {
    font-size: 22px;
    font-weight: 600;
    width: 400px;
  }

  select {
    background-color: #fff;
    border-radius: 5px;
    color: #343434;
    font-size: 18px;
    padding: 5px;
    outline: none;
  }

  
  button {
    background-color: #fff;
    color: #239AB5;
    cursor: pointer;
    padding: 10px 20px;
    margin-top: 60px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 24px;
  }

  form > a {
    padding-top: 10px;
    color: #fff;
    font-size: 20px;
    text-decoration: underline;
  }

  .gender_dob {
    display: flex;
    flex-direction: row;
    gap: 50px;
  }

  .gender_dob > div {
    display: flex;
    flex-direction: column;
  }

  .gender_dob label{
    width: 100%;
  }
  </style>