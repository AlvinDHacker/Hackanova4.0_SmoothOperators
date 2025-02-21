const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const EMERGENCY_KEYWORDS = [
    'emergency',
    'disaster',
    'accident',
    'heart attack',
    'earthquake',
    'flood',
    'fire',
    'hurricane',
    'tornado',
    'tsunami',
    'medical emergency',
    'catastrophe',
    'crisis',
    'evacuation',
    'casualty',
    'injured',
    'victims'
];

async function fetchEmergencyNews(country = 'us', pageSize = 100) {
    try {
        const newsApiKey = 'd4975c25b23e47aab4ac4fa2f54ed4ae';
        const newsApiUrl = 'https://newsapi.org/v2/top-headlines';
        
        const response = await axios.get(newsApiUrl, {
            params: {
                country: country,
                pageSize: pageSize,
                apiKey: newsApiKey,
            },
        });

        const emergencyArticles = filterEmergencyArticles(response.data.articles);
        return emergencyArticles;

    } catch (error) {
        console.error('Error fetching emergency news:', error.message);
        return [];
    }
}

function filterEmergencyArticles(articles) {
    if (!articles) return [];

    return articles.filter(article => {
        const content = `${article.title} ${article.description}`.toLowerCase();
        return EMERGENCY_KEYWORDS.some(keyword => content.includes(keyword.toLowerCase()));
    }).map(article => ({
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt,
        emergencyType: categorizeEmergency(article),
        severity: assessSeverity(article)
    }));
}

function categorizeEmergency(article) {
    const content = `${article.title} ${article.description}`.toLowerCase();
    
    const categories = {
        'natural': ['earthquake', 'flood', 'hurricane', 'tornado', 'tsunami'],
        'medical': ['heart attack', 'medical emergency', 'hospital'],
        'accident': ['accident', 'crash', 'collision'],
        'fire': ['fire', 'blaze', 'burning'],
        'other': ['emergency', 'disaster', 'crisis']
    };

    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => content.includes(keyword))) {
            return category;
        }
    }
    
    return 'uncategorized';
}

function assessSeverity(article) {
    const content = `${article.title} ${article.description}`.toLowerCase();
    
    const severityIndicators = {
        high: ['mass casualty', 'fatal', 'death', 'severe', 'catastrophic', 'major'],
        medium: ['injured', 'damage', 'emergency', 'evacuation'],
        low: ['minor', 'small', 'limited']
    };

    if (severityIndicators.high.some(indicator => content.includes(indicator))) {
        return 'high';
    } else if (severityIndicators.medium.some(indicator => content.includes(indicator))) {
        return 'medium';
    } else {
        return 'low';
    }
}

app.get('/emergency-news', async (req, res) => {
    const { country = 'us', pageSize = 100 } = req.query;
    const emergencyNews = await fetchEmergencyNews(country, pageSize);
    res.json({
        total: emergencyNews.length,
        articles: emergencyNews
    });
});

app.get('/emergency-news/by-type/:type', async (req, res) => {
    const { type } = req.params;
    const { country = 'us', pageSize = 100 } = req.query;
    
    const emergencyNews = await fetchEmergencyNews(country, pageSize);
    const filteredNews = emergencyNews.filter(article => article.emergencyType === type);
    
    res.json({
        type,
        total: filteredNews.length,
        articles: filteredNews
    });
});

app.get('/emergency-news/by-severity/:level', async (req, res) => {
    const { level } = req.params;
    const { country = 'us', pageSize = 100 } = req.query;
    
    const emergencyNews = await fetchEmergencyNews(country, pageSize);
    const filteredNews = emergencyNews.filter(article => article.severity === level);
    
    res.json({
        severity: level,
        total: filteredNews.length,
        articles: filteredNews
    });
});

async function searchNewsByKeyword(keyword) {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: keyword,
                apiKey: 'd4975c25b23e47aab4ac4fa2f54ed4ae'
            }
        });

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error searching news:', error.message);
        return {
            success: false,
            error: error.message,
            errorCode: error.response?.status || 500
        };
    }
}

async function searchNewsWithFilters(keyword, fromDate, toDate, sortBy = 'popularity') {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: keyword,
                from: fromDate,
                to: toDate,
                sortBy: sortBy,
                apiKey: 'd4975c25b23e47aab4ac4fa2f54ed4ae'
            }
        });

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error searching news:', error.message);
        return {
            success: false,
            error: error.message,
            errorCode: error.response?.status || 500
        };
    }
}

app.get('/search/:keyword', async (req, res) => {
    const { keyword } = req.params;
    const result = await searchNewsByKeyword(keyword);

    if (!result.success) {
        return res.status(result.errorCode || 500).json({
            error: result.error,
            message: 'Failed to fetch news'
        });
    }

    res.json(result.data);
});

app.get('/search', async (req, res) => {
    const { 
        q,
        from,
        to,
        sortBy = 'popularity'
    } = req.query;

    if (!q) {
        return res.status(400).json({
            error: 'Missing required parameter: q (keyword)'
        });
    }

    const result = await searchNewsWithFilters(q, from, to, sortBy);

    if (!result.success) {
        return res.status(result.errorCode || 500).json({
            error: result.error,
            message: 'Failed to fetch news'
        });
    }

    res.json(result.data);
});

async function fetchEmergencyNewsEverything(pageSize = 100, sortBy = 'publishedAt') {
    try {
        const newsApiKey = 'd4975c25b23e47aab4ac4fa2f54ed4ae';
        const newsApiUrl = 'https://newsapi.org/v2/everything';
        
        const emergencyQuery = [
            'emergency',
            'disaster',
            'accident',
            'crisis',
            'catastrophe'
        ].join(' OR ');

        const response = await axios.get(newsApiUrl, {
            params: {
                q: emergencyQuery,
                pageSize: pageSize,
                sortBy: sortBy,
                language: 'en',
                apiKey: newsApiKey,
            },
        });

        const emergencyArticles = filterEmergencyArticles(response.data.articles);
        return emergencyArticles;

    } catch (error) {
        console.error('Error fetching emergency news from everything endpoint:', error.message);
        return [];
    }
}

app.get('/emergency-news/everything', async (req, res) => {
    const { 
        pageSize = 100, 
        sortBy = 'publishedAt'
    } = req.query;

    const emergencyNews = await fetchEmergencyNewsEverything(
        parseInt(pageSize),
        sortBy
    );

    res.json({
        total: emergencyNews.length,
        sortBy: sortBy,
        articles: emergencyNews
    });
});

app.listen(PORT, () => {
    console.log('\n🚨 Emergency News Monitor running on port ' + PORT);
    console.log('\nAvailable endpoints:');
    console.log('\n1. Basic Emergency News:');
    console.log('   - GET /emergency-news');
    console.log('   - GET /emergency-news/everything');
    console.log('   - GET /health');
    
    console.log('\n2. Filtered Emergency News:');
    console.log('   - GET /emergency-news/by-type/:type');
    console.log('   - GET /emergency-news/by-severity/:level');
    
    console.log('\n3. Search Endpoints:');
    console.log('   - GET /search/:keyword');
    console.log('   - GET /search?q=keyword&from=YYYY-MM-DD&to=YYYY-MM-DD&sortBy=popularity');
    
    console.log('\nExample queries:');
    console.log('   http://localhost:' + PORT + '/emergency-news');
    console.log('   http://localhost:' + PORT + '/emergency-news/by-type/natural');
    console.log('   http://localhost:' + PORT + '/emergency-news/by-severity/high');
    console.log('   http://localhost:' + PORT + '/search/disaster');
    console.log('   http://localhost:' + PORT + '/emergency-news/everything?pageSize=50&sortBy=relevancy');
    
    console.log('\nServer is ready to handle requests! 🚀\n');
});
