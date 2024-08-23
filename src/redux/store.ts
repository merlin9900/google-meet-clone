import { createStore, combineReducers } from "redux";
import { peerReducer } from "./modules/peer";
import { streamReducer } from "./modules/stream";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
   peer: peerReducer,
   stream: streamReducer
});



const store = createStore(
   rootReducer,
);

export default store;
