const initialState = {
    currentPage : null
  };
  
  export const pageReducer = (state = initialState, action : any) => {
    switch (action.type) {
      case 'UPDATE_CURRENT_PAGE':
        return {
          ...state,
          currentUser: action.payload,
        };
      default:
        return state;
    }
  };
  