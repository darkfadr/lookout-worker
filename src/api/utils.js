import express from 'express';
const api = express.Router();

export const multiply = (a, b) => a * b;

api.map = routes => {
  Object.keys(routes).forEach(path => {
    const route = api.route(path);
    Object.keys(routes[path])
      .forEach(action =>route[action](routes[path][action]))
  });
}

export default api
