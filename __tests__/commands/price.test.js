const price = require('../../commands/price');
const plans = require('../../plans.json');

describe('price tests', () => {
    // it('should return the correct suppliers, plans and total costs when given usage 1000', () => {
    //     expect(price(1000, plans)).toEqual([
    //         'eon,variable,108.68',
    //         'edf,fixed,111.25',
    //         'ovo,standard,120.23',
    //         'bg,standing-charge,121.33',
    //     ]);
    //
    // });
    //
    // it('should return the correct suppliers, plans and total costs when given usage 2000', () => {
    //     expect(price(2000, plans)).toEqual([
    //         'edf,fixed,205.75',
    //         'eon,variable,213.68',
    //         'bg,standing-charge,215.83',
    //         'ovo,standard,235.73',
    //     ]);
    // });

    it('should return a  subset of the correct suppliers, plans and total costs when given usage 5000', () => {
        expect(price(5000, plans)).toEqual(expect.arrayContaining([
            'southern-electric,1 Year Fixed Price,756.89',
            'extra-energy,SaverPlus Fixed Price Sept 2015 v1,332.15',
            'green-energy-uk,Still,910.68',
            // 'ovo,Greener Energy Fixed (Online),641.83', // expected with discount
            // 'ovo,Greener Energy Fixed (Online),607.4', // without discount
            'ovo,Greener Energy Fixed (Online),583.55', // with discount
        ]));
    });

    it('should return a  subset of the correct suppliers, plans and total costs when given usage 10', () => {
        expect(price(10, plans)).toEqual(expect.arrayContaining([
            'ovo,Greener Energy Fixed (Online),106.22',
        ]));
    });

    it('should return all the correct suppliers, plans and total costs when given usage 5000', () => {
        expect(price(5000, plans)).toEqual([
            'extra-energy,SaverPlus Fixed Price Sept 2015 v1,332.15',
            'flow-energy,Thames Online Fixed September 2015,375.64',
            'edf,Blue+Price Promise February 2016,395.56',
            'ecotricity,Green Electricity,415.0',
            'telecom-plus,Value,422.25',
            'marksandspencers,M&S Energy Fix & Save 2,428.26',
            'e-dot-on,Age UK Fixed 2 Year v2,432.32',
            'british-gas,Fixed Price January 2017,435.55',
            'e-dot-on,E.ON Energy Fixed 2 Year v5,451.83',
            'extra-energy,PowerPlus September 2015 v1,462.12',
            'loco,Planet,472.66',
            'loco,Pocket Fixed 10,474.32',
            'edf,Standard (Variable),475.73',
            'telecom-plus,Double Gold,476.54',
            'npower,Price Fix June 2016,481.61',
            'ovo,Cheaper Energy Fixed,498.69',
            'ovo,Cheaper Energy (Fixed to June 2016),511.02',
            'british-gas,Standard,512.26',
            'telecom-plus,Double Gold Fixed Price 1,512.64',
            'southern-electric,Standard,514.66',
            'southern-electric,Fixed Price Mar 17,523.31',
            'woodlandtrust,Greener Energy,531.99',
            'npower,Online Price Fix October 2015,541.49',
            'scottishpower,Online Fixed Price Energy September 2015,550.84',
            'the-co-operative,Fixed - May 2016,553.7',
            'ebico,EquiPower,554.65',
            'e-dot-on,E.ON Energy Plan,555.17',
            'ovo,Better Energy Fixed,557.83',
            'ovo,Greener Energy Fixed,560.29',
            'loco,Pocket Fixed March 2017,567.33',
            'good-energy,Good Energy (Electricity Only),571.23',
            'the-co-operative,Fixed - March 2017,582.1',
            'extra-energy,Variable Price v1,589.59',
            'ovo,Better Energy (Fixed to June 2016),591.52',
            'first-utility,iSave Fixed September 2015 (v27) Electricity only,608.06',
            'ovo,Greener Energy Fixed (Online),641.83',
            'pioneer,Rate Saver 36M Fixed 1408,647.9',
            'pioneer,Rate Wise Variable,648.88',
            'edf,Blue+Price Freeeeze July 2017,674.31',
            'isupplyenergy,iFix 201509,697.8',
            'pioneer,Rate Saver 12M Fixed 1408,721.84',
            'woodlandtrust,Better Energy,741.84',
            'loco,Pocket,753.95',
            'southern-electric,1 Year Fixed Price,756.89',
            'e-dot-on,E.ON Energy Fixed 1 Year v7,781.07',
            'pioneer,Rate Saver 24M Fixed 1408,782.29',
            'green-energy-uk,Sparkling,809.83',
            'sainsburys,Standard,842.03',
            'first-utility,iSave Fixed October 2016 (v28) Electricity only,856.72',
            'the-co-operative,Pioneer - DD,868.9',
            'marksandspencers,M&S Energy Standard Energy,882.7',
            'first-utility,iSave Fixed September 2017 (v22) (Electricity only),889.94',
            'scottishpower,Help Beat Cancer Fixed Price Energy September 2016 online,893.58',
            'green-energy-uk,Still,910.68',
            'scottishpower,Online Standard,913.16',
            'telecom-plus,Gold,943.99',
            'first-utility,iSave Everyday v2 Electricity Only,993.16',
            'npower,Standard,1001.93',
            'spark-energy,Direct Debit Saver,1132.58',
        ]);
    });
});
