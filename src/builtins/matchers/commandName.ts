import { Matcher } from "../../Matcher"

export const commandName: (...prefixes: string[]) => Matcher = (
  ...prefixes
) => ctx => {
  const { match, skip } = ctx

  const prefixFound = prefixes.find(p => prefixRegex(p).test(ctx.args))
  if (!prefixFound) return skip()

  return match(ctx.args.replace(prefixRegex(prefixFound), ""))
}

const prefixRegex = (prefix: string) => new RegExp(`^ *${prefix}`)
