import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/page.jsx";
import About from "../pages/About/page.jsx";
import Contact from "../pages/Contact/page.jsx";
import Campaigns from "../pages/Campaigns/page.jsx";
import News from "../pages/News/page.jsx";
import Candidates from "../pages/Candidates/page.jsx";
import CandidateDetails from "../pages/Candidates/CandidateDetails.jsx";
import NewsDetail from "../pages/NewsDetail/page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        index: true,
        path: "/candidates",
        Component: Candidates,
      },
      {
        index: true,
        path: "/candidates/:id",
        Component: CandidateDetails,
      },
      {
        index: true,
        path: "/campaigns",
        Component: Campaigns,
      },
      {
        index: true,
        path: "/news",
        Component: News,
      },
      {
        path: "/news/:slug",
        Component: NewsDetail,
      },
      {
        index: true,
        path: "/campaigns",
        Component: Campaigns,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/about",
        Component: About,
      },
    ],
  },
]);

export default router;
