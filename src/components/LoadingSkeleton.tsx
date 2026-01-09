import React from 'react'

const LoadingSkeleton = () => {
    return (
        <div className="flex w-52 flex-col gap-4">
            <div className="flex items-center gap-4">
                <div className="h-25 w-25 shrink-0 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="flex flex-col gap-4">
                    <div className="h-4 w-50 rounded bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-70 rounded bg-gray-200 animate-pulse"></div>
                </div>
            </div>
            <div className="h-32 w-100 rounded bg-gray-200 animate-pulse"></div>
        </div>
    )
}

export default LoadingSkeleton