import React, { useState } from 'react';
import SwipeCards from '@pages/main/swipe-cards';
import NewsCard, {NewsCardProps} from '@pages/main/news-card';
import news from './news';
const newsCategories = [
  "World News",
  "Technology and Science",
  "Health and Lifestyle",
  "Culture",
  "Business and Economy",
  "Entertainment",
  "Sports",
  "Other"
];



const MainPage: React.FC = () => {

  return <div className={"main-page page"}>
    <SwipeCards>
    {
      news.slice(0,2).map((newsItem, i) => {
        return <NewsCard key={i} {...(newsItem as unknown as NewsCardProps)} />
      })
    }
    </SwipeCards>
  </div>
};

export default MainPage;
