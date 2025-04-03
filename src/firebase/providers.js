import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
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

export const registerUserWithEmailPassword = async({email,password,displayName}) => {
    try{
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        
        await updateProfile(FirebaseAuth.currentUser, { displayName } );

        return {
            ok:true,
            uid, 
            photoURL,
            displayName,
            email
        }
    }
    catch(e){
        return {ok:false, errorMessage: e.message}
    }
}

export const loginWithEmailPassword = async({email,password}) => {
    //! singInWithEmailAndPassword 
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {displayName,email : respEmail,photoURL,uid} = resp.user;
         return {
            ok:true,
            displayName,email,photoURL,uid
        } 

    }catch(e){
        return {ok:false, errorMessage: e.message}
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}
