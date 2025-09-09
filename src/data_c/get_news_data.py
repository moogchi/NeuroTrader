import requests
import os
import pandas as pd
from dotenv import load_dotenv
import argparse
from datetime import datetime, timedelta
from polygon import RESTClient
import time


def fetch_news(ticker, api_key, limit):
    client = RESTClient(api_key=api_key)

    all_news= []
    try:
       for news_item in client.list_ticker_news(ticker=ticker, limit = limit):
           all_news.append(news_item)
    except Exception as e:
        print(f"An error occured: {e}")

    print(f"Amount of News Fetched: {len(all_news)}")
    return all_news

def main():
    parser = argparse.ArgumentParser(description="Fetch News Information from Polygon.io")
    parser.add_argument('ticker', help = "The stock symbol (e.g., AAPL).")
    parser.add_argument('--output_dir', default = 'data/raw', help = "The directory to save csv file")
    parser.add_argument('--limit', default = 1000, help = "News fetch limit")
    args = parser.parse_args()

    #Pull API key for Polygon
    load_dotenv()
    api_key = os.getenv('POLYGON_API_KEY')

    if not api_key:
        print("No API key found")
        return
    
    news_data = fetch_news(args.ticker, api_key, args.limit)

    if not news_data:
        print("No News data available")
        return
    
    #Convert News list to Pandas Dataframe
    df = pd.DataFrame(news_data)

    #Rename Column
    df_clean = df[['published_utc','title']].copy()
    df_clean.rename(columns={'published_utc': 'Date', 'title': 'Headline'}, inplace = True)

    #Convert Date column to just the date part
    df_clean['Date'] = pd.to_datetime(df_clean['Date']).dt.date

    os.makedirs(args.output_dir, exist_ok=True)
    output_path = os.path.join(args.output_dir, f"{args.ticker}_news.csv")
    df_clean.to_csv(output_path, index=False)

    print(f"Successfully saved news data to {output_path}")

if __name__ == '__main__':
    main()




