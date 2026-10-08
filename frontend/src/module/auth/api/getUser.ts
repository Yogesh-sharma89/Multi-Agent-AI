import api from "../../../service/api"

export const getUserApi =async()=>{
    try{

        const res = await api.get("/auth/me");

        return res.data.data.user;

    }catch(err){
      console.log("error in get current user api : ",err);
      throw err;
    }
}