import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import { PriceAnalyticsProvider } from "./context/PriceAnalyticsContext";
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PriceAnalyticsProvider>
        <RouterProvider router={router} />
      </PriceAnalyticsProvider>
    </QueryClientProvider>
  );
}

export default App;
