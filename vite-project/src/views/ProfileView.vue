<template>
  <div class="container profile-container">
    <div class="profile__header">
      <h2>Личный кабинет</h2>
      <li><a href="#" @click="logout">Выход</a></li>
    </div>
    <div v-if="profile" class="profile-info">
      <p><strong>Фамилия:</strong> {{ profile.surname }}</p>
      <p><strong>Имя:</strong> {{ profile.name }}</p>
      <p><strong>Отчество:</strong> {{ profile.patronymic }}</p>
      <p><strong>Пол:</strong> {{ profile.gender }}</p>
      <p><strong>Дата рождения:</strong> {{ profile.date_of_birth }}</p>
      <p><strong>Номер телефона:</strong> {{ profile.phone }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
    </div>
    <div v-else>
      <p>Данные профиля не загружены.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'UserProfile',
  setup() {
    const store = useStore()
    const router = useRouter()
    const profile = ref(null)

    onMounted(async () => {
      try {
        await store.dispatch('fetchUser')
        profile.value = store.getters.userData
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    })

    const logout = () => {
      store.commit('updateUserToken', null)
      store.commit('updateUserData', null)
      document.cookie = 'user_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      router.push('/login')
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