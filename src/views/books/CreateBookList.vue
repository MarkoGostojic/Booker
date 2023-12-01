<template>
  <h1 class="text">Create Book List</h1>
  <div class="all">
    <div class="container">
      <div>
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
            <!-- <button v-if="loading">Loading...</button> -->
            <button class="field" v-if="!show && !loading">Create list</button>
          </div>
        </form>
      </div>
      <div class="error">{{ fileError }}</div>

      <div class="book-form">
        <form v-if="show" @submit.prevent="addBook">
          <button v-if="loading" disabled>Loading</button>
          <div v-else>
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
                placeholder="book author"
                v-model="bookAuthor"
              />
            </div>
            <div class="field">
              <input class="text" type="file" @change="handleChange" />
            </div>
            <div class="field">
              <textarea
                typeof="text"
                required
                placeholder="wrote something about book"
                v-model="aboutBook"
              ></textarea>
            </div>
            <div class="field">
              <input
                typeof="text"
                required
                placeholder="put link of the book"
                v-model="bookLink"
              />
            </div>
            <button>add book</button>
          </div>
        </form>
      </div>
    </div>
    <div class="render">
      <div v-if="show" class="info-text">{{ text }}</div>
      <div class="list">
        <h2>{{ listTitle }}</h2>
        <p>{{ aboutList }}</p>
      </div>

      <div class="book">
        <div v-for="book in books" :key="book.id">
          <h4>{{ book.bookTitle }}</h4>
          <h3>{{ book.bookAuthor }}</h3>
          <img :src="book.coverUrl" />
        </div>
      </div>
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
    const listTitle = ref("");
    const aboutList = ref("");
    const bookTitle = ref("");
    const bookAuthor = ref("");
    const aboutBook = ref("");
    const bookLink = ref("");
    const bookId = ref(null);
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
          bookLink: bookLink.value,
          coverUrl: url.value,
          filePath: filePath.value,
          bookId: Math.floor(Math.random() * 100000),
        });
      }
      bookAuthor.value = "";
      bookTitle.value = "";
      aboutBook.value = "";
      bookLink.value = "";
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
        text.value = "You added all five books.";
      }
      loading.value = false;
    };
    // creating list of five books
    const handleSubmit = async () => {
      loading.value = true;
      const res = await addDoc({
        aboutList: aboutList.value,
        listTitle: listTitle.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        file: file.value,
        createdAt: timestamp(),
        books: books.value,
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
      bookLink,
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

<style scoped lang="scss">
h1 {
  text-align: center;
}
.all {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
}
.container {
  margin: 20px left;
  width: 500px;
  height: 200px;
  display: block;
  padding: 10px;
  text-align: center;
}
.field {
  margin: 3px auto;
  display: block;
  text-align: center;
}
input {
  width: 65%;
  border: none;
  padding: 3px;
  border-radius: 5px;
  margin: 3px auto;
  text-align: center;
}
textarea {
  width: 65%;
  border: none;
  padding: 3px;
  border-radius: 5px;
  margin: 3px auto;
  text-align: center;
  height: 100px;
}
.text {
  color: #eee;
}
.info-text {
  color: #eee;
  display: block;
  font-size: xx-large;
}
.render {
  display: block;
  /* background-color: #eeeeee2d; */
  border: none;
  padding: 10px;
  width: 70%;
  margin: 10px auto;
  border-radius: 20px;
}
.list {
  display: block;
}
.list h2,
p {
  text-align: center;
}
.book {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1em;
  text-align: center;
}
.book-form {
  display: block;
}
.render h1,
h2,
h3,
h4,
p {
  color: #eee;
  text-align: center;
}
img {
  width: 50px;
  height: 60px;
}
</style>
