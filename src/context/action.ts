import { IPicture } from '..'

interface SHOWN_LAYER {
  type: 'SHOWN_LAYER'
  visible: boolean
}

interface RESET_PROPS {
  type: 'RESET_PROPS'
  props: {
    picturesList: IPicture[]
    zoomDelta?: number
    zoomMax?: number
    zoomMin?: number
  }
}

interface SET_SCALE {
  type: 'SET_SCALE'
  scale: number
}

interface SET_RESET_SCALE {
  type: 'SET_RESET_SCALE'
  scale: number
}

interface SET_ROTATE {
  type: 'SET_ROTATE'
  rotate: number
}

interface SET_PICTURE_ORDER {
  type: 'SET_PICTURE_ORDER'
  order: number
}

export type IAction =
  | SHOWN_LAYER
  | SET_SCALE
  | SET_RESET_SCALE
  | SET_ROTATE
  | SET_PICTURE_ORDER
  | RESET_PROPS
