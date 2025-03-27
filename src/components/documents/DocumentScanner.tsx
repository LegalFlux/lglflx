
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Image, FileText, RotateCw, Upload } from 'lucide-react';

interface DocumentScannerProps {
  onScan?: (file: File) => void;
  onCancel?: () => void;
}

const DocumentScanner: React.FC<DocumentScannerProps> = ({ onScan, onCancel }) => {
  const [activeTab, setActiveTab] = useState<string>('camera');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start camera capture
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        
        // Stop camera stream
        stopCamera();
      }
    }
  };

  // Stop camera capture
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Process captured image (simulate OCR and enhancement)
  const processImage = () => {
    // Here we would normally send the image to a backend for processing
    // For now, we'll just simulate a delay
    setTimeout(() => {
      // Handle the processed image
      if (onScan && capturedImage) {
        // Convert base64 to blob and then to File
        fetch(capturedImage)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'scanned-document.jpg', { type: 'image/jpeg' });
            onScan(file);
          });
      }
    }, 1500);
  };

  // Reset the scanner
  const resetScanner = () => {
    setCapturedImage(null);
    setActiveTab('camera');
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Digitalização de Documento</CardTitle>
      </CardHeader>
      <CardContent>
        {capturedImage ? (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={capturedImage} 
                alt="Documento digitalizado" 
                className="w-full h-auto object-contain max-h-[500px]"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="outline" onClick={resetScanner}>
                <RotateCw size={16} className="mr-2" />
                Nova Digitalização
              </Button>
              <Button onClick={processImage}>
                <FileText size={16} className="mr-2" />
                Processar Documento
              </Button>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="camera">
                <Camera size={16} className="mr-2" />
                Câmara
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload size={16} className="mr-2" />
                Carregar Ficheiro
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="camera" className="space-y-4">
              <div className="border rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
                {isCapturing ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Button onClick={startCamera}>
                    <Camera size={16} className="mr-2" />
                    Iniciar Câmara
                  </Button>
                )}
              </div>
              
              <div className="flex justify-center">
                {isCapturing && (
                  <Button onClick={captureImage}>
                    <Camera size={16} className="mr-2" />
                    Capturar
                  </Button>
                )}
              </div>
              
              {/* Hidden canvas for processing captured image */}
              <canvas ref={canvasRef} className="hidden" />
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4">
              <div 
                className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                onClick={triggerFileUpload}
              >
                <Image size={48} className="text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Clique para carregar uma imagem do seu dispositivo
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <div className="text-xs text-muted-foreground">
          Suporte para JPEG, PNG, PDF até 10MB
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentScanner;
