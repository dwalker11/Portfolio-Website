import axios from "axios"
// import type { AxiosRequestConfig } from "axios"
import dayjs from "dayjs"
import qs from "qs"


const cms = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
    'Content-Type': 'application/json'
  },
})

export async function fetchEducation() {
  let education

  try {
    const { data: response } = await cms.get("/education")
    education = response.data
  } catch (err) {
    console.error(err)
  }

  return education
}

export async function fetchContactInfo() {
  let contactInfo

  try {
    const { data: response } = await cms.get("/contact")
    contactInfo = response.data
  } catch (err) {
    console.error(err)
  }

  return contactInfo
}

export async function fetchSocialMedia() {
  let socialMedia

  try {
    const { data: response } = await cms.get("/social-medias")
    socialMedia = response.data
  } catch (err) {
    console.error(err)
  }

  return socialMedia
}

export async function fetchSkills() {
  let skills

  const query = qs.stringify({
    populate: {
      skill: {
        populate: ['name'],
      },
    },
  })

  try {
    const { data: response } = await cms.get(`/skill-types?${query}`)
    skills = response.data
  } catch (err) {
    console.error(err)
  }

  return skills
}

export async function fetchJobExperience() {
  let jobs

  const query = qs.stringify({
    populate: {
      contracts: {
        populate: [
          'skills.name',
          'achievements.description'
        ]
      },
      achievements: {
        populate: ['description']
      },
      skills: {
        populate: ['name'],
      },
    },
    sort: 'start:desc'
  })

  try {
    const { data: response } = await cms.get(`/jobs?${query}`)
    jobs = response.data
  } catch (err) {
    console.error(err)
  }

  return jobs
}

export function extractAttributes(data: any) {
  return data.attributes
}

export function formatDate(date: string, format: string) {
  return dayjs(date).format(format)
}
