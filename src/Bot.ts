import { MatcherContext, matcherHelpers } from "./Matchers/Matcher"
import {
  CommandLike,
  CommandGroup,
  Command,
  CommandContext,
} from "./Commands/Command"
import { MessageEventContext } from "./Types/MessageEventContext"

// Bot
type BotOptions = {
  // token: string
  commands: (Command | CommandGroup)[]
}

export type MockMessage = { content: string; author: { id: string } }

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
    ctx: CommandContext | MessageEventContext
  ) {
    // ignoring conditions exist for now. wip
    const args = (ctx as CommandContext).args ?? ctx.message.content

    const matchedName = command.names.find(name =>
      getPrefixRegex(name).test(args)
    )

    if (!matchedName) return false

    const regex = getPrefixRegex(matchedName)
    const newCtx: CommandContext = {
      ...ctx,
      args: args.replace(regex, ""),
    }

    if ("action" in command) {
      // command is Command
      command.action(newCtx)
      return true
    } else {
      // command is CommandGroup
      for (const child of command.childCommands) {
        if (this.traverseTree(child, newCtx)) return
      }
    }
  }
}

const getPrefixRegex = (prefix: string) => new RegExp(`^ *${prefix}`)
