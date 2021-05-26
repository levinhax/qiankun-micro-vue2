<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="primary" @click="showMessage">Primary</a-button>
    <a-button>Default</a-button>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    showMessage() {
      this.$message.info('This is a normal message');
    },
  },
};
</script>
