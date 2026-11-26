function FormInput({
  id,
  label,
  error = '',
  ref,
  className = '',
  ...props
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
            : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/30'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>
      )}
    </div>
  )
}

export default FormInput
