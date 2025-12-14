import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const Login = () => {
  const handleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Login with Google</h2>
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
      >
        Sign in
      </button>
    </div>
  );
};