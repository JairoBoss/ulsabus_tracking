export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "El correo es necesario."
  if (!re.test(email)) return 'Ooops! Necesitamos un correo válido'
  return ''
}
