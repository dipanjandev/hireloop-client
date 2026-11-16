import { MongoClient, ObjectId } from "mongodb"
import { hashPassword } from "@better-auth/utils/password"

const URI =
  "mongodb://hireloop-project:mo6Cb0tk3u4gLHPm@ac-q06qa1s-shard-00-00.in0bbrm.mongodb.net:27017,ac-q06qa1s-shard-00-01.in0bbrm.mongodb.net:27017,ac-q06qa1s-shard-00-02.in0bbrm.mongodb.net:27017/?ssl=true&replicaSet=atlas-say8by-shard-0&authSource=admin"

const PASSWORD_PLAIN = "12345678@!Do"

const TARGET_JOB_TITLES = [
  "Senior Graphic Designer",
  "Digital Marketer Specialist",
  "Test Seeker Page",
]

const SEEKERS = [
  {
    name: "Rahim Ahmed",
    email: "rahim.seeker@gmail.com",
    appliedTitles: ["Senior Graphic Designer"], // ১টি জব
  },
  {
    name: "Nusrat Jahan",
    email: "nusrat.seeker@gmail.com",
    appliedTitles: ["Senior Graphic Designer", "Digital Marketer Specialist"], // ২টি জব
  },
  {
    name: "Tanvir Hasan",
    email: "tanvir.seeker@gmail.com",
    appliedTitles: [
      "Senior Graphic Designer",
      "Digital Marketer Specialist",
      "Test Seeker Page",
    ], // ৩টি জব
  },
  {
    name: "Farzana Yasmin",
    email: "farzana.seeker@gmail.com",
    appliedTitles: ["Digital Marketer Specialist", "Test Seeker Page"], // ২টি জব
  },
  {
    name: "Mehedi Hasan",
    email: "mehedi.seeker@gmail.com",
    appliedTitles: [
      "Senior Graphic Designer",
      "Digital Marketer Specialist",
      "Test Seeker Page",
    ], // ৩টি জব
  },
]

async function run() {
  const client = new MongoClient(URI)
  try {
    await client.connect()
    console.log("Connected to MongoDB successfully!")
    const db = client.db("hireloop-db")

    const usersColl = db.collection("user")
    const accountsColl = db.collection("account")
    const jobsColl = db.collection("allJobs")
    const appsColl = db.collection("applications")

    // ১. টার্গেট ৩টি জব লোড করা
    const targetJobs = await jobsColl
      .find({ title: { $in: TARGET_JOB_TITLES } })
      .toArray()
    console.log(`Found ${targetJobs.length} matching jobs:`)
    const jobMap = new Map()
    for (const job of targetJobs) {
      console.log(` - [${job._id.toString()}] ${job.title} at ${job.companyName}`)
      jobMap.set(job.title, job)
    }

    // নিশ্চিত হওয়া যে ৩টি জবই পাওয়া গেছে
    for (const title of TARGET_JOB_TITLES) {
      if (!jobMap.has(title)) {
        throw new Error(`Job not found in database: "${title}"`)
      }
    }

    // ২. পাসওয়ার্ড হ্যাশ তৈরি
    const hashedPassword = await hashPassword(PASSWORD_PLAIN)
    console.log("Generated secure password hash for Better-Auth.")

    const createdUsers = []

    for (const seeker of SEEKERS) {
      const now = new Date()

      // পূর্ববর্তী একাউন্ট থাকলে ক্লিনআপ (পুনরায় রান করার জন্য সেফ)
      const existingUser = await usersColl.findOne({ email: seeker.email })
      let userId = existingUser?._id

      if (!existingUser) {
        userId = new ObjectId()
        const userDoc = {
          _id: userId,
          name: seeker.name,
          email: seeker.email,
          emailVerified: false,
          createdAt: now,
          updatedAt: now,
          role: "seeker",
          premium: true, // প্রিমিয়াম দেওয়া যাতে মাল্টিপল এপ্লাই ব্লক না হয়
        }
        await usersColl.insertOne(userDoc)
        console.log(`Created user: ${seeker.name} (${seeker.email}) - ID: ${userId}`)

        const accountDoc = {
          _id: new ObjectId(),
          accountId: userId.toString(),
          providerId: "credential",
          userId: userId,
          password: hashedPassword,
          createdAt: now,
          updatedAt: now,
        }
        await accountsColl.insertOne(accountDoc)
        console.log(`Created account credential for ${seeker.email}`)
      } else {
        console.log(`User already exists: ${seeker.email} - ID: ${userId}`)
        // পাসওয়ার্ড ও রোল নিশ্চিত করা
        await usersColl.updateOne(
          { _id: userId },
          { $set: { role: "seeker", premium: true, updatedAt: now } }
        )
        await accountsColl.updateOne(
          { userId: userId, providerId: "credential" },
          { $set: { password: hashedPassword, updatedAt: now } },
          { upsert: true }
        )
      }

      createdUsers.push({
        id: userId.toString(),
        name: seeker.name,
        email: seeker.email,
        appliedTitles: seeker.appliedTitles,
      })

      // ৩. এই ইউজারের পূর্ববর্তী এই জবগুলোতে অ্যাপ্লিকেশন রিমুভ করে নতুন করে ইনসার্ট করা
      for (const title of seeker.appliedTitles) {
        const job = jobMap.get(title)
        const jobIdStr = job._id.toString()

        // চেক করা অলরেডি এপ্লাই করা আছে কি না
        const existingApp = await appsColl.findOne({
          userId: userId.toString(),
          jobId: jobIdStr,
        })

        if (!existingApp) {
          const appDoc = {
            jobId: jobIdStr,
            userId: userId.toString(),
            email: seeker.email,
            applicantName: seeker.name,
            jobTitle: job.title,
            companyName: job.companyName || "Digital Ocean",
            companyTag: (job.companyName || "DIGITAL OCEAN").toUpperCase(),
            location: job.location || "Remote",
            salary: job.salary || "$100k - $130k",
            jobType: job.jobType || "Full-time",
            status: "applied",
            appliedAt: now.toISOString(),
            appliedTimeFormatted: "Applied recently",
            closesInText: "Closes in 4 days",
            isSaved: true,
            createdAt: now,
            updatedAt: now,
          }
          await appsColl.insertOne(appDoc)
          console.log(
            ` -> User "${seeker.name}" applied to job "${job.title}"`
          )
        } else {
          console.log(
            ` -> User "${seeker.name}" already applied to "${job.title}"`
          )
        }
      }
    }

    console.log("\n==========================================")
    console.log("ALL 5 SEEKER PROFILES & APPLICATIONS SEEDED!")
    console.log("==========================================")
    for (const u of createdUsers) {
      console.log(`\nEmail: ${u.email}`)
      console.log(`Password: ${PASSWORD_PLAIN}`)
      console.log(`Role: seeker`)
      console.log(`Applications (${u.appliedTitles.length}):`)
      u.appliedTitles.forEach((t) => console.log(`  - ${t}`))
    }
  } catch (err) {
    console.error("Error during seeding:", err)
  } finally {
    await client.close()
  }
}

run()
