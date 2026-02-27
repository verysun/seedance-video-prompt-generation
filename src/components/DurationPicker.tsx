'use client';

import { DURATION_OPTIONS } from '@/lib/system-prompt';

interface DurationPickerProps {
  value: number;
  onChange: (value: number) => void;
}

export function DurationPicker({ value, onChange }: DurationPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        视频总时长
        <span className="text-xs text-gray-500 ml-2">
          （将自动拆分为每段≤15秒）
        </span>
      </label>
      <div className="flex flex-wrap gap-2">
        {DURATION_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
              value === option.value
                ? 'bg-violet-500/20 border-violet-500/50 text-white ring-1 ring-violet-500/30'
                : 'bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:border-white/20 hover:text-gray-200'
            }`}
          >
            <div>{option.label}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{option.segments}段</div>
          </button>
        ))}
      </div>
    </div>
  );
}
