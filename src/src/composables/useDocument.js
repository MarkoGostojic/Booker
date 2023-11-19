import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const useDocument = (collection, id) => {
  let error = ref(null);
  let loading = ref(false);
  let docRef = projectFirestore.collection(collection).doc(id);
  const deleteDoc = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await docRef.delete();
      loading.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      loading.value = false;
      error.value = "could not delete the document";
    }
  };
  const updateDoc = async (updates) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await docRef.update(updates);
      loading.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      loading.value = false;
      error.value = "could not update the document";
    }
  };
  return { error, loading, deleteDoc, updateDoc };
};
export default useDocument;
