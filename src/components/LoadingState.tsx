'use client';

export function LoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-2xl overflow-hidden animate-pulse"
        >
          {/* Header skeleton */}
          <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-32 bg-white/10 rounded" />
                <div className="h-2.5 w-16 bg-white/5 rounded" />
              </div>
            </div>
            <div className="h-8 w-24 bg-white/10 rounded-lg" />
          </div>
          {/* Content skeleton */}
          <div className="px-5 py-4 space-y-2.5">
            <div className="h-3 w-full bg-white/5 rounded" />
            <div className="h-3 w-[95%] bg-white/5 rounded" />
            <div className="h-3 w-[85%] bg-white/5 rounded" />
            <div className="h-3 w-[90%] bg-white/5 rounded" />
            <div className="h-3 w-[70%] bg-white/5 rounded" />
          </div>
          {/* Tags skeleton */}
          <div className="px-5 pb-3 flex gap-2">
            <div className="h-6 w-20 bg-white/5 rounded-md" />
            <div className="h-6 w-16 bg-white/5 rounded-md" />
          </div>
        </div>
      ))}
      {/* Generating message */}
      <div className="flex items-center justify-center gap-3 py-4">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-sm text-gray-400">AI 正在生成专业提示词...</span>
      </div>
    </div>
  );
}
