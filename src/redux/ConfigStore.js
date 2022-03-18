import { applyMiddleware, combineReducers, createStore } from "redux";

import thunkMidleWare from "redux-thunk";

import { MenuReducer } from "./reducer/MenuReducer";
import { NoteReducer } from "./reducer/NoteReducer";
import { UserReducer } from "./reducer/UserReducer";

const rootReducer = combineReducers({
  menu: MenuReducer,
  note: NoteReducer,
  user: UserReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMidleWare));

export { store };
