function Hero({
  title = 'Entrena con propósito en Ruta Fit',
  subtitle = 'Explora rutinas prácticas de fuerza, cardio, HIIT y movilidad diseñadas por entrenadores para cada nivel.',
}) {
  return (
    <section className="bg-emerald-900 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-screen-2xl px-6 text-center sm:px-8 lg:px-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-emerald-100 sm:text-xl">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

export default Hero