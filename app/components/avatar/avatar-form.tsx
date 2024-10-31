"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

// Using the same constants from route.ts (lines 5-17)
const VALID_COLORS = new Set([
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
]);

const MAX_SIZE = 1000;
const MIN_SIZE = 1;
const COLOR_NUMBER_PATTERN = /-([0-9]{2,3})$/;

interface FormState {
  bgColor: string;
  bgShade: string;
  fgColor: string;
  fgShade: string;
  imgSize: string;
  fontSize: string;
  chars: string;
  rounded: boolean;
}

export default function AvatarForm() {
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    bgColor: "blue",
    bgShade: "500",
    fgColor: "white",
    fgShade: "",
    imgSize: "128",
    fontSize: "md",
    chars: "",
    rounded: false,
  });

  // Validation helper
  const validateSize = (size: string): boolean => {
    const parsedSize = parseInt(size);
    return Boolean(size) &&
      /^\d+$/.test(size) &&
      parsedSize <= MAX_SIZE &&
      parsedSize >= MIN_SIZE;
  };

  // Validation helper
  const validateColorNumber = (color: string): boolean => {
    const match = color.match(COLOR_NUMBER_PATTERN);
    if (!match) return true; // No number in color
    const number = parseInt(match[1]);
    return number % 50 === 0;
  };

  // Cleanup function for the object URL
  const cleanupImageUrl = useCallback(() => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    cleanupImageUrl(); // Cleanup previous URL

    // Validation logic from route.ts (lines 41-47)
    if (!validateSize(formState.imgSize)) {
      setError(`Size must be a number between ${MIN_SIZE} and ${MAX_SIZE}`);
      return;
    }

    const bgColorFull = formState.bgShade
      ? `${formState.bgColor}-${formState.bgShade}`
      : formState.bgColor;

    const fgColorFull = formState.fgShade
      ? `${formState.fgColor}-${formState.fgShade}`
      : formState.fgColor;

    // Validation logic from route.ts (lines 50-55)
    if (!validateColorNumber(bgColorFull)) {
      setError("Color number must be divisible by 50");
      return;
    }

    const formData = new FormData();
    formData.append("bg-color", bgColorFull);
    formData.append("fg-color", fgColorFull);
    formData.append("img-size", formState.imgSize);
    formData.append("font-size", formState.fontSize);
    formData.append("chars", formState.chars);
    formData.append("rounded", formState.rounded.toString());

    try {
      const response = await fetch("/api/avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to generate avatar");
        return;
      }

      const blob = await response.blob();
      const newImageUrl = URL.createObjectURL(blob);
      setImageUrl(newImageUrl);
    } catch (err) {
      setError(`Failed to generate avatar: ${err}`);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => cleanupImageUrl();
  }, [cleanupImageUrl]);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Background Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium dark:text-gray-200">
              Background Color
            </label>
            <select
              value={formState.bgColor}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, bgColor: e.target.value }))}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {Array.from(VALID_COLORS).map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
            {!["black", "white"].includes(formState.bgColor) && (
              <select
                value={formState.bgShade}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    bgShade: e.target.value,
                  }))}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => <option key={shade} value={shade}>{shade}</option>,
                )}
              </select>
            )}
          </div>

          {/* Foreground Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium dark:text-gray-200">
              Foreground Color
            </label>
            <select
              value={formState.fgColor}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, fgColor: e.target.value }))}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {Array.from(VALID_COLORS).map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
            {!["black", "white"].includes(formState.fgColor) && (
              <select
                value={formState.fgShade}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    fgShade: e.target.value,
                  }))}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                  (shade) => <option key={shade} value={shade}>{shade}</option>,
                )}
              </select>
            )}
          </div>

          {/* Image Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium dark:text-gray-200">
              Size (px)
            </label>
            <input
              type="number"
              value={formState.imgSize}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, imgSize: e.target.value }))}
              min={MIN_SIZE}
              max={MAX_SIZE}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium dark:text-gray-200">
              Font Size
            </label>
            <select
              value={formState.fontSize}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, fontSize: e.target.value }))}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {["sm", "md", "lg", "xl"].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Characters */}
          <div className="space-y-2">
            <label className="block text-sm font-medium dark:text-gray-200">
              Characters (max 2)
            </label>
            <input
              type="text"
              value={formState.chars}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  chars: e.target.value.toUpperCase().slice(0, 2),
                }))}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Rounded Toggle */}
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formState.rounded}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    rounded: e.target.checked,
                  }))}
                className="rounded border-gray-300 dark:border-gray-600 
                dark:bg-gray-800 dark:checked:bg-blue-500"
              />
              <span className="text-sm font-medium dark:text-gray-200">
                Circle Shape
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Generate Avatar
          </button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="flex justify-center">
        {imageUrl
          ? (
            <div className="relative">
              <Image
                src={imageUrl}
                alt="Generated avatar"
                width={parseInt(formState.imgSize)}
                height={parseInt(formState.imgSize)}
                className={`bg-clear ${
                  formState.rounded ? "rounded-full" : ""
                }`}
              />
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = imageUrl;
                  link.download = "avatar.webp";
                  link.click();
                }}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
              >
                Download
              </button>
            </div>
          )
          : (
            <div
              className={`bg-gray-100 flex items-center justify-center
              ${formState.rounded ? "rounded-full" : ""}`}
              style={{
                width: `${formState.imgSize}px`,
                height: `${formState.imgSize}px`,
              }}
            >
              <span className="text-gray-400">Preview</span>
            </div>
          )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
