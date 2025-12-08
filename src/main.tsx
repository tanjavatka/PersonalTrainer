import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Customers from './components/Customers.tsx';
import Trainings from './components/Trainings.tsx';
import Calendar from './components/Calendar.tsx';
import Error from './components/Error.tsx';
import Home from './components/Home.tsx';
import TrainingStatistics from './components/TrainingStatistics.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "trainings",
        element: <Trainings />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },

      {
        path: "statistics",
        element: <TrainingStatistics />,
      },
    ]
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
