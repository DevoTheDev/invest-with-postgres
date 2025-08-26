"use client";
import ColoredText from "./components/atoms/ColoredText"
import BlackSnowBackground from "./components/backgrounds/BlackSnowBackground";
import SmoothTransition from "./components/sections/SmoothTransition";
import MyApps from "./components/me/MyApps/MyApps";
import HeroCardMobile from "./components/me/HeroCard/HeroCardMobile";

export default function Home() {
  return (
    <div>
      <BlackSnowBackground backgroundClassName="bg-gradient-to-b from-white via-gray-100 to-black">
        <SmoothTransition>
          <SmoothTransition.Section id="intro">
            <div className="flex text-center justify-center">
              <ColoredText
                colors={['#000000', '#FFFFFF', '#FFFFFF']} // black → dark grey → white
                size="text-5xl"
                weight="font-extrabold"
                shadow={false}
              >
                Dev
              </ColoredText>
              <ColoredText
                colors={['#FFFFFF', '#FFFFFF', '#000000']} // white → light grey → black
                size="text-5xl"
                weight="font-extrabold"
                shadow={true}
              >
                Element
              </ColoredText>
            </div>
          </SmoothTransition.Section>
          <SmoothTransition.Section id="experience">
            <HeroCardMobile />
          </SmoothTransition.Section>
          <SmoothTransition.Section id="apps">
              <MyApps />
          </SmoothTransition.Section>
        </SmoothTransition>
      </BlackSnowBackground>
    </div>
  );
}