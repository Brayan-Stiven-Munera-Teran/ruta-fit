import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="mx-auto max-w-7xl px-4 py-12">
            <h1 className="text-2xl font-bold text-slate-900">
              Ruta Fit · Inicio (en construcción)
            </h1>
          </div>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
