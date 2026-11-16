"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { deleteTour } from "@/lib/actions/admin-tours"

export function DeleteTourButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Delete "${title}"?`)) return
        startTransition(async () => { await deleteTour(id) })
      }}
    >
      {isPending ? "Deleting…" : "Delete"}
    </Button>
  )
}
