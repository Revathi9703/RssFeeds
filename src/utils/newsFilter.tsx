export const filterNewsByWeather = (weatherTemp: number, articles: any[]) => {
  let keywords: string[] = [];

  if (weatherTemp < 10) {
    keywords = ["tragedy", "crisis", "disaster", "loss", "bankruptcy"];
  } else if (weatherTemp > 30) {
    keywords = ["war", "terror", "threat", "panic", "danger"];
  } else {
    keywords = ["win", "success", "joy", "celebration", "achievement"];
  }

  console.log("Filtering News with Keywords:", keywords);
  const filteredNews = articles.filter((article) =>
    keywords.some((keyword) => article.title.toLowerCase().includes(keyword))
  );

  console.log("Filtered News:", filteredNews);
  return filteredNews;
};
