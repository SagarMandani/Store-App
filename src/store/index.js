import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../redux/reducers';

/*========================================================
    * function Name: createStore
    * function Purpose: call all midddle Ware and reducers
    * function Parameters: reducers, midddleWare
    * function ReturnType: store
    * function Description: createStore using midddle Ware and reducers
    *=====================================================*/

const middleWare = [
  thunk
];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middleWare.push(logger);
  }

const store = createStore(reducers, applyMiddleware(...middleWare));

export default store;