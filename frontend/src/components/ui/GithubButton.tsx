import { signInWithPopup } from "firebase/auth";

import { auth, githubProvider } from "../../service/firebase.service";
import { useState } from "react";
import { TbLoader4 } from "react-icons/tb";
 import { FaGithub } from "react-icons/fa";

const GithubButton = () => {

  const [loading, setLoading] = useState(false);

  const handleGithubAuth = async () => {
    setLoading(true);
    try {
      const data = await signInWithPopup(auth, githubProvider);
      console.log(data);
    } catch (err) {
      console.log("Error in google auth :",err)
    }finally{
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGithubAuth}
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
        <FaGithub className="size-6"/>
        <span>Continue with github</span>
        </>
      }
    </button>
  );
};

export default GithubButton;
