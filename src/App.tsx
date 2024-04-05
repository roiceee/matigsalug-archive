import { RouterProvider } from "react-router-dom";
import router from "./router";
// import clearAndResetDb from "./data/script";
// clearAndResetDb();

function App() {
 
  return <RouterProvider router={router}/>;
}

export default App;
