import axios from 'axios'
import { getBackendUrl } from './api'

const sendChatMessage = async (question) => {
  const backendUrl = getBackendUrl()
  const res = await axios.post(
    `${backendUrl}/api/chatbot/chat`,
    { question },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return res.data
}

export { sendChatMessage }

