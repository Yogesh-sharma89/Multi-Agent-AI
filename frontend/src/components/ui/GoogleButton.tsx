import { FcGoogle } from "react-icons/fc"

const GoogleButton = () => {

  const handleGoogleAuth = async()=>{
    
  }

  return (
    <button type="button" aria-label="google"
     className="flex cursor-pointer hover:bg-zinc-800/90 transition-all duration-100 bg-zinc-800 items-center text-white gap-2 rounded-lg p-3"
    > 
      <FcGoogle className="size-7"/>
      <span>Continue with google</span>
      
    </button>
  )
}

export default GoogleButton
