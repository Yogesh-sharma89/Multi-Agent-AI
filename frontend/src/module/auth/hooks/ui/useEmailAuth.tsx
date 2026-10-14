import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { useAuthMutation } from "../server/useAuth";
import { auth } from "../../../../service/firebase.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type AuthMode = "login" | "signup";

const useEmailAuth = () => {
  const { mutateAsync: emailAuth, isPending } = useAuthMutation();

  const navigate = useNavigate();

  const handleEmailAuth = async (
    email: string,
    password: string,
    mode: AuthMode = "login",
  ) => {
    try {
      const credential =
        mode === "signup"
          ? await createUserWithEmailAndPassword(auth, email.trim(), password)
          : await signInWithEmailAndPassword(auth, email.trim(), password);

      const tokenId = await credential.user.getIdToken();

      await toast.promise(emailAuth({ tokenId }), {
        loading:
          mode === "signup" ? "Creating your account..." : "Logging you in...",
        success: () => {
          navigate("/dashboard");
          return mode === "signup"
            ? "Account created successfully"
            : "Logged in successfully";
        },
        error: (err) => err.response?.data?.message || "Authentication failed",
      });
    } catch (err: any) {
      console.error("Email authentication failed:", err.code, err.message);

      toast.error(
        err.code === "auth/invalid-login-credentials"
          ? "Invalid email or password. If you're new, create an account first."
          : err.code === "auth/email-already-in-use"
            ? "An account with this email already exists. Please log in."
            : err.code === "auth/weak-password"
              ? "Your password is too weak."
              : err.message || "Authentication failed",
      );
    }
  };

  return { handleEmailAuth, isPending };
};

export default useEmailAuth;
