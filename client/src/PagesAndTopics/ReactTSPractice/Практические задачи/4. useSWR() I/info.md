SWR is a popular library of data fetching.

Let's try to implement the basic usage by ourselves.

import React from 'react'
function App() {
  const { data, error } = useSWR('/api', fetcher)
  if (error) return <div>failed</div>
  if (!data) return <div>loading</div>
  return <div>succeeded</div>
}
this is not to replicate the true implementation of useSWR()
The first argument key is for deduplication, we can safely ignore it for now