import axios from 'axios'
import { getBackendUrl } from './api'

const getProfile = async () => {
  const backendUrl = getBackendUrl()
  const res = await axios.get(`${backendUrl}/api/trustpilot/profile`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.data?.data?.profile || res.data?.profile || res.data
}

const getReviews = async (page = 1, limit = 3) => {
  const backendUrl = getBackendUrl()
  const res = await axios.get(`${backendUrl}/api/trustpilot/reviews`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: { page, limit },
  })
  const reviews = res.data?.data?.reviews || res.data?.reviews || res.data
  return Array.isArray(reviews) ? reviews : []
}

export { getProfile, getReviews }

