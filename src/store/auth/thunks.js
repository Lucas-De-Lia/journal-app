import { singInWithGoogle } from "../../firebase/providers";
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