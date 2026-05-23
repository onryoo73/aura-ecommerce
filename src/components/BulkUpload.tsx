"use client"

import { useState, useRef } from "react"
import { Upload, FileSpreadsheet, X, Check, AlertCircle } from "lucide-react"
import { bulkAddProducts } from "@/lib/bulk-actions"

export default function BulkUpload() {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; imported: number; errors: number; total: number; detectedColumns?: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f && (f.name.endsWith(".xlsx") || f.name.endsWith(".xls") || f.name.endsWith(".csv"))) {
      setFile(f)
      setResult(null)
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setResult(null)
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)

    const res = await bulkAddProducts(formData)
    setLoading(false)

    if (res.error) {
      setError(res.error)
    } else {
      setResult(res as any)
      setFile(null)
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        <Upload className="w-3.5 h-3.5" />
        Bulk Upload
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setOpen(false)}>
          <div
            className="bg-card border border-border p-8 w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold tracking-tight">Bulk Add Products</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Upload an .xlsx or .csv file with columns: <span className="text-foreground font-medium">name</span>, <span className="text-foreground font-medium">description</span>, <span className="text-foreground font-medium">price</span>, <span className="text-foreground font-medium">image</span>, <span className="text-foreground font-medium">category</span>, <span className="text-foreground font-medium">stock</span>
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
                dragging ? "border-foreground bg-secondary/30" : "border-border hover:border-foreground/30"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileSelect}
              />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileSpreadsheet className="w-6 h-6 text-foreground" />
                  <span className="text-sm text-foreground">{file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Drop an Excel file here or click to browse</span>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-secondary/30 border border-border text-sm">
                <div className="flex items-center gap-2 text-foreground font-medium mb-2">
                  {result.errors > 0 ? <AlertCircle className="w-4 h-4 text-destructive" /> : <Check className="w-4 h-4" />}
                  {result.errors > 0 ? "Import completed with errors" : "Import complete"}
                </div>
                <p className="text-muted-foreground">
                  {result.imported} / {result.total} products imported
                  {result.errors > 0 && <span className="text-destructive ml-2">({result.errors} errors)</span>}
                </p>
                {result.detectedColumns && (
                  <p className="text-muted-foreground mt-1">
                    Detected columns: {result.detectedColumns.join(", ")}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 border border-border text-sm font-medium hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!file || loading}
                className="flex-1 py-2.5 bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-30"
              >
                {loading ? "Importing..." : "Import Products"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
