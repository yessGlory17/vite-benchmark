/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const { randomBytes } = require('crypto');
require('dotenv').config()

const API_KEY = process.env.VITE_API_KEY;
console.log('API KEY: ', API_KEY)


console.log('Lazy Loading Components script starting...')

const componentTemplate = (componentName, city) => `
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ${componentName} = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}');
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div style={{ border: '1px solid red', padding: 10 }}>
      <h1>${componentName}</h1>
      <h2>City: {weather?.name}</h2>
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default ${componentName};
`;

const generateRandomComponents = async (count) => {
  const componentsDir = path.join(__dirname, 'components');

  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
  }

  const importStatements = [];
  let componentUsage = '';

  for (let i = 1; i <= count; i++) {
    const componentName = `Component${randomBytes(4).toString('hex')}`;
    const cities = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney'];
    const city = cities[Math.floor(Math.random() * cities.length)];

    const componentContent = componentTemplate(componentName, city);

    const componentFile = path.join(componentsDir, `${componentName}.js`);

    fs.writeFileSync(componentFile, componentContent);

    importStatements.push(`const ${componentName} = React.lazy(() => import('./components/${componentName}'));`);

    componentUsage += `<React.Suspense fallback={<div>Loading...</div>}><${componentName} /></React.Suspense>\n`;
  }

  const appContent = `
import React from 'react';
${importStatements.join('\n')}

const App = () => {
  return (
    <div>
      <h1>App Component</h1>
      ${componentUsage}
    </div>
  );
};

export default App;
`;

  fs.writeFileSync('./src/App.jsx', appContent, { encoding: 'utf8', flag: 'w+' });
  console.log(`Components and App.jsx created ${count} successfully!`);
};

generateRandomComponents(1000);
