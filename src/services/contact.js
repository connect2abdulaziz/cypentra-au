import axios from 'axios'
import { getBackendUrl } from './api'

const submitContactForm = async (formData) => {
  const backendUrl = getBackendUrl()
  const res = await axios.post(
    `${backendUrl}/api/admin/contact`,
    {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      recaptchaToken: formData.recaptchaToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return res.data
}

export { submitContactForm }

