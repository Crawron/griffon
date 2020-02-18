import { MessageEventContext } from "./MessageEventContext"

export type MatcherResult =
  | MatcherMatchResult
  | MatcherSkipResult
  | MatcherErrorResult

export type MatcherMatchResult = { status: "match"; args: string }
export type MatcherSkipResult = { status: "skip" }
export type MatcherErrorResult = { status: "error"; error: string }

export type MatcherStatus = MatcherResult["status"]

const getMatcherHelpers = (ctx: MessageEventContext) => ({
  error: (er: string): MatcherErrorResult => ({
    status: "error",
    error: er,
  }),
  match: (resultingArgs?: string): MatcherMatchResult => ({
    status: "match",
    args: resultingArgs ?? ctx.args,
  }),
  skip: (): MatcherSkipResult => ({ status: "skip" }),
})

export type MatcherContext = MessageEventContext &
  ReturnType<typeof getMatcherHelpers>

export const getMatcherContext: (
  ctx: MessageEventContext
) => MatcherContext = ctx => ({
  ...ctx,
  ...getMatcherHelpers(ctx),
})

export type Matcher = (context: MatcherContext) => MatcherResult
