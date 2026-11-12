import { getJobs } from "@/lib/api/jobs"

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()
  // console.log("search params", query)
  const jobs = await getJobs(query)

  return (
    <div>
      <h3 className="my-5 grid justify-center text-3xl font-bold text-slate-300">
        This is the brose jobs page
      </h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>{job.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default BrowseJobs
