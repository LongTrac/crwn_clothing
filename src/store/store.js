//NOTE: This file is a combine place where all redux happens. 
//It is also where the state lives, where we receive action and dispatch them to our reducer to update the state
//for now, This is the basic setup boilerplate code

import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-Reducer";

//middleWares are like lib helpers that run before an action hit a reducer 
const middleWares = [logger]

const composeEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composeEnhancers)

