import { createStore } from "redux";
import { reduce } from "./reducer";
import { AppState } from "./app-state";
import { Provider } from "react-redux";

export const store = createStore(reduce, new AppState());
// export const store = createStore(reduce);

