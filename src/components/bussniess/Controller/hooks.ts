import { useEffect, useCallback, useState, useMemo } from 'react'
import { useStore } from '@/context'

export function useKeyboardClose(usingStatus: boolean, onClose: () => void) {
  const listenEnterToClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== 'Escape') return
      e.preventDefault()
      onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!usingStatus) return
    document.addEventListener('keyup', listenEnterToClose)
    return () => {
      document.removeEventListener('keyup', listenEnterToClose)
    }
  }, [])
}

export function useIntoViewerShown() {
  const { layerShown } = useStore()
  const [controllerShown, setControllerShown] = useState(true)

  useEffect(() => {
    if (!layerShown) return
    let timeout: NodeJS.Timeout | null = null
    timeout = setTimeout(() => {
      setControllerShown(false)
    }, 2000)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [layerShown])

  return controllerShown
}

export function useScale() {
  const {
    dispatch,
    imgScale,
    zoomMax,
    zoomMin,
    zoomDelta,
    zoomResetScale
  } = useStore()
  const zoomin = useCallback(() => {
    if (imgScale >= zoomMax / 100) return
    dispatch({ type: 'SET_SCALE', scale: imgScale + zoomDelta / 100 })
  }, [imgScale, zoomDelta, zoomMax])

  const zoomout = useCallback(() => {
    if (imgScale <= zoomMin / 100) return
    dispatch({ type: 'SET_SCALE', scale: imgScale - zoomDelta / 100 })
  }, [imgScale, zoomDelta, zoomMin])

  const zoomreset = useCallback(() => {
    dispatch({ type: 'SET_SCALE', scale: zoomResetScale || 1 })
  }, [zoomResetScale])

  return { zoomin, zoomout, zoomreset }
}

export function useToggle() {
  const { picturesList, pictureOrder, dispatch } = useStore()

  const isCanGoNext = useMemo(() => {
    return pictureOrder + 1 < picturesList.length
  }, [pictureOrder, picturesList])

  const isCanGoLast = useMemo(() => {
    return pictureOrder > 0
  }, [pictureOrder])

  const goNext = useCallback(() => {
    dispatch({ type: 'SET_PICTURE_ORDER', order: pictureOrder + 1 })
  }, [pictureOrder])

  const goLast = useCallback(() => {
    dispatch({ type: 'SET_PICTURE_ORDER', order: pictureOrder - 1 })
  }, [pictureOrder])

  return { goNext, goLast, isCanGoNext, isCanGoLast }
}

export function useRotate() {
  const { imgRotate, dispatch } = useStore()

  const rotate = useCallback(() => {
    dispatch({ type: 'SET_ROTATE', rotate: imgRotate + 90 })
  }, [imgRotate])

  return { rotate }
}
