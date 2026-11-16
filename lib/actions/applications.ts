const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const updateApplications = async (
  applicationId: string,
  status: string
) => {
  const response = await fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  return await response.json()
}
