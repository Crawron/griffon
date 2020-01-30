import { MessageEventContext } from "../Types/MessageEventContext"

export type MatcherResult =
  | MatcherMatchResult
  | MatcherSkipResult
  | MatcherErrorResult

export type MatcherMatchResult = { status: "match" }
export type MatcherSkipResult = { status: "skip" }
export type MatcherErrorResult = { status: "error"; error: string }

export type MatcherStatus = MatcherResult["status"]

export const matcherHelpers = {
  error: (er: string): MatcherErrorResult => ({
    status: "error",
    error: er,
  }),
  match: (): MatcherMatchResult => ({ status: "match" }),
  skip: (): MatcherSkipResult => ({ status: "skip" }),
}

export type MatcherContext = MessageEventContext & typeof matcherHelpers

export type Matcher = (context: MatcherContext) => MatcherResult
