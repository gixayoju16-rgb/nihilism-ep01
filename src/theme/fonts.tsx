import React from 'react';
import { staticFile } from 'remotion';

/**
 * 全局字体注入。
 * 用 CSS @font-face，让所有子组件可直接 font-family: 'NotoSansC-Bold'。
 */
const faces: { family: string; file: string; weight: number }[] = [
  { family: 'NotoSansC-Bold', file: 'NotoSansSC-Bold.ttf', weight: 700 },
  { family: 'NotoSansC-Regular', file: 'NotoSansSC-Regular.ttf', weight: 400 },
  { family: 'Audiowide', file: 'Audiowide-Regular.ttf', weight: 400 },
];

const buildCss = () =>
  faces
    .map((f) => {
      const url = staticFile('fonts/' + f.file);
      return (
        '@font-face { font-family: ' +
        f.family +
        "; src: url('" +
        url +
        "') format('truetype'); font-weight: " +
        f.weight +
        '; font-style: normal; font-display: block; }'
      );
    })
    .join('\n');

export const FontLoader: React.FC = () => {
  return <style dangerouslySetInnerHTML={{ __html: buildCss() }} />;
};
