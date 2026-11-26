import { Link } from 'react-router'
import Card from './Card'

function HomeCards() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card bg="bg-slate-100">
            <div className="flex h-full flex-col items-center justify-between p-2 text-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Para atletas
                </h2>
                <p className="mt-3 mb-6 text-base text-slate-600">
                  Encuentra rutinas por categoría, duración o nivel de dificultad para entrenar hoy mismo.
                </p>
              </div>
              <Link
                to="/routines"
                className="inline-block min-w-48 rounded-lg bg-slate-900 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-slate-700"
              >
                Explorar rutinas
              </Link>
            </div>
          </Card>

          <Card bg="bg-emerald-50">
            <div className="flex h-full flex-col items-center justify-between p-2 text-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Para entrenadores
                </h2>
                <p className="mt-3 mb-6 text-base text-slate-600">
                  Publica tus planes de entrenamiento con ejercicios, rondas y recomendaciones paso a paso.
                </p>
              </div>
              <Link
                to="/add-routine"
                className="inline-block min-w-48 rounded-lg bg-emerald-600 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-emerald-700"
              >
                Publicar rutina
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomeCards
