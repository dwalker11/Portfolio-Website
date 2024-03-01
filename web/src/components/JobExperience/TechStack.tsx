import { extractAttributes } from "../../api/strapiCms"
import type { Job } from "./JobExperience"
import styles from "./jobExperience.module.css"


interface TechStackProps {
  techStack: Job["skills"]
}

export function TechStack({ techStack }: TechStackProps) {
  return (
    <div className="flex">
      <h5 className="font-semibold mr-1">Tech Stack:</h5>
      <ul className={styles["list-horizontal"]}>
        {techStack.map((t) => (
          <li className="font-mono">&nbsp;{extractAttributes(t).name}&nbsp;</li>
        ))}
      </ul>
    </div>
  )
}
