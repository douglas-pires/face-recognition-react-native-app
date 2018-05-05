import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk'
import * as reducers from "./ducks"

// export default 

export default function configureStore() {

  // const rootReducer = combineReducers( reducers )
  return compose(applyMiddleware(thunk))(createStore)(combineReducers(reducers))
  // return createStore(
  //     rootReducer,
  // )
}
