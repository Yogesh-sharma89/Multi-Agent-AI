import { useLogout } from "../../module/auth/hooks/server/useAuth"
import { AiOutlineLogout } from "react-icons/ai";
import { TbLoader4 } from "react-icons/tb";
import { useNavigate } from "react-router";
import {toast} from 'sonner'

const Logout = () => {

  const {mutateAsync:logoutMutation,isPending} = useLogout();

  const navigate = useNavigate();
  
  const handleLogout = async()=>{
    try{

        await logoutMutation();
        navigate("/",{replace:true})
        toast.success("Logout successfully")

    }catch(err:any){ 
     console.log("Logout failed : ",err.message);
     toast.error("Logout failed")
    }
  }

  return (
    <button disabled={isPending}
     onClick={handleLogout}
     className="flex text-white cursor-pointer bg-neutral-800 rounded-lg p-2.5 items-center gap-4">
        {
            isPending ?
            <>
             <TbLoader4 className="size-5"/>
             <span>loading...</span>
            </>
            :
            <> 
             <AiOutlineLogout  className="size-5"/>
             <span>Logout</span>
            </>
        }
    </button>
  )
}

export default Logout
