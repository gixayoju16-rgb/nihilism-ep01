import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile, useVideoConfig } from 'remotion';
import { S0Opening } from './scenes2/SC0Opening';
import { S1, S2, S3, S4, S5, S6, S7, S8 } from './scenes2/Scenes';

const LEAD = 12;
const TAIL = 18;
// 旁白帧数（30fps，按实测 mp3 时长取整）
const AF = [290, 350, 392, 383, 358, 413, 330, 359];

const OPEN = 150;
const CLOSE = 120;

export const SEG_DUR = AF.map((a) => LEAD + a + TAIL);
export const TOTAL = OPEN + SEG_DUR.reduce((x, y) => x + y, 0) + CLOSE;

const startOf = (i: number) => OPEN + SEG_DUR.slice(0, i).reduce((x, y) => x + y, 0);

const seg = (i: number) => ({ at: 0, dur: SEG_DUR[i], audio: 'audio/nh/nh0' + (i + 1) + '.mp3' });

export const Nihilism2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#05050a' }}>
      {/* 背景音乐：全程低音量铺底 */}
      <Audio src={staticFile('audio/bgm.wav')} volume={0.10} startFrom={0} />

      <Sequence from={0} durationInFrames={OPEN}>
        <S0Opening />
      </Sequence>

      <Sequence from={startOf(0)} durationInFrames={SEG_DUR[0]}><S1 seg={seg(0)} /></Sequence>
      <Sequence from={startOf(1)} durationInFrames={SEG_DUR[1]}><S2 seg={seg(1)} /></Sequence>
      <Sequence from={startOf(2)} durationInFrames={SEG_DUR[2]}><S3 seg={seg(2)} /></Sequence>
      <Sequence from={startOf(3)} durationInFrames={SEG_DUR[3]}><S4 seg={seg(3)} /></Sequence>
      <Sequence from={startOf(4)} durationInFrames={SEG_DUR[4]}><S5 seg={seg(4)} /></Sequence>
      <Sequence from={startOf(5)} durationInFrames={SEG_DUR[5]}><S6 seg={seg(5)} /></Sequence>
      <Sequence from={startOf(6)} durationInFrames={SEG_DUR[6]}><S7 seg={seg(6)} /></Sequence>
      <Sequence from={startOf(7)} durationInFrames={SEG_DUR[7]}><S8 seg={seg(7)} /></Sequence>
    </AbsoluteFill>
  );
};