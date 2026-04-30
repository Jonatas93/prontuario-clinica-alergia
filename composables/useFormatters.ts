export function useFormatters() {
  function formatDate(dateStr: string): string {
    if (!dateStr) return ''
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  function formatDateTime(isoStr: string): string {
    if (!isoStr) return ''
    const d = new Date(isoStr)
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
  }

  function formatCPF(cpf: string): string {
    const clean = cpf.replace(/\D/g, '')
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  function formatPhone(phone: string): string {
    const clean = phone.replace(/\D/g, '')
    if (clean.length === 11) {
      return clean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  function calcAge(birthDate: string): number {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    return age
  }

  function formatAge(birthDate: string): string {
    const age = calcAge(birthDate)
    return `${age} anos`
  }

  return { formatDate, formatDateTime, formatCPF, formatPhone, calcAge, formatAge }
}
