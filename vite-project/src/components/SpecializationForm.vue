<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Specialization Name:</label>
      <input type="text" v-model="formData.name" required />
    </div>
    <button type="submit">Add Specialization</button>
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
      // Отправляем только данные формы, исключая объект события
      this.$emit('submit', { ...this.formData });
    },
  },
};
</script>