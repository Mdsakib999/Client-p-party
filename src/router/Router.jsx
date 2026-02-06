import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About/page.jsx";
import Contact from "../pages/Contact/page.jsx";
import Campaigns from "../pages/Campaigns/page.jsx";
import Candidates from "../pages/Candidates/page.jsx";
import CandidateDetails from "../pages/Candidates/CandidateDetails.jsx";
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
import BNP404Page from "../pages/404/page.jsx";
import ManageActivity from "../pages/Dashboard/ManageActivity/page.jsx";
import AddActivity from "../pages/Dashboard/AddActivity/page.jsx";
import CampaignDetail from "../pages/CampaignDetail/page.jsx";
import TermsAndConditions from "../pages/TermsAndConditions/page.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy/page.jsx";
import Vision from "../pages/Vision/page.jsx";
import FrameEditor from "../pages/FrameEditor/page.jsx";
import EditCandidate from "../pages/Dashboard/EditCandidate/page.jsx";
import ManageFrames from "../pages/Dashboard/ManageFrames/page.jsx";
import PhotoFrame from "../pages/PhotoFrame.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <BNP404Page />,
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
        path: "/campaigns/:slug",
        Component: CampaignDetail,
      },
      // {
      //   index: true,
      //   path: "/news",
      //   Component: AllNews,
      // },
      // {
      //   path: "/news/:slug",
      //   Component: NewsDetail,
      // },
      // {
      //   index: true,
      //   path: "/activities",
      //   Component: Activities,
      // },
      // {
      //   path: "/activities/:slug",
      //   Component: ActivityDetails,
      // },
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
        path: "/CreateFrame",
        Component: PhotoFrame,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/vision",
        Component: Vision,
      },
      {
        path: "/frame-editor",
        Component: FrameEditor,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "/terms-and-conditions",
        Component: TermsAndConditions,
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
            path: "add-activity",
            Component: withAuth(AddActivity, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "manage-candidates",
            Component: withAuth(ManageCandidates, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "edit-candidate/:id",
            Component: withAuth(EditCandidate, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "manage-news-articles",
            Component: withAuth(ManageNewsArticle, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "manage-activity",
            Component: withAuth(ManageActivity, ["SUPER_ADMIN", "ADMIN"]),
          },
          {
            path: "manage-frames",
            Component: withAuth(ManageFrames, ["SUPER_ADMIN", "ADMIN"]),
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
