import { cookies } from 'next/headers'
 
export default async function Page() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')
  return accessToken
}