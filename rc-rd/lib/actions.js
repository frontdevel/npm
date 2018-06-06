export const actions = {};

export function createAction(nameSpace, reducers = {}, effects = {}) {
  if (Object.keys(reducers).length) {
    actions[nameSpace] = actions[nameSpace] || {};
  }

  Object.keys(reducers).forEach(actionName => {
    actions[nameSpace][actionName] = actionCreator(nameSpace, actionName);
  });


  Object.keys(effects).forEach((name) => {
    if (actions[nameSpace][name]) {
      throw new Error(`方法名${name}已经存在，请重新命名`);
    }
    actions[nameSpace][name] = (params) => (dispatch, getState) => {
      effects[name](dispatch, getState, params);
    }
  })
};

const actionCreator = (namespace, actionName) => {
  return obj => ({
    type: `${namespace}_${actionName}`,
    obj,
  });
};

