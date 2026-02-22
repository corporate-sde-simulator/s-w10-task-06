const DataAggregator = require('../src/dataAggregator');
const { MockWeatherAPI, MockAirQualityAPI } = require('../src/mockAPIs');

describe('DataAggregator', () => {
    test('both APIs succeed', async () => {
        const agg = new DataAggregator(new MockWeatherAPI(), new MockAirQualityAPI());
        const result = await agg.getDashboard('London');
        expect(result.status).toBe('complete');
        expect(result.weather).toBeDefined();
        expect(result.airQuality).toBeDefined();
    });

    test('weather fails gracefully', async () => {
        const agg = new DataAggregator(new MockWeatherAPI(true), new MockAirQualityAPI());
        const result = await agg.getDashboard('London');
        expect(result.status).toBe('partial');
        expect(result.airQuality).toBeDefined();
    });

    test('both fail', async () => {
        const agg = new DataAggregator(new MockWeatherAPI(true), new MockAirQualityAPI(true));
        const result = await agg.getDashboard('London');
        expect(result.status).toBe('error');
    });
});
