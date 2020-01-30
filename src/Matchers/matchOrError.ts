import { Matcher } from "./Matcher"

export const matchOrError: (
  matcher: Matcher,
  errorMessage: string
) => Matcher = (matcher, message) => ctx => {
  const { error } = ctx

  const result = matcher(ctx)
  if (result.status === "skip") return error(message)

  return result
}
