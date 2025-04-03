import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote } from "./journalSlice";

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