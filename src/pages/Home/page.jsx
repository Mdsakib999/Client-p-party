import About from "../../components/Home/About";
import React, { useEffect, useState } from "react";
import Activity from "../../components/Home/Activity";
import { Candidates } from "../../components/Home/Candidates";
import Hero from "../../components/Home/Hero";
import Legacy from "../../components/Home/Legacy";
import Highlights from "../../components/Home/Highlights";
// import NewsSection from "../../components/Home/NewsSection";
// import { useGetAllNewsArticlesQuery } from "../../redux/features/newsArticle/newsArticle.api";
import TimedPopup from "../../components/Campaign/TimedPopup";
import AutoPlayAudio from "../../components/AutoPlayAudio";

const Home = () => {
  // const { data: newsArticles, isLoading } = useGetAllNewsArticlesQuery({
  //   limit: 4,
  // });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("homePopupShown");

    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("homePopupShown", "true");
      }, 5000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* {showPopup && <TimedPopup onClose={() => setShowPopup(false)} />} */}

      <div>
        <Hero />
        <AutoPlayAudio></AutoPlayAudio>
        <Legacy />
        <About />
        <Candidates />
        <Highlights />
        {/* <Activity /> */}
        {/* <NewsSection
        newsArticles={newsArticles?.data}
        articleLoader={isLoading}
      /> */}
      </div>
    </>
  );
};

export default Home;
