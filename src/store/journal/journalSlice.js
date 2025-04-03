import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
      isSaving:  false,
      messageSaved: '',
        notes: [],
        active: null
        //active:{id:'', title:'', body:'', date:0, imageUrls:[]}
   },
   reducers: {

        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);//esto lo puedo hacer porque estoy en un slice (ya que redux tiene codigo mutativo entonces no tengo que ...notes) y no en un reducer normal 
            state.isSaving = false;

        },
        setActiveNote: (state, action) => {
             state.active = action.payload;
        },
        setNotes: (state, action) => {
             
        },
        setSaving: (state, action) => {
             
        },
        updateNote: (state, action) => {
             
        },
        deleteNoteById: (state, action) => {
             
        },

   }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote } = journalSlice.actions;