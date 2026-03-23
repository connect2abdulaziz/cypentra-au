const NEXT_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.cypentra.com'

export const getBackendUrl = () => {
  const url = NEXT_BACKEND_URL.replace(/\/$/, '')
  if (url.includes('localhost:6000') || url.includes('127.0.0.1:6000')) {
    throw new Error('Backend URL cannot use port 6000 (unsafe port). Please configure NEXT_PUBLIC_BACKEND_URL in .env.local')
  }
  return url
}

