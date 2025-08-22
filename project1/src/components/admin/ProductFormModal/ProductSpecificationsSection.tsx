import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductSpecificationsSectionProps } from "./types";

export default function ProductSpecificationsSection({
  specifications,
  onSpecificationsChange,
}: ProductSpecificationsSectionProps) {
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      onSpecificationsChange({
        ...specifications,
        [newSpecKey.trim()]: newSpecValue.trim(),
      });
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    onSpecificationsChange(newSpecs);
  };

  return (
    <div>
      <Label>Thông số kỹ thuật</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        <Input
          value={newSpecKey}
          onChange={(e) => setNewSpecKey(e.target.value)}
          placeholder="Tên thông số"
        />
        <Input
          value={newSpecValue}
          onChange={(e) => setNewSpecValue(e.target.value)}
          placeholder="Giá trị"
        />
      </div>
      <Button type="button" onClick={addSpecification} variant="outline">
        Thêm thông số
      </Button>
      <div className="mt-2 space-y-2">
        {Object.entries(specifications).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center gap-2 bg-gray-100 p-2 rounded"
          >
            <span className="font-medium">{key}:</span>
            <span>{value}</span>
            <Button
              type="button"
              onClick={() => removeSpecification(key)}
              variant="ghost"
              size="sm"
              className="ml-auto w-6 h-6 p-0"
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
