<template>
  <div>
    <h1>Врачи</h1>
    <ul>
      <li v-for="doctor in doctors" :key="doctor.id">
        {{ doctor.name }}
        <button @click="editDoctor(doctor.id)">Редактировать</button>
        <button @click="deleteDoctor(doctor.id)">Удалить</button>
      </li>
    </ul>
    <router-link to="/doctors/add"><button>Добавить врача</button></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctors: [],
    };
  },
  async created() {
    await this.fetchDoctors();
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await fetch('http://localhost:80/api/doctors', {
          method: 'GET', // Вернули метод GET
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctors: ' + response.statusText);
        }
        this.doctors = await response.json();
      } catch (error) {
        console.error(error.message);
      }
    },
    editDoctor(id) {
      this.$router.push({ name: 'edit-doctor', params: { id } });
    },
    async deleteDoctor(id) {
      try {
        const response = await fetch(`http://localhost:80/api/doctors/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          this.doctors = this.doctors.filter(doctor => doctor.id !== id);
        } else {
          console.error('Failed to delete doctor');
        }
      } catch (error) {
        console.error('Delete doctor error:', error);
      }
    }
  }
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

  button {
    background: #000;
  }

</style>