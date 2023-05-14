const baseUrl = 'https://api.weatherstation.zaidin.online';
// const baseUrl = "http://localhost:3000";

const lookupTable = new Map([
    [1, "Settled Fine"],
    [2, "Fine Weather"],
    [3, "Fine, Becoming Less Settled"],
    [4, "Fairly Fine, Showery Later"],
    [5, "Showery, Becoming More Unsettled"],
    [6, "Unsettled, Rain Later"],
    [7, "Rain at Times, Worse Later"],
    [8, "Rain at Times, Becoming Very Unsettled"],
    [9, "Very Unsettled, Rain"],
    [10, "Settled Fine"],
    [11, "Fine Weather"],
    [12, "Fine, Possibly Showers"],
    [13, "Fairly Fine, Showers Likely"],
    [14, "Showery, Bright Intervals"],
    [15, "Changeable, Some Rain"],
    [16, "Unsettled, Rain at Times"],
    [17, "Rain at Frequent Intervals"],
    [18, "Very Unsettled, Rain"],
    [19, "Stormy, Much Rain"],
    [20, "Settled Fine"],
    [21, "Fine Weather"],
    [22, "Becoming Fine"],
    [23, "Fairly Fine, Improving"],
    [24, "Fairly Fine, Possibly Showers Early"],
    [25, "Showery Early, Improving"],
    [26, "Changeable, Mending"],
    [27, "Rather Unsettled, Clearing Later"],
    [28, "Unsettled, Probably Improving"],
    [29, "Unsettled, Short Fine Intervals"],
    [30, "Very Unsettled, Finer at Times"],
    [31, "Stormy, Possibly Improving"],
    [32, "Stormy, Much Rain"],
  ]);

export { baseUrl, lookupTable };