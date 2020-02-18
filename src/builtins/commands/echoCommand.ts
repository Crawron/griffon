import { Command } from "../../Command"
import { hasArgs } from "../conditions/hasArgs"
import { matchAll } from "../conditions/matchAll"
import { commandName } from "../conditions/commandName"

export const echoCommand: (name?: string) => Command = (name = "echo") => ({
  condition: matchAll(commandName(name), hasArgs()),
  action: ctx => {
    ctx.message.channel.createMessage(ctx.args)
  },
})
