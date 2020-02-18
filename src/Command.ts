import { MessageEventContext } from "./MessageEventContext"
import { Condition } from "./Condition"

// super placeholder
export type CommandMetadata = Partial<{
  label: string
  names: string[]
  examples: string[]
}>

export type CommandLike = {
  condition: Condition
  metadata?: CommandMetadata
}

export type CommandContext = MessageEventContext

export type Command = CommandLike & {
  action: (context: CommandContext) => void
}

export type CommandGroup = CommandLike & {
  childCommands: (Command | CommandGroup)[]
}
