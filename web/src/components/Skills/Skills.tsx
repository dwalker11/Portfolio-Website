import { extractAttributes, fetchSkills } from "../../api/strapiCms"


interface Skill {
  name: string
}

const data = await fetchSkills()

const categories = [
  "library",
  "framework",
  "database",
  "language",
  "runtime",
  "tool",
  "platform",
]

export function Skills() {
  const groupedSkills = data.reduce(
    (result: Map<string, Skill[]>, { attributes: val }: any) => {
      const { type, skill } = val
      const { name } = extractAttributes(skill.data)

      if (!result.has(type)) {
        result.set(type, [{ name }])
      } else {
        const skills = result.get(type)
        result.set(type, [...skills!, { name }])
      }

      return result
    },
    new Map
  )

  return (
    <div className="flex flex-wrap py-2">
      {categories.map((category) => (
        <div className="basis-1/4 pr-1 pb-2">
          <h4 className="capitalize font-bold">{category}</h4>
          <p>{groupedSkills.get(category)?.map((s: any) => s.name).join(", ")}</p>
        </div>
      ))}
    </div>
  )
}
