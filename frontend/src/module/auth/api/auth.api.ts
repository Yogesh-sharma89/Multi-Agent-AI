import api from "../../../service/api"

interface authProps{
    tokenId:string
}

export const authApi = async({tokenId}:authProps)=>{

    if(!tokenId || !tokenId.trim() || typeof tokenId!=="string"){
        console.log("Invalid token Id in auth api")
        return;
    }

    try{

        const res = await api.post("/auth/firebase",{tokenId});
        
        console.log(res.data?.data?.user)
        return res.data?.data.user;

    }catch(err){
      console.log("Error in auth api frontend :" ,err);
      throw err;
    }
}

