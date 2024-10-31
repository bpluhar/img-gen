'use client';

import { useState } from 'react';
import ImageBuilder from "@/app/components/avatar/image-builder";

const TAILWIND_COLORS = [
  "red", "blue", "green", "yellow", "purple",
  "orange", "pink", "brown", "gray", "black", "white"
];

const COLOR_SHADES = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const FONT_SIZES = ["sm", "md", "lg", "xl"];

export default function AvatarGenerator() {
  const [formData, setFormData] = useState({
    bgColor: "blue",
    bgShade: "500",
    fgColor: "white",
    fgShade: "",
    imgSize: "128",
    fontSize: "md",
    chars: "",
    rounded: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generateAvatar = () => {
    const bgColorWithShade = formData.bgShade ? `${formData.bgColor}-${formData.bgShade}` : formData.bgColor;
    const fgColorWithShade = formData.fgShade ? `${formData.fgColor}-${formData.fgShade}` : formData.fgColor;

    return ImageBuilder(
      bgColorWithShade,
      fgColorWithShade,
      formData.imgSize,
      formData.chars,
      formData.fontSize,
      formData.rounded ? "true" : "false"
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Background Color</label>
          <select 
            name="bgColor"
            value={formData.bgColor}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            {TAILWIND_COLORS.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          {formData.bgColor !== 'white' && formData.bgColor !== 'black' && (
            <select
              name="bgShade"
              value={formData.bgShade}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {COLOR_SHADES.map(shade => (
                <option key={shade} value={shade}>{shade}</option>
              ))}
            </select>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Foreground Color</label>
          <select
            name="fgColor"
            value={formData.fgColor}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            {TAILWIND_COLORS.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          {formData.fgColor !== 'white' && formData.fgColor !== 'black' && (
            <select
              name="fgShade"
              value={formData.fgShade}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {COLOR_SHADES.map(shade => (
                <option key={shade} value={shade}>{shade}</option>
              ))}
            </select>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Image Size (px)</label>
          <input
            type="number"
            name="imgSize"
            min="1"
            max="1000"
            value={formData.imgSize}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Font Size</label>
          <select
            name="fontSize"
            value={formData.fontSize}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            {FONT_SIZES.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Characters</label>
          <input
            type="text"
            name="chars"
            value={formData.chars}
            onChange={handleInputChange}
            maxLength={2}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="space-y-2 flex items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="rounded"
              checked={formData.rounded}
              onChange={handleInputChange}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium">Rounded Corners</span>
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-32 h-32">
          {generateAvatar()}
        </div>
      </div>
    </div>
  );
}