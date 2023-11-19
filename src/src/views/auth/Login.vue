<template>
  <form class="container" @submit.prevent="handleLogin">
    <h2>Login!</h2>

    <input
      class="field"
      type="text"
      placeholder="email"
      required
      v-model="email"
    />
    <input
      class="field"
      type="password"
      placeholder="password"
      required
      v-model="password"
    />
    <button class="field">Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, login, loading } = useLogin();
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    return { email, password, handleLogin, error, loading };
  },
};
</script>

<style scoped>
.container {
  margin: 20px auto;
  width: 60%;
  height: 95%;
  /* background-color: #eee; */
  background-color: #eeeeee00;
  backdrop-filter: blur(15px);
  display: block;
  border-radius: 15px;
  padding: 5px;
}
.field {
  margin: 10px auto;
  display: block;
}
input {
  width: 65%;
  border: none;
  padding: 5px;
  border-radius: 5px;
  margin: 5px auto;
  text-align: center;
}
h2 {
  text-align: center;
}
</style>
