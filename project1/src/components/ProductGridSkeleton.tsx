"use client";

interface ProductGridSkeletonProps {
  viewMode: 'grid' | 'list';
  count?: number;
}

export default function ProductGridSkeleton({ viewMode, count = 12 }: ProductGridSkeletonProps) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex gap-4">
              {/* Image Skeleton */}
              <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"></div>
              
              {/* Content Skeleton */}
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-full"></div>
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3"></div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-6 bg-gray-200 animate-pulse rounded w-24"></div>
                  <div className="h-8 bg-gray-200 animate-pulse rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 animate-pulse rounded w-full"></div>
              <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-gray-200 animate-pulse rounded w-20"></div>
              <div className="h-8 bg-gray-200 animate-pulse rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
