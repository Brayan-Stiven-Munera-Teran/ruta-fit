import { useEffect, useState } from 'react'
import RoutineCard from './RoutineCard'
import Spinner from './Spinner'
import { getLatestRoutines, getRoutines } from '../services/routinesApi'

function RoutineListings({ isHome = false }) {
  const [routines, setRoutines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRoutines() {
      try {
        setLoading(true)
        setError('')
        const data = isHome
          ? await getLatestRoutines(3, { signal: controller.signal })
          : await getRoutines({ signal: controller.signal })
        setRoutines(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Ocurrió un error al cargar las rutinas.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchRoutines()
    return () => controller.abort()
  }, [isHome])

  return (
    <section
      className={
        isHome
          ? 'border-t border-slate-200 bg-emerald-50/50 py-12'
          : 'py-10'
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isHome ? (
          <h2 className="mb-8 text-center text-3xl font-bold text-emerald-900">
            Últimas rutinas
          </h2>
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Catálogo de rutinas
            </h1>
            <p className="mt-2 text-slate-600">
              Explora todas las rutinas disponibles en Ruta Fit.
            </p>
          </div>
        )}

        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <div
            role="alert"
            className="mx-auto max-w-xl rounded-lg border border-rose-200 bg-rose-50 p-4 text-center text-rose-700"
          >
            {error}
          </div>
        ) : routines.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No hay rutinas disponibles en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {routines.map((routine) => (
              <RoutineCard key={routine.id} routine={routine} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RoutineListings
