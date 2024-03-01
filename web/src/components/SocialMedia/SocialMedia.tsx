import { FiGithub, FiGlobe, FiLinkedin } from "react-icons/fi";
import { extractAttributes, fetchSocialMedia } from "../../api/strapiCms"


interface Link {
  url: string,
  platform: "linkedin" | "github" | "website"
}

const data = await fetchSocialMedia()

export function SocialMedia() {
  const icons = {
    linkedin: <FiLinkedin className="inline-block text-sky-600 mr-2" />,
    github: <FiGithub className="inline-block text-sky-600 mr-2" />,
    website: <FiGlobe className="inline-block text-sky-600 mr-2" />,
  };

  const links: Link[] = data.map(extractAttributes)

  return (
    <>
      {links.map((link, indx) => (
        <p className="text-sm whitespace-nowrap" key={indx}>
          {icons[link.platform]}
          <a href={link.url}>{link.url}</a>
        </p>
      ))}
    </>
  );
}
