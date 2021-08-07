const userReducer = (state = {}, action) => {
        switch (action.type) {
            case "addUser": {
                console.log(`chargement user dans le store: \u001b[1;32m ${action.payload.username}, email: ${action.payload.email}`)
                //console.log( " Chargement terminé  ok willem" );
                //console.log(action.payload)
                return action.payload;
            }  
            case "removeToken": {
                console.log('dans le reducer remove token')
                return {wishList: []};
            }
            case "setConversationId": {
                // console.log("reducer setConversations", action.payload)
                return {...state, conversation: action.payload}
            }  
    
            default:
                return state;
        }
    };

export default userReducer