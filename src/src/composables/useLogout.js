import { projectAuth } from "@/firebase/config";
import { ref } from "vue";

const error = ref(null);
const loading = ref(false);

const logout = async () => {
  error.value = null;
  loading.value = true;
  try {
    await projectAuth.signOut();
    loading.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    loading.value = false;
  }
};

const useLogout = () => {
  return { error, logout, loading };
};
export default useLogout;
