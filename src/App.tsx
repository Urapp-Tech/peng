import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';

// Create a separate component to handle route rendering
function RouterOutlet() {
  const routing = useRoutes(routeObjects);

  return routing;
}



function App() {

  return (
    <Router>
      <RouterOutlet />
    </Router>
  )
}

export default App
