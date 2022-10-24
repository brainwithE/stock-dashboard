import moment from 'moment';

export const transformChartData = data => {
  delete data.s;

  const keyMapping = {
    t: 'timestamp',
    c: 'close',
    l: 'low',
    h: 'high',
    v: 'volume',
    o: 'open',
  };

  const formatChartData = Object.entries(data).map(([key, val]: any) => {
    return val.map(v => {
      if (key === 't') v = moment.unix(v).format('MM/DD/YYYY');

      return { [keyMapping[key]]: v };
    });
  });

  let mainChartData = formatChartData[0];
  let remainingData = formatChartData.splice(1);

  for (let x = 0; x < remainingData.length; x++) {
    mainChartData = mainChartData.map((value, index) => {
      return Object.assign({}, { ...value, ...remainingData[x][index] });
    });
  }

  return mainChartData;
};
