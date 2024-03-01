import { useState } from "react"
import { FiMapPin } from "react-icons/fi"
import {
  extractAttributes,
  fetchJobExperience,
  formatDate,
} from "../../api/strapiCms"
import { Achievements } from "./Achievements"
import { TechStack } from "./TechStack"

export interface Job extends Omit<Project, "client" | "alias"> {
  title: string
  company: string
  location: string
  contracts?: Project[]
}

interface Project {
  client: string
  alias: string
  start: string
  end: string
  description: string
  achievements: string[]
  skills: string[]
}

const data = await fetchJobExperience()

export function Experience() {
  return data.map((job: any) => <Job job={job} />)
}

function Job({ job }: any) {
  const {
    title,
    company,
    description,
    location,
    start,
    end,
    skills,
    contracts,
    achievements,
  } = extractAttributes(job) as Job

  // TODO: Fallback to Present
  const formattedStart = formatDate(start, "MMM YYYY")
  const formattedEnd = end ? formatDate(end, "MMM YYYY") : "(Present)"

  return (
    <>
      <div className="flex py-4 break-inside-avoid">
        <div className="basis-1/4">
          <p className="text-neutral-500 text-sm pt-1 mb-2">
            {formattedStart} - {formattedEnd}
          </p>
          <h5 className="font-medium">{company}</h5>
          <h5 className="text-sm">
            <FiMapPin className="inline-block" />
            {location}
          </h5>
        </div>
        <div className="basis-3/4 pl-2">
          <h4 className="font-bold text-lg text-sky-600">{title}</h4>
          <p>{description}</p>
          <Body
            achievements={(achievements as any).data}
            contracts={(contracts as any).data}
            skills={(skills as any).data}
          />
        </div>
      </div>
    </>
  )
}

function Body({ contracts, achievements, skills }: any) {
  const [editable] = useState(import.meta.env.MODE == "development")
  const [showClients] = useState(import.meta.env.REVEAL_SENSITIVE)

  if (!contracts.length) {
    return (
      <>
        <Achievements
          classes="my-4"
          achievements={achievements}
          editable={editable}
        />
        <TechStack techStack={skills} />
      </>
    )
  }

  // contentEditable={editable}
  return (
    <>
      <h5 className="font-medium text-lg mt-4">Projects:</h5>
      <ul className="ml-2 mt-2">
        {contracts.map(({ attributes: proj }: any) => (
          <li className="first:mt-0 mt-6">
            <div className="flex">
              <h5 className="font-bold text-neutral-700 mr-2">
                {showClients ? proj.client : proj.alias}
              </h5>
              <span className="mr-2">//</span>
              <span>
                {formatDate(proj.start, "MMM 'YY")} -{" "}
                {formatDate(proj.end, "MMM 'YY")}
              </span>
            </div>
            <p className="text-sm">{proj.description}</p>
            <Achievements
              classes="text-sm my-2"
              editable={editable}
              achievements={proj.achievements.data}
            />
            <TechStack techStack={proj.skills.data} />
          </li>
        ))}
      </ul>
    </>
  )
}
