import { combineReducers } from 'redux';
import { createAction } from './actions';

export const models  = [];
export default function model(modelObj) {
  const { name, reducers, initialState, effects } = modelObj;
  checkModel(reducers, name);

  const reducer = createReducer(formateReducer(name, reducers), initialState);

  const _model = {
    name,
    reducer,
  };

  models.push(_model);

  const interfaceFormat = formatInterface(effects);
  createAction(modelObj.name, reducers, interfaceFormat);

  return models;
}

const checkModel = (reducers, nameSpace) => {
  if (!isObject(reducers)) {
    throw new Error('reducers 必须是一个对象，请重新设置！');
    return false;
  }
  if (models.find(item => item.name === nameSpace)) {
    throw new Error(`model名 ${nameSpace} 属性已经被设置过了，请重新设置！`);
    return false;
  }
};

const isObject = (target) => {
  return Object.prototype.toString.call(target) === '[object Object]';
}

const formatInterface = (effects) => {
  if (!effects) {
    return effects;
  }
  return Object.keys(effects).reduce((accumulator, interfaceName) => {
    if (typeof effects[interfaceName] === 'function') {
      accumulator[interfaceName] = effects[interfaceName];
    }
    return accumulator;
  }, {});
};

const formateReducer = (nameSpace, reducers) => {
  if (!reducers) {
    return reducers;
  }
  return Object.keys(reducers).reduce((accumulator, current) => {
    accumulator[`${nameSpace}_${current}`] = reducers[current];
    return accumulator;
  }, {});
};

const createReducer = (reducers, initialState = null) => {
  return (state = initialState, action) => {
    if (typeof reducers[action.type] === 'function') {
      return Object.assign({}, state, reducers[action.type](state, action.obj));
    }
    return state;
  }
};
