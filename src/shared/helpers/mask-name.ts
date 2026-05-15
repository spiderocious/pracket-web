export function maskName(firstName: string, lastName: string): string {
  const initial = lastName[0]?.toUpperCase() ?? ''
  return initial ? `${firstName} ${initial}.` : firstName
}
