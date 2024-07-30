//Import the `createRoot` function from 'react-dom/client'
import { createRoot } from "react-dom/client";

//importing the MainView component
import { MainView } from "./components/main-view/main-view";

//imported for styling; it will be bundled by build tool
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return <MainView />;
};

// Locate the root DOM element where the React app will be mounted
// The `#root` is a placeholder element in your HTML file where React will render the application
const container = document.querySelector ("#root");
// Create a React root instance using the `createRoot` function
// This sets up the root for the React application
const root = createRoot(container);

//Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);


