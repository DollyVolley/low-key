import { ChatMessage } from "@/types/chat"
import {v4 as uuid} from 'uuid'

let x = 0

export function getMsg(): ChatMessage {
  return  {content: `Wigga, the number you search is ${x++}`, isOwn: true, timestamp: Date.now(), id:uuid()}
}
