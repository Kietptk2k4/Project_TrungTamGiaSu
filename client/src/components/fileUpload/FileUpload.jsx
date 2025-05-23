"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "../ui/button"
// import { FormDescription, FormLabel } from "./ui/form"

export function FileUpload({
  id,
  label,
  description,
  accept = "image/jpeg,image/png,image/webp",
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
  onChange,
}) {
  const [previews, setPreviews] = useState([])
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    if (!e.target.files?.length) return

    const selectedFiles = Array.from(e.target.files)
    const validFiles = []
    const validPreviews = []

    let hasError = false

    selectedFiles.forEach((file) => {
      // Validate file size
      if (file.size > maxSize) {
        alert(`File ${file.name} quá lớn. Kích thước tối đa là ${maxSize / (1024 * 1024)}MB.`)
        hasError = true
        return
      }

      // Validate file type
      if (accept && !accept.split(",").includes(file.type)) {
        alert(`File ${file.name} không đúng định dạng. Chỉ chấp nhận ${accept}.`)
        hasError = true
        return
      }

      validFiles.push(file)
      validPreviews.push(URL.createObjectURL(file))
    })

    if (hasError) return

    if (!multiple) {
      // Clean up old previews
      previews.forEach((preview) => URL.revokeObjectURL(preview))

      setFiles(validFiles)
      setPreviews(validPreviews)
    } else {
      setFiles([...files, ...validFiles])
      setPreviews([...previews, ...validPreviews])
    }

    onChange(multiple ? [...files, ...validFiles] : validFiles)
  }

  const removeFile = (index) => {
    const newFiles = [...files]
    const newPreviews = [...previews]

    // Clean up the preview URL
    URL.revokeObjectURL(newPreviews[index])

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setFiles(newFiles)
    setPreviews(newPreviews)
    onChange(newFiles)
  }

  return (
    <div className="space-y-2">
      <label>{label}</label>
      {description && <label>{description}</label>}

      <div className="border border-dashed border-gray-300 rounded-lg p-4 w-full">
        <input type="file" id={id} accept={accept} onChange={handleFileChange} className="hidden" multiple={multiple} />

        <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">Nhấn để tải lên</span>
          <span className="text-xs text-muted-foreground mt-1">
            {multiple ? "Có thể chọn nhiều file cùng lúc" : ""}
          </span>
        </label>

        {previews.length > 0 && (
          <div className={`grid ${multiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"} gap-4 mt-4`}>
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`File ${index + 1}`}
                  className="h-32 w-full rounded-md object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
