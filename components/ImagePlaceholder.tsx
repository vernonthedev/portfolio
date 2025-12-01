import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  text?: string;
  className?: string;
}

export function ImagePlaceholder({ 
  width = "100%", 
  height = "400px", 
  text = "Add Image Here",
  className = ""
}: ImagePlaceholderProps) {
  return (
    <div 
      className={`flex items-center justify-center bg-bg-d border-2 border-dashed border-grey/30 rounded-brand ${className}`}
      style={{ width, height }}
    >
      <div className="flex flex-col items-center gap-3 text-grey">
        <ImageIcon className="w-12 h-12" />
        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  );
}

