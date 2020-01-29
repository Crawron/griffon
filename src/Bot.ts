import { MatcherContext, matcherHelpers } from "./Matcher"
import { CommandLike, CommandGroup, Command } from "./Command"

export type MessageEventContext = {
  message: MockMessage // placeholder type
  bot: Bot
}

// Bot
type BotOptions = {
  // token: string
  commands: (Command | CommandGroup)[]
}

type MockMessage = { content: string; author: { id: string } }

export class Bot {
  commands: (Command | CommandGroup)[]

  constructor(options: BotOptions) {
    this.commands = options.commands
  }

  handleMessageEvent(message: MockMessage) {
    const eventCtx: MessageEventContext = {
      message,
      bot: this,
    }

    this.traverseTree(this.commands.pop()!, eventCtx)
  }

  traverseTree(
    command: Command | CommandGroup,
    ctx: MatcherContext | MessageEventContext
  ) {
    // ignoring conditions exist for now. wip
    const args = (ctx as MatcherContext).args ?? ctx.message.content

    const matchedName = command.names.find(name =>
      getPrefixRegex(name).test(args)
    )

    if (!matchedName) throw "???? todo"

    const regex = getPrefixRegex(matchedName)
    const newCtx: MatcherContext = {
      ...ctx,
      ...matcherHelpers,
      args: args.replace(regex, ""),
    }

    if ("action" in command) {
      // command is Command
      command.action(newCtx)
    } else {
      // command is CommandGroup
      for (const child of command.childCommands) {
        this.traverseTree(child, newCtx)
      }
    }
  }
}

const getPrefixRegex = (prefix: string) => new RegExp(`^ *${prefix}`)
