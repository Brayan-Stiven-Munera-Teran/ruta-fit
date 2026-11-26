import { NavLink } from 'react-router'
import { FaDumbbell } from 'react-icons/fa'

const linkClass = ({ isActive }) =>
  isActive
    ? 'rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition-colors'
    : 'rounded-md px-3 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-emerald-700/60 hover:text-white'

function Navbar() {
  return (
    <header className="border-b border-emerald-700 bg-emerald-900">
      <nav
        aria-label="Navegación principal"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-white">
            <FaDumbbell className="h-8 w-7 text-emerald-300" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight">Ruta Fit</span>
          </NavLink>

          <div className="flex items-center gap-2">
            <NavLink to="/" end className={linkClass}>
              Inicio
            </NavLink>
            <NavLink to="/routines" className={linkClass}>
              Rutinas
            </NavLink>
            <NavLink to="/add-routine" className={linkClass}>
              Nueva Rutina
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
