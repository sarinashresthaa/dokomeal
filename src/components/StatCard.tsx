type StatCardProps = {
  value: string
  label: string
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <div className="text-center">
      <div className="mb-1 text-3xl font-black text-white sm:text-4xl">
        {value}
      </div>
      <div className="text-sm font-medium text-orange-100">{label}</div>
    </div>
  )
}

export default StatCard
