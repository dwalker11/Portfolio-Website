import { useState } from "react"
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi"
import { extractAttributes, fetchContactInfo } from "../../api/strapiCms"


interface ContactInfo {
  location: string
  phone: string
  email: string
}

const data = await fetchContactInfo()

export function ContactInfo() {
  const [showContactInfo] = useState(import.meta.env.REVEAL_SENSITIVE)

  const contact: ContactInfo = extractAttributes(data)

  return (
    <>
      <p className="text-sm whitespace-nowrap">
        <FiMapPin className="inline-block text-sky-600 mr-2" />
        {contact.location}
      </p>
      <p className="text-sm whitespace-nowrap">
        <FiPhone className="inline-block text-sky-600 mr-2" />
        {showContactInfo ? contact.phone : "(available upon request)"}
      </p>
      <p className="text-sm whitespace-nowrap">
        <FiMail className="inline-block text-sky-600 mr-2" />
        {showContactInfo ? contact.email : "(available upon request)"}
      </p>
    </>
  )
}