import { RouterProvider } from "react-router-dom";
import { router } from "./approutes.jsx"; 
import { AuthProvider } from "./Auth/authContext.jsx";
import { InterviewProvider } from "./interview/InterviewContext.jsx";

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;