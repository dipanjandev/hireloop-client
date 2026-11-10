"use client"
import { DisplayJobItem } from "@/app/dashboard/recruiter/jobs/page"
import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

const DeleteButton = ({ job }: { job: DisplayJobItem }) => {
  // open Dialoug set
  const [open, setOpen] = useState(false)
  //   Router refresh korar jonno
  const router = useRouter()

  // জব ডিলিট করার হ্যান্ডলার
  const handleDeleteJob = async () => {
    const res = await deleteJob(job._id)
    // console.log("Deleted Job Id", job._id, res)
    if (res.deletedCount) {
      setOpen(false)
      //   Shadcn toast
      toast.add({
        title: `Job Deleted ${job.title}`,
        description: "This job has been permanently Deletd.",
      })
      router.refresh()
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            {/* Delete Icon */}
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure permanently delete this Job from List?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => handleDeleteJob()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton

// _id: string

/*
<button
      type="button"
      onClick={() => handleDeleteJob()}
      aria-label={`Delete ${job.title}`}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent text-neutral-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
*/
