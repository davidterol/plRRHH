// import { AVAILABLE_HOSTS, LANGUAGES } from "@/config/variables"
// import { headers } from "next/headers"

// const NODE_ENV = process.env.NODE_ENV

// export async function getLanguage() {
//   const headersList = headers()
//   const host = headersList.get("host")
//   return host ? AVAILABLE_HOSTS[NODE_ENV][host] : "N/A"
// }

// export async function getLanguageID() {
//   const langcode = await getLanguage()
//   return Object.entries(LANGUAGES).filter(
//     ([, value]) => value.langcode === langcode,
//   )[0][0]
// }
