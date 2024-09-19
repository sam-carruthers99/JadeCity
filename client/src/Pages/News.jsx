import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { fetchNewsData } from '../utils/fetchNewsData.js';


const News = () => {
    
    
    const [news, setNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const data = await fetchNewsData();
            setNews(data);
        };

        getNews();
        
    }, []);
    
    
    return (
        <div>
            <h1>All News</h1>
            <p>
                Stay tuned for the latest updates and news from Jade
                City Records!
            </p>
            {
            news.map((news, index) => (
                    <NewsCard
                        key={index}
                        title={news[0]}
                        description={news[1]}
                        img={news[2]}
                    />
            ))}
        </div>
    )
};

export default News;