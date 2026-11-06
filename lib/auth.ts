import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
const client = new MongoClient("mongodb://localhost:27017/database")
const db = client.db("hireloop-db")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  // ইমেইল এবং পাসওয়ার্ড এনেবল করলাম।
  emailAndPassword: {
    enabled: true,
  },

  //   গুগল লগিন এনেবল করার জন্য এটা ব্যবহার করা হয়েছে।
  socialProviders: {
    google: {
      // [!code highlight]
      clientId: process.env.GOOGLE_CLIENT_ID as string, // [!code highlight]
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // [!code highlight]
    }, // [!code highlight]
  },
})
