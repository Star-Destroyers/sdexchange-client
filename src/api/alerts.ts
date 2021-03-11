export default {
  async objectInfo (name: string) {
    const response = await fetch(`http://localhost:8000/explorer/ztfobject/${name}/`)

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }

    const results = await response.json()
    return results
  },

  async lasairQuery (queryId: string) {
    const response = await fetch(`http://localhost:8000/explorer/lasair_query?query_id=${queryId}`)

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }

    const results = await response.json()
    if (results.error) {
      throw new Error(results.error)
    }
    return results
  }
}
