import { Command } from "./Command"

const echoCommand: (name?: string) => Command = (name = "echo") => ({
  names: [name],
  action: ctx => {
    console.log(ctx.args)
  },
})

const replyCommand: (replyMsg: string, name: string) => Command = (
  replyMsg,
  name
) => ({
  names: [name],
  action: ctx => {
    console.log(replyMsg)
  },
})

const processCommand: (
  process: (str: string) => string,
  name: string
) => Command = (process, name) => ({
  names: [name],
  action: ctx => {
    console.log(process(ctx.message.content))
  },
})
