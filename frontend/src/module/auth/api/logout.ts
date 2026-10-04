import api from "../../../service/api"

export const logoutApi = async()=>{
    try{
       
        const res = await api.post("/auth/logout");
        return res.data;
    }catch(err){
      console.log("Error in logout api :",err);
      throw err;
    }
}


