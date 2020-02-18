import { Condition } from "../../Condition"

export const skipErrors: (
  condition: Condition
) => Condition = condition => ctx => {
  const { skip } = ctx

  const result = condition(ctx)
  if (result.status === "error") return skip()

  return result
}
