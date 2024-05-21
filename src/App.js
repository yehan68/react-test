import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const ThreeTest = lazy(() => import('./views/ThreeTest'))

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/three-test" element={ <ThreeTest /> } ></Route>
      </Routes>
    </Suspense>
  )
}

export default App
