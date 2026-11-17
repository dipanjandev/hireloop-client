const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// ৩. ইউজারের প্রিমিয়াম স্ট্যাটাস যাচাইয়ের API
export const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return response.json()
}
