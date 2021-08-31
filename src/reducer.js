// how data layers looks intially
export const initialState = {
    user:null,
};

//this where we push information into data layer (pushing user in layer)
export const actionTypes = {
    SET_USER : "SET_USER",
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

export default reducer;