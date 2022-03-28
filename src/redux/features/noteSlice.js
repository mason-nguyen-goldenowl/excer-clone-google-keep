import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "notes",
  initialState: {
    arrNote: [],
    arrSearch: [],
    arrLabel: [],
    labelName: "",
    isLoaded: false,
  },
  reducers: {
    getNotes(state, action) {
      state.arrNote = action.payload.arrNote.reverse();
      state.isLoaded = action.payload.isLoaded;
    },
    updateNote(state, action) {
      state.arrNote = action.payload.newArrNote;
      if (action.payload.newArrLabel) {
        state.arrLabel = action.payload.newArrLabel;
      }
    },
    search(state, action) {
      state.arrSearch = action.payload.arrSearch.reverse();
    },
    getLabels(state, action) {
      state.arrLabel = action.payload;
    },
    getLabelName(state, action) {
      state.labelName = action.payload;
    },
    updateArrLabel(state, action) {
      state.arrLabel = action.payload.newArrLabel;
    },
  },
});
export const selectNotes = (state) => state.notes;

export const {
  getNotes,
  updateNote,
  search,
  getLabels,
  getLabelName,
  updateArrLabel,
} = noteSlice.actions;
export default noteSlice.reducer;
