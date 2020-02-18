import { Condition } from "../../Condition"

export const requireArgs: () => Condition = () => ctx => {
  if (ctx.args.length > 0) return ctx.match()
  return ctx.skip()
}
