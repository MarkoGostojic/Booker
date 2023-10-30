<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div class="list" v-if="document">
    <div class="info">
      <div>
        <h2>{{ document.listTitle }}</h2>
      </div>
    </div>
    <div class="books">
      <div class="book">
        <div class="book-info">
          <img :src="document.books[0].coverUrl" />

          <h4>{{ document.books[0].bookAuthor }}</h4>
          <h3>{{ document.books[0].bookTitle }}</h3>
        </div>
        <p>{{ document.books[0].aboutBook }}</p>
      </div>

      <div class="book">
        <div class="book-info">
          <img :src="document.books[1].coverUrl" />

          <h4>{{ document.books[1].bookAuthor }}</h4>
          <h3>{{ document.books[1].bookTitle }}</h3>
        </div>
        <p>{{ document.books[1].aboutBook }}</p>
      </div>
      <div class="book">
        <div class="book-info">
          <img :src="document.books[2].coverUrl" />

          <h4>{{ document.books[2].bookAuthor }}</h4>
          <h3>{{ document.books[2].bookTitle }}</h3>
        </div>
        <p>{{ document.books[2].aboutBook }}</p>
      </div>
      <div class="book">
        <div class="book-info">
          <img :src="document.books[3].coverUrl" />

          <h4>{{ document.books[3].bookAuthor }}</h4>
          <h3>{{ document.books[3].bookTitle }}</h3>
        </div>
        <p>{{ document.books[3].aboutBook }}</p>
      </div>
      <div class="book">
        <div class="book-info">
          <img :src="document.books[4].coverUrl" />

          <h4>{{ document.books[4].bookAuthor }}</h4>
          <h3>{{ document.books[4].bookTitle }}</h3>
        </div>
        <p>{{ document.books[4].aboutBook }}</p>
      </div>
    </div>
    <div class="details">
      <p>{{ document.aboutList }}</p>
    </div>
  </div>
  <div v-if="ownership">
    <button @click="handleDelete">delete</button>
    <span> or </span>
    <button @click="show = !show">update</button>
  </div>
  <div v-if="show" class="edit-form">
    <form @submit.prevent="handleEdit">
      <input type="text" placeholder="list title" v-model="listTitleEdit" />
      <textarea placeholder="about list" v-model="aboutListEdit"></textarea>
      <button>save changes</button>
    </form>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";

import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import useStorage from "@/composables/useStorage";
export default {
  props: ["id"],
  setup(props) {
    const aboutListEdit = ref("");
    const listTitleEdit = ref("");
    const show = ref(false);
    const { user } = getUser();
    const router = useRouter();
    const { error, document } = getDocument("bookers", props.id);
    const { deleteImage } = useStorage();
    const { loading, deleteDoc, updateDoc } = useDocument("bookers", props.id);
    const ownership = computed(() => {
      return (
        document.value && user.value && user.value.uid == document.value.userId
      );
    });

    const handleDelete = async () => {
      loading.value = true;
      // await deleteImage(document.value.filePath);
      if (document.value && document.value.books) {
        for (const book of document.value.books) {
          await deleteImage(book.filePath);
        }
      }
      await deleteDoc();

      router.push({ name: "Home" });
      loading.value = true;
    };
    const handleEdit = async () => {
      await updateDoc({
        aboutList: aboutListEdit.value,
        listTitle: listTitleEdit.value,
      });
      show.value = false;
    };

    return {
      user,
      error,
      document,
      loading,
      ownership,
      handleDelete,
      handleEdit,
      deleteDoc,
      updateDoc,
      deleteImage,
      aboutListEdit,
      listTitleEdit,
      show,
    };
  },
};
</script>

<style scoped>
.list {
  background-color: #eee;
  padding: 10px;
  width: 98%;
  margin: 10px auto;
  margin-right: 10px;
}
.recommend {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.books {
  border-top: solid darkgoldenrod;
  border-bottom: solid darkgoldenrod;
  display: flex;
}
.book {
  display: block;
  border-right: solid darkgoldenrod;
}
.book-info {
  display: flex;
  align-items: center;
}
.details {
  text-align: center;
  display: block;
  margin: 10px;
}
</style>
