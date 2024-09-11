<template>
  <form @submit.prevent="handleSubmit">
    <div class="main__form">
      <label for="name">Имя специализации:</label>
      <input type="text" v-model="formData.name" required />
    </div>
    <div class="form__btn">
      <button type="submit">Добавить</button>
    </div>

  </form>
</template>

<script>
export default {
  props: {
    initialData: {
      type: Object,
      default: () => ({
        name: '',
      }),
    },
  },
  data() {
    return {
      formData: { ...this.initialData },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.formData });
    },
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

.form__btn {
  margin-top: 50px;
  display: flex;
  justify-content: center;
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