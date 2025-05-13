"use client"

import { useState } from "react"
import Link from "next/link"

interface EditorHeaderProps {
  editor: any
  editorLoaded: boolean
}

export default function EditorHeader({ editor, editorLoaded }: EditorHeaderProps) {
  const [templateName, setTemplateName] = useState("")
  const [templates, setTemplates] = useState<string[]>([])
  const [showTemplates, setShowTemplates] = useState(false)

  // Save template to localStorage
  // Save template to localStorage
// Save template to localStorage with limit
const saveTemplate = () => {
  if (!editor) return

  const templateData = editor.getProjectData()

  // Check if localStorage exceeds limit, and remove the oldest template
  const templatesStored = Object.keys(localStorage);
  if (templatesStored.length > 5) { // Limit to 5 templates
    localStorage.removeItem(templatesStored[0])  // Remove the oldest template
  }

  // Save the new template
  localStorage.setItem(`template-${templateName}`, JSON.stringify(templateData))
  alert(`Template saved as: ${templateName}`)
}


// Save template to server
const saveTemplateToServer = async () => {
  if (!editor) return

  try {
    const templateData = editor.getProjectData()

    const response = await fetch("/api/templates/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: templateName,
        data: templateData,
      }),
    })

    if (response.ok) {
      alert("Template saved to server successfully!")
    } else {
      alert("Failed to save template to server")
    }
  } catch (error) {
    console.error("Error saving template:", error)
    alert("Error saving template")
  }
}



  // Load template from localStorage
  const loadTemplate = (name: string) => {
    if (!editor) return

    const templateData = localStorage.getItem(`template-${name}`)
    if (templateData) {
      editor.loadProjectData(JSON.parse(templateData))
      setTemplateName(name)
      setShowTemplates(false)
    }
  }

  // Load page template from public directory
  const loadPageTemplate = async (templateName: string) => {
    if (!editor) return

    try {
      const response = await fetch(`/templates/pages/${templateName}`)
      const html = await response.text()

      editor.setComponents(html)
      setShowTemplates(false)
    } catch (error) {
      console.error("Error loading page template:", error)
    }
  }

  // Show available templates
  const showAvailableTemplates = () => {
    const storedTemplates = Object.keys(localStorage)
      .filter((key) => key.startsWith("template-"))
      .map((key) => key.replace("template-", ""))

    setTemplates(storedTemplates)
    setShowTemplates(true)
  }

  // Load page templates from server
  const loadPageTemplates = async () => {
    try {
      const response = await fetch("/api/templates/list?type=pages")
      const pageTemplates = await response.json()
      setTemplates(pageTemplates)
      setShowTemplates(true)
    } catch (error) {
      console.error("Error loading page templates:", error)
    }
  }

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="/" className="inline-block bg-transparent px-4 py-2 text-2xl font-black uppercase tracking-tight text-white transform hover:skew-x-[-2deg] transition-transform duration-300 shadow-none hover:shadow-lg">
            LA <span className="bg-red-600 px-2 py-1 mx-1 text-white">CASA</span>EDITOR
          </a>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Template name"
              className="px-2 py-1 text-black rounded"
              disabled={!editorLoaded}
            />

            {/* <button
              onClick={saveTemplate}
              disabled={!editorLoaded}
              className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Save (Local)
            </button> */}

            <button
              onClick={saveTemplateToServer}
              disabled={!editorLoaded}
              className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Save (Server)
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 relative">
          {/* <button
            onClick={showAvailableTemplates}
            disabled={!editorLoaded}
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Load (Local)
          </button> */}

          <button
            onClick={loadPageTemplates}
            disabled={!editorLoaded}
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Load Template
          </button>

          {showTemplates && (
            <div className="absolute top-10 right-0 bg-white text-black p-2 rounded shadow-lg z-10 w-64">
              <h3 className="font-bold mb-2 text-gray-800">Available Templates</h3>
              {templates.length > 0 ? (
                <ul>
                  {templates.map((template) => (
                    <li
                      key={template}
                      className="cursor-pointer hover:bg-gray-100 p-1"
                      onClick={() => (template.endsWith(".html") ? loadPageTemplate(template) : loadTemplate(template))}
                    >
                      {template}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No templates found</p>
              )}
              <button onClick={() => setShowTemplates(false)} className="mt-2 w-full px-2 py-1 bg-gray-200 rounded">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
