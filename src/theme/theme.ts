import { staticFile } from 'remotion';

export type Theme = {
  id: string;
  paper: string;
  paperDeep: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  accent: string;
  fontBold: string;
  fontRegular: string;
  fontCondensed?: string;
  grainOpacity: number;
  grainBaseFreq: number;
  grainOctaves: number;
  vignette: number;
  sharpNoise?: boolean;
};

export const fontUrl = (file: string) => staticFile('fonts/' + file);

/** 01 存在主义 0< Carbon + Blood */
export const EXISTENTIALISM_THEME: Theme = {
  id: 'existentialism',
  paper: '#0c0c0e',
  paperDeep: '#000000',
  ink: '#e8e8e6',
  inkSoft: '#a5a5a2',
  inkFaint: '#6b6b6a',
  accent: '#e03b2f',
  fontBold: 'NotoSansC-Bold',
  fontRegular: 'NotoSansC-Regular',
  fontCondensed: 'Orbitron',
  grainOpacity: 0.12,
  grainBaseFreq: 0.82,
  grainOctaves: 3,
  vignette: 0.55,
  sharpNoise: true,
};

export const ACTIVE_THEME = EXISTENTIALISM_THEME;
