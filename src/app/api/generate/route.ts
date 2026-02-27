import { NextRequest, NextResponse } from 'next/server';
import { createProvider, ProviderType } from '@/lib/ai-providers';
import { SYSTEM_PROMPT, VIDEO_STYLES, STORYBOARD_METHODS } from '@/lib/system-prompt';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      description,
      totalDuration = 60,
      style = 'custom',
      storyboardMethod = 'auto',
      customStyle = '',
      enableDialogue = true,
      provider = 'openai',
      apiKey,
      baseURL,
      model,
    } = body;

    if (!description || description.trim().length === 0) {
      return NextResponse.json({ error: '请输入视频描述' }, { status: 400 });
    }

    // Resolve provider - use user-provided apiKey, or fall back to env
    const resolvedApiKey = apiKey || getEnvApiKey(provider);
    if (!resolvedApiKey) {
      return NextResponse.json(
        { error: `请配置 ${provider.toUpperCase()} API Key（在设置中输入，或在 .env.local 中配置）` },
        { status: 400 }
      );
    }

    const aiProvider = createProvider({
      provider: provider as ProviderType,
      apiKey: resolvedApiKey,
      baseURL,
      model,
    });

    const segments = Math.ceil(totalDuration / 15);
    const styleInfo = VIDEO_STYLES.find(s => s.id === style);
    const methodInfo = STORYBOARD_METHODS.find(m => m.id === storyboardMethod);

    const userPrompt = buildUserPrompt({
      description,
      totalDuration,
      segments,
      styleLabel: styleInfo?.label || customStyle || '自定义',
      styleRhythm: styleInfo?.rhythm || '',
      methodLabel: methodInfo?.label || '自动推荐',
      customStyle,
      enableDialogue,
    });

    // Use streaming response
    const stream = aiProvider.generateStream(SYSTEM_PROMPT, userPrompt);
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '生成失败';
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Generate API error:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function getEnvApiKey(provider: string): string | undefined {
  switch (provider) {
    case 'openai':
      return process.env.OPENAI_API_KEY;
    case 'deepseek':
      return process.env.DEEPSEEK_API_KEY;
    case 'custom':
      return process.env.CUSTOM_API_KEY;
    default:
      return undefined;
  }
}

function buildUserPrompt(params: {
  description: string;
  totalDuration: number;
  segments: number;
  styleLabel: string;
  styleRhythm: string;
  methodLabel: string;
  customStyle: string;
  enableDialogue: boolean;
}): string {
  const { description, totalDuration, segments, styleLabel, styleRhythm, methodLabel, customStyle, enableDialogue } = params;

  const dialogueInstruction = enableDialogue
    ? `6. 为每段生成合适的对话/台词（dialogue 字段），包含角色名、台词内容、情感状态和出现时机
7. 对话设计原则：简短有力（每句≤15字）、贴合画面情绪、少即是多（每段最多2-3句）
8. 根据视频风格选择对话类型：叙事用角色对白，治愈用旁白/独白，广告用品牌口号，纯风景可不加对白`
    : `6. dialogue 字段设为空数组，不生成对话`;

  return `请根据以下视频构想，生成 Seedance 2.0 专用提示词。

## 用户视频构想
${description}

## 参数要求
- 总时长：${totalDuration}秒
- 需要拆分为 ${segments} 段（每段最多15秒）
- 视频风格：${styleLabel}${styleRhythm ? `（节奏：${styleRhythm}）` : ''}
${customStyle ? `- 自定义风格补充：${customStyle}` : ''}
- 分镜写法偏好：${methodLabel}
- 对话生成：${enableDialogue ? '是（根据场景自动生成角色对白/旁白/独白）' : '否'}

## 重要要求
1. 每段的 prompt 字段必须是完整的、可直接复制到 Seedance 2.0 使用的提示词
2. 每段提示词必须包含：时长标注、景别、运镜、场景描述、动作、光影风格、稳定性约束词
3. 段与段之间的画面和运镜要保持连贯衔接
4. 遵守五条铁律：动作写慢写连续、运镜写稳写简单、必加稳定约束词、必加角色约束词、模糊词换精确词
5. 同时生成一个九宫格分镜图提示词（gridPrompt），方便用户在豆包/即梦中生成分镜参考图
${dialogueInstruction}

请以 JSON 格式输出。`;
}
