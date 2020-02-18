import { Condition, ConditionErrorResult } from "../../Condition"

/** Matches if any of the providers conditions match.
 * Errors have priority, if any error, it errors.
 * To ignore errors, use skipError */
export const matchAny: (...matchers: Condition[]) => Condition = (
  ...conditions
) => ctx => {
  const results = conditions.map(m => m(ctx))

  // if any errors, error
  const error = results.find(
    (r): r is ConditionErrorResult => r.status === "error"
  )
  if (error) return error

  // no errors, match on at least one match
  const match = results.find(m => m.status === "match")
  if (match) return match

  // no errors, no matches, skip
  return ctx.skip()
}
