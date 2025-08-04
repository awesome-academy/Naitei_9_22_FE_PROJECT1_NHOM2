"use client";

interface ColorFilterProps {
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
}

export default function ColorFilter({ selectedColors, onColorChange }: ColorFilterProps) {
  const colors = [
    { name: "Xanh cây", value: "green", color: "#22c55e" },
    { name: "Đỏ cam", value: "orange", color: "#f97316" },
    { name: "Vàng", value: "yellow", color: "#eab308" },
    { name: "Xanh trời", value: "blue", color: "#3b82f6" },
    { name: "Tím", value: "purple", color: "#8b5cf6" },
    { name: "Hồng", value: "pink", color: "#f472b6" },
  ];

  const handleColorChange = (colorValue: string) => {
    const newColors = selectedColors.includes(colorValue)
      ? selectedColors.filter(c => c !== colorValue)
      : [...selectedColors, colorValue];
    
    onColorChange(newColors);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
      <div className="p-3 text-emerald-500 border-b-2 border-emerald-500">
        <h4 className="font-bold text-lg">Tìm theo màu</h4>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-3">
          {colors.map((color) => (
            <div 
              key={color.value} 
              className={`flex pb-2 items-center space-x-3 cursor-pointer text-sm hover:text-emerald-600 ${
                selectedColors.includes(color.value) 
                  ? 'bg-purple-50 text-purple-700 font-medium' 
                  : ''
              }`}
              onClick={() => handleColorChange(color.value)}
            >
              <div 
                className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: color.color }}
              ></div>
              <span className="text-gray-700 text-xs">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
