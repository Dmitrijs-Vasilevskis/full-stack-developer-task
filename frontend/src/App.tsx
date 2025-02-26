import "./App.css";
import { ApolloProvider } from "@apollo/client";
import client from "./services/graphql";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/HomePage/HomePage";
import CategoryPage from "./routes/CategoryPage/CategoryPage";
import ProductPage from "./routes/ProductPage/ProductPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "/:category?",
          element: <CategoryPage />,
        },
        {
          path: "product/:sku?",
          element: <ProductPage />,
        },
      ],
    },
  ]);

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
