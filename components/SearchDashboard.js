import { useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Chart.jsに必要なモジュールを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- 撮影場所ランキング (Top 10) ---
function LocationChart({ locationMap }) {
  const chartData = useMemo(() => {
    // locationMap ( { "場所": [ID, ID...] } ) を集計
    const sortedLocations = Object.entries(locationMap)
      .map(([location, ids]) => ({
        location: location,
        count: ids.length, // 種の数
      }))
      .sort((a, b) => b.count - a.count) // 多い順にソート
      .slice(0, 10); // 上位10件

    return {
      labels: sortedLocations.map(d => d.location),
      datasets: [
        {
          label: '撮影種数',
          data: sortedLocations.map(d => d.count),
          backgroundColor: 'rgba(56, 189, 248, 0.6)', // sky-400
          borderColor: 'rgba(2, 132, 199, 1)', // sky-600
          borderWidth: 1,
        },
      ],
    };
  }, [locationMap]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">撮影場所ランキング (Top 10)</h3>
      <Bar
        data={chartData}
        options={{
          indexAxis: 'y', // 横棒グラフ
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
}

// --- 水深別グラフ ---
function DepthChart({ depthMap, depthRanges }) {
  const chartData = useMemo(() => {
    // depthRanges ( [{key: '0-1m', label: '超浅場...'}...] ) に基づいて集計
    const data = depthRanges.map(range => {
      const speciesIds = depthMap[range.key] || [];
      return speciesIds.length;
    });

    return {
      labels: depthRanges.map(range => range.label),
      datasets: [
        {
          label: '撮影種数',
          data: data,
          backgroundColor: [
            'rgba(56, 189, 248, 0.7)', // sky-400
            'rgba(14, 165, 233, 0.7)', // sky-500
            'rgba(2, 132, 199, 0.7)', // sky-600
            'rgba(3, 105, 161, 0.7)', // sky-700
            'rgba(7, 89, 133, 0.7)', // sky-800
          ],
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  }, [depthMap, depthRanges]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">水深別 撮影種数</h3>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }}
      />
    </div>
  );
}


// --- メインコンポーネント ---
export default function SearchDashboard({ locationMap, monthMap, depthMap, depthRanges }) {
  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-xl mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-center text-sky-800 mb-8">データ可視化</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LocationChart locationMap={locationMap} />
        <DepthChart depthMap={depthMap} depthRanges={depthRanges} />
      </div>
      {/* TODO: 月別グラフ (LineChart) もここに追加可能 */}
    </div>
  );
}