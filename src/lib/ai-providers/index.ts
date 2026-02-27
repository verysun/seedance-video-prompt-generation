import { AIProvider } from './types';
import { OpenAIProvider } from './openai';
import { DeepSeekProvider } from './deepseek';

export type ProviderType = 'openai' | 'deepseek' | 'custom';

export interface ProviderConfig {
  provider: ProviderType;
  apiKey?: string;
  baseURL?: string;
  model?: string;
}

const PROVIDER_INFO: Record<ProviderType, { label: string; description: string; defaultModel: string }> = {
  openai: {
    label: 'OpenAI',
    description: 'GPT-4o / GPT-4o-mini',
    defaultModel: 'gpt-4o',
  },
  deepseek: {
    label: 'DeepSeek',
    description: 'DeepSeek Chat，中文优化',
    defaultModel: 'deepseek-chat',
  },
  custom: {
    label: '自定义 (OpenAI 兼容)',
    description: '任何兼容 OpenAI API 的服务',
    defaultModel: 'gpt-4o',
  },
};

export function getProviderInfo() {
  return PROVIDER_INFO;
}

export function createProvider(config: ProviderConfig): AIProvider {
  const { provider, apiKey, baseURL, model } = config;

  switch (provider) {
    case 'openai':
      return new OpenAIProvider(
        apiKey || process.env.OPENAI_API_KEY || '',
        baseURL || process.env.OPENAI_BASE_URL || undefined,
        model || process.env.OPENAI_MODEL || 'gpt-4o'
      );
    case 'deepseek':
      return new DeepSeekProvider(
        apiKey || process.env.DEEPSEEK_API_KEY || '',
        model || process.env.DEEPSEEK_MODEL || 'deepseek-chat'
      );
    case 'custom':
      return new OpenAIProvider(
        apiKey || process.env.CUSTOM_API_KEY || '',
        baseURL || process.env.CUSTOM_BASE_URL || '',
        model || process.env.CUSTOM_MODEL || 'gpt-4o'
      );
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export function getDefaultProvider(): ProviderType {
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.DEEPSEEK_API_KEY) return 'deepseek';
  if (process.env.CUSTOM_API_KEY) return 'custom';
  return 'openai';
}

export { type AIProvider, type GenerateRequest, type GenerateResponse, type VideoSegment } from './types';
