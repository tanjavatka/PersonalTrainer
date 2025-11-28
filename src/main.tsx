import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Customers from './components/Customers.tsx';
import Trainings from './components/Trainings.tsx';
import Calendar from './components/Calendar.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <Error />,
    children: [
      {
        element: <Customers />,
        index: true,
      },
      {
        path: "trainings",
        element: <Trainings />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
    ]
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
