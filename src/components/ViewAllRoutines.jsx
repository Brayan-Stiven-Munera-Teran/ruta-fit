import { Link } from 'react-router'

function ViewAllRoutines() {
  return (
    <section className="bg-emerald-50/50 pb-14 text-center">
      <Link
        to="/routines"
        className="inline-block rounded-xl bg-slate-900 px-10 py-3.5 text-base font-semibold text-white transition hover:bg-slate-700"
      >
        Ver todas las rutinas
      </Link>
    </section>
  )
}

export default ViewAllRoutines
