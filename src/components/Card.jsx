function Card({ children, bg = 'bg-slate-100' }) {
  return (
    <div className={`${bg} rounded-xl border border-slate-200 p-6 shadow-sm`}>
      {children}
    </div>
  )
}

export default Card
