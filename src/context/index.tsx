import React, {
  createContext,
  useReducer,
  Dispatch,
  useContext,
  useEffect
} from 'react'
import { initialState, IState } from './state'
import { IAction } from './action'
import reducer from './reducer'
import { IPicture } from '..'

interface IContext extends IState {
  dispatch: Dispatch<IAction>
}
const Context = createContext(null as IContext | null)

interface Props {
  picturesList: IPicture[]
  zoomDelta?: number
  zoomMax?: number
  zoomMin?: number
  /** reset 1:1 ratio */
  zoomResetValue?: number
}

const ContextProvider: React.FC<Props> = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState())

  useEffect(() => {
    dispatch({ type: 'RESET_PROPS', props: { ...props } })
  }, [props.picturesList, props.zoomDelta, props.zoomMax, props.zoomMin])

  return (
    <Context.Provider value={{ dispatch, ...state }}>
      {children}
    </Context.Provider>
  )
}

export function useStore() {
  const store = useContext(Context)
  if (!store) {
    throw new Error('store is Empty')
  }

  return store
}

export default ContextProvider
