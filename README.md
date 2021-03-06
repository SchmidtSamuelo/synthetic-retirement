# Synthetic Retirement Backtest

Synthetic retirement is an extrapolation of the extremely popular [**Trinity Study**](https://en.wikipedia.org/wiki/Trinity_study) paper that was published in 1998.

While the Trinity Study is referenced consistently in the FIRE and general financial community, the datapoints for retirement can be improved upon by simulating more 30-year subsets of retirement. More specifically, on a month-to-month basis instead of on a year-to-year basis. This adjustment results in 12x more retirement timeframes to backtest.

Other withdrawal strategies such as variable and more conservative fixed withdrawal rates will also be explored.

In addition, this will also attempt to backtest the accuracy of the '7% rule' which is used to project investment returns (doneish, ~7.02% average).

## Instructions to replicate or run this locally
Clone this repository
`npm install`
`npm run fetch_data`

This will fetch the data if it is missing.

## Data

The data is taken from [**Robert Shiller's Stock market data from Irrational Exuberance -- Princeton University Press 2000, Broadway Books 2001, 2nd ed., 2005**](http://www.econ.yale.edu/~shiller/data.htm). This data is a monthly simulated S&P 500 history that starts in January 1871 and is still being updated with new stock market data as of July 2021. Currently, there are over 1800 different 30-year retirement windows that can be backtested with this data.

## Future decisions

A fork of this repository will likely be made to house a python/jupyter notebook version for use with future Machine Learning applications.

Why did I decide to start with Node/Typescript instead of Python? Good question.
