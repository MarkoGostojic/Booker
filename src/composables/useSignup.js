import { projectAuth } from "@/firebase/config";
import { ref } from "vue";
const error = ref(null);
const loading = ref(false);
const signup = async (email, password, displayName) => {
  error.value = null;
  loading.value = true;
  try {
    loading.value = false;
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Could not complete the signup");
    }
    await res.user.updateProfile({ displayName });
    error.value = null;
    loading.value = false;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    loading.value = false;
  }
};

const useSignup = () => {
  return { error, signup, loading };
};

export default useSignup;
