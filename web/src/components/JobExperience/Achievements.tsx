import { extractAttributes } from "../../api/strapiCms"
import type { Job } from "./JobExperience"


interface AchievementProps {
  achievements: Job["achievements"]
  classes?: string
  editable: boolean
}

export function Achievements({ classes, achievements, editable }: AchievementProps) {
  // contentEditable={editable}
  return (
    <ul className={`list-disc ml-5 ${classes}`}>
      {achievements.map((a, i) => (
        <li key={i}>{extractAttributes(a).description}</li>
      ))}
    </ul>
  )
}
