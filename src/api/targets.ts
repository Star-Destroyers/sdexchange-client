import { HTTP } from '@/http'

export default {
  async getTargets (limit: number, offset: number) {
    return await HTTP.get(`/targets/?limit=${limit}&offset=${offset}`)
  }
}
