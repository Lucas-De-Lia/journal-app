import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";
//mis provedores de autenticación
const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName,email,photoURL,uid} = result.user;
        return {
            ok:true, 
            //devuelvo los datos del usuario
            displayName,email,photoURL,uid
        };
    }catch (e){
        const errorMessage = e.message;

        return {
            ok:false,
            errorMessage
        };
    }
}