import { RouterProvider } from "react-router-dom";

import UserProvider from "./components/UserProvider";
import router from "./router";
// import clearAndResetDb from "./data/script";
// clearAndResetDb();

function App() {

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
