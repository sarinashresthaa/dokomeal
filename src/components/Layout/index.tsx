import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ScrollToTop from "@/components/ScrollToTop"

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />

      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
