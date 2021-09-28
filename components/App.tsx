// import React, { useEffect } from 'react';
// import {
//   Route,
//   Switch,
//   useHistory,
// } from 'react-router-dom';
// import { Header, SecureApplicationWrapper, PageWrapper } from '../components';
// import { navigationStack } from '../services';
// import {
//   HomeDetailsPage,
//   HomesPage,
//   VisitedHomePage,
//   VisitedHomesPage,
//   ApplicationPage,
//   ApplicationSuccess,
//   PageNotFound,
// } from '../pages';
// import { ROUTES } from '../constants';

// export default function App() {
//   const history = useHistory();
//   useEffect(() => (
//     navigationStack.init(
//       (listener: any) => history.listen(listener),
//       (pathname: string) => history.push(pathname),
//     )
//   ), []);

//   return (
//     <>
//       <Header />

//       <PageWrapper>
//         <Switch>
//           <Route exact path={ROUTES.HOMES.route}>
//             <HomesPage />
//           </Route>
//           <Route exact path={ROUTES.HOME_DETAILS.route}>
//             <HomeDetailsPage />
//           </Route>

//           <Route exact path={ROUTES.VISITED_HOMES.route}>
//             <SecureApplicationWrapper>
//               <VisitedHomesPage />
//             </SecureApplicationWrapper>
//           </Route>
//           <Route exact path={ROUTES.VISITED_HOME.route}>
//             <SecureApplicationWrapper>
//               <VisitedHomePage />
//             </SecureApplicationWrapper>
//           </Route>
//           <Route exact path={ROUTES.APPLICATION.route}>
//             <SecureApplicationWrapper>
//               <ApplicationPage />
//             </SecureApplicationWrapper>
//           </Route>
//           <Route exact path={ROUTES.APPLICATION_SUCCESS.route}>
//             <SecureApplicationWrapper>
//               <ApplicationSuccess />
//             </SecureApplicationWrapper>
//           </Route>

//           <Route>
//             <PageNotFound />
//           </Route>
//         </Switch>
//       </PageWrapper>
//     </>
//   );
// }
