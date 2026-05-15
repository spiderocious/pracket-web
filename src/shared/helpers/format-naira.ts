export function formatNaira(pence: number): string {
  return '₦' + (pence / 100).toLocaleString('en-NG')
}
