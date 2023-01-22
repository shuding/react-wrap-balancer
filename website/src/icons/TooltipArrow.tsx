import clsx from 'clsx'

export default function TooltipArrow(svgProps: React.SVGProps<SVGSVGElement>) {
  const props: React.SVGProps<SVGSVGElement> = {
    width: 10,
    height: 5,
    preserveAspectRatio: 'none',
    viewBox: '0 0 30 10',
    ...svgProps,
    className: clsx('TooltipArrow', svgProps.className),
  }

  return (
    <svg {...props}>
      <polygon points='0,0 30,0 15,10' />
    </svg>
  )
}
