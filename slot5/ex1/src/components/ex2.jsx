import React from 'react';

export default function Exercise6to8() {
  // Exercise 6: Sort + slice
  const companies = [
    { name: "Google", category: "Tech", start: 1998, end: 2020 },
    { name: "Apple", category: "Tech", start: 1976, end: 2015 },
    { name: "Facebook", category: "Social", start: 2004, end: 2018 },
    { name: "Amazon", category: "E-commerce", start: 1994, end: 2010 },
    { name: "Microsoft", category: "Tech", start: 1975, end: 2012 }
  ];

  const top3 = [...companies]
    .sort((a, b) => a.end - b.end)
    .slice(0, 3)
    .map(company => `${company.name} - ${company.end}`);

  // Exercise 7: Spread vs rest
  const company0New = { ...companies[0], start: companies[0].start + 1 };
  const concatAll = (...arrays) => arrays.reduce((result, arr) => [...result, ...arr], []);

  // Exercise 8: Reduce nâng cao
  const agesList = [15, 22, 18, 30, 16, 25, 13, 19, 28];

  const stats = agesList.reduce((acc, age) => ({
    total: acc.total + age,
    min: Math.min(acc.min, age),
    max: Math.max(acc.max, age)
  }), { total: 0, min: Infinity, max: -Infinity });

  const buckets = agesList.reduce((acc, age) => {
    if (age >= 13 && age <= 19) acc.teen++;
    else if (age >= 20) acc.adult++;
    return acc;
  }, { teen: 0, adult: 0 });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-green-400 font-mono">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">JavaScript Array Methods - Exercises 6-8</h1>
      
      {/* Exercise 6 */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl mb-4 text-yellow-400">6️⃣ Exercise 6: Sort + Slice</h2>
        <p className="mb-3 text-gray-300">Top 3 công ty kết thúc sớm nhất:</p>
        <ul className="space-y-1">
          {top3.map((company, index) => (
            <li key={index} className="text-cyan-400">• {company}</li>
          ))}
        </ul>
      </div>

      {/* Exercise 7 */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl mb-4 text-yellow-400">7️⃣ Exercise 7: Spread vs Rest</h2>
        <div className="space-y-3">
          <div>
            <p className="text-gray-300 mb-2">Original company:</p>
            <p className="text-cyan-400 bg-gray-700 p-2 rounded">{JSON.stringify(companies[0])}</p>
          </div>
          <div>
            <p className="text-gray-300 mb-2">Modified company (start year + 1):</p>
            <p className="text-cyan-400 bg-gray-700 p-2 rounded">{JSON.stringify(company0New)}</p>
          </div>
          <div>
            <p className="text-gray-300 mb-2">concatAll([1,2],[3],[4,5]):</p>
            <p className="text-cyan-400 bg-gray-700 p-2 rounded">[{concatAll([1,2],[3],[4,5]).join(', ')}]</p>
          </div>
        </div>
      </div>

      {/* Exercise 8 */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl mb-4 text-yellow-400">8️⃣ Exercise 8: Reduce nâng cao</h2>
        <div className="space-y-3">
          <div>
            <p className="text-gray-300 mb-2">Danh sách tuổi: <span className="text-cyan-400">[{agesList.join(', ')}]</span></p>
          </div>
          <div>
            <p className="text-gray-300">Thống kê:</p>
            <ul className="ml-4 space-y-1 text-cyan-400">
              <li>• Total: <strong>{stats.total}</strong></li>
              <li>• Min: <strong>{stats.min}</strong></li>
              <li>• Max: <strong>{stats.max}</strong></li>
              <li>• Average: <strong>{(stats.total / agesList.length).toFixed(1)}</strong></li>
            </ul>
          </div>
          <div>
            <p className="text-gray-300">Phân nhóm tuổi:</p>
            <ul className="ml-4 space-y-1 text-cyan-400">
              <li>• Teen (13-19): <strong>{buckets.teen}</strong> người</li>
              <li>• Adult (20+): <strong>{buckets.adult}</strong> người</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center text-green-500 font-bold text-lg">
        ✅ Hoàn thành tất cả exercises!
      </div>
    </div>
  );
}