/**
 * AI Provider 统一接口定义
 */

export interface GenerateRequest {
  description: string;
  totalDuration: number;
  style: string;
  storyboardMethod: string;
  customStyle?: string;
}

export interface DialogueLine {
  character: string;
  line: string;
  emotion?: string;
  timing?: string;
}

export interface VideoSegment {
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

export interface GenerateResponse {
  title: string;
  totalDuration: string;
  totalSegments: number;
  style: string;
  segments: VideoSegment[];
  gridPrompt?: string;
}

export interface AIProvider {
  name: string;
  generate(systemPrompt: string, userPrompt: string): Promise<string>;
  generateStream(systemPrompt: string, userPrompt: string): AsyncIterable<string>;
}
