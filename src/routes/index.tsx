import Layout from "@/components/Layout"
import Home from "@/pages/Home"
import { useRoutes } from "react-router-dom"
import { ROUTES } from "./routes"
import About from "@/pages/About"
import Product from "@/pages/Product.tsx"
import Cart from "@/pages/Cart.tsx"

export const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: ROUTES.ABOUT, element: <About /> },
        { path: ROUTES.PRODUCT, element: <Product /> },
        { path: ROUTES.CART, element: <Cart /> },
      ],
    },
  ])
