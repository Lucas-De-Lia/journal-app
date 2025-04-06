import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth/authSlice";
import { FirebaseAuth } from "../firebase/config";
import { starLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {
    const dispatch = useDispatch();
    
    const {status} = useSelector((state) => state.auth);
    
    useEffect(() => {
    // Verifica si el usuario ya está autenticado mediante un observable
        onAuthStateChanged(FirebaseAuth, async (user) => {
        if(!user) return dispatch(logout());
        const {uid, email, displayName, photoURL} = user;
        dispatch(login({email, displayName, photoURL, uid}));
        dispatch(starLoadingNotes());
    });
        
    }, []);

    //este hook no regresa nada solo se usa para ejecutar el useEffect
    // y el dispatch de redux para cambiar el estado de la autenticación
    return status
    //este return no es necesario
}
