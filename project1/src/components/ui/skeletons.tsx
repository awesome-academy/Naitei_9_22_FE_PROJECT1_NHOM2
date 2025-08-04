import React from 'react';

// Skeleton component for fallback images
export function ImageSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-gray-100 animate-pulse flex items-center justify-center ${className}`}>
        <svg
            className="w-8 h-8 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
            />
                 </svg>
     </div>
    );
}

// Skeleton component for text lines
export function TextSkeleton({ className = "", lines = 1 }: { className?: string; lines?: number }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <div
                    key={index}
                    className="h-4 bg-gray-200 rounded animate-pulse"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                />
            ))}
        </div>
    );
}

// Skeleton component for cards
export function CardSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
            <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
            </div>
        </div>
    );
}

// Skeleton component for profile page
export function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header skeleton */}
                <div className="mb-8">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>

                {/* Tabs skeleton */}
                <div className="mb-6">
                    <div className="flex space-x-4 mb-6">
                        <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
                        <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
                    </div>
                </div>

                {/* Profile content skeleton */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="space-y-6">
                        {/* Card header */}
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-64" />
                            </div>
                            <div className="h-9 bg-gray-200 rounded animate-pulse w-24" />
                        </div>

                        {/* Form fields skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                                </div>
                            ))}
                            {/* Address field (full width) */}
                            <div className="space-y-2 md:col-span-2">
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="h-px bg-gray-200" />

                        {/* Buttons skeleton */}
                        <div className="flex items-center gap-4">
                            <div className="h-10 bg-gray-200 rounded animate-pulse w-40" />
                            <div className="h-10 bg-gray-200 rounded animate-pulse w-24" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


