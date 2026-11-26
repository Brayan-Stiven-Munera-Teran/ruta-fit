function Hero({
  title = 'Entrena con propósito en Ruta Fit',
  subtitle = 'Explora rutinas prácticas de fuerza, cardio, HIIT y movilidad diseñadas por entrenadores para cada nivel.',
}) {
  return (
    <section className="bg-emerald-900 py-14 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-emerald-100 sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

export default Hero
