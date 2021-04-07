export default {
  async objectInfo (name: string) {
    const response = await fetch(`${process.env.VUE_APP_API_ROOT}/explorer/ztfobject/${name}/`)

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }

    const results = await response.json()
    return results
  },

  async lasairQuery (queryId: string) {
    const response = await fetch(`${process.env.VUE_APP_API_ROOT}/explorer/lasair_query/?query_id=${queryId}`)

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }

    const results = await response.json()
    if (results.error) {
      throw new Error(results.error)
    }
    return results
  },

  async tnsCone (ra: number, dec: number) {
    const response = await fetch(`${process.env.VUE_APP_API_ROOT}/explorer/tns/cone/?ra=${ra}&dec=${dec}`)
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }

    const results = await response.json()
    if (results.error) {
      throw new Error(results.error)
    }
    return results
  },

  async tnsDetail (objname: string) {
    const response = await fetch(`${process.env.VUE_APP_API_ROOT}/explorer/tns/detail/${objname}`)
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
