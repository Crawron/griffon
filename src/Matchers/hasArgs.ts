import { Matcher } from "./Matcher"

export const hasArgs: () => Matcher = () => ctx => {
  if (ctx.args.length > 0) return ctx.match()
  return ctx.skip()
}
