import { useEffect, useState } from 'react'
import RoutineCard from './RoutineCard'
import Spinner from './Spinner'
import {
  getLatestRoutines,
  getRoutines,
  getRoutinesPage,
} from '../services/routinesApi'

const CATEGORIES = ['Fuerza', 'Cardio', 'Movilidad', 'Core', 'HIIT']
const DIFFICULTIES = ['Fácil', 'Media', 'Difícil']
const PER_PAGE = 6

function RoutineListings({ isHome = false }) {
  const [routines, setRoutines] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [difficulty, setDifficulty] = useState('Todas')

  const hasActiveFilters =
    !isHome &&
    (search.trim() !== '' || category !== 'Todas' || difficulty !== 'Todas')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRoutines() {
      try {
        setLoading(true)
        setError('')

        if (isHome) {
          const data = await getLatestRoutines(3, { signal: controller.signal })
          setRoutines(data)
          setTotalItems(data.length)
          setTotalPages(1)
        } else if (hasActiveFilters) {
          const data = await getRoutines({ signal: controller.signal })
          setRoutines(data)
          setTotalItems(data.length)
        } else {
          const result = await getRoutinesPage(page, PER_PAGE, {
            signal: controller.signal,
          })
          setRoutines(result.data)
          setTotalItems(result.items)
          setTotalPages(result.pages)
        }
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
  }, [isHome, hasActiveFilters, page])

  const text = search.trim().toLowerCase()
  const filteredRoutines = hasActiveFilters
    ? routines.filter((routine) => {
        const matchesText = routine.title.toLowerCase().includes(text)
        const matchesCategory =
          category === 'Todas' || routine.category === category
        const matchesDifficulty =
          difficulty === 'Todas' || routine.difficulty === difficulty
        return matchesText && matchesCategory && matchesDifficulty
      })
    : routines

  const computedTotalPages = hasActiveFilters
    ? Math.max(1, Math.ceil(filteredRoutines.length / PER_PAGE))
    : totalPages

  const safePage = Math.min(page, computedTotalPages)

  const displayedRoutines = hasActiveFilters
    ? filteredRoutines.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)
    : filteredRoutines

  const handleSearchChange = (value) => {
    setSearch(value)
    setPage(1)
  }

  const handleCategoryChange = (value) => {
    setCategory(value)
    setPage(1)
  }

  const handleDifficultyChange = (value) => {
    setDifficulty(value)
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('Todas')
    setDifficulty('Todas')
    setPage(1)
  }

  return (
    <section
      className={
        isHome
          ? 'border-t border-slate-200 bg-emerald-50/50 py-12'
          : 'py-10'
      }
    >
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        {isHome ? (
          <h2 className="mb-10 text-center text-3xl font-bold text-emerald-900 sm:text-4xl">
            Últimas rutinas
          </h2>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Catálogo de rutinas
              </h1>
              <p className="mt-2 text-base text-slate-600">
                Explora, busca y filtra las rutinas disponibles en Ruta Fit.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
              <input
                type="search"
                aria-label="Buscar rutina"
                placeholder="Buscar por nombre..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />

              <select
                aria-label="Categoría"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="Todas">Todas las categorías</option>
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                aria-label="Dificultad"
                value={difficulty}
                onChange={(e) => handleDifficultyChange(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="Todas">Todas las dificultades</option>
                {DIFFICULTIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Limpiar filtros
              </button>
            </div>

            {!loading && !error && (
              <p className="mb-4 text-center text-sm text-slate-600">
                {hasActiveFilters
                  ? `${filteredRoutines.length} de ${totalItems} rutinas encontradas`
                  : `Mostrando ${displayedRoutines.length} de ${totalItems} rutinas`}
              </p>
            )}
          </>
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
        ) : displayedRoutines.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            {hasActiveFilters
              ? 'No encontramos rutinas con esos filtros.'
              : 'No hay rutinas disponibles en este momento.'}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {displayedRoutines.map((routine) => (
                <RoutineCard key={routine.id} routine={routine} />
              ))}
            </div>

            {!isHome && computedTotalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={safePage <= 1}
                  className="min-w-28 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-sm font-medium text-slate-700">
                  Página {safePage} de {computedTotalPages}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPage((prev) => Math.min(computedTotalPages, prev + 1))
                  }
                  disabled={safePage >= computedTotalPages}
                  className="min-w-28 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default RoutineListings
