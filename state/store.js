import { createStore, combineReducers } from "redux"
import * as reducers from "./ducks"

export default function configureStore() {

  const rootReducer = combineReducers( reducers )
  
  return createStore(
      rootReducer,
  )
}
