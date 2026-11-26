import { Link } from 'react-router'
import Card from './Card'

function HomeCards() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card bg="bg-slate-100">
            <h2 className="text-2xl font-bold text-slate-900">Para atletas</h2>
            <p className="mt-2 mb-5 text-slate-600">
              Encuentra rutinas por categoría, duración o nivel de dificultad para entrenar hoy mismo.
            </p>
            <Link
              to="/routines"
              className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Explorar rutinas
            </Link>
          </Card>

          <Card bg="bg-emerald-50">
            <h2 className="text-2xl font-bold text-slate-900">Para entrenadores</h2>
            <p className="mt-2 mb-5 text-slate-600">
              Publica tus planes de entrenamiento con ejercicios, rondas y recomendaciones paso a paso.
            </p>
            <Link
              to="/add-routine"
              className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Publicar rutina
            </Link>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomeCards
