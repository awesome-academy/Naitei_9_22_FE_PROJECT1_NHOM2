"use client";

import React from "react";

// Utility components to avoid repetition
const SkeletonBox = ({
  className = "",
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => <div className={`bg-gray-200 animate-pulse ${className}`} {...props} />;

const SkeletonGroup = ({
  count,
  className = "",
  render,
}: {
  count: number;
  className?: string;
  render: (index: number) => React.ReactNode;
}) => (
  <div className={className}>
    {Array.from({ length: count }, (_, index) => render(index))}
  </div>
);

const SkeletonLines = ({
  count,
  widths,
}: {
  count: number;
  widths: string[];
}) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, index) => (
      <SkeletonBox key={index} className={`h-6 ${widths[index] || "w-full"}`} />
    ))}
  </div>
);

export default function ProductDetailSkeleton() {
  const thumbnailWidths = ["w-[72px] h-[72px]"];
  const socialButtonWidths = ["h-8 w-12"];
  const quantityControlWidths = ["h-12 w-12", "h-12 w-16", "h-12 w-12"];
  const actionButtonWidths = ["h-12 w-32", "h-12 w-12", "h-12 w-12"];
  const textLineWidths = ["w-full", "w-5/6", "w-4/6", "w-3/6"];

  return (
     <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Image Section Skeleton */}
          <div className="w-full lg:w-96 space-y-4">
            <SkeletonBox className="relative w-96 h-96" />
            <SkeletonGroup 
              count={5} 
              className="flex justify-start gap-2 w-96"
              render={(index) => (
                <SkeletonBox key={index} className={thumbnailWidths[0]} />
              )}
            />
          </div>

          {/* Product Info Skeleton */}
          <div className="flex-1 space-y-4">
            {/* ...other sections... */}
            <div className="space-y-4">
              <div className="flex items-center space-x-8 border-b border-gray-200 py-4">
                <SkeletonBox className="h-6 w-20" />
                <SkeletonGroup 
                  count={3}
                  className="flex items-center space-x-2"
                  render={(index) => (
                    <SkeletonBox key={index} className={quantityControlWidths[index]} />
                  )}
                />
              </div>
              <SkeletonGroup 
                count={3}
                className="flex items-center space-x-2"
                render={(index) => (
                  <SkeletonBox key={index} className={actionButtonWidths[index]} />
                )}
              />
            </div>

            {/* Social Share Skeleton */}
            <div className="flex items-center space-x-3 pt-2">
              <SkeletonGroup 
                count={4}
                className="flex space-x-2"
                render={(index) => (
                  <SkeletonBox key={index} className={socialButtonWidths[0]} />
                )}
              />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-white mt-24">
          <SkeletonGroup 
            count={3}
            className="grid grid-cols-3 border-b border-gray-300"
            render={(index) => (
              <SkeletonBox key={index} className="h-12 border-r border-gray-300 last:border-r-0" />
            )}
          />
          <div className="p-6">
            <SkeletonLines count={4} widths={textLineWidths} />
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="bg-white mt-8">
          <div className="p-4 border-b border-gray-200">
            <SkeletonBox className="h-6 w-48" />
          </div>
          <div className="p-6">
            <SkeletonGroup 
              count={4}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              render={(index) => (
                <div key={index} className="text-center border border-gray-200">
                  <SkeletonBox className="relative w-full aspect-square mb-3" />
                  <SkeletonBox className="h-4 mb-2 w-3/4 mx-auto" />
                  <SkeletonBox className="h-4 mb-2 w-1/2 mx-auto" />
                  <SkeletonBox className="h-4 w-2/3 mx-auto" />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

