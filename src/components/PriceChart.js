import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Loader from './Loader';

function PriceChart({ selected, startDate, endDate }) {
  const [date, setDate] = useState([]);
  const [price, setPrice] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getHistory = async function () {
      const url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${selected}&start=${startDate}&end=${endDate}`;
      setLoader(true);
      const data = await fetch(url);
      const { bpi } = await data.json();

      setDate(Object.keys(bpi));
      setPrice(Object.values(bpi));
      setLoader(false);
    };
    getHistory();
  }, [selected, startDate, endDate]);

  const config = {
    series: [
      {
        name: 'Price',
        data: price,
      },
    ],
    options: {
      dataLabels: {
        enabled: true,
      },

      stroke: {
        curve: 'smooth',
      },

      title: {
        text: `Historic Data of Bitcoin in ${selected}`,
        align: 'left',
      },

      xaxis: {
        categories: date,
        title: {
          text: 'Date',
        },
      },

      yaxis: {
        title: {
          text: `Price in ${selected}`,
        },
      },
    },
  };

  return (
    <>
      <div style={{ width: '50%', background: '#fff', margin: 'auto' }}>
        {loader ? (
          <Loader />
        ) : (
          <Chart options={config.options} series={config.series} type='area' />
        )}
      </div>
    </>
  );
}

export default PriceChart;
