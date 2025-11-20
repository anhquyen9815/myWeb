import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { GlobalVariableProvider } from './contexts/GlobalVariableContext';
function App() {

  return (
    <BrowserRouter>
    <GlobalVariableProvider>
      <AppRoutes /> {/* GỌI ROUTER Ở ĐÂY */}
      </GlobalVariableProvider>
    </BrowserRouter>
  )
}

export default App
