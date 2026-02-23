import React from "react"
import Hero from "./pages/Hero"
import sql from "./db"

export default async function Page() {
  const posts = await sql`
    SELECT * FROM posts
    ORDER BY featured DESC, created_at DESC
    LIMIT 4
  ` as any[]

  return (
    <div className="h-fit flex flex-col items-center mx-5 md:mx-10 justify-center">
      <Hero posts={posts} />
    </div>
  )
}