/* ============================================================
   图片转换脚本 —— 把 public/images/ 下的原图转成 webp
   输出到 public/images/gallery/，并打印每张图的本地路径，
   方便你复制到 src/content/site.ts 的 src 字段。

   用法：
     node scripts/convert-images.cjs            # 转换全部
     node scripts/convert-images.cjs --dry     # 只打印计划，不真转
     node scripts/convert-images.cjs --clean    # 先清空输出目录再转

   想调参数就改下面 CONFIG，无需改其它代码。
   ============================================================ */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

/* ---------- 可调参数集中在这里 ---------- */
const CONFIG = {
  // 源图目录（放原图的地方）
  inputDir: path.resolve(__dirname, "..", "public", "images"),
  // 输出目录（webp 存这里，site.ts 引用的就是这里的文件）
  outputDir: path.resolve(__dirname, "..", "public", "images", "gallery", "quality_80"),
  // 长边最大像素，超过会等比缩小。null = 不缩放
  maxWidth: 2400,
  // webp 质量 0-100。72 已经很激进了，再低可能有色块
  quality: 80,
  // 是否开启无损模式（开启后 quality 失效，文件会大很多）
  lossless: false,
  // 输出 webp 的 effort（0-6，越大越慢但文件略小）
  effort: 6,
  // 是否保留 EXIF 等元数据（一般不需要）
  keepMetadata: false,
  // 支持的输入扩展名
  inputExts: [".png", ".jpg", ".jpeg", ".webp"],
  // 输出扩展名
  outputExt: ".webp",
  // site.ts 里引用的 URL 前缀（注意：相对站点根，以 / 开头）
  publicUrlPrefix: "/images/gallery/",
};

/* ---------- 工具函数 ---------- */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function clearDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(full, { recursive: true, force: true });
    } else {
      fs.rmSync(full, { force: true });
    }
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

/* ---------- 主流程 ---------- */
async function convertOne(file) {
  const inPath = path.join(CONFIG.inputDir, file);
  const outName = path.basename(file, path.extname(file)) + CONFIG.outputExt;
  const outPath = path.join(CONFIG.outputDir, outName);
  const publicUrl = CONFIG.publicUrlPrefix + encodeURIComponent(outName);

  const inSize = fs.statSync(inPath).size;

  let pipeline = sharp(inPath, { failOn: "truncated" });
  if (CONFIG.maxWidth) {
    pipeline = pipeline.resize({
      width: CONFIG.maxWidth,
      height: CONFIG.maxWidth,
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  if (CONFIG.keepMetadata) {
    pipeline = pipeline.keepMetadata();
  }
  // 不保留元数据时，sharp 默认就会丢弃 EXIF/ICC，无需额外调用
  pipeline = pipeline.webp({
    quality: CONFIG.quality,
    lossless: CONFIG.lossless,
    effort: CONFIG.effort,
  });

  await pipeline.toFile(outPath);
  const outSize = fs.statSync(outPath).size;
  return { outName, publicUrl, inSize, outSize };
}

async function main() {
  const argv = process.argv.slice(2);
  const dry = argv.includes("--dry");
  const clean = argv.includes("--clean");

  if (!fs.existsSync(CONFIG.inputDir)) {
    console.error(`✗ 输入目录不存在: ${CONFIG.inputDir}`);
    process.exit(1);
  }

  if (dry) {
    console.log("—— DRY RUN（不会真的写文件）——\n");
  } else {
    ensureDir(CONFIG.outputDir);
    if (clean) {
      console.log(`🧹 清空输出目录: ${CONFIG.outputDir}`);
      clearDir(CONFIG.outputDir);
    }
  }

  const files = fs
    .readdirSync(CONFIG.inputDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) =>
      CONFIG.inputExts.includes(path.extname(name).toLowerCase())
    )
    .sort();

  if (files.length === 0) {
    console.log("⚠ 输入目录里没有可转换的图片");
    return;
  }

  console.log(`找到 ${files.length} 张图片，开始转换…\n`);

  const results = [];
  let totalIn = 0;
  let totalOut = 0;

  for (const file of files) {
    try {
      if (dry) {
        const outName =
          path.basename(file, path.extname(file)) + CONFIG.outputExt;
        const publicUrl =
          CONFIG.publicUrlPrefix + encodeURIComponent(outName);
        console.log(`• ${file}  →  ${outName}`);
        console.log(`  URL: ${publicUrl}`);
        results.push({ publicUrl });
        continue;
      }
      const r = await convertOne(file);
      totalIn += r.inSize;
      totalOut += r.outSize;
      results.push(r);
      const ratio = ((1 - r.outSize / r.inSize) * 100).toFixed(1);
      console.log(
        `✓ ${file}\n  → ${r.outName}  ${formatBytes(r.inSize)} → ${formatBytes(
          r.outSize
        )}  (-${ratio}%)\n  URL: ${r.publicUrl}`
      );
    } catch (e) {
      console.error(`✗ 转换失败: ${file}\n  ${e.message}`);
    }
  }

  if (!dry && totalIn > 0) {
    console.log(
      `\n合计: ${formatBytes(totalIn)} → ${formatBytes(totalOut)}  (-${(
        (1 - totalOut / totalIn) *
        100
      ).toFixed(1)}%)`
    );
  }

  console.log("\n—— 可直接粘贴到 site.ts 的 src 字段 ——");
  for (const r of results) {
    console.log(`  "${r.publicUrl}",`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
