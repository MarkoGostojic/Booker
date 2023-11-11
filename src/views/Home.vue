<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <SingleBookList :bookers="documents" />
    </div>
  </div>
</template>

<script>
import SingleBookList from "@/views/books/SingleBookList.vue";
import getCollection from "@/composables/getCollection";

export default {
  components: { SingleBookList },
  setup() {
    const { error, documents } = getCollection("bookers");

    return { error, documents };
  },
};
</script>

<style scoped></style>
