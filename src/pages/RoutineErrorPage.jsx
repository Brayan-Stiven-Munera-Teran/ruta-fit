import { Link, useRouteError } from 'react-router'
import { FaExclamationCircle } from 'react-icons/fa'

function RoutineErrorPage() {
  const error = useRouteError()
  const message =
    error?.data || error?.message || 'No pudimos cargar la rutina solicitada.'

  return (
    <>
      <title>Rutina no disponible | Ruta Fit</title>
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <FaExclamationCircle
        className="mb-4 h-14 w-14 text-rose-500"
        aria-hidden="true"
      />
      <h1 className="text-3xl font-bold text-slate-900">
        Rutina no disponible
      </h1>
      <p className="mt-2 max-w-md text-slate-600">{message}</p>
      <Link
        to="/routines"
        className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Volver al listado
      </Link>
    </section>
    </>
  )
}

export default RoutineErrorPage
