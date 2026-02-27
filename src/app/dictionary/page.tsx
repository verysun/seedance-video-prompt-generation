import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '运镜词典 - AI 视频提示词生成器',
  description: 'Seedance 2.0 运镜、景别、分镜写法完整参考',
};

export default function DictionaryPage() {
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
              <h1 className="text-white font-bold text-lg leading-tight">运镜词典</h1>
              <p className="text-xs text-gray-500">Seedance 2.0 完整参考</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              生成器
            </Link>
            <Link href="/templates" className="text-gray-400 hover:text-white transition-colors">
              模板库
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">运镜与分镜词典</h2>
          <p className="text-gray-400">Seedance 2.0 完整运镜、景别、分镜写法参考指南</p>
        </div>

        {/* Table of Contents */}
        <nav className="mb-10 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="text-sm font-medium text-gray-300 mb-3">目录</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              { href: '#basic-camera', label: '基础运镜（7种）' },
              { href: '#advanced-camera', label: '进阶运镜（6种）' },
              { href: '#pro-camera', label: '高级运镜（8种）' },
              { href: '#camera-formulas', label: '运镜组合公式' },
              { href: '#shot-types', label: '六级景别体系' },
              { href: '#storyboard', label: '五种分镜写法' },
              { href: '#rhythm', label: '节奏分配参考' },
              { href: '#rules', label: '五条铁律' },
            ].map(item => (
              <a key={item.href} href={item.href} className="text-violet-400 hover:text-violet-300 transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Basic Camera Movements */}
        <section id="basic-camera" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">1</span>
            基础运镜（7种核心镜头运动）
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">运镜</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">提示词写法</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">适用场景</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">情绪效果</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ['推镜头', '缓慢推镜 / 镜头推进至特写 / 快速推近', '聚焦细节、强调重点', '紧张、聚焦、逼近'],
                  ['拉镜头', '缓慢拉远 / 镜头后拉展示全景', '揭示环境、收尾定格', '宏大、疏离、释然'],
                  ['横摇', '镜头左移 / 右摇90度 / 快速横摇', '展现空间宽度、切换对象', '探索、跟随、紧迫'],
                  ['竖摇', '镜头上移 / 缓缓下推 / 上摇揭示', '展现高度、角色登场', '仰望、压迫、揭晓'],
                  ['环绕', '360度环绕 / 轻微环绕 / 半圈环绕', '立体展示主体', '审视、庄重、华丽'],
                  ['跟拍', '镜头跟随人物 / 稳定跟拍 / 侧面跟拍', '追踪人物动态', '沉浸、陪伴、追逐'],
                  ['固定', '固定镜头 / 中景固定机位', '对话、稳定叙事', '冷静、客观、纪实'],
                ].map(([name, prompt, scene, mood], i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-medium text-white">{name}</td>
                    <td className="py-3 px-3"><code className="text-violet-300 text-xs bg-violet-500/10 px-1.5 py-0.5 rounded">{prompt}</code></td>
                    <td className="py-3 px-3 text-gray-400">{scene}</td>
                    <td className="py-3 px-3 text-gray-400">{mood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-gray-400 space-y-1">
            <p>💡 <strong className="text-blue-300">推和拉</strong>是一组"情绪开关"：推=逼近/聚焦，拉=释放/揭示全貌</p>
            <p>💡 环绕建议控制幅度：15秒内写"<strong className="text-blue-300">缓慢环绕半圈</strong>"或"轻微环绕"更稳</p>
            <p>💡 跟拍分三种方向：正面（表情）、背后（背影暗示）、侧面（最有速度感）</p>
            <p>💡 固定镜头不是偷懒：对话、纪实、搞笑定格反应很适合</p>
          </div>
        </section>

        {/* Advanced Camera */}
        <section id="advanced-camera" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-sm">2</span>
            进阶运镜（6种组合镜头）
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">组合</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">写法</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">适用场景</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ['推拉结合', '先推近至特写，再拉远展示全景', '先聚焦后揭示，适合产品和悬念'],
                  ['跟拍+环绕', '镜头跟随人物行走并缓慢环绕', '沉浸式第三人称视角'],
                  ['升降+横摇', '镜头升高的同时缓缓右摇', '航拍感，宏大叙事开场'],
                  ['手持晃动', '手持摄影风格，轻微抖动', '纪实感、紧张躁动'],
                  ['主观视角', '第一人称视角 / POV镜头', '代入感极强'],
                  ['低角度仰拍', '低机位仰拍 / 低角度英雄感', '压迫感，角色气势'],
                ].map(([name, prompt, scene], i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-medium text-white">{name}</td>
                    <td className="py-3 px-3"><code className="text-green-300 text-xs bg-green-500/10 px-1.5 py-0.5 rounded">{prompt}</code></td>
                    <td className="py-3 px-3 text-gray-400">{scene}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pro Camera */}
        <section id="pro-camera" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm">3</span>
            高级运镜（专业电影术语）
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">术语</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">提示词写法</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">情绪效果</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ['希区柯克变焦', '希区柯克变焦 / Dolly Zoom', '恐惧、震惊、空间扭曲感'],
                  ['一镜到底', '一镜到底 / 全程不要切镜', '沉浸长镜头，连贯叙事'],
                  ['荷兰角', '荷兰角倾斜 / 画面倾斜构图', '不安、失衡、疯狂'],
                  ['鱼眼镜头', '鱼眼镜头效果 / 广角变形', '夸张趣味、MV感'],
                  ['匹配剪辑', '匹配剪辑转场 / 动作匹配切换', '无缝转场，时空跳跃'],
                  ['升格慢动作', '升格慢动作 / 慢镜头', '关键时刻的仪式感'],
                  ['穿越式推进', '镜头穿透窗户 / 穿过屏幕', '空间转换、跨次元'],
                  ['螺旋环绕', '高速螺旋环绕拍摄', '能量感、眩晕、华丽'],
                ].map(([name, prompt, mood], i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-medium text-white">{name}</td>
                    <td className="py-3 px-3"><code className="text-amber-300 text-xs bg-amber-500/10 px-1.5 py-0.5 rounded">{prompt}</code></td>
                    <td className="py-3 px-3 text-gray-400">{mood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Camera Formulas */}
        <section id="camera-formulas" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">4</span>
            运镜组合公式（按视频类型速查）
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">类型</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">运镜搭配</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">节奏要求</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ['🌿 治愈风景', '固定→缓推→缓拉→横摇', '慢速、丝滑、呼吸感'],
                  ['🎯 商品展示', '推近特写→环绕→拉远全景', '中速、精致、节奏均匀'],
                  ['⚔️ 动作打斗', '手持跟拍→快切→升格慢动作→拉远', '快慢交替、张弛有度'],
                  ['👻 悬疑恐怖', '固定→缓推→希区柯克变焦→荷兰角', '慢蓄快爆'],
                  ['🎬 广告大片', '低角度仰拍→升降→穿越推进→定格', '从克制到爆发'],
                  ['🎥 一镜到底', '跟拍→横摇→推镜→环绕（不切镜）', '持续流动'],
                  ['🎵 MV/卡点', '快切+固定交替、鱼眼+环绕', '随音乐节奏切换'],
                ].map(([type, combo, rhythm], i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-medium text-white">{type}</td>
                    <td className="py-3 px-3"><code className="text-purple-300 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">{combo}</code></td>
                    <td className="py-3 px-3 text-gray-400">{rhythm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Shot Types */}
        <section id="shot-types" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">5</span>
            六级景别体系
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">景别</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">代号</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">范围</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">适用场景</th>
                  <th className="text-left py-3 px-3 text-gray-400 font-medium">提示词写法</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ['极特写', 'ECU', '眼睛/嘴唇/手指', '情绪爆发、关键细节', '极特写 / 面部微表情特写'],
                  ['特写', 'CU', '面部/物品细节', '表情演绎、产品纹理', '特写镜头 / 面部特写'],
                  ['近景', 'MS', '胸部以上', '对话、情绪传递', '近景 / 上半身'],
                  ['中景', 'MLS', '膝部以上', '人物动作、日常场景', '中景 / 大半身'],
                  ['全景', 'WS', '人物全身+部分环境', '展示动作全貌', '全景 / 人物全身'],
                  ['远景/大远景', 'EWS', '以环境为主', '气势、孤独感、开场', '大远景 / 超广角建立镜头'],
                ].map(([name, code, range, scene, prompt], i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-medium text-white">{name}</td>
                    <td className="py-3 px-3 text-cyan-400 font-mono text-xs">{code}</td>
                    <td className="py-3 px-3 text-gray-400">{range}</td>
                    <td className="py-3 px-3 text-gray-400">{scene}</td>
                    <td className="py-3 px-3"><code className="text-cyan-300 text-xs bg-cyan-500/10 px-1.5 py-0.5 rounded">{prompt}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Storyboard Methods */}
        <section id="storyboard" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 text-sm">6</span>
            五种分镜写法范式
          </h3>
          <div className="grid gap-4">
            {[
              {
                name: '时间轴分镜法',
                badge: '最高精度',
                desc: '按秒数精确分配每个镜头的起止时间，适合广告、MV、有节奏要求的内容。',
                template: '0-3秒：[景别]，[场景/主体描述]，[运镜方式]，[关键动作]\n4-8秒：[景别]，[场景变化]，[运镜方式]，[关键动作]\n9-12秒：[景别]，[高潮内容]，[运镜方式]，[关键动作]\n13-15秒：[景别]，[收尾画面]，[运镜方式]，[收束方式]',
                tips: '3-4段即可，不需要每一秒都写；收尾留2-3秒给"定格"',
              },
              {
                name: '镜头编号法',
                badge: '专业影视',
                desc: '用镜头1/2/3标注每个独立镜头，适合有剧情线索的短剧、故事片。',
                template: '镜头1：[景别]+[运镜]。[画面内容]。[动作/对白]。\n镜头2：[景别]+[运镜]。[画面内容]。[动作/对白]。\n镜头3：[景别]+[运镜]。[画面内容]。[动作/对白]。',
                tips: '每个镜头只做一件事；3-5个镜头是15秒最佳数量',
              },
              {
                name: '画面块描述法',
                badge: '最直觉',
                desc: '用画面1/2/3描述每段画面，不标秒数，让模型自行分配。适合风景、氛围类视频。',
                template: '画面1：[开场氛围描述] [运镜]\n画面2：[展开描述] [运镜]\n画面3：[收尾描述] [运镜]',
                tips: '画面块之间要有"场景递进"，不是三个孤立画面的罗列',
              },
              {
                name: '幕式结构法',
                badge: '叙事张力最强',
                desc: '用第一幕/第二幕/第三幕构建故事弧线，适合有反转、有戏剧冲突的内容。',
                template: '第一幕（0-5秒）：建立场景，制造期待\n第二幕（6-10秒）：矛盾或变化出现\n第三幕（11-15秒）：结果揭晓或反转',
                tips: '第一幕和第三幕之间要有明显的"情绪落差"',
              },
              {
                name: '动作序列法',
                badge: '动态内容',
                desc: '按动作因果链条组织，A导致B，B触发C。适合动作场面、舞蹈、体育。',
                template: '[起始动作] → [因果触发的下一动作] → [速度变化/升格慢动作] → [结束定格]',
                tips: '动作链条要有"因果"而非"罗列"；插入一个速度变化更好',
              },
            ].map((method, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-white font-medium">{method.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">{method.badge}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{method.desc}</p>
                <pre className="text-xs text-pink-200/80 bg-black/30 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">{method.template}</pre>
                <p className="text-xs text-gray-500 mt-2">💡 {method.tips}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rhythm */}
        <section id="rhythm" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm">7</span>
            15秒节奏分配参考
          </h3>
          <div className="grid gap-3">
            {[
              { label: '慢节奏（治愈/风景）', value: '5秒铺垫 + 5秒主体 + 5秒收尾', color: 'green' },
              { label: '中节奏（广告/叙事）', value: '3秒建立 + 7秒核心 + 5秒收束', color: 'blue' },
              { label: '快节奏（动作/MV）', value: '2秒起势 + 10秒密集内容 + 3秒定格', color: 'red' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-sm font-medium text-white whitespace-nowrap">{item.label}</span>
                <div className="flex-1 flex gap-1">
                  {item.value.split(' + ').map((part, j) => {
                    const seconds = parseInt(part);
                    return (
                      <div
                        key={j}
                        className={`h-8 rounded flex items-center justify-center text-xs text-white/80 ${
                          j === 0 ? 'bg-violet-500/30' : j === 1 ? 'bg-violet-500/50' : 'bg-violet-500/20'
                        }`}
                        style={{ flex: seconds }}
                      >
                        {part}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Five Rules */}
        <section id="rules" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 text-sm">8</span>
            五条铁律
          </h3>
          <div className="grid gap-3">
            {[
              { title: '动作写慢，写连续', desc: '不写"跳舞""走路"等大词，要写"缓慢转身、轻轻抬手、脚步轻移"' },
              { title: '运镜写稳，写简单', desc: '一条视频最多2个运镜组合，贪多必乱' },
              { title: '必加稳定约束词', desc: '结尾加"画面流畅稳定，无抖动无闪烁"，不加则稳定性全靠运气' },
              { title: '必加角色约束词', desc: '人物视频加"面部稳定不变形，五官清晰，人体结构正常，服装一致"' },
              { title: '模糊词换精确词', desc: '"好看"→"治愈清新，暖光光影"；"很酷"→"赛博朋克，暗调高级，霓虹反光"' },
            ].map((rule, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                <span className="text-red-400 font-bold text-sm mt-0.5">{i + 1}</span>
                <div>
                  <h4 className="text-white font-medium text-sm">{rule.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to generator */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-500 hover:to-purple-500 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            去生成提示词
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-gray-600">
          AI 视频提示词生成器 · 运镜词典
        </div>
      </footer>
    </div>
  );
}
