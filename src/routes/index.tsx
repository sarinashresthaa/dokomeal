import Layout from "@/components/Layout"
import About from "@/pages/About"
import Cart from "@/pages/Cart.tsx"
import Home from "@/pages/Home"
import Menu from "@/pages/Menu.tsx"
import { useRoutes } from "react-router-dom"
import { ROUTES } from "./routes"

export const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: ROUTES.ABOUT, element: <About /> },
        { path: ROUTES.MENU, element: <Menu /> },
        { path: ROUTES.CART, element: <Cart /> },
      ],
    },
  ])
