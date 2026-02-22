/**
 * Simulated APIs for testing. These mock real external services.
 */

class MockWeatherAPI {
    constructor(shouldFail = false) { this.shouldFail = shouldFail; }
    async fetch(city) {
        if (this.shouldFail) throw new Error('Weather service unavailable');
        return { city, temp: 22, humidity: 65, condition: 'Partly Cloudy' };
    }
}

class MockAirQualityAPI {
    constructor(shouldFail = false) { this.shouldFail = shouldFail; }
    async fetch(city) {
        if (this.shouldFail) throw new Error('AQ service unavailable');
        return { city, aqi: 42, level: 'Good', pollutant: 'PM2.5' };
    }
}

module.exports = { MockWeatherAPI, MockAirQualityAPI };
