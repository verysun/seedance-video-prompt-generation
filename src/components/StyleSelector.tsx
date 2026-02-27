'use client';

import { VIDEO_STYLES } from '@/lib/system-prompt';

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">视频风格</label>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {VIDEO_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all duration-200 ${
              value === style.id
                ? 'bg-violet-500/20 border-violet-500/50 text-white ring-1 ring-violet-500/30'
                : 'bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:border-white/20 hover:text-gray-200'
            }`}
          >
            <span className="text-xl">{style.icon}</span>
            <span className="text-xs font-medium">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
