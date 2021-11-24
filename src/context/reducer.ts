import { IState } from './state'
import { IAction } from './action'

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'RESET_PROPS': {
      const {
        picturesList = [],
        zoomDelta = 25,
        zoomMax = 500,
        zoomMin = 25
      } = action.props
      return { ...state, picturesList, zoomDelta, zoomMax, zoomMin }
    }

    case 'SHOWN_LAYER': {
      const returnState = { ...state, layerShown: action.visible }
      if (!action.visible) returnState.imgScale = 1
      return returnState
    }

    case 'SET_SCALE': {
      return { ...state, imgScale: action.scale }
    }

    case 'SET_RESET_SCALE': {
      return { ...state, zoomResetScale: action.scale }
    }

    case 'SET_ROTATE': {
      return { ...state, imgRotate: action.rotate }
    }

    case 'SET_PICTURE_ORDER': {
      const picturesListLength = state.picturesList.length
      let picOrder = action.order
      if (picOrder + 1 > picturesListLength) {
        picOrder = picturesListLength - 1
      }
      if (picOrder < 0) {
        picOrder = 0
      }

      return { ...state, pictureOrder: picOrder, imgScale: 1, imgRotate: 0 }
    }

    default:
      return state
  }
}

export default reducer
