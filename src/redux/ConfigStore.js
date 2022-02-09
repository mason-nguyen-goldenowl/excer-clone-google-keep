import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";

import { MenuReducer } from "./reducer/MenuReducer";
import { NoteReducer } from "./reducer/NoteReducer";

const persistConfig = {
  key: "root",
  storage: storage,

  stateReconciler: hardSet,
};
const rootReducer = combineReducers({
  menu: MenuReducer,
  note: NoteReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
