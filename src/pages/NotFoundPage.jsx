import { Link } from 'react-router'
import { FaExclamationTriangle } from 'react-icons/fa'

function NotFoundPage() {
  return (
    <>
      <title>404 · Página no encontrada | Ruta Fit</title>
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <FaExclamationTriangle
        className="mb-4 h-16 w-16 text-amber-500"
        aria-hidden="true"
      />
      <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
        404 · Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        La ruta que buscas no existe o fue movida dentro de Ruta Fit.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Volver al inicio
      </Link>
    </section>
    </>
  )
}

export default NotFoundPage
