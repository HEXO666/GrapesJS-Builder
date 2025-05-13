import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "blocks"

  try {
    // Define the directory path based on the type parameter
    let dirPath = ""

    switch (type) {
      case "blocks":
        dirPath = path.join(process.cwd(), "public", "templates", "blocks")
        break
      case "sections":
        dirPath = path.join(process.cwd(), "public", "templates", "sections")
        break
      case "pages":
        dirPath = path.join(process.cwd(), "public", "templates", "pages")
        break
      case "components":
        dirPath = path.join(process.cwd(), "public", "components")
        break
      default:
        dirPath = path.join(process.cwd(), "public", "templates", "blocks")
    }

    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json([])
    }

    // Read directory contents
    const files = fs.readdirSync(dirPath)

    // Filter for HTML files
    const htmlFiles = files.filter((file) => file.endsWith(".html"))

    return NextResponse.json(htmlFiles)
  } catch (error) {
    console.error("Error listing templates:", error)
    return NextResponse.json({ error: "Failed to list templates" }, { status: 500 })
  }
}
