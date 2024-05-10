import { createStore } from "redux";
import rootReducer, { RootState } from "./reducers"; // Assuming you have RootState defined in your reducers file

const store = createStore(rootReducer);

export default store;
export type { RootState };