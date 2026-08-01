import Layout from "@/components/Layout"
import About from "@/pages/About"
import Cart from "@/pages/Cart"
import Home from "@/pages/Home"
import Menu from "@/pages/Menu"
import { useRoutes } from "react-router-dom"
import { ROUTES } from "./routes"
import MenuDetail from "@/pages/MenuDetail"

export const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: ROUTES.ABOUT, element: <About /> },
        { path: ROUTES.MENU, element: <Menu /> },
        { path: ROUTES.MENU_DETAIL, element: <MenuDetail /> },
        { path: ROUTES.CART, element: <Cart /> },
      ],
    },
  ])
