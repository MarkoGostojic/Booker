<template>
  <div class="container">
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
          <div v-for="(book, index) in doc.books" :key="index" class="book">
            <img :src="book.coverUrl" />
            <p>{{ index + 1 }}</p>
            <div>
              <h4 class="title">{{ book.bookTitle }}</h4>
              <h4 class="author">by {{ book.bookAuthor }}</h4>
            </div>
          </div>
        </div>
      </router-link>
    </div>
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
<style scoped lang="scss">
.list {
  background-color: #eeeeeeb0;
  padding: 5px;
  width: 70%;
  margin: 10px auto;
  border-radius: 20px;
}

.container :hover {
  background-color: #eeeeee;
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
  p {
    margin: 5px;
    color: var(--secondary);
    font-weight: 250;
  }
}
.books {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
}
@media only screen and (max-width: 700px) {
  .books {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1em;
    padding: 2%;
  }
}
.book {
  display: block;
  img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }
  p {
    margin: 5px;
    color: var(--secondary);
    font-weight: 500;
    font-size: xx-large;
    // text-align: left;
  }
  .title {
    font-weight: 900;
  }
  .author {
    font-weight: 400;
  }
}
</style>
