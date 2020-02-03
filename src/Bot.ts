import { CommandGroup, Command, CommandContext } from "./Commands/Command"
import { MessageEventContext } from "./MessageEventContext"
import Eris from "eris"

import { getMatcherContext } from "./Matchers/Matcher"

type BotOptions = Eris.ClientOptions & {
  token: string
  command: Command | CommandGroup
}

export class Bot {
  command: Command | CommandGroup
  client: Eris.Client

  constructor(options: BotOptions) {
    const { command, token, ...erisOptions } = options

    this.command = options.command
    this.client = new Eris.Client(options.token, erisOptions)

    this.client.on("messageCreate", this.handleMessageEvent)
    this.client.on("ready", () => console.log("ready"))
  }

  connect() {
    return this.client.connect()
  }

  disconnect(reconnect = false) {
    return this.client.disconnect({ reconnect })
  }

  handleMessageEvent = (message: Eris.Message) => {
    const eventCtx: MessageEventContext = {
      message,
      args: message.content,
      bot: this,
    }

    Bot.traverseCommandTree(this.command, eventCtx)
  }

  static traverseCommandTree(
    root: Command | CommandGroup,
    ctx: MessageEventContext
  ): void {
    // ignoring conditions exist for now. wip
    let currentCommand = root

    while (true) {
      console.log(currentCommand)
      let matcherResult = currentCommand.condition(getMatcherContext(ctx))

      switch (matcherResult.status) {
        case "skip":
          return

        case "error":
          ctx.message.channel.createMessage(`Error: \`${matcherResult.error}\``)
          return
      }

      // currentCommand matched
      ctx.args = matcherResult.args

      if ("action" in currentCommand) {
        // currentCommand is Command
        const cmdCtx: CommandContext = ctx
        currentCommand.action(cmdCtx)
        return
      }

      // currentCommand is CommandGroup
      const childResults = currentCommand.childCommands.map(c => ({
        result: c.condition(getMatcherContext(ctx)),
        command: c,
      }))

      const childMatch = childResults.find(r => r.result.status === "match")

      if (childMatch) {
        currentCommand = childMatch.command
        continue
      }

      const childError = childResults.find(r => r.result.status === "error")

      if (childError) {
        currentCommand = childError.command
        continue
      }

      return
    }
  }
}
