import { useReducer, useCallback } from "react";
import RequestData from "../models/Request";

type HttpState<T> = {
  data: T | null
  error: string | null,
  isLoading: boolean,
  status: string
}

type HttpAction<T> =  { type: 'pending' } | { type: 'success'; payload: { data: T } } | { type: 'fail'; payload: { error: string} } | { type: 'removeError' } ;

const initialState = {
  data: null,
  error: null,
  status: '',
  isLoading: false,
}

const createHttpReducer = <T,>() => (state: HttpState<T>, action: HttpAction<T>) => {
  if (action.type === 'pending') {
    return {
      ...state,
      isLoading: true,
      error: null,
      status: 'pending'
    }
  }
  if (action.type === 'success') {
    return {
      ...state,
      isLoading: false,
      error: null,
      data: action.payload.data,
      status: 'completed'
    }
  }
  if (action.type === 'fail') {
    return {
      ...state,
      isLoading: false,
      error: action.payload.error,
      data: null,
      status: 'completed'
    }
  }
  if (action.type === 'removeError') {
   return {
     ...state,
     error: null,
     data: null,
     status: ''
   } 
  }
  return initialState;
}


const useHttp = <T,Y> (requestFunction: (requestData: RequestData<Y>) => Promise<T>) => {
  const httpReducer = createHttpReducer<T>();
  const [httpState, dispatch] = useReducer(httpReducer, initialState);
  
  const sendRequest = useCallback(async(requestData: RequestData<Y>) => {
    try {
      dispatch({ type: 'pending'});
      const data = await requestFunction(requestData);
      dispatch({ type: 'success', payload: { data } });
    } catch (error) {
      dispatch({ type: 'fail', payload: { error: error.message }});
    }
  }, [ requestFunction ]);

  const removeError = () => {
    dispatch({type: 'removeError'});
  }

  return {
    ...httpState,
    sendRequest,
    removeError
  }

}

export default useHttp;