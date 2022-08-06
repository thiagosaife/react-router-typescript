import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

const Home = React.lazy(() => import('./Pages/Home'))
const About = React.lazy(() => import('./Pages/About'))
const PageNotFound = React.lazy(() => import('./Pages/PageNotFound'))

type PathObject = {
  path: string,
  name: string,
  element: JSX.Element,
}
interface IPaths {
  map(arg0: (p: PathObject, i: number) => JSX.Element): React.ReactNode;
}

function App() {
  const paths:IPaths = [
    {
      path: '/',
      name: 'Home',
      element: <Home />,
    },
    {
      path: '/about',
      name: 'About',
      element: <About />,
    },
    {
      path: '*',
      name: 'PageNotFound',
      element: <PageNotFound />,
    }
  ]

  return (
    <Router>
      <div>
        <ul>
          {
            paths
              .map(
                (p, i) =>
                  <li key={i}>
                    <Link to={p.path}>{p.name}</Link>
                  </li>
              )
          }
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {
            paths
              .map(
                (p, i) =>
                  <Route key={i} path={p.path} element={p.element} />
                )
          }
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
