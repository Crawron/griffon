import { Matcher, MatcherErrorResult } from "./Matcher"

/** Matches if any of the providers matchers match.
 * Errors have priority, if any error, it errors.
 * To ignore errors, use skipError */
const matchAny: (...matchers: Matcher[]) => Matcher = (...matchers) => ctx => {
  const results = matchers.map(m => m(ctx))

  // if any errors, error
  const error = results.find(
    (r): r is MatcherErrorResult => r.status === "error"
  )
  if (error) return error

  // no errors, match on at least one match
  const match = results.find(m => m.status === "match")
  if (match) return match

  // no errors, no matches, skip
  return ctx.skip()
}
