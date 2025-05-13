import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { name, data } = await request.json()

    // Check if name and data are provided
    if (!name || !data) {
      return NextResponse.json({ error: "Name and data are required" }, { status: 400 })
    }

    // Define the path to store the templates
    const dirPath = path.join(process.cwd(), "templates-data")

    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    // Define the file path with the name provided in the request
    const filePath = path.join(dirPath, `${name}.json`)

    // Check if the file already exists, and prevent overwriting if necessary
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Template with this name already exists" }, { status: 409 })
    }

    // Save the template data as a .json file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    // Return success message
    return NextResponse.json({ success: true, message: "Template saved successfully" })
  } catch (error) {
    console.error("Error saving template:", error)
    return NextResponse.json({ error: "Failed to save template" }, { status: 500 })
  }
}
