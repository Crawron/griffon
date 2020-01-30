import { Bot } from "../Bot"
import { MockMessage } from "./MockMessage"

export type MessageEventContext = {
  message: MockMessage // placeholder type
  bot: Bot
}
