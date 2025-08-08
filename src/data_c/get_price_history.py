import os
from dotenv import load_dotenv
load_dotenv()
import requests
import json
import pandas as pd


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

    df.to_csv(f'{ticker_symbol}_price_history.csv')



    
    # output_path = f'{ticker_symbol}_news.json'

    # with open(output_path, 'w') as outfile:
    #     json.dump(data, outfile, indent=4)
 
get_price_history("NVDA")