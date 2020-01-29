import {
  Matcher,
  MatcherResult,
  MatcherErrorResult,
  MatcherContext,
} from "./Matcher"

const matchAlways: Matcher = ctx => ctx.match()
const skip: (...matchers: Matcher[]) => Matcher = () => ctx => ctx.skip()

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

const matchAdmin: (silent?: boolean) => Matcher = (silent = false) => ctx => {
  const { error, match, skip } = ctx
  const isAdmin = Math.random() < 0.5

  if (isAdmin) return match()
  if (silent) return error("Admin required")
  else return skip()
}

const matchAll = (...matchers: Matcher[]) => (
  ctx: MatcherContext
): MatcherResult => {
  const { skip, error, match } = ctx

  // collect all matchers' results
  const matcherResults = matchers.map(m => m(ctx))

  // error() if any of the matchers error
  const errorResult = matcherResults.find(
    (r): r is MatcherErrorResult => r.status === "error"
  )
  if (errorResult) return error(errorResult.error)

  // no errors, skip() if any of the matchers skipped
  const skipResult = matcherResults.find(r => r.status === "skip")
  if (skipResult) return skip()

  return match()
}

const matchPrefixes: (...prefixes: string[]) => Matcher = (
  ...prefixes
) => ctx => {
  const { match, skip, message } = ctx

  const prefixFound = prefixes.some(p => message.content.startsWith(p))
  if (!prefixFound) return skip()

  return match()
}

const matchOrError: (matcher: Matcher, errorMessage: string) => Matcher = (
  matcher,
  message
) => ctx => {
  const { error } = ctx

  const result = matcher(ctx)
  if (result.status === "skip") return error(message)

  return result
}

const skipError: (matcher: Matcher) => Matcher = matcher => ctx => {
  const { skip } = ctx
  const result = matcher(ctx)

  if (result.status === "error") return skip()

  return result
}
