import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

//thunks acciones que yo puedo hacer dispatch, pero estas actions tienen tareas asincronas
export const chekingAuthentication = ( email, password ) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const starGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login( result ));
    }
}

export const startCreatingUserWithEmailPassword = ({email,password,displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const {ok , uid, photoURL,errorMessage } = await registerUserWithEmailPassword({email,password,displayName});
        if(!ok) return dispatch(logout({errorMessage}));
        dispatch(login({uid,displayName,email,photoURL}));
    }
}

export const startLoginWithEmailPassword = ({email,password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const {ok , uid, photoURL,errorMessage,displayName } = await loginWithEmailPassword({email,password});
        if(!ok) return dispatch(logout({errorMessage}));
        dispatch(login({uid,displayName,email,photoURL}));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    }
}