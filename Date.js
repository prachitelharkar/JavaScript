//Javascript Code
function solution(D) {
  const days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = {};

  for (const day of days) {
    result[day] = 0;
  }

  const sortedKeys = Object.keys(D).sort();

  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    const value = D[key];
    const date = new Date(key);
    const day = days[date.getUTCDay()];

    result[day] += value;


    if (i < sortedKeys.length - 1) {
      const nextKey = sortedKeys[i + 1];
      const currentDate = new Date(key);
      const nextDate = new Date(nextKey);
      const diffInDays = Math.round((nextDate - currentDate) / (1000 * 60 * 60 * 24));

      for (let j = 1; j < diffInDays; j++) {
        const missingDate = new Date(currentDate.getTime() + j * 24 * 60 * 60 * 1000);
        const missingDayOfWeek = days[missingDate.getUTCDay()];
        result[missingDayOfWeek] = (D[key] + D[nextKey]) / 2;
      }
    }
  }

  return result;
}

const D1 = {
  "2020-01-01": 4,
  "2020-01-02": 4,
  "2020-01-03": 6,
  "2020-01-04": 8,
  "2020-01-05": 2,
  "2020-01-06": -6,
  "2020-01-07": 2,
  "2020-01-08": -2,
};

const D2 = {
  '2020-01-01': 6,
  '2020-01-04': 12,
  '2020-01-05': 14,
  '2020-01-06': 2,
  '2020-01-07': 4,
};

console.log(solution(D1));
console.log(solution(D2));
//Output:
//{ Sun: 2, Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8 }
//{ Sun: 14, Mon: 2, Tue: 4, Wed: 6, Thu: 9, Fri: 9, Sat: 12 }