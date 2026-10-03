import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../service/firebase.service";
import { useState } from "react";
import { TbLoader4 } from "react-icons/tb";
import { useAuthMutation } from "../../module/auth/hooks/server/useAuth";

const GoogleButton = () => {

  const [loading, setLoading] = useState(false);

  const {mutateAsync:authMutation} = useAuthMutation();

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const data = await signInWithPopup(auth, googleProvider);
      const tokenId = await data.user.getIdToken()
      await authMutation({tokenId});
    } catch (err) {
      console.log("Error in google auth :",err)
    }finally{
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      disabled={loading}
      aria-label="google"
      className="flex disabled:cursor-not-allowed cursor-pointer hover:bg-zinc-800/90 transition-all duration-100 bg-zinc-800 items-center text-white gap-2 rounded-lg p-3"
    >
      {
        loading ? 
        <>
         <TbLoader4 className="size-6 animate-spin"/>
         <span>Loading...</span>
        </>
        :
        <>
        <FcGoogle className="size-6"/>
        <span>Continue with google</span>
        </>
      }
    </button>
  );
};

export default GoogleButton;
