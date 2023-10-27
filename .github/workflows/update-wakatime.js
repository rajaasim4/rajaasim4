const fs = require('fs');
const fetch = require('node-fetch');

const GH_TOKEN = process.env.GH_TOKEN;
const username = 'YOUR_WAKATIME_USERNAME';

async function updateWakaTimeStats() {
  const response = await fetch(`https://wakatime.com/api/v1/users/${rajaasim4}/stats/last_7_days`, {
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
    },
  });

  const data = await response.json();

  const wakaTimeStats = `![WakaTime Stats](https://github-readme-stats.vercel.app/api/wakatime?username=${username}&custom_title=WakaTime%20Stats&layout=compact)`;

  const readmePath = 'README.md';
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');

  const startTag = '<!--START_SECTION:waka-->';
  const endTag = '<!--END_SECTION:waka-->';
  const startIdx = readmeContent.indexOf(startTag);
  const endIdx = readmeContent.indexOf(endTag);

  if (startIdx !== -1 && endIdx !== -1) {
    readmeContent =
      readmeContent.slice(0, startIdx + startTag.length) +
      `\n${wakaTimeStats}\n` +
      readmeContent.slice(endIdx);
    fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    console.log('WakaTime stats updated successfully!');
  } else {
    console.log('Could not find start and end tags for WakaTime stats in your README.');
  }
}

updateWakaTimeStats();
