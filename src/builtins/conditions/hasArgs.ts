import { Condition } from "../../Condition"

export const hasArgs: () => Condition = () => ctx => {
  if (ctx.args.length > 0) return ctx.match()
  return ctx.skip()
}
