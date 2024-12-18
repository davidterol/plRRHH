import config from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"

export const getLocalApi = async () => {
  const payload = await getPayloadHMR({
    config,
  })
  return payload
}
