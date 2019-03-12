import * as actionTypes from "../actions/actionTypes";

const initalState = {
  watchlist: [],
  watched: []
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        watchlist: state.watchlist.concat(action.payload)
      };
    case actionTypes.DELETE:
      return {
        ...state,
        watched: state.watched.filter(movie => movie !== action.payload),
        watchlist: state.watchlist.filter(movie => movie !== action.payload)
      };
    case actionTypes.WATCH:
      return {
        ...state,
        watched: state.watched.concat(action.payload),
        watchlist: state.watchlist.filter(movie => movie !== action.payload)
      };
    case actionTypes.UNWATCH:
      return {
        ...state,
        watchlist: state.watchlist.concat(action.payload),
        watched: state.watched.filter(movie => movie !== action.payload)
      };
    default:
      return state;
  }
};
export default reducer;
