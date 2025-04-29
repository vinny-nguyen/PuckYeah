"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function UploadCard() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // Simulate file upload
    const files = e.dataTransfer.files
    if (files.length > 0) {
      simulateUpload()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      simulateUpload()
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setProgress(0)
    setUploadStatus("Uploading your clip...")

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("Analyzing Your Breakaway...")

          setTimeout(() => {
            setIsUploading(false)
            setUploadStatus(null)
          }, 2000)

          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  return (
    <Card className="overflow-hidden rounded-2xl border-primary/20 bg-background/60 backdrop-blur-lg">
      <CardHeader className="">
        <CardTitle className="font-montserrat text-2xl font-bold">Upload Hockey Clip</CardTitle>
        <CardDescription>Drag and drop your video or click to browse</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div
          className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
            isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-background/80"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input id="file-upload" type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
          <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="mb-1 text-center font-medium">
            {isDragging ? "Drop your video here" : "Drag & drop your video here"}
          </p>
          <p className="text-center text-sm text-muted-foreground">or click to browse (MP4, MOV up to 500MB)</p>
        </div>

        {isUploading && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{uploadStatus}</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
