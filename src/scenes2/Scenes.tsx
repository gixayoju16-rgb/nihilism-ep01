import React from 'react';
import { AbsoluteFill, Audio, useCurrentFrame, useVideoConfig, staticFile } from 'remotion';
import { NH, FB, FR, ip, Starfield, Dust, Haze, Vign, Grain, Scanline, Line, Title, Cap } from './Kit';
import { Bedroom, Void, EmptyThrone, Duality, BlankPage, Sisyphus, Stairs, Skyline, GridFloor, Push, Sweep } from './Props';

type S = { at: number; dur: number; audio: string };

// 通用外壳：包含音频 + 环境层 + 转场淡入淡出
const Shell: React.FC<{ seg: S; children: React.ReactNode; noStars?: boolean }> = ({ seg, children, noStars }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const fade = Math.min(ip(f, 0, 14, 0, 1), ip(f, D - 16, D, 1, 0));
  return (
    <AbsoluteFill style={{ backgroundColor: NH.bg0 }}>
      <Audio src={staticFile(seg.audio)} />
      <AbsoluteFill style={{ opacity: fade }}>
        {!noStars && <Starfield n={190} speed={0.4} blink />}
        {children}
        <Vign s={1.0} />
        <Grain o={0.13} />
        <Scanline o={0.06} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ---------------- NH01 凌晨三点 ---------------- */
export const S1: React.FC<{ seg: S }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  // 镜头缓慢推近窗户
  const zoom = ip(f, 0, D, 1, 1.12);
  return (
    <Shell seg={seg}>
      <AbsoluteFill style={{ transform: 'scale(' + zoom + ')' }}>
        <Bedroom t={1} />
      </AbsoluteFill>
      <Haze tint="rgba(60,70,140,0.8)" y={0.62} op={0.22} />
      <Title text="凌晨三点，你醒了。" at={26} out={78} size={64} y={0.15} />
      <Line text="房间很静，静得能听见自己。" at={82} out={146} size={40} y={0.32} color={NH.dim} />
      <Line text="手机屏幕亮了一下，又暗下去。" at={150} out={212} size={40} y={0.50} color={NH.dim} />
      <Line text="然后那个问题浮上来 ——" at={216} out={248} size={42} y={0.67} color={NH.violetLt} />
      <Title text="这一切，到底是为了什么？" at={252} size={58} y={0.85} color={NH.ink} />
      <Cap text="01 · 虚无主义" />
    </Shell>
  );
};

/* ---------------- NH02 宇宙没有答案 ---------------- */
export const S2: React.FC<{ seg: S }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const zoom = ip(f, 0, D, 1.06, 1.0);
  return (
    <Shell seg={seg}>
      <AbsoluteFill style={{ transform: 'scale(' + zoom + ')' }}>
        <GridFloor hue={265} speed={0.45} />
        <Void />
      </AbsoluteFill>
      <Haze tint="rgba(63,208,216,0.7)" y={0.5} op={0.2} />
      <Title text="宇宙从未打算给你一个答案。" at={24} out={78} size={60} y={0.15} />
      <Line text="它只是运转。" at={82} out={108} size={42} y={0.29} color={NH.dim} />
      <Line text="恒星烧完就塌，行星转完就散。" at={112} out={168} size={42} y={0.43} color={NH.dim} />
      <Line text="没有剧本，没有观众，也没有评委。" at={172} out={228} size={42} y={0.57} color={NH.dim} />
      <Line text="所以「意义」这个东西，" at={232} out={282} size={44} y={0.71} color={NH.cyan} />
      <Title text="从来不是宇宙发的。" at={286} size={54} y={0.85} color={NH.ink} />
      <Dust n={140} sp={0.6} op={0.9} />
    </Shell>
  );
};

/* ---------------- NH03 上帝死了 ---------------- */
export const S3: React.FC<{ seg: S }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const zoom = ip(f, 0, D, 1.0, 1.1);
  const shake = Math.sin(f * 0.7) * ip(f, 150, 190, 0, 1.6);
  return (
    <Shell seg={seg}>
      <AbsoluteFill style={{ transform: 'scale(' + zoom + ') translateX(' + shake + 'px)' }}>
        <EmptyThrone />
      </AbsoluteFill>
      <Haze tint="rgba(217,58,43,0.75)" y={0.72} op={0.24} />
      <Title text="尼采说：上帝死了。" at={20} out={88} size={66} y={0.15} />
      <Line text="他不是在庆幸，也不是在诅咒。" at={92} out={124} size={40} y={0.29} color={NH.dim} />
      <Line text="他是在说 —— 那把悬在人头顶的尺子，" at={128} out={176} size={40} y={0.43} color={NH.dim} />
      <Line text="断了。" at={180} out={210} size={48} y={0.57} color={NH.blood} />
      <Line text="于是人第一次，站在了没有底的空地上。" at={214} out={300} size={42} y={0.71} color={NH.ink} />
      <Line text="自由，从这一刻开始变得可怕。" at={304} size={42} y={0.85} color={NH.amber} />
      <Dust n={120} sp={0.8} op={0.85} />
      <Sweep at={22} dur={56} hue={10} />
    </Shell>
  );
};

/* ---------------- NH04 两个声音 ---------------- */
export const S4: React.FC<{ seg: S }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const zoom = ip(f, 0, D, 1.0, 1.08);
  const sway = Math.sin(f * 0.035) * 8;
  return (
    <Shell seg={seg}>
      <AbsoluteFill style={{ transform: 'scale(' + zoom + ') translateX(' + sway + 'px)' }}>
        <Duality />
      </AbsoluteFill>
      <Title text="你听见两个声音。" at={18} out={72} size={62} y={0.15} />
      <Line text="左边那个说：我想要，我偏要，我认。" at={76} out={142} size={40} y={0.29} color={NH.violetLt} />
      <Line text="右边那个说：随便吧，都一样，无所谓。" at={146} out={210} size={40} y={0.43} color={NH.blood} />
      <Line text="两个声音都不算错。" at={214} out={248} size={42} y={0.57} color={NH.dim} />
      <Line text="但只有一个，能带你走出这片空地。" at={252} out={314} size={44} y={0.71} color={NH.ink} />
      <Title text="它们之间，只差一步。" at={318} size={52} y={0.85} color={NH.cyan} />
      <Dust n={100} sp={0.5} op={0.7} />
    </Shell>
  );
};

/* ---------------- NH05 陷阱 ---------------- */
export const S5: React.FC<{ seg: S }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const zoom = ip(f, 0, D, 1.04, 1.0);
  return (
    <Shell seg={seg}>
      <AbsoluteFill style={{ transform: 'scale(' + zoom + ')' }}>
        <BlankPage />
      </AbsoluteFill>
      <Haze tint="rgba(232,163,61,0.6)" y={0.55} op={0.16} />
      <Title text="可这里有个陷阱。" at={16} out={70} size={62} y={0.15} color={NH.amber} />
      <Line text="很多人以为，虚无主义就是「什么都不用做」。" at={74} out={132} size={38} y={0.29} color={NH.dim} />
      <Line text="不是的。" at={136} out={160} size={46} y={0.43} color={NH.ink} />
      <Line text="它真正的意思是 —— 没有人有义务" at={164} out={208} size={40} y={0.57} color={NH.dim} />
      <Title text="告诉你意义是什么。" at={212} out={282} size={54} y={0.71} color={NH.ink} />
      <Line text="这件事，只能你自己来。" at={286} size={44} y={0.85} color={NH.violetLt} />
      <Sweep at={18} dur={50} hue={38} />
    </Shell>
  );
};

/* ---------------- NH06 加缪与巨石 ---------------- */
export const S6: React.FC<{ seg: S }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const prog = ip(f, 10, D - 10, 0.05, 0.95);
  const zoom = ip(f, 0, D, 1.0, 1.09);
  return (
    <Shell seg={seg}>
      <AbsoluteFill style={{ transform: 'scale(' + zoom + ')' }}>
        <Sisyphus prog={prog} />
      </AbsoluteFill>
      <Haze tint="rgba(169,140,240,0.7)" y={0.42} op={0.2} />
      <Title text="加缪给出了一个很笨的答案。" at={16} out={80} size={56} y={0.15} />
      <Line text="想象西西弗斯：石头推到山顶，滚下来，" at={84} out={142} size={38} y={0.27} color={NH.dim} />
      <Line text="他走下去，再推一次。永远。" at={146} out={202} size={38} y={0.38} color={NH.dim} />
      <Line text="众神以为，这是最重的惩罚。" at={206} out={254} size={40} y={0.50} color={NH.dim} />
      <Title text="但加缪说：要想象西西弗斯是幸福的。" at={258} out={344} size={50} y={0.62} color={NH.violetLt} />
      <Line text="因为在推的那一刻，他属于他自己。" at={348} out={388} size={42} y={0.73} color={NH.ink} />
      <Line text="他看清了荒诞，然后拒绝低头。" at={392} size={42} y={0.85} color={NH.amber} />
      <Dust n={110} sp={0.7} op={0.8} />
    </Shell>
  );
};

/* ---------------- NH07 没有意义≠没得活 ---------------- */
export const S7: React.FC<{ seg: S }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const zoom = ip(f, 0, D, 1.0, 1.1);
  return (
    <Shell seg={seg}>
      <AbsoluteFill style={{ transform: 'scale(' + zoom + ')' }}>
        <Stairs />
      </AbsoluteFill>
      <Haze tint="rgba(63,208,216,0.6)" y={0.38} op={0.18} />
      <Title text="所以，没有意义，并不等于没得活。" at={14} out={78} size={52} y={0.15} />
      <Line text="它只是把说明书拿走了。" at={82} out={122} size={44} y={0.27} color={NH.cyan} />
      <Line text="你可以写自己的那一页。" at={126} out={172} size={44} y={0.38} color={NH.dim} />
      <Line text="你做的事、你爱的人、你熬过的夜 ——" at={176} out={228} size={40} y={0.50} color={NH.dim} />
      <Line text="都不是宇宙规定的，" at={232} out={270} size={44} y={0.62} color={NH.ink} />
      <Title text="是你选的。" at={274} out={302} size={56} y={0.73} color={NH.violetLt} />
      <Line text="而「选」这件事本身，就是意义。" at={306} size={42} y={0.85} color={NH.amber} />
      <Sweep at={20} dur={54} hue={186} />
    </Shell>
  );
};

/* ---------------- NH08 系列收尾 ---------------- */
export const S8: React.FC<{ seg: S }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const zoom = ip(f, 0, D, 1.0, 1.13);
  return (
    <Shell seg={seg}>
      <AbsoluteFill style={{ transform: 'scale(' + zoom + ')' }}>
        <Skyline />
        <GridFloor hue={270} speed={0.35} />
      </AbsoluteFill>
      <Haze tint="rgba(109,75,214,0.8)" y={0.66} op={0.28} />
      <Title text="那，你的生活是什么主义？" at={16} out={92} size={64} y={0.15} />
      <Line text="它没有标准答案。" at={96} out={128} size={42} y={0.38} color={NH.dim} />
      <Line text="但你今天怎么过，" at={132} out={166} size={44} y={0.62} color={NH.dim} />
      <Title text="就是你的答案。" at={170} size={58} y={0.85} color={NH.violetLt} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 130, textAlign: 'center', pointerEvents: 'none' }}>
        <div style={{ fontSize: 26, fontFamily: FR, letterSpacing: 12, color: NH.pale, opacity: ip(f, 236, 260, 0, 1) }}>
          第一期 · 虚无主义
        </div>
        <div style={{ fontSize: 20, fontFamily: FR, letterSpacing: 6, color: NH.pale, marginTop: 12, opacity: ip(f, 262, 286, 0, 0.7) }}>
          到此为止 · 下一期再见
        </div>
      </div>
      <Sweep at={18} dur={58} hue={276} />
      <Dust n={130} sp={0.5} op={0.85} />
    </Shell>
  );
};
