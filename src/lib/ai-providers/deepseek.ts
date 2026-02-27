import OpenAI from 'openai';
import { AIProvider } from './types';

export class DeepSeekProvider implements AIProvider {
  name = 'DeepSeek';
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model?: string) {
    this.client = new OpenAI({
      apiKey,
      baseURL: 'https://api.deepseek.com',
    });
    this.model = model || 'deepseek-chat';
  }

  async generate(systemPrompt: string, userPrompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    return response.choices[0]?.message?.content || '';
  }

  async *generateStream(systemPrompt: string, userPrompt: string): AsyncIterable<string> {
    const stream = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      stream: true,
      response_format: { type: 'json_object' },
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }
}
