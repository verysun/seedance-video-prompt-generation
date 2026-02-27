'use client';

import { CopyButton } from './CopyButton';

interface GridPromptCardProps {
  gridPrompt: string;
}

export function GridPromptCard({ gridPrompt }: GridPromptCardProps) {
  return (
    <div className="bg-gradient-to-br from-amber-900/20 to-gray-900/80 border border-amber-500/20 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-amber-500/[0.05] border-b border-amber-500/10">
        <div className="flex items-center gap-2">
          <span className="text-lg">🖼️</span>
          <div>
            <h3 className="text-amber-200 font-medium text-sm">九宫格分镜图提示词</h3>
            <span className="text-xs text-gray-400">用于豆包/即梦生成分镜参考图</span>
          </div>
        </div>
        <CopyButton text={gridPrompt} label="复制" />
      </div>
      <div className="px-5 py-4">
        <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{gridPrompt}</p>
      </div>
      <div className="px-5 pb-3">
        <p className="text-xs text-gray-500">
          💡 将此提示词粘贴到豆包/即梦/元宝等 AI 图片工具中，生成九宫格分镜图，再配合视频提示词使用效果更佳
        </p>
      </div>
    </div>
  );
}
