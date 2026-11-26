import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import RoutinesPage from './pages/RoutinesPage'
import RoutineDetailPage from './pages/RoutineDetailPage'
import AddRoutinePage from './pages/AddRoutinePage'
import EditRoutinePage from './pages/EditRoutinePage'
import RoutineErrorPage from './pages/RoutineErrorPage'
import NotFoundPage from './pages/NotFoundPage'
import { getRoutineById } from './services/routinesApi'

const routineLoader = ({ params }) => getRoutineById(params.id)

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'routines', element: <RoutinesPage /> },
      {
        path: 'routines/:id',
        element: <RoutineDetailPage />,
        loader: routineLoader,
        errorElement: <RoutineErrorPage />,
      },
      { path: 'add-routine', element: <AddRoutinePage /> },
      {
        path: 'edit-routine/:id',
        element: <EditRoutinePage />,
        loader: routineLoader,
        errorElement: <RoutineErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
