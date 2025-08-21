import React from "react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

interface Option {
  id: number;
  name: string;
}

interface MultiSelectBadgeProps {
  label: string;
  options: Option[];
  value: number[];
  onChange: (selected: number[]) => void;
}

const MultiSelectBadge: React.FC<MultiSelectBadgeProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const handleToggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="mb-3">
      <Label className="mb-3 font-semibold block">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Badge
            key={option.id}
            variant={value.includes(option.id) ? "default" : "outline"}
            onClick={() => handleToggle(option.id)}
            className={`cursor-pointer select-none px-3 py-1 text-sm transition-colors ${
              value.includes(option.id)
                ? "bg-green-600 text-white"
                : "hover:bg-green-100"
            }`}
            aria-pressed={value.includes(option.id)}
          >
            {option.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectBadge;
