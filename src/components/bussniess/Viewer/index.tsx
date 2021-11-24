import React, { memo, useRef } from 'react'
import { useStore } from '@/context'
import { useDragInfo, useMove } from './hooks'
import styles from './style.module.scss'
import { useScale } from '../Controller/hooks'

const Viewer: React.FC = () => {
  const {
    picturesList,
    pictureOrder,
    imgScale,
    imgRotate,
    layerShown
  } = useStore()
  const { isCanDrag } = useDragInfo()
  const { onStartMove, onMoving, onEndMove, offsetPos, dragStatus } = useMove()
  const { zoomin, zoomout } = useScale()
  const { dispatch } = useStore()
  const onDoubleClick = () => {
    zoomin()
  }
  const imgRef = useRef<HTMLImageElement | null>(null)
  const onImageMetaLoad: React.ReactEventHandler<HTMLImageElement> = () => {
    const img = imgRef.current
    if (img) {
      const ratioX = img.naturalWidth / img.width
      const ratioY = img.naturalHeight / img.height
      // SET_RESET_SCALE
      dispatch({
        type: 'SET_RESET_SCALE',
        scale: +Math.max(ratioX, ratioY).toFixed(0)
      })
    }
  }

  const shouldDelay = useRef(false)
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (ev) => {
    const abs = Math.abs(ev.deltaY)
    const ratio = Math.ceil(abs / 8)

    const isOut = ev.deltaY > 0
    // 判断往上，往下
    if (abs > 3) {
      if (shouldDelay.current) return

      shouldDelay.current = true
      // console.log({ ratio })

      for (let i = 0; i < ratio; i++) {
        if (isOut) {
          zoomout()
        } else {
          zoomin()
        }
      }
      setTimeout(() => {
        shouldDelay.current = false
      }, 100)
    }
  }

  return (
    <div
      className={styles.imgWrapper}
      onMouseUp={onEndMove}
      onMouseLeave={onEndMove}
      onWheel={onWheel}
      onDoubleClick={onDoubleClick}
    >
      <div
        className={styles.container}
        style={{
          transform: layerShown
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -50%) scale(0)'
        }}
      >
        <img
          id="viewerImg"
          draggable
          style={{
            transform: `translate(${-offsetPos.x}px, ${-offsetPos.y}px) scale(${imgScale}) rotate(${imgRotate}deg)`,
            transition: dragStatus ? `none` : 'transform 0.3s ease-in-out',
            cursor: isCanDrag ? 'grab' : 'inherit'
          }}
          src={picturesList[pictureOrder]?.src || ''}
          alt={picturesList[pictureOrder]?.alt || ''}
          onLoad={onImageMetaLoad}
          ref={imgRef}
          onMouseDown={onStartMove}
          onMouseMove={onMoving}
        />
      </div>
    </div>
  )
}

export default memo(Viewer)
