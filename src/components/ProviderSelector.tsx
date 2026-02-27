'use client';

import { useState, useEffect } from 'react';
import { getProviderInfo } from '@/lib/ai-providers';

export type ProviderType = 'openai' | 'deepseek' | 'custom';

interface ProviderSelectorProps {
  value: ProviderType;
  onChange: (value: ProviderType) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  baseURL: string;
  onBaseURLChange: (url: string) => void;
  model: string;
  onModelChange: (model: string) => void;
}

const PROVIDER_INFO: Record<ProviderType, { label: string; description: string; defaultModel: string }> = {
  openai: { label: 'OpenAI', description: 'GPT-4o / GPT-4o-mini', defaultModel: 'gpt-4o' },
  deepseek: { label: 'DeepSeek', description: 'DeepSeek Chat，中文优化', defaultModel: 'deepseek-chat' },
  custom: { label: '自定义 (OpenAI 兼容)', description: '任何兼容 OpenAI API 的服务', defaultModel: 'gpt-4o' },
};

export function ProviderSelector({
  value,
  onChange,
  apiKey,
  onApiKeyChange,
  baseURL,
  onBaseURLChange,
  model,
  onModelChange,
}: ProviderSelectorProps) {
  const [showSettings, setShowSettings] = useState(false);

  // Load saved settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ai-provider-settings');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        if (settings.provider) onChange(settings.provider);
        if (settings.apiKey) onApiKeyChange(settings.apiKey);
        if (settings.baseURL) onBaseURLChange(settings.baseURL);
        if (settings.model) onModelChange(settings.model);
      } catch {
        // ignore
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem(
      'ai-provider-settings',
      JSON.stringify({ provider: value, apiKey, baseURL, model })
    );
    setShowSettings(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300">AI 模型</label>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          {showSettings ? '收起设置' : '⚙️ API 设置'}
        </button>
      </div>

      <div className="flex gap-2">
        {(Object.keys(PROVIDER_INFO) as ProviderType[]).map((key) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex-1 px-3 py-2 rounded-xl border text-sm transition-all duration-200 ${
              value === key
                ? 'bg-violet-500/20 border-violet-500/50 text-white ring-1 ring-violet-500/30'
                : 'bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:border-white/20 hover:text-gray-200'
            }`}
          >
            <div className="font-medium">{PROVIDER_INFO[key].label}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{PROVIDER_INFO[key].description}</div>
          </button>
        ))}
      </div>

      {showSettings && (
        <div className="mt-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={e => onApiKeyChange(e.target.value)}
              placeholder={`输入 ${PROVIDER_INFO[value].label} API Key（留空则使用服务器配置）`}
              className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
            />
          </div>
          {value === 'custom' && (
            <div>
              <label className="block text-xs text-gray-400 mb-1">API Base URL</label>
              <input
                type="text"
                value={baseURL}
                onChange={e => onBaseURLChange(e.target.value)}
                placeholder="https://api.example.com/v1"
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
              />
            </div>
          )}
          <div>
            <label className="block text-xs text-gray-400 mb-1">模型名称</label>
            <input
              type="text"
              value={model}
              onChange={e => onModelChange(e.target.value)}
              placeholder={PROVIDER_INFO[value].defaultModel}
              className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
            />
          </div>
          <button
            onClick={saveSettings}
            className="w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            保存设置
          </button>
        </div>
      )}
    </div>
  );
}
