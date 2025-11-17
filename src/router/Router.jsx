import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About/page.jsx";
import Contact from "../pages/Contact/page.jsx";
import Campaigns from "../pages/Campaigns/page.jsx";
import AllNews from "../pages/News/page.jsx";
import Candidates from "../pages/Candidates/page.jsx";
import CandidateDetails from "../pages/Candidates/CandidateDetails.jsx";
import NewsDetail from "../pages/NewsDetail/page.jsx";
import Dashboard from "../pages/Dashboard/page.jsx";
import Overview from "../pages/Dashboard/Overview/page.jsx";
import CreateCandidate from "../pages/Dashboard/CreateCandidate/page.jsx";
import ManageCandidates from "../pages/Dashboard/ManageCandidates/page.jsx";
import Donate from "../pages/Dashboard/Donate/page.jsx";
import ManageAccount from "../pages/Dashboard/ManageAccount/page.jsx";
import LoginPage from "../pages/Login/page.jsx";
import RegisterPage from "../pages/Register/page.jsx";
import VerifyPage from "../pages/Verify/page.jsx";
import ResetPassword from "../pages/ResetPassword/page.jsx";
import ForgotPassword from "../pages/ForgotPassword/page.jsx";
import withPublic from "../utils/withPublic.jsx";
import withAuth from "../utils/withAuth.jsx";
import CreateNewsArticle from "../pages/Dashboard/CreateNewsArticle/page.jsx";
import Home from "../pages/Home/page.jsx";
import ManageNewsArticle from "../pages/Dashboard/ManageNewsArticle/page.jsx";

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
        Component: AllNews,
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
      {
        path: "/dashboard",
        Component: withAuth(Dashboard, ["SUPER_ADMIN", "ADMIN", "USER"]),
        children: [
          {
            index: true,
            Component: withAuth(ManageAccount, [
              "SUPER_ADMIN",
              "ADMIN",
              "USER",
            ]),
          },
          {
            path: "overview",
            Component: withAuth(Overview, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "create-candidate",
            Component: withAuth(CreateCandidate, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "create-news-article",
            Component: withAuth(CreateNewsArticle, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "manage-candidates",
            Component: withAuth(ManageCandidates, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "manage-news-articles",
            Component: withAuth(ManageNewsArticle, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "donate",
            Component: withAuth(Donate, ["SUPER_ADMIN", "ADMIN", "USER"]),
          },
        ],
      },
      {
        path: "/login",
        Component: withPublic(LoginPage),
      },
      {
        path: "/register",
        Component: withPublic(RegisterPage),
      },
      {
        path: "/verify",
        Component: withPublic(VerifyPage),
      },
      {
        path: "/reset-password",
        Component: withPublic(ResetPassword),
      },
      {
        path: "/forgot-password",
        Component: withPublic(ForgotPassword),
      },
    ],
  },
]);

export default router;
