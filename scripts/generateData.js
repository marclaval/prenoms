const fs = require('fs');
const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

let output = {
    beginYear: 1900,
    endYear: 2015,
    names: {}
};
const input = fs.readFileSync('./scripts/nat2015.txt', "binary");
const lines = iconv.decode(input, "ISO-8859-1").split('\n');

const stats = new Array(output.endYear - output.beginYear + 1);
const statsM = new Array(output.endYear - output.beginYear + 1);
const statsF = new Array(output.endYear - output.beginYear + 1);

for (let i = 1; i < lines.length; i++) {
    const [gender, name, year, times] = lines[i].trim().split('\t').map((token) => {
        const parsed = parseInt(token);
        return isNaN(parsed) ? token : parsed;
    });
    if (!isNaN(year) && !name.startsWith('_')) {
        const key = name + '_' + gender;
        if (!output.names.hasOwnProperty(key)) {
            output.names[key] = {
                name: capitalize(name),
                gender: gender === 1 ? 'm' : 'f',
                years: new Array(output.endYear - output.beginYear + 1)
            };
        }
        output.names[key].years[year - output.beginYear] = times;
      stats[year - output.beginYear] = (stats[year - output.beginYear] ? stats[year - output.beginYear] : 0 ) + times;
      if (gender === 1) {
        statsM[year - output.beginYear] = (statsM[year - output.beginYear] ? statsM[year - output.beginYear] : 0 ) + times;
      } else {
        statsF[year - output.beginYear] = (statsF[year - output.beginYear] ? statsF[year - output.beginYear] : 0 ) + times;
      }
    }
}

output['stats'] = stats;
output['statsM'] = statsM;
output['statsF'] = statsF;

fs.writeFileSync('./src/assets/data.json', JSON.stringify(output).replace(/null/g, '0'), 'utf-8');

function capitalize(s) {
    return capitalizeParts(capitalizeParts(s.toLowerCase(), '-'), '\'');
}

function capitalizeParts(s, separator) {
    return s.split(separator).map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(separator)
}
