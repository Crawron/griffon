import { Matcher } from "./Matcher"

export const matchPrefixes: (...prefixes: string[]) => Matcher = (
  ...prefixes
) => ctx => {
  const { match, skip, message } = ctx

  const prefixFound = prefixes.some(p => message.content.startsWith(p))
  if (!prefixFound) return skip()

  return match()
}
