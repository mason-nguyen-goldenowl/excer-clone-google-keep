import { applyMiddleware, combineReducers, createStore } from "redux";

import thunkMidleWare from "redux-thunk";

import { MenuReducer } from "./reducer/menuReducer";
import { NoteReducer } from "./reducer/noteReducer";
import { UserReducer } from "./reducer/userReducer";

const rootReducer = combineReducers({
  menu: MenuReducer,
  note: NoteReducer,
  user: UserReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMidleWare));

export { store };
