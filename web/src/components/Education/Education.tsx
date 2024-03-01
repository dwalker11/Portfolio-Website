import { extractAttributes, fetchEducation, formatDate } from "../../api/strapiCms"


interface Education {
  school: string
  degree: string
  graduationDate: string
}

const data = await fetchEducation()

export function Education() {
  const education: Education = extractAttributes(data)

  return (
    <div className="py-6 text-center">
      <p className="font-bold">{education.degree}</p>
      <p className="font-thin text-lg">{education.school}</p>
      <p className="font-bold">{formatDate(education.graduationDate, "MMM YYYY")}</p>
    </div>
  )
}
