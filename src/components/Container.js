import { useEffect, useState } from 'react';
import PriceChart from './PriceChart';

function Container() {
  // states

  const [usd, setUsd] = useState('usd');
  const [gbp, setGbp] = useState('gbp');
  const [eur, setEur] = useState('eur');

  const [startDate, setStartDate] = useState('2021-04-01');
  const [endDate, setEndDate] = useState('2021-09-21');

  const [selected, setSelected] = useState('EUR');

  useEffect(() => {
    const getCurrency = async function () {
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
      const data = await fetch(url);
      const {
        bpi: { USD, GBP, EUR },
      } = await data.json();

      setUsd(USD.rate_float);
      setGbp(GBP.rate_float);
      setEur(EUR.rate_float);
    };
    getCurrency();
  }, [selected]);

  return (
    <section className='text-gray-600 body-font'>
      <div className='max-w-7xl mx-auto'>
        <div className='container px-5 py-24 mx-auto flex flex-wrap items-center'>
          <PriceChart
            usd={usd}
            eur={eur}
            gbp={gbp}
            selected={selected}
            startDate={startDate}
            endDate={endDate}
          />
          <div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
            {selected === 'USD' && (
              <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
                {' '}
                1 BTC = {usd} USD
              </h2>
            )}
            {selected === 'GPB' && (
              <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
                {' '}
                1 BTC = {gbp} GBP
              </h2>
            )}
            {selected === 'EUR' && (
              <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
                {' '}
                1 BTC = {eur} EUR
              </h2>
            )}

            <div className='relative mb-4'>
              <label
                htmlFor='full-name'
                className='leading-7 text-sm text-gray-600'
              >
                Select Currency
              </label>

              <select
                className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm my-2 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 '
                id='menu-button'
                aria-expanded='true'
                aria-haspopup='true'
                onChange={(e) => setSelected(e.target.value)}
              >
                <svg
                  className='-mr-1 ml-2 h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fill-rule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  />
                </svg>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='GPB'>GPB</option>
              </select>
            </div>

            <label
              htmlFor='full-name'
              className='leading-7 text-sm text-gray-600'
            >
              Start Date
            </label>

            <input
              type='date'
              id='full-name'
              name='full-name'
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 my-2 leading-8 transition-colors duration-200 ease-in-out'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label
              htmlhtmlFor='full-name'
              className='leading-7 text-sm text-gray-600'
            >
              End Date
            </label>

            <input
              type='date'
              id='full-name'
              name='full-name'
              className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 my-2 leading-8 transition-colors duration-200 ease-in-out'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <p className='text-xs text-gray-500 mt-3'>
              Data Fetched from CoinDesk API.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Container;
