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
  layout?: "row" | "grid";
  size?: number;
  gap?: string;
  centered?: boolean;
  label?: boolean;
}

const techMap = [
  {
    key: "react",
    label: "React",
    src: "/logos/react.svg",
    docs: "https://reactjs.org/docs/getting-started.html",
  },
  {
    key: "typescript",
    label: "TypeScript",
    src: "/logos/typescript.svg",
    docs: "https://www.typescriptlang.org/docs/",
  },
  {
    key: "postgres",
    label: "PostgreSQL",
    src: "/logos/postgresql.svg",
    docs: "https://www.postgresql.org/docs/",
  },
  {
    key: "express",
    label: "Express",
    src: "/logos/node.svg",
    docs: "https://expressjs.com/en/starter/installing.html",
  },
  {
    key: "tailwind",
    label: "Tailwind CSS",
    src: "/logos/tailwind.svg",
    docs: "https://tailwindcss.com/docs/installation",
  },
  {
    key: "mui",
    label: "Material UI",
    src: "/logos/mui.svg",
    docs: "https://mui.com/material-ui/getting-started/overview/",
  },
  {
    key: "docker",
    label: "Docker",
    src: "/logos/docker.svg",
    docs: "https://docs.docker.com/get-started/",
  },
  {
    key: "github",
    label: "GitHub",
    src: "/logos/github.svg",
    docs: "https://github.com/DevoTheDev",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    src: "/logos/linkedin.svg",
    docs: "https://www.linkedin.com/in/devon-fennell-509997258",
  },
  {
    key: "mongodb",
    label: "MongoDB",
    src: "/logos/mongodb.svg",
    docs: "https://www.mongodb.com/docs/",
  },
  {
    key: "nextjs",
    label: "NextJS",
    src: "/logos/nextjs.svg",
    docs: "https://nextjs.org/",
  },
  {
    key: "css",
    label: "CSS3",
    src: "/logos/css.svg",
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    key: "python",
    label: "Python",
    src: "/logos/python2.svg",
    docs: "https://docs.python.org/3/",
  },
  {
    key: "javascript",
    label: "Javascript",
    src: "/logos/javascript.svg",
    docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
] as const;

const TechDisplay: React.FC<TechDisplayProps> = (props) => {
  const {
    layout = "row",
    size = 48,
    gap = "gap-24",
    centered = false,
    label = true,
    ...techFlags
  } = props;

  const selected = techMap.filter((tech) => techFlags[tech.key as keyof typeof techFlags]);

  const layoutClass =
    layout === "grid"
      ? clsx("grid grid-cols-3", gap)
      : clsx("flex flex-wrap items-center", gap, centered && "justify-center");

  return (
    <div className={layoutClass}>
      {selected.map((tech) => (
        <div key={tech.key} className="flex flex-col items-center text-center">
          <a
            href={tech.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-120 transition-transform duration-200 hover:opacity-75 rounded-full"
          >
            <Image
              src={tech.src}
              alt={tech.label}
              width={size}
              height={size}
              className="object-contain"
            />
          </a>
          {label && (
            <span className="text-white/80 mt-2 text-sm">{tech.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TechDisplay;
