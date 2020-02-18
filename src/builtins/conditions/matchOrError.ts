import { Condition } from "../../Condition"

export const matchOrError: (
  condition: Condition,
  errorMessage: string
) => Condition = (condition, message) => ctx => {
  const { error } = ctx

  const result = condition(ctx)
  if (result.status === "skip") return error(message)

  return result
}
