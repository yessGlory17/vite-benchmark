/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const { randomBytes } = require('crypto');
require('dotenv').config()

console.log('Standart Import Components starting...')

const API_KEY = process.env.VITE_API_KEY;

const componentTemplate = (componentName, city) => `
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ${componentName} = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log('Rendered Component:'+ '${componentName}')
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}');
        console.log('sending request: ', response)
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);


  useEffect(()=>{
    console.log('weather: ', weather)
  },[weather])

  return (
    <div style={{border:'1px solid red', padding: 10}}>
      <h1>${componentName}</h1>
      <h2>City: {weather?.name}</h2>
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather.description}</p>
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

  console.warn('Starting component generate...')
  for (let i = 1; i <= count; i++) {
    const componentName = `Component${randomBytes(4).toString('hex')}`;
    const cities = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney'];
    const city = cities[Math.floor(Math.random() * cities.length)];

    const componentContent = componentTemplate(componentName, city);

    const componentFile = path.join(componentsDir, `${componentName}.js`);

    fs.writeFileSync(componentFile, componentContent);

    importStatements.push(`import ${componentName} from './components/${componentName}';`);

    componentUsage += `<${componentName} />\n`;
  }
  console.warn('Components generated!')
  const appContent = `
import React from 'react';
import axios from 'axios';
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
  console.warn('Genrating App.jsx file...')
  fs.writeFileSync('./src/App.jsx', appContent, { encoding: 'utf8', flag: 'w+' });
  console.warn('Generated App.jsx file!')
  console.log(`Components and App.jsx created ${count} successfully!`);
};

generateRandomComponents(1000);
