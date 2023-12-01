<template>
  <nav>
    <div class="logo">
      <img src="../assets/book.jpg" alt="logo book" />
      <h2>
        <router-link class="btn" :to="{ name: 'Home' }">TheBookers</router-link>
      </h2>
    </div>
    <div v-if="user" class="links">
      <p>hello</p>
      <h4><span>, </span>{{ user.displayName }}</h4>
      <!-- <router-link class="btn" :to="{ name: 'MyReadingWishList' }"
        >My reading Wish List</router-link
      > -->
      <router-link class="btn" :to="{ name: 'CreateBookList' }"
        >Create Book List</router-link
      >
      <button @click="handleLogout">Logout</button>
    </div>
    <div v-if="!user">
      <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
      <span> or </span>
      <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
    </div>
  </nav>
</template>

<script>
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { user, error, loading } = getUser();
    const router = useRouter();
    const { logout } = useLogout();
    const handleLogout = async () => {
      await logout();
      router.push({ name: "Login" });
    };

    return { user, error, loading, handleLogout };
  },
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
  width: 100%;
  height: 90px;
  background-color: var(--secondary);
  justify-content: space-between;
  align-items: center;
  padding: 2px;
}
.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.logo img {
  width: 70px;
  height: 70px;
  border-radius: 200px;
}
.links {
  display: flex;
  align-items: center;
  button {
    background: none;
  }
  @media only screen and (max-width: 700px) {
    .links {
      display: block;
    }
  }
}
</style>
