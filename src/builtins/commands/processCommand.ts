import { Command } from "../../Command"
import { commandName } from "../matchers/commandName"
import { matchAll } from "../matchers/matchAll"
import { hasArgs } from "../matchers/hasArgs"

export const processCommand: (
  process: (args: string) => string,
  name: string
) => Command = (process, name) => ({
  condition: matchAll(commandName(name), hasArgs()),
  action: ctx => {
    ctx.message.channel.createMessage(process(ctx.message.content))
  },
})
