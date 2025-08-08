import os
from dotenv import load_dotenv
load_dotenv()
import requests
import pandas as pd
import argparse


def get_price_history(ticker_symbol, compact='compact'):
    api_key = os.getenv('ALPHA_VANTAGE_API_KEY')
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={ticker_symbol}&outputsize={compact}&apikey={api_key}'
    r = requests.get(url)
    data=r.json()
    
    refined_data = data["Time Series (Daily)"]

    # Convert the data to a DataFrame
    df = pd.DataFrame(refined_data).T
    df.index = pd.to_datetime(df.index)
    df.index.name = 'Date'
    df = df.astype(float)
    df = df.rename(columns={
        '1. open': 'Open',
        '2. high': 'High',
        '3. low': 'Low',
        '4. close': 'Close',
        '5. volume': 'Volume'
    })

    output_dir = 'data/raw'
    os.makedirs(output_dir, exist_ok=True)

    file_path = os.path.join(output_dir, f'{ticker_symbol}_price_history.csv')

    df.to_csv(file_path)



    
    # output_path = f'{ticker_symbol}_news.json'

    # with open(output_path, 'w') as outfile:
    #     json.dump(data, outfile, indent=4)

def main():
    parser = argparse.ArgumentParser(description="Fetch history ")
    parser.add_argument('ticker', help="The stock ticker symbol (e.g., AAPL)")
    parser.add_argument('--size', default = 'compact', help = 'compact for past 100 days full for all historical data')

    args = parser.parse_args()

    get_price_history(args.ticker, args.size)

if __name__== '__main__':
    main()