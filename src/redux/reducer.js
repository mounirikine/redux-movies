const initialState = { movies: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, movies: [...state.movies, action.payload] };
    default:
      return state;
  }
};

export default reducer;
