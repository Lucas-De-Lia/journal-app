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
             state.messageSaved = '';
        },
        setNotes: (state, action) => {
             state.notes = action.payload;
        },
        setSaving: (state) => {
          state.isSaving = true;
          state.messageSaved = '';
             //TODO: mensaje de error
        },
        updateNote: (state,action) => {
          state.isSaving = false;

          state.notes = state.notes.map( note => {

          if( note.id === action.payload.id ) {
               return action.payload;
          }
          return note;
          })

          state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
               state.notes = state.notes.filter( note => note.id !== action.payload );
               state.active = null;
        },

   }
});


// Action creators are generated for each case reducer function
export const { clearNotesLogout ,setPhotosToActiveNote ,addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote } = journalSlice.actions;