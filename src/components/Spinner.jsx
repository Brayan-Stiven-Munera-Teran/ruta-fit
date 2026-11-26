import { ClipLoader } from 'react-spinners'

function Spinner({ loading = true }) {
  if (!loading) {
    return null
  }

  return (
    <div className="flex justify-center py-12" role="status" aria-label="Cargando">
      <ClipLoader color="#059669" loading={loading} size={48} />
    </div>
  )
}

export default Spinner
