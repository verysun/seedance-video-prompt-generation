'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Template {
  id: string;
  title: string;
  icon: string;
  badge: string;
  description: string;
  style: string;
  duration: number;
  method: string;
  prompt: string;
  tags: string[];
}

const TEMPLATES: Template[] = [
  {
    id: 'healing-1',
    title: '雨后森林漫步',
    icon: '🌿',
    badge: '治愈',
    description: '清新治愈的森林雨后场景，适合情绪放松、自然风景类视频',
    style: '治愈清新',
    duration: 15,
    method: '时间轴分镜法',
    prompt: '雨后的茂密森林，树叶上挂满水珠，阳光从树冠间隙洒下，形成丁达尔光线。一条湿润的小径蜿蜒向前，两侧是翠绿的蕨类植物。\n\n0-5秒：大远景，航拍缓慢下降，展示雨后森林全貌，晨雾缭绕\n6-10秒：中景，镜头缓慢推进沿小径前进，水珠从树叶滴落\n11-15秒：特写，一片叶子上的水珠折射出彩虹光斑，缓慢拉远至中景\n\n画面风格：治愈清新，暖光光影，色调偏翠绿和金黄\n画面流畅稳定，无抖动无闪烁',
    tags: ['自然', '治愈', '航拍', '光线'],
  },
  {
    id: 'healing-2',
    title: '海边日落剪影',
    icon: '🌅',
    badge: '治愈',
    description: '金色海边日落，人物剪影，浪漫氛围',
    style: '治愈清新',
    duration: 15,
    method: '画面块描述法',
    prompt: '金色黄昏的海边，太阳即将落入海平面，整个天空被橙红色渲染。\n\n画面1：大远景，镜头缓慢横摇，展示绵延的海岸线和落日余晖，海浪轻柔拍打沙滩\n画面2：中景，一个人在浅水区缓慢行走的剪影，脚步溅起金色水花，镜头缓慢跟拍\n画面3：特写，浪花退去后沙滩上的脚印被海水慢慢填满，镜头固定\n\n画面风格：温暖治愈，逆光剪影，色调偏橘红与金色\n画面流畅稳定，无抖动无闪烁',
    tags: ['海边', '日落', '剪影', '浪漫'],
  },
  {
    id: 'product-1',
    title: '高端香水展示',
    icon: '🎯',
    badge: '商品',
    description: '精致的香水瓶展示，适合高端产品广告',
    style: '商品展示',
    duration: 15,
    method: '时间轴分镜法',
    prompt: '极简黑色背景下的高端香水瓶，瓶身晶莹剔透，金色液体在瓶内微微流动。\n\n0-3秒：特写，香水瓶底部，镜头缓慢上推，展示瓶身材质纹理和品牌Logo\n4-8秒：中景，360度缓慢环绕，光线在瓶身折射出彩虹光斑，背景有微弱的光点散景\n9-12秒：极特写，推近至喷头部分，按下喷出细腻的香水雾气，升格慢动作\n13-15秒：全景，缓慢拉远，香水瓶置于大理石台面上，旁边散落几片玫瑰花瓣\n\n画面风格：高级质感，低调奢华，暗调高级，光影精致\n画面流畅稳定，无抖动无闪烁',
    tags: ['产品', '广告', '高端', '环绕'],
  },
  {
    id: 'product-2',
    title: '美食特写诱惑',
    icon: '🍜',
    badge: '商品',
    description: '热气腾腾的美食近距离拍摄，激发食欲',
    style: '商品展示',
    duration: 15,
    method: '镜头编号法',
    prompt: '一碗精心摆盘的日式拉面，热气腾腾，汤底金黄浓郁。\n\n镜头1：大远景→中景，镜头缓慢推进，展示整个日式餐厅环境，聚焦到吧台上的那碗拉面\n镜头2：特写，缓慢环绕半圈，展示拉面的溏心蛋、叉烧、海苔、葱花等配料\n镜头3：极特写，筷子挑起弹牙的面条，热气蒸腾而上，升格慢动作\n镜头4：近景，固定镜头，整碗拉面的完美俯拍角度，周围摆放筷子和小碟\n\n画面风格：温暖食欲感，暖色调灯光，浅景深虚化背景\n画面流畅稳定，无抖动无闪烁',
    tags: ['美食', '特写', '产品', '暖色'],
  },
  {
    id: 'action-1',
    title: '武侠剑客过招',
    icon: '⚔️',
    badge: '动作',
    description: '古风武侠动作场景，刀光剑影的对决',
    style: '动作武侠',
    duration: 15,
    method: '动作序列法',
    prompt: '竹林深处，两位身着古装的剑客持剑对峙，竹叶纷飞，气氛凝重。\n\n白衣剑客缓慢拔剑出鞘（固定镜头，近景）→ 双方同时跃起交锋，剑刃碰撞溅出火花（手持跟拍，全景，快速横摇） → 一方被击退，在空中翻转（升格慢动作，低角度仰拍） → 落地单膝跪地，剑插入地面，竹叶纷纷飘落（缓慢拉远至大远景，定格）\n\n画面风格：水墨质感，中国传统美学，冷色调偏青蓝\n人体结构正常，动作连贯流畅\n画面流畅稳定，无抖动无闪烁',
    tags: ['武侠', '古风', '动作', '慢动作'],
  },
  {
    id: 'action-2',
    title: '赛博都市追逐',
    icon: '🏎️',
    badge: '动作',
    description: '赛博朋克风格的城市追逐戏，霓虹灯与速度感',
    style: '动作武侠',
    duration: 15,
    method: '幕式结构法',
    prompt: '赛博朋克风格的未来都市夜景，霓虹灯管在雨水中倒映出五彩光芒。\n\n第一幕（0-4秒）：大远景，航拍俯瞰霓虹闪烁的未来城市，雨夜，镜头快速推近至一条繁忙的街道\n第二幕（5-10秒）：中景→近景，主观视角POV镜头，穿梭在窄巷中高速奔跑，两侧霓虹招牌飞速倒退，手持摄影风格轻微抖动\n第三幕（11-15秒）：全景，猛然推开天台门冲出，城市全景在眼前展开，镜头从背后跟拍切换到正面，升格慢动作定格在雨中回头的瞬间\n\n画面风格：赛博朋克，暗调高级，霓虹反光，高饱和青紫色调\n画面流畅稳定，无抖动无闪烁',
    tags: ['赛博朋克', '追逐', '夜景', '速度'],
  },
  {
    id: 'suspense-1',
    title: '深夜诡异走廊',
    icon: '👻',
    badge: '悬疑',
    description: '恐怖悬疑氛围的长走廊场景',
    style: '悬疑恐怖',
    duration: 15,
    method: '时间轴分镜法',
    prompt: '凌晨3点，一座废弃医院的漫长走廊，墙壁斑驳脱落，偶尔有荧光灯闪烁。\n\n0-4秒：大远景，固定镜头，漫长的走廊尽头一片漆黑，唯一的荧光灯不规则闪烁\n5-8秒：中景，镜头极度缓慢推进，走廊墙壁上的旧式挂钟突然开始倒转，轻微的金属摩擦声\n9-12秒：近景，走廊尽头的黑暗中隐约出现一个模糊的白色轮廓，荷兰角倾斜构图\n13-15秒：极特写，快速推近至走廊中一面破碎的镜子，镜中映射出空无一人的走廊——但镜子前明明站着摄影机\n\n画面风格：暗调冷色，低饱和度偏青灰，隐约的颗粒噪点感\n画面流畅稳定，无抖动无闪烁',
    tags: ['恐怖', '悬疑', '暗调', '建筑'],
  },
  {
    id: 'oneshot-1',
    title: '咖啡馆一镜到底',
    icon: '🎥',
    badge: '一镜到底',
    description: '一镜到底穿越咖啡馆，展示温馨日常',
    style: '一镜到底',
    duration: 15,
    method: '画面块描述法',
    prompt: '温暖的日式咖啡馆内，全程一镜到底，不切镜。\n\n镜头从门口推入，经过门口风铃（风铃轻响），缓慢横摇扫过左侧木架上的咖啡豆罐和干花 → 继续跟拍一位咖啡师的手，正在细腻地做拉花（近景，镜头微微推近看拉花纹路形成） → 镜头缓慢上摇，拍到咖啡师温暖的微笑（近景） → 最后缓缓拉远至中景，展示整个温馨的吧台环境\n\n画面风格：日系温暖文艺，柔光，色调偏暖黄和棕色\n面部稳定不变形，五官清晰，人体结构正常\n画面流畅稳定，无抖动无闪烁\n全程一镜到底，不要切镜',
    tags: ['一镜到底', '日系', '咖啡', '文艺'],
  },
  {
    id: 'mv-1',
    title: 'MV卡点舞蹈',
    icon: '🎵',
    badge: 'MV',
    description: '配合音乐节奏的舞蹈卡点视频',
    style: 'MV卡点',
    duration: 15,
    method: '动作序列法',
    prompt: '街头涂鸦墙前，一位穿着潮流服饰的舞者，准备跳一段Urban舞蹈。\n\n舞者定格Pose（固定镜头，全景，2秒）→ 随节拍开始身体Wave（镜头快速推近至中景）→ 连续popping动作（快速切换多角度：正面近景→侧面中景→低角度仰拍）→ 接一个power move地板动作（环绕半圈拍摄，中景）→ 升格慢动作定格在最后一个造型pose（缓慢拉远至全景，展示涂鸦墙和舞者的整体画面）\n\n画面风格：高饱和街头潮流感，强对比度，色调鲜艳\n人体结构正常，动作连贯流畅，服装一致\n画面流畅稳定，无抖动无闪烁',
    tags: ['MV', '舞蹈', '街头', '卡点'],
  },
  {
    id: 'transition-1',
    title: '四季轮转转场',
    icon: '✨',
    badge: '转场',
    description: '春夏秋冬四季变化的创意转场',
    style: '创意转场',
    duration: 15,
    method: '时间轴分镜法',
    prompt: '同一棵大树的四季变化，匹配剪辑创意转场。\n\n0-3秒：春天——中景，粉色樱花盛开的大树，花瓣随风飘落，镜头缓慢推近至树干\n4-7秒：夏天——匹配剪辑转场，同一视角但树冠变为浓密翠绿，阳光透过枝叶，蝉鸣感，镜头继续推近\n8-11秒：秋天——匹配剪辑转场，树叶变为金黄橘红，落叶纷飞，镜头环绕半圈展示漫天落叶\n12-15秒：冬天——匹配剪辑转场，枝干覆盖白雪，背景飘雪，镜头缓慢拉远至大远景，整个雪景尽收眼底\n\n画面风格：每季色调不同（粉绿→翠绿→金橘→冷白），自然唯美\n画面流畅稳定，无抖动无闪烁',
    tags: ['转场', '四季', '创意', '匹配剪辑'],
  },
  {
    id: 'ad-1',
    title: '运动鞋广告大片',
    icon: '🎬',
    badge: '广告',
    description: '高端运动品牌广告风格的产品展示',
    style: '广告大片',
    duration: 15,
    method: '幕式结构法',
    prompt: '极简纯白工作室内，一只全新的高端运动鞋悬浮在画面中央，光线精致。\n\n第一幕（0-4秒）：极特写，鞋底纹理细节，灯光渐亮，镜头缓慢上摇至鞋身侧面，展示材质和针脚\n第二幕（5-10秒）：全景，运动鞋缓慢360度旋转，镜头环绕拍摄，每个角度光线精确打亮不同材质——网面/皮革/气垫，背景有微弱粒子飘动\n第三幕（11-15秒）：动态，运动鞋猛然"落地"（穿越式推进镜头紧跟），溅起气势十足的粉尘，升格慢动作，最后定格在品牌Logo\n\n画面风格：高端商业广告质感，精致打光，黑白灰+品牌色点缀\n画面流畅稳定，无抖动无闪烁',
    tags: ['广告', '产品', '高端', '品牌'],
  },
  {
    id: 'custom-1',
    title: '微缩世界奇遇',
    icon: '🔬',
    badge: '创意',
    description: '微缩模型与真实世界混搭的趣味创意视频',
    style: '自定义',
    duration: 15,
    method: '镜头编号法',
    prompt: '一个巨大的办公桌面上，微缩小人在日常物品间展开"冒险"。\n\n镜头1：大远景→中景，鱼眼镜头效果，从超广角俯拍展示整个桌面，键盘、咖啡杯、文件夹成为"高楼大厦"，快速推近\n镜头2：近景，侧面跟拍一个微缩小人沿着尺子搭建的"桥梁"行走在咖啡杯和订书机之间\n镜头3：极特写，小人站在回形针"悬崖"边缘向下看，低角度仰拍展示"壮阔"的桌面景观\n镜头4：全景，缓慢拉远，揭示这只是一个普通的办公桌——打破微缩幻觉\n\n画面风格：趣味创意，移轴摄影感，浅景深虚化\n画面流畅稳定，无抖动无闪烁',
    tags: ['创意', '微缩', '趣味', '移轴'],
  },
];

const CATEGORIES = ['全部', '治愈', '商品', '动作', '悬疑', '一镜到底', 'MV', '转场', '广告', '创意'];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = activeCategory === '全部'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.badge === activeCategory);

  const handleCopy = async (template: Template) => {
    try {
      await navigator.clipboard.writeText(template.prompt);
      setCopiedId(template.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = template.prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(template.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">模板库</h1>
              <p className="text-xs text-gray-500">Seedance 2.0 提示词模板</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              生成器
            </Link>
            <Link href="/dictionary" className="text-gray-400 hover:text-white transition-colors">
              运镜词典
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">提示词模板库</h2>
          <p className="text-gray-400">精选提示词模板，一键复制即可使用，覆盖常见视频类型</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map(template => (
            <div
              key={template.id}
              className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/30 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{template.icon}</span>
                  <div>
                    <h3 className="text-white font-medium">{template.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">
                        {template.badge}
                      </span>
                      <span className="text-[10px] text-gray-500">{template.duration}秒</span>
                      <span className="text-[10px] text-gray-500">{template.method}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(template)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    copiedId === template.id
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-white/5 text-gray-400 hover:bg-violet-500/20 hover:text-violet-300'
                  }`}
                >
                  {copiedId === template.id ? '✓ 已复制' : '复制'}
                </button>
              </div>

              <p className="text-xs text-gray-400 mb-3">{template.description}</p>

              {/* Prompt Preview */}
              <div className="relative">
                <pre className="text-xs text-gray-300/80 bg-black/30 p-3 rounded-lg overflow-hidden whitespace-pre-wrap max-h-32 leading-relaxed">
                  {template.prompt}
                </pre>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {template.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p>该分类暂无模板</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">想要更个性化的提示词？试试 AI 自动生成</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-500 hover:to-purple-500 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            去 AI 生成
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-gray-600">
          AI 视频提示词生成器 · 模板库
        </div>
      </footer>
    </div>
  );
}
