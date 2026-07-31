type FeatureBadgeProps = {
  text: string
}

const FeatureBadge = ({ text }: FeatureBadgeProps) => {
  return (
    <span className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-[#FF7A00]">
      {text}
    </span>
  )
}

export default FeatureBadge
