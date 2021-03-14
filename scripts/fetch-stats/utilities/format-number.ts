export function formatNumber(number: number): string {
  return Intl.NumberFormat('en-US', {
    compactDisplay: 'short',
    maximumFractionDigits: 1,
    minimumFractionDigits: number > 999 && number < 100000 ? 1 : 0,
    notation: 'compact'
  } as Intl.NumberFormatOptions)
    .format(number)
    .replace('.0', '')
}
