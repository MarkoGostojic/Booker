<template>
  <form class="container" @submit.prevent="handleSignup">
    <h2>Sign up!</h2>
    <input
      class="field"
      type="text"
      placeholder="user name"
      required
      v-model="displayName"
    />
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
    <button class="field">Signup</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";
import { projectAuth } from "@/firebase/config";
import getUser from "@/composables/getUser";

export default {
  setup() {
    const { error, loading, signup } = useSignup();
    // const { user } = getUser();
    const router = useRouter();
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSignup = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      console.log(displayName.value);
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    return {
      email,
      password,
      displayName,
      handleSignup,
      error,
      loading,
      signup,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 20px auto;
  width: 60%;
  height: 95%;
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
