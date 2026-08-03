// Minimal document.cookie helpers, so short-lived values can expire
// on their own instead of lingering like localStorage entries

export const readCookie = (name: string): string | null => {
  const prefix = `${encodeURIComponent(name)}=`

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix))

  return match ? decodeURIComponent(match.slice(prefix.length)) : null
}

export const writeCookie = (
  name: string,
  value: string,
  maxAgeSeconds: number
) => {
  document.cookie =
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}` +
    `; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`
}

export const clearCookie = (name: string) => {
  writeCookie(name, "", 0)
}
