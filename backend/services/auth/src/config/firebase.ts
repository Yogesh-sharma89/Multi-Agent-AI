import { initializeApp, cert, getApps, type ServiceAccount } from "firebase-admin/app"
import serviceAccount from "../../firebase-service.json" with {type: "json"}
import { getAuth } from "firebase-admin/auth"

const firebaseAdmin = getApps().length > 0 ? getApps()[0] :
    initializeApp({
        credential: cert(serviceAccount as ServiceAccount)
    })
    
const firebaseAdminAuth = getAuth(firebaseAdmin);

export default firebaseAdminAuth;