import { signInWithPopup } from "firebase/auth";
import {
  appleProvider,
  auth,
  githubProvider,
  googleProvider,
} from "../../../../service/firebase.service";
import { useAuthMutation } from "../server/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type provider = "google" | "github" | "apple";

const useSocialProviders = () => {

  const { mutateAsync: socialMutation, isPending } = useAuthMutation();

  const navigate = useNavigate();

  const handleSocialAuth = async (provider: provider) => {

    const authprovider =
      provider === "google"
        ? googleProvider
        : provider === "github"
          ? githubProvider
          : appleProvider;

    try {
      const data = await signInWithPopup(auth, authprovider);

      const tokenId = await data.user.getIdToken();

      await toast
        .promise(socialMutation({ tokenId }), {
          loading: "Authenticating...",
          success: () => {
            navigate("/dashboard",{replace:true})
            return "Authenticated successfully";
          },
          error: (err) =>
            err.response?.data?.message || "failed to authenticate",
        })
        .unwrap();
    } catch (err) {
      console.log("Error in handle social auth :", err);
    }
  };

  return {handleSocialAuth,isPending};

};

export default useSocialProviders;
