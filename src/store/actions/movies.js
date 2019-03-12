import * as actionTypes from "./actionTypes";

export const add_movie = name => {
  return {
    type: actionTypes.ADD,
    payload: name
  };
};

export const delete_movie = movie => {
  return {
    type: actionTypes.DELETE,
    payload: movie
  };
};

export const watch_movie = movie => {
  return {
    type: actionTypes.WATCH,
    payload: movie
  };
};

export const unwatch_movie = movie => {
  return {
    type: actionTypes.UNWATCH,
    payload: movie
  };
};
