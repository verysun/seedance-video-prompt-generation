'use client';

import { useState, useCallback } from 'react';
import { StyleSelector } from '@/components/StyleSelector';
import { DurationPicker } from '@/components/DurationPicker';
import { StoryboardMethodSelector } from '@/components/StoryboardMethodSelector';
import { ProviderSelector, ProviderType } from '@/components/ProviderSelector';
import { PromptCard } from '@/components/PromptCard';
import { GridPromptCard } from '@/components/GridPromptCard';
import { LoadingState } from '@/components/LoadingState';
import { CopyButton } from '@/components/CopyButton';
import { GenerateResponse } from '@/lib/ai-providers';
import { UserMenu } from '@/components/UserMenu';
import Link from 'next/link';

const EXAMPLE_PROMPTS = [
  '一个身穿白衣的剑客在雨中的竹林里与黑衣刀客对决，充满张力',
  '日落时分的海边咖啡馆，一位女生独自坐在窗边看海，治愈氛围',
  '一双高端运动鞋在混凝土台面上的广告展示，强调质感和设计感',
  '霓虹闪烁的赛博朋克城市夜景，一个戴面具的人在雨中行走',
  '春天的樱花树下，花瓣随风飘落，一只橘猫懒洋洋地打盹',
  '一列蒸汽火车在秋天的山谷中穿行，金黄落叶漫天飞舞',
  '深海中一头巨大鲸鱼缓缓游过，周围发光的水母群漂浮',
  '老上海弄堂里一个旗袍女子撑伞走过，石板路泛着雨光',
  '宇航员漂浮在空间站窗前，窗外是壮丽的地球日出',
  '一个小女孩在向日葵花田里奔跑，阳光透过花瓣洒下金色光斑',
  '雪山之巅的寺庙，僧人在晨雾中敲响古钟，云海翻涌',
  '未来城市的空中赛道上，飞行摩托竞速，尾焰划破夜空',
  '一只白色柴犬在秋天的银杏大道上追逐落叶，画面温暖',
  '水墨画风格，仙鹤掠过山水之间，云雾缭绕如仙境',
  '复古胶片质感，一对情侣在80年代的游乐场里骑旋转木马',
];

const EXAMPLES_PER_PAGE = 5;

export default function Home() {
  // Input state
  const [description, setDescription] = useState('');
  const [examplePage, setExamplePage] = useState(0);
  const totalExamplePages = Math.ceil(EXAMPLE_PROMPTS.length / EXAMPLES_PER_PAGE);
  const currentExamples = EXAMPLE_PROMPTS.slice(
    examplePage * EXAMPLES_PER_PAGE,
    (examplePage + 1) * EXAMPLES_PER_PAGE
  );
  const [totalDuration, setTotalDuration] = useState(60);
  const [style, setStyle] = useState('custom');
  const [storyboardMethod, setStoryboardMethod] = useState('auto');
  const [customStyle, setCustomStyle] = useState('');
  const [enableDialogue, setEnableDialogue] = useState(true);
  // Provider state
  const [provider, setProvider] = useState<ProviderType>('openai');
  const [apiKey, setApiKey] = useState('');
  const [baseURL, setBaseURL] = useState('');
  const [model, setModel] = useState('');

  // Output state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setRawText] = useState('');

  const handleGenerate = useCallback(async () => {
    if (!description.trim()) {
      setError('请输入视频描述');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setRawText('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: description.trim(),
          totalDuration,
          style,
          storyboardMethod,
          customStyle: style === 'custom' ? customStyle : '',
          enableDialogue,
          provider,
          apiKey: apiKey || undefined,
          baseURL: baseURL || undefined,
          model: model || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '请求失败');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('无法读取响应');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.content) {
                accumulated += parsed.content;
                setRawText(accumulated);
              }
            } catch (e) {
              if (e instanceof SyntaxError) continue;
              throw e;
            }
          }
        }
      }

      // Parse final JSON
      try {
        let jsonText = accumulated.trim();
        const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)```/);
        if (jsonMatch) {
          jsonText = jsonMatch[1].trim();
        }
        const firstBrace = jsonText.indexOf('{');
        const lastBrace = jsonText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          jsonText = jsonText.slice(firstBrace, lastBrace + 1);
        }

        const parsed: GenerateResponse = JSON.parse(jsonText);
        setResult(parsed);
      } catch {
        setError('AI 返回的数据格式异常，请重试');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [description, totalDuration, style, storyboardMethod, customStyle, enableDialogue, provider, apiKey, baseURL, model]);

  const allPrompts = result?.segments.map((s, i) => {
    let text = `=== 第${i + 1}段：${s.title}（${s.duration}）===\n\n${s.prompt}`;
    if (s.dialogue && s.dialogue.length > 0) {
      text += '\n\n【对话/台词】\n' + s.dialogue.map(d =>
        `${d.character}${d.emotion ? `（${d.emotion}）` : ''}：「${d.line}」${d.timing ? ` [${d.timing}]` : ''}`
      ).join('\n');
    }
    return text;
  }).join('\n\n---\n\n') || '';

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">AI 视频提示词生成器</h1>
              <p className="text-xs text-gray-500">Seedance 2.0 专业提示词 · 自动分镜</p>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/dictionary" className="text-gray-400 hover:text-white transition-colors">
              运镜词典
            </Link>
            <Link href="/templates" className="text-gray-400 hover:text-white transition-colors">
              模板库
            </Link>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <UserMenu />
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            输入构想，<span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">一键生成</span>专业短视频提示词
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            基于 Seedance 2.0 运镜与分镜深度指南，自动将你的视频创意拆分为多段 ≤15 秒的专业提示词，
            包含运镜、景别、分镜结构、光影风格，可直接复制到小云雀/豆包使用
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-2xl p-6 mb-8">
          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">视频描述</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="描述你想要的视频内容，例如：一个身穿白衣的剑客在雨中的竹林里与黑衣刀客对决，充满张力..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-600 text-sm leading-relaxed resize-none focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
            {/* Example prompts */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500">试试：</span>
              {currentExamples.map((example, i) => (
                <button
                  key={`${examplePage}-${i}`}
                  onClick={() => setDescription(example)}
                  className="text-xs text-violet-400/60 hover:text-violet-400 transition-colors truncate max-w-[200px]"
                >
                  {example}
                </button>
              ))}
              <button
                onClick={() => setExamplePage((prev) => (prev + 1) % totalExamplePages)}
                className="text-xs text-gray-500 hover:text-violet-400 transition-colors flex items-center gap-0.5 ml-1 shrink-0"
                title="换一批"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                换一批
              </button>
            </div>
          </div>

          {/* Duration & Style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DurationPicker value={totalDuration} onChange={setTotalDuration} />
            <StyleSelector value={style} onChange={setStyle} />
          </div>

          {/* Custom style input */}
          {style === 'custom' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">自定义风格描述</label>
              <input
                type="text"
                value={customStyle}
                onChange={e => setCustomStyle(e.target.value)}
                placeholder="例如：赛博朋克、水墨画风、胶片质感、皮克斯动画风..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
              />
            </div>
          )}

          {/* Storyboard method */}
          <StoryboardMethodSelector value={storyboardMethod} onChange={setStoryboardMethod} />

          {/* Dialogue toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-300">生成对话/台词</span>
                <p className="text-xs text-gray-500 mt-0.5">根据剧本场景自动生成角色对白、旁白、内心独白等</p>
              </div>
            </div>
            <button
              onClick={() => setEnableDialogue(!enableDialogue)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${enableDialogue ? 'bg-emerald-500' : 'bg-gray-600'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${enableDialogue ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>

          {/* AI Provider */}
          <ProviderSelector
            value={provider}
            onChange={setProvider}
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            baseURL={baseURL}
            onBaseURLChange={setBaseURL}
            model={model}
            onModelChange={setModel}
          />

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !description.trim()}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 ${loading || !description.trim()
                ? 'bg-gray-700 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 active:scale-[0.99]'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                正在生成...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                生成提示词
              </span>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingState />}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">
            {/* Results header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{result.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {result.totalDuration} · {result.totalSegments} 段 · {result.style}
                </p>
              </div>
              <CopyButton text={allPrompts} label="复制全部" className="!px-4 !py-2" />
            </div>

            {/* Segment cards */}
            <div className="space-y-4">
              {result.segments.map((segment, i) => (
                <PromptCard
                  key={segment.index}
                  segment={segment}
                  isLast={i === result.segments.length - 1}
                />
              ))}
            </div>

            {/* Grid prompt */}
            {result.gridPrompt && (
              <div className="mt-6">
                <GridPromptCard gridPrompt={result.gridPrompt} />
              </div>
            )}

            {/* Usage tips */}
            <div className="mt-8 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="text-sm font-medium text-gray-300 mb-3">💡 使用指南</h4>
              <ol className="text-xs text-gray-500 space-y-2 list-decimal list-inside">
                <li>点击每段提示词的「复制提示词」按钮，粘贴到小云雀 APP 或豆包 APP 的 Seedance 2.0 入口</li>
                <li>如有参考图片，在提示词中 @图片 的位置替换为你实际上传的图片</li>
                <li>参数建议：画面比例 16:9，时长选择对应的秒数</li>
                <li>如需九宫格分镜参考图，将九宫格提示词粘贴到豆包/即梦生成图片，再配合视频提示词使用</li>
                <li>多次尝试不同的运镜组合和分镜写法，找到最适合你内容的方案</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-gray-600">
          AI 视频提示词生成器 · 基于 Seedance 2.0 运镜与分镜深度指南
        </div>
      </footer>
    </div>
  );
}
