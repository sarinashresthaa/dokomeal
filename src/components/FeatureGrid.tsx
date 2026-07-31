type FeatureGridProps = {
  icon: string
  title: string
  description: string
}

const FeatureGrid = ({ icon, title, description }: FeatureGridProps) => {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all hover:border-orange-200 hover:shadow-md">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl transition-colors group-hover:bg-orange-100">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-bold text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{description}</p>
    </div>
  )
}

export default FeatureGrid
