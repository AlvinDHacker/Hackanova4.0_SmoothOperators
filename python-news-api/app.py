from flask import Flask, jsonify, request
from pygooglenews import GoogleNews
from typing import List, Dict
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

EMERGENCY_KEYWORDS = [
    'emergency', 'disaster', 'accident', 'heart attack', 'earthquake',
    'flood', 'fire', 'hurricane', 'tornado', 'tsunami',
    'medical emergency', 'catastrophe', 'crisis', 'evacuation',
    'casualty', 'injured', 'victims'
]

EMERGENCY_CATEGORIES = {
    'natural': ['earthquake', 'flood', 'hurricane', 'tornado', 'tsunami'],
    'medical': ['heart attack', 'medical emergency', 'hospital'],
    'accident': ['accident', 'crash', 'collision'],
    'fire': ['fire', 'blaze', 'burning'],
    'other': ['emergency', 'disaster', 'crisis']
}

SEVERITY_INDICATORS = {
    'high': ['mass casualty', 'fatal', 'death', 'severe', 'catastrophic', 'major'],
    'medium': ['injured', 'damage', 'emergency', 'evacuation'],
    'low': ['minor', 'small', 'limited']
}

def categorize_emergency(title: str, description: str) -> str:
    content = f"{title} {description}".lower()
    for category, keywords in EMERGENCY_CATEGORIES.items():
        if any(keyword in content for keyword in keywords):
            return category
    return 'uncategorized'

def assess_severity(title: str, description: str) -> str:
    content = f"{title} {description}".lower()
    if any(indicator in content for indicator in SEVERITY_INDICATORS['high']):
        return 'high'
    elif any(indicator in content for indicator in SEVERITY_INDICATORS['medium']):
        return 'medium'
    return 'low'

def is_emergency_related(title: str, description: str) -> bool:
    content = f"{title} {description}".lower()
    return any(keyword.lower() in content for keyword in EMERGENCY_KEYWORDS)

def get_emergency_news(country: str = 'IN', query: str = None) -> List[Dict]:
    gn = GoogleNews(country=country)
    if not query:
        query = ' OR '.join(EMERGENCY_KEYWORDS[:5])
    
    search_results = gn.search(query)
    emergency_news = []

    for item in search_results['entries']:
        title = item.title
        description = item.get('description', '')
        
        if is_emergency_related(title, description):
            emergency_article = {
                'title': title,
                'description': description,
                'source': item.get('source', {}).get('title', 'Unknown'),
                'link': item.link,
                'published': item.published,
                'emergencyType': categorize_emergency(title, description),
                'severity': assess_severity(title, description)
            }
            emergency_news.append(emergency_article)
    
    return emergency_news

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat()
    })

@app.route('/emergency-news', methods=['GET'])
def get_all_emergency_news():
    country = request.args.get('country', 'IN')
    try:
        news = get_emergency_news(country=country)
        return jsonify({
            'total': len(news),
            'articles': news
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/emergency-news/by-type/<emergency_type>', methods=['GET'])
def get_news_by_type(emergency_type):
    country = request.args.get('country', 'IN')
    try:
        news = get_emergency_news(country=country)
        filtered_news = [article for article in news if article['emergencyType'] == emergency_type]
        return jsonify({
            'type': emergency_type,
            'total': len(filtered_news),
            'articles': filtered_news
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/emergency-news/by-severity/<severity>', methods=['GET'])
def get_news_by_severity(severity):
    country = request.args.get('country', 'IN')
    try:
        news = get_emergency_news(country=country)
        filtered_news = [article for article in news if article['severity'] == severity]
        return jsonify({
            'severity': severity,
            'total': len(filtered_news),
            'articles': filtered_news
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/search/<keyword>', methods=['GET'])
def search_news(keyword):
    country = request.args.get('country', 'IN')
    try:
        news = get_emergency_news(country=country, query=keyword)
        return jsonify({
            'keyword': keyword,
            'total': len(news),
            'articles': news
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)