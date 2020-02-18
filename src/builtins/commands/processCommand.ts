import { Command } from "../../Command"
import { commandName } from "../conditions/commandName"
import { matchAll } from "../conditions/matchAll"
import { hasArgs } from "../conditions/hasArgs"

export const processCommand: (
  process: (args: string) => string,
  name: string
) => Command = (process, name) => ({
  condition: matchAll(commandName(name), hasArgs()),
  action: ctx => {
    ctx.message.channel.createMessage(process(ctx.message.content))
  },
})
