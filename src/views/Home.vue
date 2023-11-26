<!-- <template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <SingleBookList :bookers="documents" />
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>{{ currentPage }}/{{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBookList from "@/views/books/SingleBookList.vue";
import getCollection from "@/composables/getCollection";
import { ref, watchEffect } from "vue";

export default {
  components: { SingleBookList },
  setup() {
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const listLength = ref(null);
    const { error, documents } = getCollection("bookers");
    watchEffect(() => {
      if (documents.value) {
        listLength.value = documents.value.length;
      }
      console.log(listLength.value);
    });

    return { error, documents, listLength };
  },
};
</script>

<style scoped></style> -->
<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <SingleBookList :bookers="currentPageBooks" />
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>{{ currentPage }}/{{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBookList from "@/views/books/SingleBookList.vue";
import getCollection from "@/composables/getCollection";
import { ref, watchEffect, computed } from "vue";

export default {
  components: { SingleBookList },
  setup() {
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const { error, documents } = getCollection("bookers");
    const listLength = ref(null);

    const totalPages = computed(() =>
      Math.ceil(listLength.value / itemsPerPage)
    );

    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
    const endIndex = computed(() => startIndex.value + itemsPerPage);

    const currentPageBooks = computed(() => {
      if (documents.value) {
        return documents.value.slice(startIndex.value, endIndex.value);
      }
      return [];
    });

    watchEffect(() => {
      if (documents.value) {
        listLength.value = documents.value.length;
      }
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    return {
      error,
      documents,
      listLength,
      currentPage,
      totalPages,
      currentPageBooks,
      prevPage,
      nextPage,
    };
  },
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
