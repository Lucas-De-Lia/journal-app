import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { setPhotosToActiveNote ,addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, deleteNoteById } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    //getState me da el estado actual de la aplicacion
    return async (dispactch,getState) => {

        dispactch(savingNewNote());
        
        const { uid } = getState().auth; 

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        dispactch(addNewEmptyNote(newNote));
        dispactch(setActiveNote(newNote));

        //dispatching new note
        //dispatch active note
    }
}

export const starLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth; 
        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth; 
        const { active: note } = getState().journal; 

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        //arrglo de promesas a disparar para subir archivos
        const fileUploadPromises = [];
        //creo el arreglo de promesas
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }
        //disparo todas las promesas al mismo tiempo(como hacer un then)
        const photoUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photoUrls));

        
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth; 
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
 
    }
}