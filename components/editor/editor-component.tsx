"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EditorHeader from "./editor-header"
import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
export default function EditorComponent() {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [editor, setEditor] = useState<any>(null)
  const router = useRouter()
  // const tailwindCDN = `<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">`;
  useEffect(() => {
    // Dynamic import of GrapesJS to ensure it only loads on the client
    const loadGrapesJS = async () => {
      try {
        const grapesjs = (await import("grapesjs")).default
        const gjsPresetWebpage = (await import("grapesjs-preset-webpage")).default
        const exportPlugin = (await import("grapesjs-plugin-export")).default;
        const tailwindplugin = (await import("grapesjs-tailwind")).default;
            
        // Add CSS for GrapesJS
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        document.head.appendChild(link)
        // add tailwind 
        const tailwindLink = document.createElement('link');
        tailwindLink.rel = 'stylesheet';
        tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css';
        document.head.appendChild(tailwindLink);

        // Inject custom CSS for dark theme
        const darkThemeStyle = document.createElement('style');
        darkThemeStyle.innerHTML = `
          body, .gjs-pn-views-container, .gjs-pn-panels, .gjs-pn-buttons {
            background-color: #1e1e1e !important;
            color: #ffffff !important;
          }
          .gjs-pn-buttons .gjs-pn-btn {
            background-color: #333333 !important;
            color: #ffffff !important;
          }
          .gjs-pn-buttons .gjs-pn-btn:hover {
            background-color: #444444 !important;
          }
          .gjs-pn-views-container {
            border-color: #444444 !important;
          }
        `;
        document.head.appendChild(darkThemeStyle);

        // Inject custom CSS for full dark mode
        const fullDarkThemeStyle = document.createElement('style');
        fullDarkThemeStyle.innerHTML = `
          body, .gjs-pn-views-container, .gjs-pn-panels, .gjs-pn-buttons, .gjs-cv-canvas__frames, .gjs-block {
            background-color: #1e1e1e !important;
            color: #ffffff !important;
          }
          .gjs-pn-buttons .gjs-pn-btn {
            background-color: #333333 !important;
            color: #ffffff !important;
          }
          .gjs-pn-buttons .gjs-pn-btn:hover {
            background-color: #444444 !important;
          }
          .gjs-pn-views-container {
            border-color: #444444 !important;
          }
          .gjs-block {
            background-color: #2e2e2e !important;
            border: 1px solid #444444 !important;
          }
          .gjs-block:hover {
            background-color: #3e3e3e !important;
          }
          .gjs-cv-canvas__frames {
            background-color: #1e1e1e !important;
          }
        `;
        document.head.appendChild(fullDarkThemeStyle);

        // Update dark mode CSS to include gjs-one-bg class
        const updatedDarkThemeStyle = document.createElement('style');
        updatedDarkThemeStyle.innerHTML = `
          body, .gjs-pn-views-container, .gjs-pn-panels, .gjs-pn-buttons, .gjs-cv-canvas__frames, .gjs-block, .gjs-one-bg {
            background-color: #000 !important;
            color: #ffffff !important;
          }
          .gjs-pn-buttons .gjs-pn-btn {
            background-color:rgb(0, 0, 0) !important;
            color: #ffffff !important;
          }
          .gjs-pn-buttons .gjs-pn-btn:hover {
            background-color:rgb(0, 0, 0) !important;
          }
          .gjs-pn-views-container {
            border-color:rgb(7, 7, 7) !important;
          }
          .gjs-block {
            background-color:rgb(0, 0, 0) !important;
            border: 1px solid rgb(0, 0, 0) !important;
          }
          .gjs-block:hover {
            background-color:rgb(46, 45, 45) !important;
          }
          .gjs-cv-canvas__frames {
            background-color: #1e1e1e !important;
          }
        `;
        document.head.appendChild(updatedDarkThemeStyle);

        // Initialize editor with proper configuration
        const editor = grapesjs.init({
          container: "#gjs",
          height: "calc(100vh - 64px)", // Adjust height to account for header
          width: "auto",
          storageManager: {
            type: "local",
            autosave: true,
            autoload: true,
            stepsBeforeSave: 1,
            id: "gjs-",
          },
          deviceManager: {
            devices: [
              {
                id: "desktop",
                name: "Desktop",
                width: "",
              },
              {
                id: "tablet",
                name: "Tablet",
                width: "768px",
                widthMedia: "992px",
              },
              {
                id: "mobilePortrait",
                name: "Mobile",
                width: "320px",
                widthMedia: "575px",
              },
            ],
          },
          panels: {
            defaults: [
              {
                id: "panel-devices",
                el: ".panel__devices",
                buttons: [
                  {
                    id: "device-desktop",
                    label: "Desktop",
                    command: "set-device-desktop",
                    active: true,
                    togglable: false,
                  },
                  {
                    id: "device-tablet",
                    label: "Tablet",
                    command: "set-device-tablet",
                    togglable: false,
                  },
                  {
                    id: "device-mobile",
                    label: "Mobile",
                    command: "set-device-mobile",
                    togglable: false,
                  },
                ],
              },
              {
                id: "panel-switcher",
                el: ".panel__switcher",
                buttons: [
                  {
                    id: "show-blocks",
                    active: true,
                    label: "Blocks",
                    command: "show-blocks",
                    togglable: false,
                  },
                  {
                    id: "show-layers",
                    label: "Layers",
                    command: "show-layers",
                    togglable: false,
                  },
                  {
                    id: "show-style",
                    label: "Styles",
                    command: "show-styles",
                    togglable: false,
                  },
                ],
              },
              {
                id: "panel-basic-actions",
                el: ".panel__basic-actions",
                buttons: [
                  {
                    id: "undo",
                    label: '<i class="fa fa-undo"></i>',
                    command: "undo",
                  },
                  {
                    id: "redo",
                    label: '<i class="fa fa-repeat"></i>',
                    command: "redo",
                  },
                  {
                    id: "clean-all",
                    label: "Clear Canvas",
                    command: "core:canvas-clear",
                  },
                ],
              },
            ],
          },
          
          plugins: [gjsPresetWebpage,exportPlugin,tailwindplugin],
          pluginsOpts: {

            gjsPresetWebpage: {
              blocksBasicOpts: {
                blocks: ["column1", "column2", "column3", "column3-7", "text", "link", "image", "video"],
                flexGrid: 1,
              },
              modalImportTitle: "Import Template",
              modalImportLabel:
                '<div style="margin-bottom: 10px; font-size: 13px;">Paste HTML/CSS and click Import</div>',
              modalImportContent: '',
            },
          },
          canvas: {
            styles: [
              "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
              "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css",
            ],
            scripts: [
              "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            ]
          }
          
        })
        
        
        editor.on('load', () => {
          const frame = editor.Canvas.getFrameEl();
          if (frame && frame.contentDocument) {  // Check for both `frame` and `contentDocument`
            const head = frame.contentDocument.head;
            const tailwindLink = document.createElement('link');
            tailwindLink.rel = 'stylesheet';
            tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css';
            head.appendChild(tailwindLink);
          }
        });
        
        editor.Panels.addButton("options", {
          id: "export",
          className: "fa fa-download",
          command: "gjs-export-zip",
          attributes: { title: "Export Template" },
        });
        editor.Panels.addButton("options", {
          id: "export-json",
          className: "fa fa-file-code-o", // icon for json
          command: "gjs-export-json",
          attributes: { title: "Export Template as JSON" },
        });
        editor.Panels.addButton("options", {
          id: "upload-json",
          className: "fa fa-upload",
          attributes: { title: "Upload JSON" },
          command: "gjs-upload-json",
        });
        editor.Commands.add("gjs-upload-json", {
          run(editor) {
            // Create a hidden file input
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json";
        
            input.addEventListener("change", (event: any) => {
              const file = event.target.files[0];
              if (!file) return;
        
              const reader = new FileReader();
        
              reader.onload = (e) => {
                try {
                  const content = e.target?.result as string;
                  const json = JSON.parse(content);
        
                  // Load project data into the editor
                  editor.loadProjectData(json);
                  alert("Template loaded successfully!");
                } catch (err) {
                  console.error("Failed to load JSON", err);
                  alert("Invalid JSON file.");
                }
              };
        
              reader.readAsText(file);
            });
        
            input.click();
          },
        });
        editor.Panels.addButton("options", {
          id: "export-json-server",
          className: "fa fa-file-code-o", // or any FontAwesome icon you like
          command: "gjs-export-json-server",
          attributes: { title: "Export JSON to Server" },
        });
        // fuction to add responsive : 
        editor.Commands.add("set-device-desktop", {
          run: (editor) => editor.setDevice("Desktop"),
        });
        
        editor.Commands.add("set-device-tablet", {
          run: (editor) => editor.setDevice("Tablet"),
        });
        
        editor.Commands.add("set-device-mobile", {
          run: (editor) => editor.setDevice("Mobile"),
        });
        
        editor.Commands.add("gjs-export-json", {
          run(editor) {
            const projectData = editor.getProjectData();
        
            // Format date as dd.MM.yyyy(HH.mm)
            const now = new Date();
            const day = String(now.getDate()).padStart(2, "0");
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            // const seconds = String(now.getSeconds()).padStart(2, "0");
        
            const fileName = `${day}.${month}.${year}(${hours}.${minutes}).json`;
        
            // Create and trigger download
            const jsonStr = JSON.stringify(projectData, null, 2);
            const blob = new Blob([jsonStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
        
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
        
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          },
        });
        
        /// export json tp server 
        editor.Commands.add("gjs-export-json-server", {
          async run(editor) {
            const data = editor.getProjectData();
        
            // Format the name with date and time
            const now = new Date();
            const dateStr = now.toLocaleDateString("en-GB").split("/").reverse().join(".");
            const timeStr = `(${now.getHours()}-${now.getMinutes()}-${now.getSeconds()})`;
            const name = `template-${dateStr}${timeStr}`;
        
            try {
              const response = await fetch("/api/templates/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, data }),
              });
        
              const result = await response.json();
              if (response.ok) {
                alert(`Template JSON saved as ${name}.json on server.`);
              } else {
                alert(result.error || "Failed to save JSON template.");
              }
            } catch (error) {
              console.error("Error saving JSON template:", error);
              alert("Server error while saving JSON template.");
            }
          },
        });
        
        
        // Load custom blocks
        await loadCustomBlocks(editor)

        setEditor(editor)
        setEditorLoaded(true)
      } catch (error) {
        console.error("Error loading GrapesJS:", error)
      }
    }

    if (typeof window !== "undefined") {
      loadGrapesJS()
    }

    return () => {
      if (editor) {
        editor.destroy()
      }
    }
  }, [])

  // Function to load custom blocks from public directory
  const loadCustomBlocks = async (editor: any) => {
    try {
      // Load blocks
      const blocksResponse = await fetch("/api/templates/list?type=blocks")
      const blocks = await blocksResponse.json()
  
      // Load sections
      const sectionsResponse = await fetch("/api/templates/list?type=sections")
      const sections = await sectionsResponse.json()
  
      // Add blocks
      blocks.forEach((block: string) => {
        registerTemplate(editor, block, "blocks", "Custom Blocks")
      })
  
      // Add sections
      sections.forEach((section: string) => {
        registerTemplate(editor, section, "sections", "Custom Sections")
      })
  
      // Load components
      const componentsResponse = await fetch("/api/templates/list?type=components")
      const components = await componentsResponse.json()
  
      // Add components
      components.forEach((component: string) => {
        registerTemplate(editor, component, "components", "Components")
      })
    } catch (error) {
      console.error("Error loading custom blocks:", error)
    }
  }

  // Function to register a template as a block with media preview
  const registerTemplate = async (editor: any, name: string, type: string, category: string) => {
    try {
      const response = await fetch(`/templates/${type}/${name}`);
      const html = await response.text();

      // Use an <img> tag for the media preview with border radius
      const mediaPreview = `<img src='/templates/${type}/${name.replace('.html', '.png')}' alt='${name}' style='width:100%; height:auto; border-radius:8px;' />`;

      editor.BlockManager.add(`${type}-${name}`, {
        label: name.replace(".html", ""),
        category: category,
        content: html,
        media: mediaPreview, // Add media preview as an <img> with border radius
      });
    } catch (error) {
      console.error(`Error loading template ${name}:`, error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <EditorHeader editor={editor} editorLoaded={editorLoaded} />
      <div className="editor-container" >
        {/* GrapesJS panel containers */}
        <div className="panel__top">
          <div className="panel__basic-actions"></div>
          <div className="panel__devices"></div>
          <div className="panel__switcher"></div>
        </div>
        <div className="editor-row">
          <div className="editor-canvas">
            <div id="gjs"></div>
          </div>
          {/* Right panel will be auto-populated by GrapesJS */}
          <div className="panel__right"></div>
        </div>
      </div>
    </div>
  )
}
