"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="bg-muted/30 py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-light tracking-tight text-balance sm:text-4xl md:text-5xl">
              Stay <span className="font-semibold">Inspired</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Subscribe to our newsletter for exclusive travel deals, destination guides, and insider tips
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-full border-2 px-6"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shrink-0"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy and consent to receive updates
          </p>
        </div>
      </div>
    </section>
  )
}
