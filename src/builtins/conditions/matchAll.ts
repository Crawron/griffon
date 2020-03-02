import { Condition, getConditionContext } from "../../Condition"

export const matchAll: (...conditions: Condition[]) => Condition = (
  ...conditions
) => ctx => {
  const { match } = ctx
  let currentArgs = ctx.args

  // pipe args through all conditions
  for (const condition of conditions) {
    const context = getConditionContext({ ...ctx, args: currentArgs })
    const results = condition(context)

    if (results.status !== "match") return results

    currentArgs = results.args
  }

  return match(currentArgs)
}
