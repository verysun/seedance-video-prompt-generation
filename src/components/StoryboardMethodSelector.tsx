'use client';

import { STORYBOARD_METHODS } from '@/lib/system-prompt';

interface StoryboardMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function StoryboardMethodSelector({ value, onChange }: StoryboardMethodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">分镜写法</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {STORYBOARD_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => onChange(method.id)}
            className={`text-left p-3 rounded-xl border transition-all duration-200 ${
              value === method.id
                ? 'bg-violet-500/20 border-violet-500/50 text-white ring-1 ring-violet-500/30'
                : 'bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:border-white/20 hover:text-gray-200'
            }`}
          >
            <div className="text-xs font-medium">{method.label}</div>
            <div className="text-[10px] text-gray-500 mt-1 leading-tight">{method.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
