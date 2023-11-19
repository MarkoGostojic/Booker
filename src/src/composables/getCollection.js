import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "vue";

const getCollection = (collection, query) => {
  const error = ref(null);
  const documents = ref(null);
  const loading = ref(false);
  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");
  if (query) {
    collectionRef = collectionRef.where(...query);
  }
  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch data";
    }
  );
  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub();
    });
  });
  return { documents, error, loading };
};
export default getCollection;
