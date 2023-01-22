export default function TooltipTrigger(
  svgProps: React.SVGProps<SVGSVGElement>
) {
  const props: React.SVGProps<SVGSVGElement> = {
    width: 16,
    fill: 'currentColor',
    viewBox: '0 0 20 20',
    xmlns: 'http://www.w3.org/2000/svg',
    ...svgProps,
  }

  return (
    <svg {...props}>
      <path
        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </svg>
  )
}
