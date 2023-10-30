<template>
  <div class="container">
    <h1>Create Book List</h1>
    <form v-if="show" class="book-form" @submit.prevent="addBook">
      <button v-if="loading" disabled>Loading</button>
      <div v-else class="text field">
        <div class="field">
          <input
            type="text"
            required
            placeholder="book title"
            v-model="bookTitle"
          />
        </div>
        <div class="field">
          <input
            type="text"
            required
            placeholder="author"
            v-model="bookAuthor"
          />
        </div>
        <div class="field">
          <input type="file" @change="handleChange" />
        </div>
        <div class="field">
          <textarea
            typeof="text"
            required
            placeholder="wrote something about book"
            v-model="aboutBook"
          ></textarea>
        </div>
        <div class="error">{{ fileError }}</div>
        {{ text }}<button>add book</button>
      </div>
    </form>
    <div v-if="!show">
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <input
            type="text"
            required
            placeholder="Title of the list"
            v-model="listTitle"
          />
        </div>
        <div class="field">
          <textarea
            type="text"
            required
            placeholder="few words about your list"
            v-model="aboutList"
          ></textarea>
          <button v-if="loading">Loading...</button>
          <button class="field" v-if="!show && !loading">Create list</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { timestamp } from "@/firebase/config";
import useStorage from "@/composables/useStorage";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import useCollection from "@/composables/useCollection";
import { useRouter } from "vue-router";
export default {
  setup() {
    const bookTitle = ref("");
    const bookAuthor = ref("");
    const aboutList = ref("");
    const aboutBook = ref("");
    const bookId = ref(null);
    const listTitle = ref("");
    // const bookId = () => {
    //   Math.floor(Math.random() * 100000);
    // };
    const show = ref(true);
    const text = ref("Please add your top 5 books");
    const file = ref(null);
    const fileError = ref(null);
    const books = ref([]);
    const { user } = getUser();
    const { url, filePath, uploadImage } = useStorage();
    const router = useRouter();

    const { addDoc, loading } = useCollection("bookers");
    const { error, documents } = getCollection("bookers");
    // allowed file types
    const types = ["image/png", "image/jpeg"];

    // adding book in folder
    const addBook = async () => {
      if (file.value) {
        loading.value = true;
        await uploadImage(file.value);
        books.value.push({
          bookAuthor: bookAuthor.value,
          bookTitle: bookTitle.value,
          aboutBook: aboutBook.value,
          coverUrl: url.value,
          filePath: filePath.value,
          bookId: Math.floor(Math.random() * 100000),
        });
      }

      bookAuthor.value = "";
      bookTitle.value = "";
      aboutBook.value = "";
      file.value = null;
      //showing buttons and forms condition
      if (books.value.length === 0) {
        show.value = true;
      } else if (books.value.length === 1) {
        text.value = "Book 1 is added";
      } else if (books.value.length === 2) {
        text.value = "Book 2 is added";
      } else if (books.value.length === 3) {
        text.value = "Book 3 is added";
      } else if (books.value.length === 4) {
        text.value = "Book 4 is added";
      } else {
        show.value = false;
        text.value =
          "You added all five books, please wrote something abot your list and click create";
      }
      loading.value = false;
      console.log(books.value.length);
    };
    // creating list of five books
    const handleSubmit = async () => {
      loading.value = true;
      const res = await addDoc({
        books: books.value,
        aboutList: aboutList.value,
        listTitle: listTitle.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        file: file.value,
        createdAt: timestamp(),
      });
      if (!error.value) {
        router.push({ name: "Home" });
        loading.value = false;
      }
    };

    // catching image file
    const handleChange = (e) => {
      const selected = e.target.files[0];
      // console.log(selected);
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      bookTitle,
      bookAuthor,
      aboutList,
      aboutBook,
      bookId,
      show,
      text,
      listTitle,
      fileError,
      file,
      books,
      error,
      documents,
      loading,

      addBook,
      handleSubmit,
      handleChange,
    };
  },
};
</script>

<style>
.container {
  margin: 20px auto;
  width: 60%;
  height: 95%;
  background-color: #eee;
  display: block;
  border-radius: 15px;
  padding: 20px;
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
textarea {
  width: 65%;
  border: none;
  padding: 5px;
  border-radius: 5px;
  margin: 5px auto;
  text-align: center;
  height: 200px;
}
img {
  width: 80px;
  height: 100px;
}
</style>
