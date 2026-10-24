import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { VideoShort, SHORT_TOTAL } from './VideoShort';
import { Nihilism2, TOTAL as NH_TOTAL } from './Nihilism2';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={9300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Short2m"
        component={VideoShort}
        durationInFrames={SHORT_TOTAL}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Nihilism2"
        component={Nihilism2}
        durationInFrames={NH_TOTAL}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
