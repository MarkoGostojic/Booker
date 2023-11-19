import { projectFirestore } from "@/firebase/config";
import { ref, watchEffect } from "vue";

const getDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);
  const loading = ref(false);

  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "that document does not exist";
      }
    },

    (err) => {
      console.log(err.message);
      error.value = "could not fetch documents";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub();
    });
  });
  return { error, document, loading };
};
export default getDocument;
