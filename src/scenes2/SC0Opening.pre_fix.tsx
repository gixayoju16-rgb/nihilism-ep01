import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NH, FB, FR, ip, Starfield, Dust, Vign, Grain, Scanline } from './Kit';
import { Skyline, Sweep } from './Props';

// 片头：虚空 -> 城市地平线浮现 -> 标题冲击 -> 消散
export const S0Opening: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();

  // 城市天际线缓慢升起
  const rise = ip(f, 10, 90, 120, 0);
  // 标题冲击
  const tIn = ip(f, 55, 78, 0, 1);
  const tScale = ip(f, 55, 78, 1.28, 1);
  const tOut = ip(f, D - 34, D - 12, 1, 0);
  // 地平线光带
  const glow = ip(f, 30, 95, 0, 1) * ip(f, D - 30, D - 8, 1, 0.2);

  return (
    <AbsoluteFill style={{ background: NH.bg0 }}>
      {/* 星域 */}
      <Starfield n={260} speed={0.55} blink />

      {/* 城市剪影：底部长出一排楼 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 520,
          transform: 'translateY(' + rise + 'px)',
        }}
      >
        <Skyline />
      </div>

      {/* 地平线光 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 210,
          height: 3,
          background:
            'linear-gradient(90deg, transparent, ' + NH.violetLt + ' 22%, ' + NH.cyan + ' 50%, ' + NH.violetLt + ' 78%, transparent)',
          opacity: glow * 0.85,
          filter: 'blur(1px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 120,
          height: 380,
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(109,75,214,0.36), rgba(63,208,216,0.10) 45%, transparent 72%)',
          opacity: glow,
        }}
      />

      {/* 标题 */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
        <div
          style={{
            opacity: tIn * tOut,
            transform: 'scale(' + tScale + ') translateY(' + (1 - tIn) * 26 + 'px)',
            fontSize: 118,
            fontFamily: FB,
            letterSpacing: 26,
            color: NH.ink,
            textShadow: '0 0 60px rgba(169,140,240,0.55), 0 0 130px rgba(63,208,216,0.28)',
          }}
        >
          虚无主义
        </div>
        <div
          style={{
            marginTop: 26,
            opacity: ip(f, 82, 106, 0, 1) * tOut,
            fontSize: 30,
            fontFamily: FR,
            letterSpacing: 14,
            color: NH.dim,
          }}
        >
          你的生活是什么主义 · 第二期
        </div>
      </AbsoluteFill>

      {/* 扫光 */}
      <Sweep at={58} dur={70} hue={275} />

      <Dust n={110} sp={0.5} op={0.8} />
      <Vign s={1.05} />
      <Grain o={0.14} />
      <Scanline o={0.07} />
    </AbsoluteFill>
  );
};
