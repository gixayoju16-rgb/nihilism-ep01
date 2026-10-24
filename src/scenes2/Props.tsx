import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from 'remotion';
import { FB, FR, ip } from './Kit';
const inc = '#eef0f6', vil = '#a98cf0', vio = '#6d4bd6', cy = '#3fd0d8', am = '#e8a33d', bl = '#d93a2b';

/* ---------- 1. 凌晨三点：卧室窗 + 月光 + 数字钟 ---------- */
export const Bedroom: React.FC<{ t?: number }> = ({ t = 1 }) => {
  const f = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const sway = Math.sin(f / 120) * 1.6;
  const moon = 0.5 + 0.5 * Math.sin(f / 80);
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg,#0a0a16 0%,#07070e 55%,#05050a 100%)' }}>
      {/* 窗框 */}
      <div style={{
        position: 'absolute', left: '8%', top: '12%', width: '34%', height: '52%',
        border: '10px solid #14141f', borderRadius: 4, overflow: 'hidden',
        boxShadow: 'inset 0 0 90px rgba(60,70,140,0.35), 0 0 70px rgba(40,50,120,0.18)',
        transform: 'translate(' + (sway * 2) + 'px,0)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#1b2140 0%,#121733 60%,#0c0f1f 100%)' }} />
        {/* 月光 */}
        <div style={{ position: 'absolute', left: '62%', top: '18%', width: 44, height: 44, borderRadius: '50%', background: 'radial-gradient(circle,#f4f6ff 0%,#c9d0f0 60%,#8b93c0 100%)', boxShadow: '0 0 ' + (26 + moon * 18).toFixed(0) + 'px rgba(220,230,255,0.8)', opacity: 0.85 }} />
        {/* 远处楼影 */}
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{ position: 'absolute', bottom: 0, left: (6 + i * 19) + '%', width: (14 + random('bw' + i) * 12) + '%', height: (26 + random('bh' + i) * 46) + '%', background: 'rgba(6,7,14,0.94)' }} />
        ))}
        {/* 亮着的窗 */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={'l' + i} style={{ position: 'absolute', left: (10 + random('lx' + i) * 78) + '%', bottom: (12 + random('ly' + i) * 40) + '%', width: 5, height: 7, background: i % 2 ? 'rgba(232,163,61,0.75)' : 'rgba(232,163,61,0.35)', opacity: 0.5 + 0.5 * Math.abs(Math.sin((f + i * 40) / 70)) }} />
        ))}
        {/* 窗棂 */}
        <div style={{ position: 'absolute', left: '50%', top: 0, width: 8, height: '100%', background: '#14141f', marginLeft: -4 }} />
        <div style={{ position: 'absolute', top: '48%', left: 0, width: '100%', height: 8, background: '#14141f', marginTop: -4 }} />
      </div>
      {/* 月光投影在地板 */}
      <div style={{ position: 'absolute', left: '6%', top: '64%', width: '52%', height: '34%', background: 'linear-gradient(135deg, rgba(190,205,255,0.10), rgba(120,140,220,0.02) 60%, transparent)', filter: 'blur(24px)', transform: 'skewX(-14deg)' }} />
      {/* 数字钟 */}
      <div style={{ position: 'absolute', right: '9%', top: '18%', textAlign: 'right', fontFamily: FB }}>
        <div style={{ fontSize: 116, color: 'rgba(60,220,226,0.92)', letterSpacing: 4, textShadow: '0 0 40px rgba(63,208,216,0.75)', opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 45)) }}>03:00</div>
        <div style={{ fontFamily: FR, fontSize: 22, color: 'rgba(125,129,153,0.9)', letterSpacing: 10, marginTop: 6 }}>凌 晨</div>
      </div>
      {/* 被褥边缘 */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '18%', background: 'linear-gradient(180deg, transparent, rgba(12,12,22,0.95) 45%, #08080f)', filter: 'blur(3px)' }} />
    </AbsoluteFill>
  );
};

/* ---------- 2. 宇宙没有答案：星系 + 空档案柜 ---------- */
export const Void: React.FC = () => {
  const f = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const orbs = [0, 1, 2].map(i => {
    const a = f / (140 + i * 60) + i * 2.1;
    const R = 120 + i * 70;
    return { x: W * 0.5 + Math.cos(a) * R * 1.7, y: H * 0.46 + Math.sin(a) * R * 0.5, r: 3 + i * 2.2, c: i === 0 ? cy : i === 1 ? vil : am };
  });
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: '50%', top: '46%', width: 520, height: 520, marginLeft: -260, marginTop: -260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,75,214,0.30) 0%, rgba(60,40,130,0.14) 40%, transparent 70%)', filter: 'blur(30px)', opacity: 0.75 + 0.25 * Math.sin(f / 100) }} />
      <div style={{ position: 'absolute', left: '50%', top: '46%', width: 190, height: 190, marginLeft: -95, marginTop: -95, borderRadius: '50%', background: 'radial-gradient(circle,#2a1f5a 0%,#120e26 65%,#05050a 100%)', boxShadow: '0 0 80px rgba(109,75,214,0.55), inset -18px -12px 60px rgba(0,0,0,0.9)' }} />
      {orbs.map((o, i) => (
        <div key={i} style={{ position: 'absolute', left: o.x, top: o.y, width: o.r * 2, height: o.r * 2, borderRadius: '50%', background: o.c, boxShadow: '0 0 ' + (o.r * 7) + 'px ' + o.c, opacity: 0.9 }} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <div key={'h' + i} style={{ position: 'absolute', left: (18 + random('hx' + i) * 64) + '%', top: (58 + random('hy' + i) * 30) + '%', width: 26, height: 15, background: 'rgba(238,240,246,' + (0.05 + random('ho' + i) * 0.12) + ')', border: '1px solid rgba(169,140,240,0.16)', transform: 'rotate(' + (random('hr' + i) * 40 - 20) + 'deg)', opacity: 0.7 }} />
      ))}
    </AbsoluteFill>
  );
};

/* ---------- 3. 上帝死了：空王座 + 断裂光环 ---------- */
export const EmptyThrone: React.FC = () => {
  const f = useCurrentFrame();
  const crack = ip(f, 20, 60, 0, 1);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: '50%', top: '40%', width: 300, height: 300, marginLeft: -150, marginTop: -150, borderRadius: '50%', border: (3 - crack * 2.4) + 'px solid rgba(232,163,61,' + (0.45 - crack * 0.3) + ')', boxShadow: '0 0 60px rgba(232,163,61,0.35)', transform: 'scale(' + (1 + crack * 0.5) + ') rotate(' + (crack * 18) + 'deg)', opacity: 1 - crack * 0.55 }} />
      {/* 王座 */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        <div style={{ width: 168, height: 210, background: 'linear-gradient(180deg,#191927 0%,#0d0d16 100%)', border: '3px solid rgba(169,140,240,0.30)', borderRadius: '84px 84px 12px 12px', boxShadow: 'inset 0 0 60px rgba(0,0,0,0.95), 0 0 70px rgba(109,75,214,0.28)' }}>
          <div style={{ width: 96, height: 96, margin: '34px auto 0', borderRadius: '50%', border: '2px dashed rgba(232,163,61,0.28)', opacity: 0.6 }} />
        </div>
        <div style={{ width: 210, height: 22, margin: '14px auto 0', background: 'linear-gradient(180deg,#1a1a28,#0a0a12)', border: '2px solid rgba(169,140,240,0.22)', borderRadius: 4 }} />
        <div style={{ width: 150, height: 16, margin: '10px auto 0', background: 'rgba(10,10,18,0.9)', border: '1px solid rgba(169,140,240,0.14)', borderRadius: 3 }} />
      </div>
      {/* 飘散灰烬 */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
        const yy = ((f * (0.6 + random('ey' + i)) + random('eo' + i) * 400) % 620) - 120;
        return <div key={i} style={{ position: 'absolute', left: (30 + random('ex' + i) * 40) + '%', top: '60%', transform: 'translateY(' + (-yy) + 'px)', width: 3, height: 3, borderRadius: '50%', background: am, opacity: 0.6 * (1 - yy / 560) }} />;
      })}
    </AbsoluteFill>
  );
};

/* ---------- 4. 两个声音：双色对峙 + 分割光 ---------- */
export const Duality: React.FC = () => {
  const f = useCurrentFrame();
  const split = 50 + Math.sin(f / 70) * 1.2;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, top: 0, width: split + '%', height: '100%', background: 'linear-gradient(90deg, rgba(109,75,214,0.20), rgba(109,75,214,0.03))' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, width: (100 - split) + '%', height: '100%', background: 'linear-gradient(270deg, rgba(217,58,43,0.16), rgba(217,58,43,0.02))' }} />
      <div style={{ position: 'absolute', left: split + '%', top: 0, width: 2, height: '100%', marginLeft: -1, background: 'linear-gradient(180deg, transparent, rgba(238,240,246,0.55), transparent)', boxShadow: '0 0 30px rgba(238,240,246,0.7)' }} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={'a' + i} style={{ position: 'absolute', left: (6 + i * 6) + '%', top: (18 + random('aa' + i) * 64) + '%', width: 2, height: (40 + random('ah' + i) * 90), background: 'linear-gradient(180deg,transparent,rgba(169,140,240,0.5),transparent)', transform: 'rotate(-8deg)' }} />
      ))}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={'b' + i} style={{ position: 'absolute', right: (6 + i * 6) + '%', top: (18 + random('ba' + i) * 64) + '%', width: 2, height: (40 + random('bh' + i) * 90), background: 'linear-gradient(180deg,transparent,rgba(217,58,43,0.5),transparent)', transform: 'rotate(8deg)' }} />
      ))}
    </AbsoluteFill>
  );
};

/* ---------- 5. 陷阱：白纸 + 下坠的墨点 ---------- */
export const BlankPage: React.FC = () => {
  const f = useCurrentFrame();
  const fall = ((f * 3) % 460);
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 45%, #16121f 0%, #08070d 70%, #05050a 100%)' }}>
      <div style={{ position: 'absolute', left: '50%', top: '48%', width: 430, height: 300, marginLeft: -215, marginTop: -150, background: 'linear-gradient(160deg,#f2f2f6 0%,#dfdfe8 70%,#c9c9d6 100%)', transform: 'rotate(-2.2deg) perspective(900px) rotateX(6deg)', boxShadow: '0 40px 90px rgba(0,0,0,0.85), 0 0 80px rgba(109,75,214,0.22)' }}>
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ position: 'absolute', left: 34, top: 42 + i * 34, width: (250 + random('pl' + i) * 110), height: 2, background: 'rgba(30,32,48,0.10)' }} />
        ))}
        {/* 墨点下坠 */}
        <div style={{ position: 'absolute', left: '54%', top: fall - 60, width: 12, height: 16, borderRadius: '50% 50% 46% 46%', background: 'radial-gradient(circle at 40% 30%, #2a2a3a, #05050a)', boxShadow: '0 0 18px rgba(0,0,0,0.9)' }} />
      </div>
      <div style={{ position: 'absolute', left: '50%', top: '86%', transform: 'translateX(-50%)', textAlign: 'center', fontFamily: FR, fontSize: 24, color: 'rgba(125,129,153,0.85)', letterSpacing: 8 }}>未 写 一 字</div>
    </AbsoluteFill>
  );
};

/* ---------- 6. 加缪：山 + 推石 + 坡道 ---------- */
export const Sisyphus: React.FC<{ prog?: number }> = ({ prog = 0 }) => {
  const f = useCurrentFrame();
  const t = ((f / 210) % 1);
  const px = 16 + t * 62;
  const py = 74 - Math.sin(t * Math.PI) * 30;
  const rot = (t * 720) % 360;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg,#0a0912 0%,#12101c 42%,#08070d 100%)' }}>
      {/* 远山 */}
      <div style={{ position: 'absolute', left: 0, bottom: '26%', width: '100%', height: 220, background: 'linear-gradient(180deg, rgba(60,50,100,0.32), transparent)', clipPath: 'polygon(0 100%, 12% 44%, 26% 70%, 42% 22%, 58% 62%, 74% 34%, 88% 66%, 100% 40%, 100% 100%)' }} />
      {/* 主山体 */}
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '62%', background: 'linear-gradient(180deg,#151227 0%,#0c0a16 60%,#07060e 100%)', clipPath: 'polygon(0 100%, 0 86%, 22% 52%, 46% 30%, 62% 18%, 78% 34%, 100% 70%, 100% 100%)' }} />
      {/* 坡道线 */}
      <div style={{ position: 'absolute', left: '10%', bottom: '30%', width: '70%', height: 2, background: 'linear-gradient(90deg, transparent, rgba(169,140,240,0.45), transparent)', transform: 'rotate(-13deg)' }} />
      {/* 巨石 */}
      <div style={{ position: 'absolute', left: px + '%', top: py + '%', width: 62, height: 62, borderRadius: '48% 52% 46% 54%', background: 'radial-gradient(circle at 34% 28%, #6a6a80 0%, #33334a 45%, #14141f 100%)', boxShadow: '0 0 40px rgba(0,0,0,0.9), inset -8px -10px 20px rgba(0,0,0,0.7)', transform: 'rotate(' + rot + 'deg)' }} />
      {/* 推石人剪影 */}
      <div style={{ position: 'absolute', left: (px - 4.6) + '%', top: (py + 4.6) + '%' }}>
        <div style={{ width: 17, height: 17, borderRadius: '50%', background: '#05050a', margin: '0 auto' }} />
        <div style={{ width: 15, height: 42, background: '#05050a', borderRadius: 6, margin: '2px auto 0', transform: 'rotate(24deg)' }} />
        <div style={{ width: 4, height: 34, background: '#05050a', margin: '-34px auto 0', transform: 'translateX(16px) rotate(-52deg)' }} />
        <div style={{ width: 4, height: 32, background: '#05050a', margin: '2px auto 0', transform: 'translateX(-8px) rotate(16deg)' }} />
      </div>
      {/* 尘雾 */}
      <div style={{ position: 'absolute', left: (px - 3) + '%', top: (py + 7) + '%', width: 150, height: 40, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(169,140,240,0.14), transparent 70%)', filter: 'blur(12px)' }} />
    </AbsoluteFill>
  );
};

/* ---------- 7. 没有剧本：阶梯 + 门 + 脚印 ---------- */
export const Stairs: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg,#07070e 0%,#0c0b16 50%,#05050a 100%)' }}>
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} style={{
          position: 'absolute', left: (8 + i * 5) + '%', bottom: (6 + i * 7) + '%',
          width: (84 - i * 10) + '%', height: 10,
          background: 'linear-gradient(180deg, rgba(169,140,240,' + (0.16 - i * 0.015) + '), rgba(20,18,34,0.9))',
          border: '1px solid rgba(169,140,240,' + (0.10 + i * 0.008) + ')',
          boxShadow: '0 8px 26px rgba(0,0,0,0.7)',
        }} />
      ))}
      {/* 门 */}
      <div style={{ position: 'absolute', left: '50%', top: '14%', width: 190, height: 260, marginLeft: -95, borderRadius: '95px 95px 0 0', background: 'linear-gradient(180deg, rgba(109,75,214,0.34) 0%, rgba(63,208,216,0.10) 60%, transparent 100%)', boxShadow: '0 0 90px rgba(109,75,214,0.55)', opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 70)) }}>
        <div style={{ position: 'absolute', left: '50%', top: '60%', width: 3, height: 3, borderRadius: '50%', background: '#fff', boxShadow: '0 0 20px #fff', marginLeft: -1.5 }} />
      </div>
      {/* 光柱 */}
      <div style={{ position: 'absolute', left: '50%', top: '14%', width: '30%', height: '72%', marginLeft: '-15%', background: 'linear-gradient(180deg, rgba(169,140,240,0.16), transparent 78%)', filter: 'blur(26px)' }} />
      {/* 脚印 */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={'ft' + i} style={{ position: 'absolute', left: (44 + (i % 2 ? 3.4 : -3.4)) + '%', bottom: (12 + i * 7.4) + '%', width: 13, height: 6, borderRadius: '50%', background: 'rgba(238,240,246,' + (0.20 - i * 0.026) + ')' }} />
      ))}
    </AbsoluteFill>
  );
};

/* ---------- 8. 片尾：城市剪影 + 天光 ---------- */
export const Skyline: React.FC = () => {
  const f = useCurrentFrame();
  const { width: W } = useVideoConfig();
  const bs = [];
  for (let i = 0; i < 26; i++) {
    const w = 26 + random('kw' + i) * 54;
    const h = 60 + random('kh' + i) * 200;
    bs.push(
      <div key={i} style={{ position: 'absolute', left: (i * (W / 26)) + 'px', bottom: 0, width: w, height: h, background: 'linear-gradient(180deg,#0d0c18 0%,#05050a 100%)', borderTop: '1px solid rgba(109,75,214,0.22)' }}>
        {[0, 1, 2, 3, 4, 5].map(j => (
          <div key={j} style={{ position: 'absolute', left: (6 + (j % 2) * 16) + 'px', top: (14 + Math.floor(j / 2) * 22) + 'px', width: 6, height: 8, background: random('win' + i + '_' + j) > 0.55 ? 'rgba(232,163,61,' + (0.25 + 0.45 * Math.abs(Math.sin((f + i * 24 + j * 40) / 90))) + ')' : 'rgba(40,40,60,0.5)' }} />
        ))}
      </div>
    );
  }
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg,#0a0918 0%,#141028 40%,#0a0a14 78%,#05050a 100%)' }}>
      <div style={{ position: 'absolute', left: '50%', bottom: '24%', width: 620, height: 320, marginLeft: -310, background: 'radial-gradient(ellipse at 50% 100%, rgba(109,75,214,0.34) 0%, rgba(63,208,216,0.10) 45%, transparent 72%)', filter: 'blur(40px)', opacity: 0.7 + 0.3 * Math.sin(f / 90) }} />
      {bs}
    </AbsoluteFill>
  );
};

/* ---------- 9. 通用：网格地平线（用于过渡/抽象段） ---------- */
export const GridFloor: React.FC<{ hue?: number; speed?: number }> = ({ hue = 270, speed = 1 }) => {
  const f = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const rows = [];
  for (let i = 0; i < 16; i++) {
    const z = ((i + (f * speed * 0.04) % 1) / 16);
    const y = H * 0.62 + Math.pow(z, 2.1) * H * 0.42;
    rows.push(<div key={'r' + i} style={{ position: 'absolute', left: 0, top: y, width: '100%', height: 1, background: 'hsla(' + hue + ',70%,62%,' + (0.05 + z * 0.28) + ')' }} />);
  }
  const cols = [];
  for (let i = -10; i <= 10; i++) {
    cols.push(<div key={'c' + i} style={{ position: 'absolute', left: '50%', top: H * 0.62, width: 1, height: H * 0.42, background: 'hsla(' + hue + ',70%,60%,0.16)', transformOrigin: 'top center', transform: 'rotate(' + (i * 4.2) + 'deg)' }} />);
  }
  return <AbsoluteFill>{rows}{cols}</AbsoluteFill>;
};

/* ---------- 10. 通用：缓慢 KenBurns 包裹层 ---------- */
export const Push: React.FC<{ z?: number; x?: number; y?: number; children: React.ReactNode }> = ({ z = 0.06, x = 0, y = 0, children }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const p = f / Math.max(1, D);
  const sc = 1 + z * p;
  return (
    <AbsoluteFill style={{ transform: 'scale(' + sc.toFixed(4) + ') translate(' + (x * p) + 'px,' + (y * p) + 'px)' }}>
      {children}
    </AbsoluteFill>
  );
};

/* ---------- 11. 通用：光斑扫过 ---------- */
export const Sweep: React.FC<{ at?: number; dur?: number; hue?: number }> = ({ at = 0, dur = 60, hue = 270 }) => {
  const f = useCurrentFrame();
  const p = Math.max(0, Math.min(1, (f - at) / dur));
  const x = -30 + p * 160;
  return <AbsoluteFill style={{ pointerEvents: 'none', background: 'linear-gradient(105deg, transparent ' + (x - 14) + '%, hsla(' + hue + ',90%,78%,0.14) ' + x + '%, transparent ' + (x + 14) + '%)', opacity: p > 0 && p < 1 ? 1 : 0 }} />;
};