import { Command } from "./Command"

const replyCommand: (replyMsg: string, name: string) => Command = (
  replyMsg,
  name
) => ({
  names: [name],
  action: ctx => {
    console.log(replyMsg)
  },
})