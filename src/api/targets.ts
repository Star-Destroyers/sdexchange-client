export default {
  async getTargets (limit: number, offset: number) {
    const response = await fetch(`${process.env.VUE_APP_API_ROOT}/targets/?limit=${limit}&offset=${offset}`)

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }

    const results = await response.json()
    return results
  }
}
