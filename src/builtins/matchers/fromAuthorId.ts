import { Matcher } from "../../Matcher"

export const fromAuthorId: (...ids: string[]) => Matcher = (...ids) => ctx => {
  const { message, skip, match } = ctx

  if (ids.some(id => id === message.author.id)) return match()
  return skip()
}
