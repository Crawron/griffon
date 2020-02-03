import { Command, CommandContext } from "./Command"
import { matchAll } from "../Matchers/matchAll"
import { commandName } from "../Matchers/commandName"

export const quickCommand: (
  action: (ctx: CommandContext) => string,
  ...names: string[]
) => Command = (action, name) => ({
  condition: matchAll(commandName(name)),
  action: ctx => {
    ctx.message.channel.createMessage(action(ctx))
  },
})
