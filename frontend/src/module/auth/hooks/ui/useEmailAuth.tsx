import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthMutation } from "../server/useAuth"
import { auth } from "../../../../service/firebase.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";


const useEmailAuth = () => {


  const {mutateAsync:emailAuth,isPending} = useAuthMutation();

  const navigate = useNavigate();

  const handleEmailAuth = async(email:string,password:string)=>{
    try{

        const data = await signInWithEmailAndPassword(auth,email,password);

        const tokenId = await data.user.getIdToken();

        await toast.promise(emailAuth({tokenId}),{
            loading:"Logging you in...",
            success:()=>{
                navigate("/dashboard")
                return "Logged in successfully"
            },
            error:(err)=>err.response?.data?.message || "Login failed"
        }).unwrap();

    }catch(err){
      console.log("Email login failed :",err);
    }
  }

  return {handleEmailAuth,isPending}

}

export default useEmailAuth
