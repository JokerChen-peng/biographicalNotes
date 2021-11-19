
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import RcReduxModel from 'rc-redux-model';

import globalModel from './globalModel';
import resumeModel from './resumeModel';

const reduxModel = new RcReduxModel([globalModel,resumeModel])

const reducerList = combineReducers(reduxModel.reducers)

export default createStore(reducerList,applyMiddleware(reduxModel.thunk,logger))