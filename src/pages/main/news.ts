import image1 from '@assets/bitcoin-etf.webp';
import image2 from '@assets/ai-ethics.webp';
import image3 from '@assets/supply-chain.webp';
const news = [
  {
    "category": "Technology and Science",
    "title": "SEC greenlights 11 bitcoin ETFs amid hacking incident",
    "description": "The SEC has approved 11 bitcoin ETFs, allowing investors to access the crypto market without buying bitcoin directly. The decision came after a hacker falsely announced the approval on the SEC’s X account.",
    "url": "https://www.engadget.com/sec-approves-bitcoin-etfs-for-real-this-time-224125584.html",
    "author": "Karissa Bell",
    "source": "engadget",
    "image": image1
  },
  {
    "category": "Technology and Science",
    "title": "AI Ethics: Navigating the Future of Artificial Intelligence",
    "description": "As artificial intelligence continues to evolve, experts are calling for more rigorous ethical standards to ensure AI technologies benefit society while minimizing risks.",
    "url": "https://www.techscience.com/ai-ethics-future.html",
    "author": "Ada Lovelace",
    "source": "techscience",
    "image": image2
  },
  {
    "category": "Business and Economy",
    "title": "Global Supply Chain Challenges Persist in 2024",
    "description": "Despite efforts to stabilize global supply chains, businesses worldwide continue to face significant challenges, including material shortages and logistical disruptions.",
    "url": "https://www.businesseconomy.com/supply-chain-challenges-2024.html",
    "author": "Marco Polo",
    "source": "businesseconomy",
    "image": image3
  },
  /*
  {
    "category": "Entertainment",
    "title": "Virtual Reality Concerts: The New Frontier in Live Music",
    "description": "Virtual reality technology is transforming the live music scene, offering fans immersive concert experiences from the comfort of their homes.",
    "url": "https://www.entertainmentnow.com/vr-concerts.html",
    "author": "David Bowie",
    "source": "entertainmentnow",
    "image": "images/vr-concert.jpg"
  },
  {
    "category": "Sports",
    "title": "Esports in the Olympics: A New Age of Athletic Competition",
    "description": "With esports' inclusion in the 2024 Olympic Games, the line between traditional and digital sports continues to blur, heralding a new era in competitive athletics.",
    "url": "https://www.sportsnews.com/esports-olympics-2024.html",
    "author": "Lee Faker",
    "source": "sportsnews",
    "image": "images/esports-olympics.jpg"
  },
  {
    "category": "Health and Lifestyle",
    "title": "Mindfulness and Mental Health: A Growing Trend in Wellness",
    "description": "Mindfulness practices are becoming increasingly popular as effective tools for enhancing mental health and overall well-being in our fast-paced world.",
    "url": "https://www.healthylife.com/mindfulness-mental-health.html",
    "author": "Deepak Chopra",
    "source": "healthylife",
    "image": "images/mindfulness.jpg"
  },
  {
    "category": "Culture",
    "title": "The Renaissance of Indigenous Arts: Celebrating Cultural Heritage",
    "description": "Indigenous arts are experiencing a renaissance, with artists and communities around the world reclaiming and celebrating their cultural heritage through various forms of creative expression.",
    "url": "https://www.culturemag.com/indigenous-arts-renaissance.html",
    "author": "Frida Kahlo",
    "source": "culturemag",
    "image": "images/indigenous-arts.jpg"
  },
  {
    "category": "Other",
    "title": "Urban Green Spaces: The Key to Sustainable Cities",
    "description": "As urban areas continue to grow, the development of green spaces has become crucial for sustainable city living, offering environmental, health, and social benefits.",
    "url": "https://www.urbanenvironment.com/green-spaces-sustainable-cities.html",
    "author": "Jane Jacobs",
    "source": "urbanenvironment",
    "image": "images/green-spaces.jpg"
  },
  {
    "category": "World News",
    "title": "Renewed Efforts in Nuclear Disarmament Talks",
    "description": "Global leaders are making renewed efforts in nuclear disarmament talks, aiming to reduce the nuclear threat and promote international peace and security.",
    "url": "https://www.worldnews.com/nuclear-disarmament-efforts.html",
    "author": "Albert Einstein",
    "source": "worldnews",
    "image": "images/nuclear-disarmament.jpg"
  },
  {
    "category": "World News",
    "title": "Global Climate Summit 2024: New Pledges and Innovations",
    "description": "The 2024 Global Climate Summit concluded with groundbreaking commitments from over 50 nations to curb greenhouse emissions and promote renewable energy solutions.",
    "url": "https://www.worldnews.com/global-climate-summit-2024.html",
    "author": "Mia Zhang",
    "source": "worldnews",
    "image": "images/climate-summit.jpg"
  },
  {
    "category": "Health and Lifestyle",
    "title": "Revolutionary Plant-based Vaccine Shows Promise in Early Trials",
    "description": "Scientists have developed a new plant-based vaccine that shows high efficacy rates against multiple viruses, marking a significant breakthrough in medical science.",
    "url": "https://www.healthylife.com/plant-based-vaccine-success.html",
    "author": "Liam Smith",
    "source": "healthylife",
    "image": "images/plant-based-vaccine.jpg"
  },
  {
    "category": "Culture",
    "title": "Art and Digital Reality: Exploring the Future of Creativity",
    "description": "A new exhibit blurs the lines between art and technology, showcasing how digital realities are shaping the future of creative expression.",
    "url": "https://www.culturemag.com/art-digital-reality.html",
    "author": "Sophia Loren",
    "source": "culturemag",
    "image": "images/art-digital.jpg"
  },
  {
    "category": "Business and Economy",
    "title": "Economic Forecast 2024: Trends and Predictions",
    "description": "Experts weigh in on the economic trends for 2024, predicting a shift towards sustainable business practices and the rise of tech-driven markets.",
    "url": "https://www.businesseconomy.com/economic-forecast-2024.html",
    "author": "John Doe",
    "source": "businesseconomy",
    "image": "images/economic-forecast.jpg"
  },
  {
    "category": "Entertainment",
    "title": "The Most Anticipated Movies of 2024: What to Watch",
    "description": "From blockbuster sequels to indie gems, here's your ultimate guide to the must-see movies of 2024.",
    "url": "https://www.entertainmentnow.com/anticipated-movies-2024.html",
    "author": "Emily Ratajkowski",
    "source": "entertainmentnow",
    "image": "images/movies-2024.jpg"
  },
  {
    "category": "Sports",
    "title": "Olympic Games 2024: What's New in This Edition",
    "description": "The Olympic Games 2024 are set to introduce several new sports and events, aiming to make the games more inclusive and exciting than ever.",
    "url": "https://www.sportsnews.com/olympic-games-2024.html",
    "author": "Carlos Hernandez",
    "source": "sportsnews",
    "image": "images/olympic-games.jpg"
  },
  {
    "category": "Technology and Science",
    "title": "Breakthrough in Quantum Computing: New Era of Technology",
    "description": "Researchers have achieved a major breakthrough in quantum computing, potentially unlocking new possibilities in computing power and cybersecurity.",
    "url": "https://www.techscience.com/quantum-breakthrough.html",
    "author": "Rachel Green",
    "source": "techscience",
    "image": "images/quantum-computing.jpg"
  },
  {
    "category": "Other",
    "title": "Exploring the Depths: New Species Discovered in the Mariana Trench",
    "description": "Scientists have discovered new species in the unexplored depths of the Mariana Trench, shedding light on the mysteries of the deep sea.",
    "url": "https://www.oceanicdiscoveries.com/new-species-mariana.html",
    "author": "Jack Sparrow",
    "source": "oceanicdiscoveries",
    "image": "images/mariana-trench.jpg"
  },
  {
    "category": "World News",
    "title": "International Cybersecurity Pact Signed by 40 Nations",
    "description": "In a landmark move, 40 nations have come together to sign an international cybersecurity pact, aiming to enhance global internet security.",
    "url": "https://www.globalnews.com/international-cybersecurity-pact.html",
    "author": "Natasha Romanoff",
    "source": "globalnews",
    "image": "images/cybersecurity-pact.jpg"
  }

   */
]

export default news;
