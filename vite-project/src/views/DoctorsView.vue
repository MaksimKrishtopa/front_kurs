<template>
  <div class="admin-container">
    <div class="header-container">
      <h1 class="header-title">Список врачей</h1>
    </div>
    <div class="buttons-container">
      <button @click="addDoctor" class="add-button"><strong>+</strong> Врача</button>
      <button @click="addSpecialization" class="add-button"><strong>+</strong> Специализацию</button>
    </div>
    <div class="doctors-list-container">
      <div class="doctor-column" v-for="n in 3" :key="n">
        <div v-for="doctor in doctors" :key="doctor.id" class="doctor-item">
          {{ doctor.surname }} {{ doctor.name }}, {{ doctor.specialization.name }}
          <button @click="editDoctor(doctor.id)" class="edit-button"> - Редактировать</button>
        </div>
      </div>
    </div>
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
        console.log("Fetching doctors...");
        const response = await fetch('http://localhost:80/api/doctors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + this.$store.getters.userToken,
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch doctors: ' + response.statusText);
        }

        const data = await response.json();
        
        if (data && data.data) {
          this.doctors = data.data;
        } else {
          console.warn("No doctors data found in response.");
        }

      } catch (error) {
        console.error(error.message);
      }
    },
    editDoctor(id) {
      this.$router.push({ name: 'edit-doctor', params: { id } });
    },
    addDoctor() {
      this.$router.push({ name: 'add-doctor' });
    },
    addSpecialization() {
      // Логика добавления специализации
    }
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #239AB5;
  border-radius: 10px;
  padding: 20px;
  margin: 0 225px;
}

.header-container {
  text-align: center;
  margin-bottom: 20px;
}

.header-title {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  font-size: 26px;
}

.add-button {
  background-color: #239AB5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #2490a9;
}

.doctors-list-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.doctor-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.doctor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 18px;
  margin: 10px 0;
}

.edit-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.edit-button:hover {
  color: #ffeb3b;
}
</style>
