import Homepage from "./components/HomePage";
import ShopPage from "./components/ShoppingPage";
import ErrorPage from "./components/ErrorPage";
import MainPage from "./components/MainPage";

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
        path: "/ShoppingCart",
        element: <ShopPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
