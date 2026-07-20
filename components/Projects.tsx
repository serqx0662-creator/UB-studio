"use client";

import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className="relative px-6 pb-28 md:px-10 md:pb-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
