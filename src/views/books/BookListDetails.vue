<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="showList">
    <div class="list" v-if="document">
      <div class="info">
        <div>
          <h2 class="list-title">{{ document.listTitle }}</h2>
        </div>
        <div class="details">
          <p>{{ document.aboutList }}</p>
        </div>
      </div>
      <div class="books">
        <div class="book">
          <div class="book-info">
            <a :href="document.books[0].bookLink">
              <img :src="document.books[0].coverUrl" />
              <div class="t-a">
                <h4>{{ document.books[0].bookAuthor }}</h4>
                <h3>{{ document.books[0].bookTitle }}</h3>
              </div>
            </a>
          </div>
          <p>{{ document.books[0].aboutBook }}</p>
        </div>

        <div class="book">
          <div class="book-info">
            <a :href="document.books[1].bookLink">
              <img :src="document.books[1].coverUrl" />
              <div class="t-a">
                <h4>{{ document.books[1].bookAuthor }}</h4>
                <h3>{{ document.books[1].bookTitle }}</h3>
              </div>
            </a>
          </div>
          <p>{{ document.books[1].aboutBook }}</p>
        </div>
        <div class="book">
          <div class="book-info">
            <a :href="document.books[2].bookLink">
              <img :src="document.books[2].coverUrl" />
              <div class="t-a">
                <h4>{{ document.books[2].bookAuthor }}</h4>
                <h3>{{ document.books[2].bookTitle }}</h3>
              </div>
            </a>
          </div>
          <p>{{ document.books[2].aboutBook }}</p>
        </div>
        <div class="book">
          <div class="book-info">
            <a :href="document.books[3].bookLink">
              <img :src="document.books[3].coverUrl" />
              <div class="t-a">
                <h4>{{ document.books[3].bookAuthor }}</h4>
                <h3>{{ document.books[3].bookTitle }}</h3>
              </div>
            </a>
          </div>
          <p>{{ document.books[3].aboutBook }}</p>
        </div>
        <div class="book">
          <div class="book-info">
            <a :href="document.books[4].bookLink">
              <img :src="document.books[4].coverUrl" />
              <div class="t-a">
                <h4>{{ document.books[4].bookAuthor }}</h4>
                <h3>{{ document.books[4].bookTitle }}</h3>
              </div>
            </a>
          </div>
          <p>{{ document.books[4].aboutBook }}</p>
        </div>
      </div>
    </div>

    <div class="doru" v-if="ownership">
      <button @click="handleDelete">delete</button>
      <span> or </span>
      <button @click="showList = false">update</button>
    </div>
  </div>
  <div class="container" v-if="!showList">
    <form @submit.prevent="handleEdit">
      <div>
        <input type="text" placeholder="list title" v-model="listTitleEdit" />
      </div>
      <div>
        <textarea placeholder="about list" v-model="aboutListEdit"></textarea>
      </div>
      <div><button>save changes</button></div>
    </form>
    <button @click="showList = true">back</button>
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
    const showList = ref(true);
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
      showList,
    };
  },
};
</script>

<style scoped lang="scss">
.list {
  background-color: rgba(238, 238, 238, 0.593);
  padding: 10px;
  width: 100%;
  margin: 0 auto;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1em;
  padding: 2%;
}
.book {
  display: block;

  /* border-right: solid darkgoldenrod; */
}
.t-a {
  display: inline;
}
.doru {
  margin: 10px;
  text-align: center;
}
.book-info {
  display: flex;
  align-items: center;

  &:hover {
    transform: translateY(5px);
  }
}
img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
.details {
  text-align: center;
  display: block;
  margin: 10px;
}
.list-title {
  text-align: center;
}

.container {
  margin: 20px auto;
  width: 500px;
  height: 200px;
  display: block;
  padding: 20px;
  text-align: center;
}
form {
  margin: 20px left;
  width: 500px;
  height: 200px;
  display: block;
  padding: 20px;
  background: #eeeeeece;
  border-radius: 20px;
  margin-bottom: 20px;
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
button:hover {
  background-color: rgba(238, 238, 238, 0.593);
  color: var(--primary);
}
</style>
