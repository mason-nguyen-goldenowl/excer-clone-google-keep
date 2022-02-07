import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { MenuReducer } from "./reducer/MenuReducer";
import { NoteReducer } from "./reducer/NoteReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  // blacklist: ["menu"],
  stateReconciler: autoMergeLevel2,
};
const rootReducer = combineReducers({
  menu: MenuReducer,
  note: NoteReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
