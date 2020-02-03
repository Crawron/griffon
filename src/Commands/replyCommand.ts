import { Command } from "./Command"
import { commandName } from "../Matchers/commandName"

export const replyCommand: (replyMsg: string, name: string) => Command = (
  replyMsg,
  name = "reply"
) => ({
  condition: commandName(name),
  action: ctx => {
    ctx.message.channel.createMessage(replyMsg)
  },
})
