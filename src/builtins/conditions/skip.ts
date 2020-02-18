import { Condition } from "../../Condition"

export const skip: (...conditions: Condition[]) => Condition = () => ctx =>
  ctx.skip()
