export { Bot, BotOptions } from "./Bot"

// Matchers
export { Matcher } from "./Matcher"

export { matchAll } from "./builtins/matchers/matchAll"
export { everyMessage } from "./builtins/matchers/everyMessage"
export { matchStatus } from "./builtins/matchers/matchStatus"
export { commandName } from "./builtins/matchers/commandName"
export { matchOrError } from "./builtins/matchers/matchOrError"
export { skipErrors } from "./builtins/matchers/skipErrors"
export { skip } from "./builtins/matchers/skip"
export { hasArgs } from "./builtins/matchers/hasArgs"
export { fromAuthorId } from "./builtins/matchers/fromAuthorId"

// Commands
export { Command, CommandGroup } from "./Command"

export { quickCommand } from "./builtins/commands/quickCommand"
export { replyCommand } from "./builtins/commands/replyCommand"
export { processCommand } from "./builtins/commands/processCommand"
export { echoCommand } from "./builtins/commands/echoCommand"
