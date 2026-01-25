import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const [cf, setCf] = useState("");
  const [lc, setLc] = useState("");

  const [cfData, setCfData] = useState(null);
  const [lcData, setLcData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const c = localStorage.getItem("cf") || "";
    const l = localStorage.getItem("lc") || "";

    setCf(c);
    setLc(l);

    if (c || l) fetchData(c, l);
  }, []);

  const fetchData = async (c, l) => {
    setLoading(true);
    setError("");

    try {
      if (c) {
        const r = await fetch(
          `http://localhost:5000/api/codeforces/${encodeURIComponent(c)}`
        );
        setCfData(await r.json());
      }
      if (l) {
        const r = await fetch(
          `http://localhost:5000/api/leetcode/${encodeURIComponent(l)}`
        );
        setLcData(await r.json());
      }
    } catch {
      setError("Failed to fetch data");
    }

    setLoading(false);
  };

  const save = () => {
    localStorage.setItem("cf", cf);
    localStorage.setItem("lc", lc);
    fetchData(cf, lc);
  };

  const lcChartData = lcData
    ? [
        { name: "Easy", value: lcData.easy },
        { name: "Medium", value: lcData.medium },
        { name: "Hard", value: lcData.hard }
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-black text-white p-4 flex justify-between">
        <h1 className="font-bold text-lg">CP Dashboard</h1>
        <button onClick={logout} className="bg-white text-black px-3 rounded">
          Logout
        </button>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* INPUTS */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <input
            className="border p-2 w-full mb-3"
            placeholder="Codeforces username"
            value={cf}
            onChange={e => setCf(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-4"
            placeholder="LeetCode username"
            value={lc}
            onChange={e => setLc(e.target.value)}
          />
          <button
            onClick={save}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save Profiles
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* DASHBOARD */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* CODEFORCES */}
          {cfData && !cfData.error && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold text-xl mb-3">Codeforces</h2>
              <p>Handle: {cfData.handle}</p>
              <p>Rating: {cfData.rating}</p>
              <p>Rank: {cfData.rank}</p>
              <p>Max Rating: {cfData.maxRating}</p>
              <p>Contests: {cfData.contests}</p>
            </div>
          )}

          {/* LEETCODE */}
          {lcData && !lcData.error && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold text-xl mb-3">LeetCode</h2>
              <p>Total Solved: {lcData.total}</p>
              <p>Ranking: {lcData.ranking}</p>

              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={lcChartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label
                    >
                      {lcChartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
