
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Undo2, Save, FileSignature, Download } from 'lucide-react';

interface SignatureCanvasProps {
  onSave?: (signatureDataUrl: string) => void;
  onCancel?: () => void;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ onSave, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  // Initialize canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set line style
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 2.5;
    context.strokeStyle = '#000000';

    // Clear canvas with white background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Handle drawing start
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = getCoordinates(e);
    setLastX(offsetX);
    setLastY(offsetY);
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const { offsetX, offsetY } = getTouchCoordinates(e);
    setLastX(offsetX);
    setLastY(offsetY);
  };

  // Handle drawing
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = getCoordinates(e);
    draw(offsetX, offsetY);
    setLastX(offsetX);
    setLastY(offsetY);
    setHasSignature(true);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const { offsetX, offsetY } = getTouchCoordinates(e);
    draw(offsetX, offsetY);
    setLastX(offsetX);
    setLastY(offsetY);
    setHasSignature(true);
  };

  // Handle drawing end
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  // Get mouse coordinates
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };
  };

  // Get touch coordinates
  const getTouchCoordinates = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    return {
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top
    };
  };

  // Draw line
  const draw = (offsetX: number, offsetY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Save signature
  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    if (onSave) {
      onSave(dataUrl);
    }
  };

  // Download signature
  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'assinatura.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Assinatura Digital</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="border rounded-md p-1 bg-white">
          <div className="border-b border-dashed flex justify-center items-center py-1 text-xs text-muted-foreground">
            Assine dentro da área abaixo
          </div>
          <canvas
            ref={canvasRef}
            className="w-full touch-none cursor-crosshair"
            style={{ height: '200px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Button 
            variant="outline" 
            onClick={clearCanvas}
            disabled={!hasSignature}
          >
            <Undo2 size={16} className="mr-2" />
            Limpar
          </Button>
          
          <Button 
            onClick={downloadSignature}
            disabled={!hasSignature}
            variant="outline"
          >
            <Download size={16} className="mr-2" />
            Baixar
          </Button>
          
          <Button 
            onClick={saveSignature}
            disabled={!hasSignature}
          >
            <Save size={16} className="mr-2" />
            Salvar Assinatura
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        <div className="text-xs text-muted-foreground flex items-center">
          <FileSignature size={12} className="mr-1" />
          Sua assinatura será armazenada de forma segura
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignatureCanvas;
