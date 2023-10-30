<template>
  <div class="list" v-for="doc in bookers" :key="doc.id">
    <router-link :to="{ name: 'BookListDetails', params: { id: doc.id } }">
      <div class="info">
        <div>
          <h2>{{ doc.listTitle }}</h2>
        </div>
        <div class="recommend">
          <p>recommended by</p>
          <h4>{{ doc.userName }}</h4>
        </div>
      </div>
      <div class="books">
        <div>
          <div class="book">
            <img :src="doc.books[0].coverUrl" />
            <div class="title">
              <h4>{{ doc.books[0].bookAuthor }}</h4>
              <h3>{{ doc.books[0].bookTitle }}</h3>
            </div>
          </div>
          <p>1</p>
        </div>
        <div>
          <div class="book">
            <img :src="doc.books[1].coverUrl" />
            <div class="title">
              <h4>{{ doc.books[1].bookAuthor }}</h4>
              <h3>{{ doc.books[1].bookTitle }}</h3>
            </div>
          </div>
          <p>2</p>
        </div>
        <div>
          <div class="book">
            <img :src="doc.books[2].coverUrl" />
            <div class="title">
              <h4>{{ doc.books[2].bookAuthor }}</h4>
              <h3>{{ doc.books[2].bookTitle }}</h3>
            </div>
          </div>
          <p>3</p>
        </div>
        <div>
          <div class="book">
            <img :src="doc.books[3].coverUrl" />
            <div class="title">
              <h4>{{ doc.books[3].bookAuthor }}</h4>
              <h3>{{ doc.books[3].bookTitle }}</h3>
            </div>
          </div>
          <p>4</p>
        </div>
        <div>
          <div class="book">
            <img :src="doc.books[4].coverUrl" />
            <div class="title">
              <h4>{{ doc.books[4].bookAuthor }}</h4>
              <h3>{{ doc.books[4].bookTitle }}</h3>
            </div>
          </div>
          <p>5</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
export default {
  props: ["bookers"],
  setup() {
    const { user } = getUser();

    return { user };
  },
};
</script>

<style>
.list {
  background-color: #eee;
  padding: 10px;
  width: 95%;
  margin: 10px auto;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.recommend {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* .title {
  padding-right: 15px;
} */
.books {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.book {
  display: flex;
  min-width: 240px;
  min-width: 250px;
}
.title {
  display: block;
}
</style>
