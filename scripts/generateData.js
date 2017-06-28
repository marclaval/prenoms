const fs = require('fs');
const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

let output = {
    benginYear: 1900,
    endYear: 2015,
    names: {}
};
const input = fs.readFileSync('./scripts/nat2015.txt', "binary");
const lines = iconv.decode(input, "ISO-8859-1").split('\n');

for (let i = 1; i < lines.length; i++) {
    const [gender, name, year, times] = lines[i].trim().split('\t').map((token) => {
        const parsed = parseInt(token);
        return isNaN(parsed) ? token : parsed;
    });
    if (!isNaN(year)) {
        const key = name + '_' + gender;
        if (!output.names.hasOwnProperty(key)) {
            output.names[key] = {
                name: capitalize(name),
                gender: gender === 1 ? 'm' : 'f',
                years: new Array(output.endYear - output.benginYear + 1)
            };
        }
        output.names[key].years[year - output.benginYear] = times;
    }
}

fs.writeFileSync('./src/assets/data.json', JSON.stringify(output).replace(/null/g, '0'), 'utf-8');

function capitalize(s) {
    return capitalizeParts(capitalizeParts(s.toLowerCase(), '-'), '\'');
}

function capitalizeParts(s, separator) {
    return s.split(separator).map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(separator)
}