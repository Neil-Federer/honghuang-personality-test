
/**
 * 洪荒人格测试 — 20道场景题
 *
 * 每道题关联一个维度（dimension），4个选项各有分值。
 * score > 0 偏向 poleA，score < 0 偏向 poleB。
 * 每个维度 5 道题，共 20 道。
 *
 * ⚠️ 数据契约：Sprint 1 冻结后禁止修改
 */

export interface QuestionOption {
  text: string;
  score: number; // -2 | -1 | 1 | 2
}

export interface Question {
  id: number;
  dimension: string; // 关联维度 id
  stem: string;      // 题干
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  // ===== 魂魄之辩 (hun_po): H=游魂(正) / P=定魄(负) =====
  {
    id: 1,
    dimension: 'hun_po',
    stem: '女娲举办了一场补天庆功宴，邀请了三界所有神仙。你的反应是——',
    options: [
      { text: '太好了！抢前排VIP，顺便认识几个新朋友', score: 2 },
      { text: '去是要去的，找几个熟人聊聊就好', score: 1 },
      { text: '去转一圈意思意思，打包两块灵石就溜', score: -1 },
      { text: '发个竹简说身体不适，在家修炼不香吗', score: -2 },
    ],
  },
  {
    id: 2,
    dimension: 'hun_po',
    stem: '你被分配到天庭新组建的除妖小队。队里还有四个不认识的神仙——',
    options: [
      { text: '主动自我介绍，聊完生辰八字再聊法术特长', score: 2 },
      { text: '等别人先开口，再慢慢加入话题', score: -1 },
      { text: '默默观察队友实力，心里给每个人排了个名', score: -2 },
      { text: '先打一架试试水，打完自然就熟了', score: 1 },
    ],
  },
  {
    id: 3,
    dimension: 'hun_po',
    stem: '修炼到瓶颈了，你选择——',
    options: [
      { text: '去找太上老君喝茶讨教，顺便蹭颗仙丹', score: 2 },
      { text: '约三两好友一起切磋，互相开导', score: 1 },
      { text: '独自闭关，不突破不开门', score: -2 },
      { text: '一个人去深山老林散散心再说', score: -1 },
    ],
  },
  {
    id: 4,
    dimension: 'hun_po',
    stem: '昆仑山新开了一个修仙论坛。你——',
    options: [
      { text: '天天发帖水帖回帖，论坛活跃度第一', score: 2 },
      { text: '偶尔发个精华帖分享心得', score: 1 },
      { text: '潜水看看别人的帖子就好了', score: -1 },
      { text: '论坛是什么？打扰我修炼了', score: -2 },
    ],
  },
  {
    id: 5,
    dimension: 'hun_po',
    stem: '你修炼有成，准备开山收徒。你的理想门派规模是——',
    options: [
      { text: '越大越好！三千弟子热热闹闹的', score: 2 },
      { text: '十几个就行，大家都认识，氛围好', score: 1 },
      { text: '收个三五个得意弟子足矣', score: -1 },
      { text: '不收徒。一个人修炼不好吗', score: -2 },
    ],
  },

  // ===== 灵智之分 (ling_zhi): L=通灵(正) / Z=执智(负) =====
  {
    id: 6,
    dimension: 'ling_zhi',
    stem: '你在弱水三千旁发现一块奇怪的石头，表面隐约有纹路。你的第一反应——',
    options: [
      { text: '这纹路像是上古神文，说不定藏着天地大秘密！', score: 2 },
      { text: '可能是什么灵兽留下的痕迹，蛮有趣的', score: 1 },
      { text: '先敲敲看是什么材质，硬度几何', score: -1 },
      { text: '就是块石头，风化出来的自然纹路罢了', score: -2 },
    ],
  },
  {
    id: 7,
    dimension: 'ling_zhi',
    stem: '太上老君让你从三本秘籍中选一本修炼——',
    options: [
      { text: '《混沌心经》——据说修成可窥探天道玄机', score: 2 },
      { text: '《万象灵图》——包罗万象，激发灵感', score: 1 },
      { text: '《玄铁真诀》——实用至上，招招致命', score: -1 },
      { text: '《筑基百问》——基础扎实最重要', score: -2 },
    ],
  },
  {
    id: 8,
    dimension: 'ling_zhi',
    stem: '巫族和妖族大战的真正原因众说纷纭。你觉得——',
    options: [
      { text: '背后一定有更深层的天道因果，表面原因不重要', score: 2 },
      { text: '几种说法综合起来看，才能接近真相', score: 1 },
      { text: '谁先动手打的第一拳，谁就是主要责任方', score: -1 },
      { text: '别分析了，赢的就是对的，历史是胜者写的', score: -2 },
    ],
  },
  {
    id: 9,
    dimension: 'ling_zhi',
    stem: '你做了一个梦，梦见自己变成了一只蝴蝶飞过须弥山。醒来后——',
    options: [
      { text: '庄周梦蝶！这梦一定有预示意义，得好好解读', score: 2 },
      { text: '有意思的梦境体验，记下来以后慢慢回味', score: 1 },
      { text: '白天吃多了仙桃导致的，该少吃点了', score: -1 },
      { text: '梦就是梦，赶紧起来修炼', score: -2 },
    ],
  },
  {
    id: 10,
    dimension: 'ling_zhi',
    stem: '师父让你给新来的小徒弟讲解天地运行之道——',
    options: [
      { text: '从盘古开天讲起，引申到万物存在的哲学意义', score: 2 },
      { text: '用类比的方式讲，比如"天道就像大河流水..."', score: 1 },
      { text: '直接画图表列数据：日月运行周期、五行相克规律', score: -1 },
      { text: '别讲了，带他出去实地修炼，干中学', score: -2 },
    ],
  },

  // ===== 情理之争 (qing_li): Q=殉情(正) / I=循理(负) =====
  {
    id: 11,
    dimension: 'qing_li',
    stem: '你的好友在天庭考核中作弊被发现，面临贬下凡间。他来求你帮忙——',
    options: [
      { text: '兄弟有难两肋插刀，豁出去帮他求情', score: 2 },
      { text: '虽然心疼，但先安慰他，尽力周旋', score: 1 },
      { text: '规矩就是规矩，但可以帮他减轻处罚', score: -1 },
      { text: '他作弊在先，接受惩罚天经地义', score: -2 },
    ],
  },
  {
    id: 12,
    dimension: 'qing_li',
    stem: '你在渡劫时，雷劫突然变强十倍。你心里想的是——',
    options: [
      { text: '想起师父的教导和朋友的期望，不能辜负他们！', score: 2 },
      { text: '想起修炼路上的种种磨难，靠信念撑下去', score: 1 },
      { text: '冷静分析雷劫模式，找到薄弱点逐个击破', score: -1 },
      { text: '情绪没用，纯靠技术硬扛，控制法力输出', score: -2 },
    ],
  },
  {
    id: 13,
    dimension: 'qing_li',
    stem: '你的坐骑受了重伤，神医说救回来要消耗你五百年修为——',
    options: [
      { text: '五百年就五百年！它跟了我这么久！', score: 2 },
      { text: '心痛得不行，但还是会救它的', score: 1 },
      { text: '值不值得要算一下，毕竟五百年修为不是小数', score: -1 },
      { text: '再找一只坐骑更合理，情感不能影响判断', score: -2 },
    ],
  },
  {
    id: 14,
    dimension: 'qing_li',
    stem: '两个朋友吵架了，各执一词来找你评理——',
    options: [
      { text: '先安抚两边情绪，让大家都消消气再说', score: 2 },
      { text: '听完双方说辞，站心里偏向的那一边', score: 1 },
      { text: '就事论事分析对错，谁有理帮谁', score: -1 },
      { text: '列出事实证据，逻辑推导出谁的责任更大', score: -2 },
    ],
  },
  {
    id: 15,
    dimension: 'qing_li',
    stem: '女娲造人时多捏了一坨泥，可以造一个完美的伴侣给你。你的要求——',
    options: [
      { text: '灵魂契合最重要，要能跟我共鸣的', score: 2 },
      { text: '性格互补就行，吵吵闹闹才有意思', score: 1 },
      { text: '三观一致、条件匹配最要紧', score: -1 },
      { text: '实力强+头脑清醒，感情什么的不太需要', score: -2 },
    ],
  },

  // ===== 动静之择 (dong_jing): D=躁动(正) / J=守静(负) =====
  {
    id: 16,
    dimension: 'dong_jing',
    stem: '你在昆仑山顶捡到一颗来路不明的仙丹。你会——',
    options: [
      { text: '直接吞了！机会转瞬即逝，犹豫就会败北', score: 2 },
      { text: '先闻一闻尝一小口，试试效果', score: 1 },
      { text: '带回去查阅典籍确认成分再决定', score: -1 },
      { text: '不动它，先蹲守三天看看有没有人来找', score: -2 },
    ],
  },
  {
    id: 17,
    dimension: 'dong_jing',
    stem: '天帝发布了一个讨伐远古妖兽的悬赏令——',
    options: [
      { text: '第一个报名！谁抢了我跟谁急', score: 2 },
      { text: '叫上几个兄弟一起去，人多力量大', score: 1 },
      { text: '先打听清楚妖兽实力，制定详细作战计划', score: -1 },
      { text: '等别人先去探探路，我负责收集情报', score: -2 },
    ],
  },
  {
    id: 18,
    dimension: 'dong_jing',
    stem: '你发明了一种新的修炼功法，但还没完全验证——',
    options: [
      { text: '直接用自己做实验！不试怎么知道行不行', score: 2 },
      { text: '找个不太重要的场景先小范围试试', score: 1 },
      { text: '先在脑内推演三百遍，确认理论无误再试', score: -1 },
      { text: '写成论文送给师门长辈评审，通过了再练', score: -2 },
    ],
  },
  {
    id: 19,
    dimension: 'dong_jing',
    stem: '你和一群仙友计划去探索一片未知的混沌虚空——',
    options: [
      { text: '出发！边走边看，遇到问题现场解决', score: 2 },
      { text: '简单商量一下方向就走，不用规划太细', score: 1 },
      { text: '画地图、备物资、定暗号，准备工作做足', score: -1 },
      { text: '先派探子去侦查一个月，回来汇报再出发', score: -2 },
    ],
  },
  {
    id: 20,
    dimension: 'dong_jing',
    stem: '你积攒了一大笔灵石，有个投资仙界商铺的机会——',
    options: [
      { text: '好机会不等人，全部押上！', score: 2 },
      { text: '投一半试试水，赚了再追加', score: 1 },
      { text: '先调查三个月市场行情，再做决定', score: -1 },
      { text: '灵石放在储物袋里最安全，不投', score: -2 },
    ],
  },
];
