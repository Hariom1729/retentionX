import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UploadCloud, File, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CustomerUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  })

  const handleUpload = () => {
    if (!file) return
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      setFile(null)
      alert('Upload complete!')
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Upload Customer Data</h1>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <CardTitle>Drag & Drop CSV / Excel</CardTitle>
          </CardHeader>
          <CardContent>
            {!file ? (
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm font-medium">
                  {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports .csv and .xlsx up to 10MB
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white/5">
                  <div className="flex items-center space-x-3">
                    <File className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={uploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleUpload} 
                  disabled={uploading} 
                  className="w-full"
                >
                  {uploading ? 'Uploading...' : 'Upload Data'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
