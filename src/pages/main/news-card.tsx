// NewsCard.tsx

import React from 'react';
import styles from './news-card.module.scss';
export interface NewsCardProps {
  url: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
}
import SaveIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';


const newsColors:  {
  [key: string]: {
    name: string;
    hex: string;
  }
} = {
  "World News": {
    "name": "Crimson",
    "hex": "#DC143C"
  },
  "Technology and Science": {
    "name": "Royal Blue",
    "hex": "#4169E1"
  },
  "Health and Lifestyle": {
    "name": "Lime Green",
    "hex": "#32CD32"
  },
  "Culture": {
    "name": "Gold",
    "hex": "#FFD700"
  },
  "Business and Economy": {
    "name": "Slate Gray",
    "hex": "#708090"
  },
  "Entertainment": {
    "name": "Magenta",
    "hex": "#FF00FF"
  },
  "Sports": {
    "name": "Orange",
    "hex": "#FFA500"
  },
  "Other": {
    "name": "Light Gray",
    "hex": "#D3D3D3"
  }
};

const NewsCard: React.FC<NewsCardProps> = ({ url, title, description, category, content, image }) => {
    const backgroundColor = newsColors[category].hex;
    const backgroundColorSemiTransparent = newsColors[category].hex + "bb";
  return (
    <div className={styles.newsCard} style={{ backgroundImage: `url(${image})` }}>

      <div className={styles.newsContent} style={{
        backgroundColor:backgroundColorSemiTransparent
      }}>
        <h1>{title}</h1>
        <div style={{
          height: "8px",
        }}/>
        <p>{description}</p>
        <div className={styles.newsFooterBottom} >
          <div className={styles.newsFooterButtons}>

            <SaveIcon style={{ fontSize: "2.5em" }}/>

            <ShareIcon style={{ fontSize: "2.5em" }}/>
          </div>
        <button
          className={styles.readMoreButton}
          style={{
            backgroundColor
          }}
        >Read More</button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
