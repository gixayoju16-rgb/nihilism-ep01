import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from 'remotion';

export const NH = {
  bg0: '#05050a', bg1: '#0b0a14', ink: '#eef0f6', dim: '#7d8199',
  pale: '#3a3d52', violet: '#6d4bd6', violetLt: '#a98cf0',
  cyan: '#3fd0d8', amber: '#e8a33d', blood: '#d93a2b',
};
export const FB = 'NotoSansC-Bold';
export const FR = 'NotoSansC-Regular';
export const ease = (t: number) => 1 - Math.pow(1 - t, 3);
export const ip = (f: number, a: number, b: number, x: number, y: number) => {
  const t = Math.max(0, Math.min(1, (f - a) / (b - a || 1)));
  return x + (y - x) * t;
};
const inc = '#eef0f6', vil = '#a98cf0';

// 底层：深空径向渐变 + 缓慢呼吸
export const SpaceBg: React.FC<{ ph?: number }> = ({ ph = 0 }) => (
  <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 42%, #171232 0%, #0b0a14 38%, #05050a 78%)' }}>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(109,75,214,0.18) 0%, transparent 70%)', opacity: 0.65 + 0.35 * Math.sin(ph / 90) }} />
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 120% 60% at 50% 118%, rgba(63,208,216,0.09) 0%, transparent 62%)' }} />
  </AbsoluteFill>
);

// 星空：沿对角线漂移 + 闪烁
export const Starfield: React.FC<{ n?: number; speed?: number; blink?: boolean }> = ({ n = 220, speed = 1, blink = true }) => {
  const f = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const stars = [];
  for (let i = 0; i < n; i++) {
    const sx = random('sx' + i), sy = random('sy' + i), sz = random('sz' + i), sb = random('sb' + i);
    const px = ((sx * W + f * speed * 0.15 * (0.3 + sz)) % W + W) % W;
    const py = ((sy * H - f * speed * 0.08 * (0.3 + sz)) % H + H) % H;
    const d = 1 + sz * 4;
    const tw = blink ? 0.35 + 0.65 * Math.abs(Math.sin(f / (40 + sb * 80) + sb * 9)) : 0.8;
    stars.push(
      <div key={i} style={{
        position: 'absolute', left: px, top: py, width: d, height: d, borderRadius: '50%',
        background: i % 17 === 0 ? vil : inc, opacity: (0.12 + sz * 0.85) * tw,
        boxShadow: d > 3 ? '0 0 ' + Math.round(d * 4) + 'px ' + vil : undefined,
      }} />
    );
  }
  return <AbsoluteFill style={{ pointerEvents: 'none' }}>{stars}</AbsoluteFill>;
};

// 尘埃：近景漂浮，带景深模糊差
export const Dust: React.FC<{ n?: number; sp?: number; op?: number }> = ({ n = 90, sp = 1, op = 1 }) => {
  const f = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const arr = [];
  for (let i = 0; i < n; i++) {
    const a = random('da' + i), b = random('db' + i), d = random('dd' + i), sz = random('ds' + i);
    const x = (a * W + Math.sin((f + i * 30) / 110) * 40 * sp + d * 30) % W;
    const y = ((b * H - ((f * 0.35 * sp * (0.3 + d)) % (H + 120))) + H + 120) % (H + 120) - 60;
    const s = 1.5 + sz * 5;
    arr.push(
      <div key={i} style={{
        position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%',
        background: d > 0.75 ? vil : inc, opacity: (0.06 + d * 0.34) * op,
        filter: 'blur(' + (d * 1.6).toFixed(1) + 'px)',
      }} />
    );
  }
  return <AbsoluteFill style={{ pointerEvents: 'none' }}>{arr}</AbsoluteFill>;
};

// 光隧道：向中心收缩的环，纵深推进
export const Tunnel: React.FC<{ speed?: number; hue?: number; depth?: number }> = ({ speed = 1, hue = 270, depth = 14 }) => {
  const f = useCurrentFrame();
  const rings = [];
  for (let i = 0; i < depth; i++) {
    const p = (((f * speed * 0.5 + i * (100 / depth)) % 100) + 100) % 100 / 100;
    const s = 4 + p * p * 160;
    const o = Math.min(1, (1 - p) * 0.9) * 0.55;
    rings.push(
      <div key={i} style={{
        position: 'absolute', left: '50%', top: '50%', width: s + '%', height: s + '%',
        transform: 'translate(-50%,-50%)', border: '1.5px solid hsla(' + hue + ',70%,62%,' + o + ')',
        borderRadius: '50%', boxShadow: '0 0 ' + (p * 30).toFixed(0) + 'px hsla(' + hue + ',80%,60%,' + (o * 0.6) + ')',
      }} />
    );
  }
  return <AbsoluteFill style={{ pointerEvents: 'none' }}>{rings}</AbsoluteFill>;
};

// 坠落者剪影 + 速度线
export const Faller: React.FC<{ drift?: number; scale?: number }> = ({ drift = 1, scale = 1 }) => {
  const f = useCurrentFrame();
  const { height: H } = useVideoConfig();
  const lines = [];
  for (let i = 0; i < 26; i++) {
    const a = random('fa' + i), b = random('fb' + i), c = random('fc' + i);
    const len = 40 + c * 160;
    const y = ((b * H + f * (4 + c * 7) * drift) % (H + 300)) - 150;
    lines.push(
      <div key={i} style={{
        position: 'absolute', left: (a * 100) + '%', top: y, width: 1 + c * 1.5, height: len,
        background: 'linear-gradient(to bottom, transparent, rgba(169,140,240,' + (0.06 + c * 0.18) + '), transparent)',
        transform: 'rotate(4deg)',
      }} />
    );
  }
  const cx = 50 + Math.sin(f / 70) * 3 * drift;
  const cy = 46 + Math.sin(f / 52) * 2;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {lines}
      <div style={{ position: 'absolute', left: cx + '%', top: cy + '%', transform: 'translate(-50%,-50%) scale(' + scale + ')', opacity: 0.95 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0a0a12', border: '2px solid rgba(169,140,240,0.6)', margin: '0 auto', boxShadow: '0 0 26px rgba(109,75,214,0.8)' }} />
        <div style={{ width: 30, height: 74, background: 'linear-gradient(180deg,#0a0a12,#101020)', border: '1.5px solid rgba(169,140,240,0.38)', borderRadius: '14px', margin: '6px auto 0' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 34, marginTop: -58 }}>
          <div style={{ width: 7, height: 52, background: 'rgba(10,10,18,0.95)', border: '1px solid rgba(169,140,240,0.3)', borderRadius: 4, transform: 'rotate(' + (-18 + Math.sin(f / 30) * 8) + 'deg)', transformOrigin: 'top center' }} />
          <div style={{ width: 7, height: 52, background: 'rgba(10,10,18,0.95)', border: '1px solid rgba(169,140,240,0.3)', borderRadius: 4, transform: 'rotate(' + (18 + Math.sin(f / 34 + 2) * 8) + 'deg)', transformOrigin: 'top center' }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 体积雾
export const Haze: React.FC<{ tint?: string; y?: number; op?: number }> = ({ tint = 'rgba(109,75,214,0.9)', y = 0.5, op = 0.3 }) => {
  const f = useCurrentFrame();
  const br = 1 + 0.1 * Math.sin(f / 60);
  return <AbsoluteFill style={{ background: 'radial-gradient(ellipse ' + (58 * br) + '% ' + (38 * br) + '% at 50% ' + (y * 100) + '%, ' + tint + ' 0%, transparent 72%)', opacity: op, filter: 'blur(18px)' }} />;
};

// 暗角
export const Vign: React.FC<{ s?: number }> = ({ s = 0.9 }) => (
  <AbsoluteFill style={{ background: 'radial-gradient(ellipse 74% 70% at 50% 50%, transparent 28%, rgba(0,0,0,' + s + ') 100%)' }} />
);

// 胶片颗粒
export const Grain: React.FC<{ o?: number }> = ({ o = 0.13 }) => (
  <AbsoluteFill style={{
    mixBlendMode: 'overlay',
    backgroundImage: 'repeating-conic-gradient(rgba(255,255,255,0.055) 0deg 1deg, transparent 1deg 2deg)',
    backgroundSize: '3px 3px',
  }} />
);

// 扫描线
export const Scanline: React.FC<{ o?: number }> = ({ o = 0.08 }) => (
  <AbsoluteFill style={{ opacity: o, backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)' }} />
);

const TW: React.FC<{ text: string; at?: number; out?: number; size?: number; y?: number; color?: string; weight?: number; sp?: number }> =
  ({ text, at = 0, out = -1, size = 120, y = 0.44, color = inc, weight = 900, sp = 4 }) => {
    const f = useCurrentFrame();
    const pin = ease(ip(f, at, at + 16, 0, 1));
    const pout = out > 0 ? ease(ip(f, out, out + 12, 1, 0)) : 1;
    const p = pin * pout;
    const bl = (1 - pin) * 18;
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: (y - 0.5) * 100 + '%' }}>
        <div style={{
          fontFamily: weight > 700 ? FB : FR, fontSize: size, color, fontWeight: weight, letterSpacing: sp,
          opacity: p, transform: 'translateY(' + ((1 - p) * 34).toFixed(1) + 'px) scale(' + (0.94 + p * 0.06).toFixed(3) + ')',
          filter: 'blur(' + bl.toFixed(1) + 'px)',
          textShadow: '0 0 40px rgba(109,75,214,0.7), 0 4px 30px rgba(0,0,0,0.9)',
          textAlign: 'center', lineHeight: 1.28, whiteSpace: 'pre-line' as const,
        }}>{text}</div>
      </AbsoluteFill>
    );
  };

export const Title: React.FC<{ text: string; at?: number; out?: number; size?: number; y?: number; color?: string; weight?: number; sp?: number }> = (p) => <TW {...p} />;
export const BigTitle: React.FC<{ text: string; at?: number; size?: number; y?: number }> = ({ text, at = 0, size = 180, y = 0.44 }) => <TW text={text} at={at} size={size} y={y} />;

export const Line: React.FC<{ text: string; at?: number; out?: number; size?: number; y?: number; color?: string; glow?: string; weight?: number }> =
  ({ text, at = 0, out = -1, size = 70, y = 0.5, color = inc, glow = 'rgba(109,75,214,0.85)', weight = 400 }) => {
    const f = useCurrentFrame();
    const pin = ease(ip(f, at, at + 14, 0, 1));
    const pout = out > 0 ? ease(ip(f, out, out + 10, 1, 0)) : 1;
    const p = pin * pout;
    return (
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: (y - 0.5) * 100 + '%' }}>
        <div style={{
          fontFamily: weight > 700 ? FB : FR, fontSize: size, color, opacity: p, letterSpacing: 2, fontWeight: weight,
          transform: 'translateY(' + ((1 - pin) * 24 - (1 - pout) * 18).toFixed(1) + 'px)',
          textShadow: '0 0 44px ' + glow + ', 0 3px 26px rgba(0,0,0,0.95)',
          textAlign: 'center', lineHeight: 1.34, whiteSpace: 'pre-line' as const,
        }}>{text}</div>
      </AbsoluteFill>
    );
  };

export const Note: React.FC<{ text: string; at?: number; y?: number }> = ({ text, at = 0, y = 0.78 }) => {
  const f = useCurrentFrame();
  const p = Math.max(0, Math.min(1, (f - at) / 18));
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingTop: (y - 0.5) * 100 + '%' }}>
      <div style={{ fontFamily: FR, fontSize: 28, color: 'rgba(125,129,153,' + (p * 0.95) + ')', letterSpacing: 6, textAlign: 'center' }}>{text}</div>
    </AbsoluteFill>
  );
};

export const Cap: React.FC<{ text: string }> = ({ text }) => (
  <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 54 }}>
    <div style={{ fontFamily: FR, fontSize: 32, color: 'rgba(238,240,246,0.9)', letterSpacing: 1.5, textShadow: '0 2px 18px rgba(0,0,0,1),0 0 40px rgba(0,0,0,0.9)', textAlign: 'center', padding: '0 90px' }}>{text}</div>
  </AbsoluteFill>
);
