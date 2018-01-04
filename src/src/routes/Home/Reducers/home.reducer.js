export const CLICK_HERE ="CLICK_HERE"

  export function ClickHereReducer(){
  return (dispatch, getState) => {

  dispatch({
      type: CLICK_HERE,
      payload: null
    });
  }
  
}


export const ACTION_HANDLERS = {
  [CLICK_HERE]: (state, action) => {
      return Object.assign({}, state, {})
  },
  
}
const initialState = {
};

export default function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
