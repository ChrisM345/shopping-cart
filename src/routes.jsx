import Homepage from "./components/HomePage";
import ShopPage from "./components/ShoppingPage";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ShoppingCart",
    element: <ShopPage />,
  },
];

export default routes;
