/* ============================================================
   Minceraft 巧克力服 — 网站内容集中配置
   ------------------------------------------------------------
   想改文字 / 换图片 / 加内容，基本都在这一个文件里完成。
   每一段上面都有注释说明，按需修改即可，无需改动组件代码。

   换图片：把下面出现的图片网址（https://... 开头）换成你自己的即可。
   想加图片：往 gallery 数组里追加一条 { src, alt, caption, size } 就行。
   ============================================================ */

/* ---------- 服务器基本信息 ---------- */
export const server = {
  name: "Chocolate Server", // 标题英文主名
  subtitle: "Chocolate Server", // 标题中文副名
  tagline: "和谐友爱 · 公益服 · 原版生存 · 长期开放",
  foundedYear: 2021, // 建服年份 —— 用于自动计算“第 N 年”，改这里即可
  address: "mc.zgwl.eu.org", // 服务器地址
  qqGroup: "779889427", // QQ 群号
  docsUrl: "https://doc.mc.zgwl.eu.org/", // 服务器文档站
  // 实时状态图片（在线人数 / 状态）
  statusImg:
    "https://motd.puddingkc.com/status.png?ip=mc.zgwl.eu.org&style=style1&language=zh",
};

/* ---------- 自动计算年份 / 卷号（无需每年手动改） ----------
   foundedYear = 2021 时：
   2024 → 第 4 年 / Vol. IV   2025 → 第 5 年 / Vol. V   ……  自动递增
*/
export const now = {
  year: new Date().getFullYear(), // 当前年份（页脚 © 用）
  age: new Date().getFullYear() - server.foundedYear, // 开服第几年
};

// 阿拉伯数字转罗马数字，用于 “Vol. IV” 之类的标识
function toRoman(num: number): string {
  if (num <= 0) return "";
  const map: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let n = num;
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}
export const volume = toRoman(now.age); // 罗马数字卷号

/* ---------- 顶部跑马灯（滚动横幅）文字，可随意增减 ---------- */
export const ticker: string[] = [
  "生电全套协议",
  "AllMusic 点歌",
  "TACZ 子服",
  "YSM 玩家模型",
  "假人系统",
  "DOM",
  "永不删档",
  "Leaves 核心",
  "Creeper防爆",
  "WARP",
  "Carpet 协议",
  "东方众",
  "原版特性",
  "鞘翅航天",
  "ATD系统",
  "CoreProtect防护",
];

/* ---------- Hero（首屏）---------- */
export const hero = {
  headlineTop: "Minceraft",
  headlineBottom: "巧克力服",
  sub: "一座始于 2021 年的原版生存小服——长期开放，永不删档，只为守护每一份热爱。",
  addressHint: "原版客户端直连 · 可选MOD",
  image: {
    src: "https://files.seeusercontent.com/2026/07/18/ff7A/PixPin_2026-07-19_02-05-21.png",
    alt: "Minceraft 巧克力服服务器建设实拍",
    caption: "图 01 — Tokyo Tower · 2026.7",
  },
};

/* ---------- 01 · 如何加入 ---------- */
export const join = {
  intro:
    "复制下方地址，启动原版客户端即可直连，也可安装本服务器的官方整合包。进群还能找到一起玩的小伙伴。",
  rows: [
    { label: "服务器地址", value: server.address },
    { label: "QQ 群", value: server.qqGroup },
    { label: "玩法", value: " Survival in the Original Version" },
  ],
};

/* ---------- 02 · 小故事 ---------- */
export const story = {
  headingTop: "把这份快乐，",
  headingBottom: "分享给更多人。",
  quote:
    "如果你想来找几个人联机，或者带上好友一起来玩，那开服的意义也就得到了认可。",
  paragraphs: [
    "2021 年建立的生存小服。最初只是为了和朋友们联机，可大家玩得也少，一直开着没人有点可惜——于是我选择把它开放出来，和更多玩家分享这份快乐。",
    "服务器永久保留玩家建筑，从不更换周目。采用 Leaves 核心，完整保留原版特性，支持刷沙机、TNT 复制机等生电装置，并对生电模组提供特别优化。",
    "内置音乐播放系统，支持网易云平台点歌；各种生电装置照常运转，原版特性一个不少。",
    "无论你是生电玩家、建筑爱好者，还是只想找个地方休闲的人，这里都欢迎你。长期开放，只为守护每一份热爱。",
  ],
};

/* ---------- 03 · 特色支持（编号会自动 01 02 03…） ---------- */
export const features: { title: string; desc: string }[] = [
  {
    title: "生电全套协议",
    desc: "完整支持刷沙机、TNT 复制机等技术装置，并对生电模组提供特别优化。",
  },
  {
    title: "AllMusic 点歌",
    desc: "内置音乐播放系统，支持网易云平台，随时在游戏里点上一首歌。",
  },
  { title: "假人系统", desc: "方便测试与挂机，是生电玩家的得力助手。" },
  { title: "永不删档", desc: "永久保留每一位玩家的建筑，从不更换周目。" },
];

/* ---------- 04 · 扩展玩法（子服与模组，想加新玩法就追加一条） ----------
   每条：title 标题 / desc 介绍 / steps 步骤（可留空 []）/ link 链接（可选）
*/
export const extras: {
  title: string;
  desc: string;
  steps: string[];
  link?: { label: string; href: string };
}[] = [
  {
    title: "TACZ 枪械子服",
    desc: "主服之外还设有 TACZ 子服。前往服务器文档下载官方整合包，安装后即可进入子服正常游玩。",
    steps: ["前往服务器文档站", "下载官方整合包", "启动进入子服"],
    link: { label: "前往文档下载", href: server.docsUrl },
  },
  {
    title: "YSM 玩家模型",
    desc: "服务器兼容 YSM（Yes Steve Model）玩家模型。安装 YSM 模组，即可使用服务器上的玩家模型正常游玩。",
    steps: ["安装 YSM 模组或下载官方整合包", "进入服务器", "使用玩家模型"],
    link: { label: "前往文档下载", href: server.docsUrl },
  },
];

/* ---------- 05 · 建设记录（画廊）
   size 可选：wide / narrow / half / third / full（见下方对照表）
*/
export const GALLERY_SIZES: Record<string, string> = {
  wide: "aspect-[16/10] md:col-span-7", // 大图（占 7 格）
  narrow: "aspect-[16/10] md:col-span-5", // 小图（占 5 格，配 wide 用）
  half: "aspect-[4/3] md:col-span-6", // 半幅
  third: "aspect-[3/4] md:col-span-4", // 竖图（占 4 格）
  full: "aspect-[16/9] md:col-span-12", // 通栏大图
};

export const gallery: {
  src: string;
  alt: string;
  caption: string;
  size: keyof typeof GALLERY_SIZES;
}[] = [
  {
    src: "https://files.seeusercontent.com/2026/07/18/7ypP/QQ20260719012525.png",
    alt: "可爱",
    caption: "图 01 — 真是可爱呢 · 2026.06",
    size: "wide",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/qeU0/QQ20260719013126.png",
    alt: "Sakura街道",
    caption: "图 02 — Sakura街道 · 2026.06",
    size: "narrow",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/ta7I/PixPin_2026-07-19_02-46-57.png",
    alt: "w",
    caption: "图 03 — w · 2026.07",
    size: "third",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/4vsT/QQ20260719012414.png",
    alt: "新春合影",
    caption: "图 04 — 新春合影 · 2026.02",
    size: "half",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/U3br/c073e7809bd5b8b3334d171a8e34ce4f.png",
    alt: "Garden",
    caption: "图 05 — Garden · 2026.04",
    size: "half",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/Xqb4/PixPin_2026-07-19_01-37-18.png",
    alt: "noel",
    caption: "图 06 — noel · 2026.07",
    size: "narrow",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/fCr4/QQ20260719012257.png",
    alt: "BAKA",
    caption: "图 07 — Baka · 2026.01",
    size: "narrow",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/7ezZ/PixPin_2026-07-19_02-33-44.png",
    alt: "铜像",
    caption: "图 08 — 铜像 · 2026.01",
    size: "narrow",
  },
    {
    src: "https://files.seeusercontent.com/2026/07/18/9bIl/QQ20260719025343.jpg",
    alt: "Campanile",
    caption: "图 09 — Campanile · 2025.05",
    size: "narrow",
  },
    {
    src: "https://files.seeusercontent.com/2026/07/18/2Idf/QQ20260719025441.png",
    alt: "特莉丝",
    caption: "图 10 — 特莉丝 · 2026.03",
    size: "half",
  },
    {
    src: "https://files.seeusercontent.com/2026/07/18/dOi4/QQ20260719025420.png",
    alt: "Space station",
    caption: "图 11 — Space station · 2024.02",
    size: "narrow",
  },
    {
    src: "https://files.seeusercontent.com/2026/07/18/sIl1/QQ20260719025334.png",
    alt: "Dragon",
    caption: "图 12 — Dragon · 2025.10",
    size: "narrow",
  },
  {
    src: "https://s2.loli.net/2025/02/01/Zzigq3vJKVBOYea.png",
    alt: "玩家聚落与建筑群",
    caption: "图 13 — 建筑群 · 2025.02",
    size: "wide",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/h2zP/QQ20260719013112.png",
    alt: "house",
    caption: "图 14 — house · 2025.02",
    size: "half",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/o4Un/pasted-image-1784399602573.webp",
    alt: "shrine",
    caption: "图 15 — shrine · 2025.07",
    size: "narrow",
  },
  {
    src: "https://files.seeusercontent.com/2026/07/18/iY6c/PixPin_2026-07-19_01-36-56.png",
    alt: "玩家聚落与建筑群",
    caption: "图 16 — 建筑群 · 2026.07",
    size: "full",
  },
];

/* ---------- 06 · 技术栈（支持列表，想加就追加一条） ---------- */
export const specs: { name: string; note: string }[] = [
  { name: "Carpet 协议", note: "生电辅助与控制" },
  { name: "Slimefun", note: "粘液科技扩展" },
  { name: "Bladeren", note: "客户端兼容协议" },
  { name: "Xaero 地图", note: "小地图与导航" },
  { name: "CoreProtect", note: "快速、高效的数据记录及反破坏工具" },
  { name: "轻松放置", note: "便捷建造辅助" },
  { name: "鞘翅航天", note: "飞行优化体验" },
  { name: "AppleSkin", note: "饱和度信息显示" },
  { name: "Tweakeroo", note: "灵活操作增强" },
  { name: "TACZ", note: "枪械子服模组" },
  { name: "YSM 模型", note: "玩家模型支持" },
  { name: "Jade", note: "玉🔍mod服务端兼容" },
  { name: "GLMpages", note: "就算是GLM的但改的我手都抽筋了呜呜" },
];
