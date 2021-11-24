import { IPicture } from '..'

export interface IState {
  layerShown: boolean
  picturesList: IPicture[]
  pictureOrder: number
  imgScale: number
  imgRotate: number
  zoomDelta: number
  zoomMax: number
  zoomMin: number

  /** reset 1:1 ratio */
  zoomResetScale?: number
}

export const initialState = (): IState => ({
  picturesList: [],
  layerShown: false,
  imgScale: 1,
  pictureOrder: 0,
  imgRotate: 0,
  zoomDelta: 25,
  zoomMax: 500,
  zoomMin: 25,
  zoomResetScale: 1
})
