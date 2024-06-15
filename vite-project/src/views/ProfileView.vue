<template>
  <div class="container profile-container">
    <div class="profile__header">
      <h2>Личный кабинет</h2>
      <li><a href="#" @click="logout">Выход</a></li>
    </div>
    <div class="profile-info">
      <p><strong>Фамилия:</strong> {{ profile.lastName }}</p>
      <p><strong>Имя:</strong> {{ profile.firstName }}</p>
      <p><strong>Отчество:</strong> {{ profile.middleName }}</p>
      <p><strong>Пол:</strong> {{ profile.gender }}</p>
      <p><strong>Дата рождения:</strong> {{ profile.birthDate }}</p>
      <p><strong>Номер телефона:</strong> {{ profile.phone }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuth } from '../store/auth'

export default {
  name: 'UserProfile',
  setup() {
    const { token } = useAuth()
    const profile = ref({
      lastName: '',
      firstName: '',
      middleName: '',
      gender: '',
      birthDate: '',
      phone: '',
      email: ''
    })

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        profile.value = await response.json()
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    })

    const logout = () => {
      // Логика выхода из системы
      alert('Выход из системы')
    }

    return {
      profile,
      logout
    }
  }
}
</script>

<style scoped>
.profile-container {
  background-color: #239AB5;
  border-radius: 10px;
  color: white;
  border: 3px solid #239AB5;
}

.profile__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
}


.profile__header h2 {
  color: #239AB5;
  font-size: 26px;
  font-weight: 600;
  flex: 1;
  text-align: center;
  padding-left: 20px;
}

.profile__header li {
  list-style: none;
  font-weight: 400;
  font-size: 22px;
}

.profile__header li a {
  color: #239AB5;
}

.profile-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: start;
  row-gap: 75px;
  padding: 20px;
}

.profile-info p {
  font-size: 24px;
}

.profile-info strong {
  font-weight: 600;
}
</style>