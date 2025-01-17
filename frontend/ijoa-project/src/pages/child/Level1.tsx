import React from "react";
import LevelTemplate from "../../components/child/LevelTemplate";
import bglv1 from "/assets/child/bg-lv1.png";
import baby1 from "/assets/child/baby1.png";

interface Level1Props {
  currentLevel: number;
  totalCount: number;
}

const Level1: React.FC<Level1Props> = ({ currentLevel, totalCount }) => {
  const templateLevel = 1;
  const sideToSideAnimation = {
    initial: { x: 0 },
    animate: {
      x: [0, 50, -50, 0],
      transition: {
        duration: 10,
        ease: "easeInOut",
      },
    },
  };

  return (
    <LevelTemplate
      bgImage={bglv1}
      babyImage={baby1}
      profileCss="bottom-40 left-[calc(50%-60px)] transform -translate-x-1/2 w-[160px] z-10 rounded-3xl"
      babyCss="bottom-5 left-[calc(50%-100px)] transform -translate-x-1/2 w-1/6"
      minLevel={2}
      maxLevel={4}
      profileAnimation={sideToSideAnimation}
      babyAnimation={sideToSideAnimation}
      currentLevel={currentLevel}
      totalCount={totalCount}
      templateLevel={templateLevel}
    />
  );
};

export default Level1;
