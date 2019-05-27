const price = require('./commands/price');
const usage = require('./commands/usage');

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', line => {
    let plans;

    try {
        plans = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'));
    } catch (error) {
        console.log(`An error occurred: ${error}`);
    }

    const output = [];
    const input = line.split(" ");
    const command = input[0];

    switch (command) {
        case 'price':
            const energyUsage = input[1];

            if (!energyUsage) {
                console.log('Please supply an energy usage amount');

                return;
            }

            output.push(price(energyUsage, plans).join('\n'));

            break;
        case 'usage': {
            const supplier = input[1];
            const plan = input[2];
            const price = input[3];

            if (!supplier || !plan || !price) {
                console.log('Please supply a valid plan');

                return;
            }

            output.push(usage({supplier, plan, price}, plans));

            break;
        }
        default:
            return;

    }

    output.forEach(data => console.log(data));
});
