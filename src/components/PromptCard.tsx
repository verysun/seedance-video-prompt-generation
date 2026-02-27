'use client';

import { useState } from 'react';
import { CopyButton } from './CopyButton';

interface DialogueLine {
  character: string;
  line: string;
  emotion?: string;
  timing?: string;
}

interface VideoSegment {
  index: number;
  duration: string;
  title: string;
  prompt: string;
  cameraWork: string;
  shotTypes: string;
  storyboardMethod: string;
  connectionToNext: string | null;
  dialogue?: DialogueLine[];
}

interface PromptCardProps {
  segment: VideoSegment;
  isLast: boolean;
}

export function PromptCard({ segment, isLast }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Build full text including dialogue for copy
  const segmentFullText = (() => {
    let text = segment.prompt;
    if (segment.dialogue && segment.dialogue.length > 0) {
      text += '\n\n【对话/台词】\n' + segment.dialogue.map(d =>
        `${d.character}${d.emotion ? `（${d.emotion}）` : ''}：「${d.line}」${d.timing ? ` [${d.timing}]` : ''}`
      ).join('\n');
    }
    return text;
  })();

  // Highlight camera/shot keywords in prompt text
  const highlightPrompt = (text: string) => {
    const keywords = [
      // 运镜
      '推镜', '拉远', '横摇', '竖摇', '环绕', '跟拍', '固定镜头', '手持',
      '主观视角', 'POV', '仰拍', '俯拍', '升降', '一镜到底',
      '希区柯克变焦', '荷兰角', '鱼眼', '匹配剪辑', '升格慢动作', '慢镜头',
      '穿越', '螺旋环绕', '推近', '拉远', '缓慢推', '缓慢拉',
      // 景别
      '极特写', '特写', '近景', '中景', '全景', '大远景', '远景',
      // 时间
      /\d+-\d+秒/g,
      // 镜头标记
      /镜头\d+/g,
    ];

    let result = text;
    const keywordStrings = keywords.filter((k): k is string => typeof k === 'string');
    const keywordRegexes = keywords.filter((k): k is RegExp => k instanceof RegExp);

    // Highlight string keywords
    keywordStrings.forEach(keyword => {
      result = result.replace(
        new RegExp(keyword, 'g'),
        `<mark class="bg-violet-500/20 text-violet-300 px-0.5 rounded">${keyword}</mark>`
      );
    });

    // Highlight regex keywords
    keywordRegexes.forEach(regex => {
      result = result.replace(regex, (match) =>
        `<mark class="bg-amber-500/20 text-amber-300 px-0.5 rounded">${match}</mark>`
      );
    });

    return result;
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-sm font-bold">
            {segment.index}
          </span>
          <div>
            <h3 className="text-white font-medium text-sm">{segment.title}</h3>
            <span className="text-xs text-gray-400">{segment.duration}</span>
          </div>
        </div>
        <CopyButton text={segmentFullText} label="复制提示词" />
      </div>

      {/* Prompt content */}
      <div className="px-5 py-4">
        <div
          className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: highlightPrompt(segment.prompt) }}
        />
      </div>

      {/* Meta tags */}
      <div className="px-5 pb-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></svg>
          {segment.storyboardMethod}
        </span>
      </div>

      {/* Dialogue section */}
      {segment.dialogue && segment.dialogue.length > 0 && (
        <div className="mx-5 mb-3 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/15 overflow-hidden">
          <div className="px-4 py-2 bg-emerald-500/5 border-b border-emerald-500/10 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-medium text-emerald-400">对话/台词</span>
          </div>
          <div className="px-4 py-3 space-y-2.5">
            {segment.dialogue.map((d, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <span className={`inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    d.character === '旁白'
                      ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {d.character}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 leading-relaxed">
                    &ldquo;{d.line}&rdquo;
                  </p>
                  <div className="flex gap-2 mt-1">
                    {d.emotion && (
                      <span className="text-[10px] text-amber-400/70 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        {d.emotion}
                      </span>
                    )}
                    {d.timing && (
                      <span className="text-[10px] text-cyan-400/70 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                        {d.timing}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expandable details */}
      <div className="border-t border-white/5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-2.5 flex items-center justify-between text-xs text-gray-400 hover:text-gray-300 transition-colors"
        >
          <span>查看运镜和景别分析</span>
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded && (
          <div className="px-5 pb-4 space-y-3 text-xs">
            <div>
              <span className="text-violet-400 font-medium">运镜：</span>
              <span className="text-gray-300 ml-1">{segment.cameraWork}</span>
            </div>
            <div>
              <span className="text-amber-400 font-medium">景别：</span>
              <span className="text-gray-300 ml-1">{segment.shotTypes}</span>
            </div>
            {segment.connectionToNext && !isLast && (
              <div>
                <span className="text-green-400 font-medium">衔接下段：</span>
                <span className="text-gray-300 ml-1">{segment.connectionToNext}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Connection arrow */}
      {!isLast && (
        <div className="flex justify-center -mb-4 relative z-10">
          <div className="w-px h-8 bg-gradient-to-b from-violet-500/40 to-transparent" />
        </div>
      )}
    </div>
  );
}
