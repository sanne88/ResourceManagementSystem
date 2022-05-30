
import { applyMiddleware } from 'redux'
import rootReducer from '../rootReducer'
import rootSaga from '../rootSaga'
import createSagaMiddleware from '@redux-saga/core'
import { createStore } from 'redux'


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  )


sagaMiddleware.run(rootSaga,store.dispatch)
