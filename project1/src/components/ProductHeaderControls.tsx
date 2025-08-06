"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductHeaderControlsProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  handleSort: (value: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  sortOptions: { value: string; label: string }[];
  showOptions: { value: string; label: string }[];
  viewModeButtons: { mode: string; title: string; icon: string }[];
}

export default function ProductHeaderControls({
  viewMode,
  setViewMode,
  sortBy,
  handleSort,
  itemsPerPage,
  setItemsPerPage,
  sortOptions,
  showOptions,
  viewModeButtons
}: ProductHeaderControlsProps) {
  return (
    <div className="p-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          {viewModeButtons.map(({ mode, title, icon }) => (
            <Button
              key={mode}
              onClick={() => setViewMode(mode as 'grid' | 'list')}
              className={`p-2 rounded transition-all duration-200 bg-white hover:bg-white ${
                viewMode === mode ? '' : ''
              }`}
              title={title}
            >
              <Image
                src={icon}
                alt={title}
                width={16}
                height={16}
                className={`w-4 h-4 transition-all duration-200 ${
                  viewMode === mode
                    ? 'text-emerald-500 filter-emerald-500'
                    : 'text-gray-400 filter-gray-400 hover:text-emerald-500 hover:filter-emerald-500'
                }`}
              />
            </Button>
          ))}
        </div>

        {/* Right side - Sort and Items per page */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-600">Sắp xếp theo</Label>
            <Select
              value={sortBy}
              onValueChange={handleSort}
            >
              <SelectTrigger className="border border-gray-300 rounded px-3 py-4 text-sm bg-white">
                <SelectValue placeholder="Tên A-Z" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-600">Show</Label>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(Number(value))}
            >
              <SelectTrigger className="border border-gray-300 rounded px-3 py-4 text-sm bg-white">
                <SelectValue placeholder="15" />
              </SelectTrigger>
              <SelectContent>
                {showOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
} 
