import { USER_ACTION_TYPE } from "./user.type";

const INITIAL_STATE = {
    currentUser: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;         //meaning: based of this type I want to return/update this obj within payload

    switch (type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return (
                //return an obj that spread thru any of the unaffected attr and upthat the one needed
                {
                    ...state,
                    currentUser: payload
                }
            );
        default:
            //redux reducer will react to every action therefore, returning state that is exactly the same with the old state = no action needed for this reducer
            return state;
    }
}

//****************************************NOTE**********************************************************
//Every Redux reducer will get every action from every dispatch even if it was not meant for the reducer
//That is why the defaut case will have to 'return state'
