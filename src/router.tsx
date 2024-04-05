import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Dictionary from "./pages/dictionary/Dictionary";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/dictionary",
    element: (
        <Layout>
            <Dictionary/>
        </Layout>
    )
  }
]);

export default router;
