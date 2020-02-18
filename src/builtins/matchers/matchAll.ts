import {
  Matcher,
  MatcherResult,
  MatcherErrorResult,
  MatcherContext,
  getMatcherContext,
} from "../../Matcher"

export const matchAll = (...matchers: Matcher[]) => (
  ctx: MatcherContext
): MatcherResult => {
  const { skip, error, match } = ctx

  // collect all matchers' results
  let finalArgs = ctx.args
  const matcherResults: MatcherResult[] = []

  for (const matcher of matchers) {
    const context = getMatcherContext({ ...ctx, args: finalArgs })
    const results = matcher(context)

    if (results.status === "match") finalArgs = results.args
    matcherResults.push(results)
  }

  // error() if any of the matchers error
  const errorResult = matcherResults.find(
    (r): r is MatcherErrorResult => r.status === "error"
  )
  if (errorResult) return error(errorResult.error)

  // no errors, skip() if any of the matchers skipped
  const skipResult = matcherResults.find(r => r.status === "skip")
  if (skipResult) return skip()

  return match(finalArgs)
}
