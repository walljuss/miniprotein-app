import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import authReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// const rootReducer = combineReducers({
// 	search: searchReducer,
// 	auth: authReducer,
// });

//const store = configureStore({
// 	reducer: rootReducer,
// });
const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: ["search"],
};

const reducer = combineReducers({
	search: searchReducer,
	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
