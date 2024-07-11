import Homepage from "./components/HomePage";
import ShopPage from "./components/ShoppingPage";
import ErrorPage from "./components/ErrorPage";
import MainPage from "./components/MainPage";
import CartPage from "./components/ShoppingCart";

const routes = [
  {
    path: "/",
    element: <Homepage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/ShoppingPage",
        element: <ShopPage />,
      },
      {
        path: "ShoppingCart",
        element: <CartPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
