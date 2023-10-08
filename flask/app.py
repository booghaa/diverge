from flask import Flask, render_template, request, flash, redirect, url_for
import pandas as pd
import numpy as np
from statsmodels.tsa.arima_model import ARIMA
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
plt.style.use('ggplot')
import math, random
from datetime import datetime
import datetime as dt
import yfinance as yf
import preprocessor as p
import re
from sklearn.linear_model import LinearRegression
from textblob import TextBlob
import constants as ct
import nltk
nltk.download('punkt')


import warnings
warnings.filterwarnings("ignore")
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


app = Flask(__name__)



@app.after_request
def add_header(response):
    response.headers['Pragma'] = 'no-cache'
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Expires'] = '0'
    return response



@app.route('/gethist')
def get_historical():
    quote=request.args.get('quote')
    end = datetime.now()
    start = datetime(end.year-2,end.month,end.day)
    data = yf.download(quote, start=start, end=end)
    df = pd.DataFrame(data=data)
    df.to_csv(''+quote+'.csv')
    if(df.empty):
        from alpha_vantage.timeseries import TimeSeries
        ts = TimeSeries(key='EUIY8ECEM4DJSHYU',output_format='pandas')
        data, meta_data = ts.get_daily_adjusted(symbol=quote +":", outputsize='full')
        data=data.head(503).iloc[::-1]
        data=data.reset_index()
        df=pd.DataFrame()
        df['Date']=data['date']
        df['Open']=data['1. open']
        df['High']=data['2. high']
        df['Low']=data['3. low']
        df['Close']=data['4. close']
        df['Adj Close']=data['5. adjusted close']
        df['Volume']=data['6. volume']
             


    forecast_out = int(7)

    df['Close after n days'] = df['Close'].shift(-forecast_out)

    df_new=df[['Close','Close after n days']]


    y =np.array(df_new.iloc[:-forecast_out,-1])
    y=np.reshape(y, (-1,1))

    X=np.array(df_new.iloc[:-forecast_out,0:-1])

    X_to_be_forecasted=np.array(df_new.iloc[-forecast_out:,0:-1])
        

    X_train=X[0:int(0.8*len(df)),:]
    X_test=X[int(0.8*len(df)):,:]
    y_train=y[0:int(0.8*len(df)),:]
    y_test=y[int(0.8*len(df)):,:]

    from sklearn.preprocessing import StandardScaler
    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)
    
    X_to_be_forecasted=sc.transform(X_to_be_forecasted)
    
    clf = LinearRegression(n_jobs=-1)
    clf.fit(X_train, y_train)
    
    y_test_pred=clf.predict(X_test)
    y_test_pred=y_test_pred*(1.04)
    
    """import matplotlib.pyplot as plt2
    fig = plt2.figure(figsize=(7.2,4.8),dpi=65)
    plt2.plot(y_test,label='Actual Price' )
    plt2.plot(y_test_pred,label='Predicted Price')
    
    plt2.legend(loc=4)
    plt2.savefig('static/LR.png')
    plt2.close(fig)
    """
    
    error_lr = math.sqrt(mean_squared_error(y_test, y_test_pred))
    
    
    forecast_set = clf.predict(X_to_be_forecasted)
    forecast_set=forecast_set*(1.04)
    mean=forecast_set.mean()
    lr_pred=forecast_set[0,0]
    lr_pred1=forecast_set[1,0]
    lr_pred2=forecast_set[2,0]
    lr_pred3=forecast_set[3,0]
    lr_pred4=forecast_set[4,0]
    lr_pred5=forecast_set[5,0]
    lr_pred6=forecast_set[6,0]
    
    print()
    print("##############################################################################")
    print("Tomorrow's ",quote," Closing Price Prediction by Linear Regression: ",lr_pred)
    print("Linear Regression RMSE:",error_lr)
    print("##############################################################################")
    return str(lr_pred) + "," + str(lr_pred1) + "," + str(lr_pred2) + "," + str(lr_pred3) + "," + str(lr_pred4) + "," + str(lr_pred5) + "," + str(lr_pred6)

"""quote=nm
#Try-except to check if valid stock symbol
try:
    get_historical(quote)
except:
    return render_template('index.html',not_found=True)
else:

    #************** PREPROCESSUNG ***********************
    df = pd.read_csv(''+quote+'.csv')
    print("##############################################################################")
    print("Today's",quote,"Stock Data: ")
    today_stock=df.iloc[-1:]
    print(today_stock)
    print("##############################################################################")
    df = df.dropna()
    code_list=[]
    for i in range(0,len(df)):
        code_list.append(quote)
    df2=pd.DataFrame(code_list,columns=['Code'])
    df2 = pd.concat([df2, df], axis=1)
    df=df2

    df, lr_pred, forecast_set,mean,error_lr=LIN_REG_ALGO(df)
    
    idea, decision=recommending(df, polarity,today_stock,mean)
    print()
    print("Forecasted Prices for Next 7 days:")
    print(forecast_set)
    today_stock=today_stock.round(2)
"""

if __name__ == '__main__':
   app.run()