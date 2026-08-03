import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Browsers keep the scroll offset across client-side navigation,
// so every route change has to reset it by hand
const ScrollToTop = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname, search])

  return null
}

export default ScrollToTop
