//NOTE: This file is a combine place where all redux happens. THIS IS THE MAIN PLACE
//It is also where the state lives, where we receive action and dispatch them to our reducer to update the state
//for now, This is the basic setup boilerplate code

import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-Reducer";

//middleWares are like lib helpers that run before an action hit a reducer 
// in this case we want to log that state
const middleWares = [logger]

//compose is a programming concept: it is a way for us to pass multiple functions left to right
const composeEnhancers = compose(applyMiddleware(...middleWares))

//will need to update as it is deprecated
export const store = createStore(rootReducer, undefined, composeEnhancers)

