import {
  Condition,
  ConditionResult,
  ConditionErrorResult,
  getConditionContext,
} from "../../Condition"

export const matchAll: (...conditions: Condition[]) => Condition = (
  ...conditions
) => ctx => {
  const { skip, error, match } = ctx

  // collect all matchers' results
  let finalArgs = ctx.args
  const matcherResults: ConditionResult[] = []

  for (const matcher of conditions) {
    const context = getConditionContext({ ...ctx, args: finalArgs })
    const results = matcher(context)

    if (results.status === "match") finalArgs = results.args
    matcherResults.push(results)
  }

  // error() if any of the matchers error
  const errorResult = matcherResults.find(
    (r): r is ConditionErrorResult => r.status === "error"
  )
  if (errorResult) return error(errorResult.error)

  // no errors, skip() if any of the matchers skipped
  const skipResult = matcherResults.find(r => r.status === "skip")
  if (skipResult) return skip()

  return match(finalArgs)
}
