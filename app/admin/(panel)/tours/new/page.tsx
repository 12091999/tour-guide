import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TourForm } from "@/components/admin/tour-form"
import { ChevronLeft } from "lucide-react"

export default function NewTourPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/admin">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Tours
          </Link>
        </Button>
        <div className="h-5 w-px bg-border" />
        <h1 className="text-2xl font-bold">Add New Tour</h1>
      </div>

      <div className="max-w-4xl">
        <TourForm />
      </div>
    </div>
  )
}
