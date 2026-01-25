const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/codeforces/:handle", async (req, res) => {
  try {
    const handle = decodeURIComponent(req.params.handle);

    const userRes = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );
    const userData = await userRes.json();

    if (userData.status !== "OK") {
      return res.status(404).json({ error: "User not found" });
    }

    const ratingRes = await fetch(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );
    const ratingData = await ratingRes.json();

    const user = userData.result[0];

    res.json({
      handle: user.handle,
      rating: user.rating || 0,
      rank: user.rank || "unrated",
      maxRating: user.maxRating || 0,
      contests: ratingData.result?.length || 0
    });
  } catch {
    res.status(500).json({ error: "Codeforces API error" });
  }
});

app.get("/api/leetcode/:username", async (req, res) => {
  try {
    const username = decodeURIComponent(req.params.username);

    const query = `
      query {
        matchedUser(username: "${username}") {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    const user = data.data?.matchedUser;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const stats = user.submitStats.acSubmissionNum;

    const easy = stats.find(s => s.difficulty === "Easy")?.count || 0;
    const medium = stats.find(s => s.difficulty === "Medium")?.count || 0;
    const hard = stats.find(s => s.difficulty === "Hard")?.count || 0;
    const total = stats.find(s => s.difficulty === "All")?.count || 0;

    res.json({
      total,
      easy,
      medium,
      hard,
      ranking: user.profile.ranking
    });
  } catch {
    res.status(500).json({ error: "LeetCode API error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
