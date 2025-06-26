"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface TechDisplayProps {
  react?: boolean;
  typescript?: boolean;
  postgres?: boolean;
  express?: boolean;
  tailwind?: boolean;
  mui?: boolean;
  docker?: boolean;
  mongodb?: boolean;
  nextjs?: boolean;
  python?: boolean;
  css?: boolean;
  javascript?: boolean;
  github?: boolean;
  linkedin?: boolean;
  gmail?: boolean;
  node?: boolean;
  reactnative?: boolean;
  size?: number;
  gap?: string;
  centered?: boolean;
  label?: boolean;
}

type TechLink = {
  key: string;
  label: string;
  src: string;
  docs: string;
  type: string;
}

const techMap: TechLink[] = [
  {
    key: "react",
    label: "React",
    src: "/logos/react.svg",
    docs: "https://reactjs.org/docs/getting-started.html",
    type: "frontend",
  },
  {
    key: "reactnative",
    label: "React Native",
    src: "/logos/reactnative.svg",
    docs: "https://reactnative.dev/",
    type: "frontend",
  },
  {
    key: "typescript",
    label: "TypeScript",
    src: "/logos/typescript.svg",
    docs: "https://www.typescriptlang.org/docs/",
    type: "frontend",
  },
  {
    key: "postgres",
    label: "PostgreSQL",
    src: "/logos/postgresql.svg",
    docs: "https://www.postgresql.org/docs/",
    type: "database",
  },
  {
    key: "html",
    label: "HTML5",
    src: "/logos/html.svg",
    docs: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    type: "frontend",
  },
  {
    key: "express",
    label: "ExpressJS",
    src: "/logos/express.svg",
    docs: "https://expressjs.com/en/starter/installing.html",
    type: "backend",
  },
  {
    key: "tailwind",
    label: "Tailwind CSS",
    src: "/logos/tailwind.svg",
    docs: "https://tailwindcss.com/docs/installation",
    type: "frontend",
  },
  {
    key: "mui",
    label: "Material UI",
    src: "/logos/mui.svg",
    docs: "https://mui.com/material-ui/getting-started/overview/",
    type: "frontend",
  },
  {
    key: "docker",
    label: "Docker",
    src: "/logos/docker.svg",
    docs: "https://docs.docker.com/get-started/",
    type: "infrastructure",
  },
  {
    key: "github",
    label: "GitHub",
    src: "/logos/github.svg",
    docs: "https://github.com/DevoTheDev",
    type: "infrastructure",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    src: "/logos/linkedin.svg",
    docs: "https://www.linkedin.com/in/devon-fennell-509997258",
    type: "infrastructure",
  },
  {
    key: "mongodb",
    label: "MongoDB",
    src: "/logos/mongodb.svg",
    docs: "https://www.mongodb.com/docs/",
    type: "database",
  },
  {
    key: "nextjs",
    label: "NextJS",
    src: "/logos/nextjs.svg",
    docs: "https://nextjs.org/",
    type: "frontend",
  },
  {
    key: "css",
    label: "CSS3",
    src: "/logos/css.svg",
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    type: "frontend",
  },
  {
    key: "python",
    label: "Python",
    src: "/logos/python2.svg",
    docs: "https://docs.python.org/3/",
    type: "backend",
  },
  {
    key: "javascript",
    label: "Javascript",
    src: "/logos/javascript.svg",
    docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    type: "javascript",
  },
  {
    key: "gmail",
    label: "Gmail",
    src: "/logos/gmail.svg",
    docs: "mailto:devonfennell23@gmail.com",
    type: "gmail",
  },
  {
    key: "node",
    label: "NodeJS",
    src: "/logos/node.svg",
    docs: "https://nodejs.org/en",
    type: "backend",
  },
] as const;

const TechDisplay: React.FC<TechDisplayProps> = (props) => {
  const {
    size = 52,
    gap = "gap-12",
    centered = false,
    label = true,
    ...techFlags
  } = props;

  const selected = techMap.filter((tech) => techFlags[tech.key as keyof typeof techFlags]);

  const labeledLogo = (data: TechLink) => {

    const noLabelStyles = {
      container: "hover:scale-120 transition-transform duration-200",
      link: "",
    }
    
    if(label) {
      const labeledStyles = {
        container: `
        flex justify-evenly items-center text-center 
        py-2 px-4 rounded-3xl
        hover:scale-105 w-3/4 transition-transform hover:shadow-xl
        duration-200 hover:bg-white/70 cursor-pointer
      `,
        link: `
        hover:opacity-75 rounded-full h-full w-1/2 flex justify-center
        `,
        label: "text-black/50 text-sm font-semibold w-full h-full text-center"
      }
      return (
        <div key={data.key} 
      className={labeledStyles.container} >
        <a
            href={data.docs}
            target="_blank"
            rel="noopener noreferrer"
            className={labeledStyles.link}
          >
            <Image
              src={data.src}
              alt={data.label}
              width={size}
              height={size}
              className="object-contain"
            />
          </a>
            <span className={labeledStyles.label}>{data.label}</span>
      </div>
      )
    }

    return (
      <div key={data.key} 
      className={noLabelStyles.container} >
        <a
            href={data.docs}
            target="_blank"
            rel="noopener noreferrer"
            className={noLabelStyles.link}
          >
            <Image
              src={data.src}
              alt={data.label}
              width={size}
              height={size}
              className="object-contain"
            />
          </a>
      </div>
    )

  }

  return (
    <div className={`items-start grid grid-cols-3 ${gap}`}>
      {selected.map((tech) => {
        return labeledLogo(tech);
      })}
    </div>
  );
};

export default TechDisplay;
