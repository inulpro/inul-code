<template>
  <div id="app">
    <header>
      <h1>Welcome to InulCode Vue.js!</h1>
    </header>

    <main>
      <div class="card">
        <button @click="count++">Count is: {{ count }}</button>
        <p>Edit <code>src/App.vue</code> to test HMR</p>
      </div>

      <p>
        Check out
        <a href="https://vuejs.org/" target="_blank">Vue.js docs</a>
        to learn more.
      </p>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const count = ref(0);

    return {
      count,
    };
  },
};
</script>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.card {
  padding: 2em;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}
</style>
