import { useState, useEffect } from 'react'

export const useFetch = (service) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  // let response = service().then(res => console.log(res))
  // console.log(response)

  useEffect(() => {
    console.log('IN')
    setLoading(true)
    setData(null)
    setError(null)
    service()
      .then(response => {
        return response.json().then(data => {
          console.log(data)
        })
      })
    // setLoading(false);
    // if (response.status === 'ok'){
    // setData(response.data)
    // }
    // else {
    // setError(response.status)
    // }
  }, [service])

  return { data, loading, error }
}

    return { data, loading, error }
};