/**
 * Data Aggregator — combines data from multiple API sources.
 *
 * Feature Ship: Implement the TODO stubs.
 */

class DataAggregator {
    constructor(weatherAPI, airQualityAPI) {
        this.weatherAPI = weatherAPI;
        this.airQualityAPI = airQualityAPI;
        this.timeout = 5000;
    }

    async getWeather(city) {
        // Call this.weatherAPI.fetch(city)
        // Return the data or { error: 'Weather API failed', data: null }
    }

    async getAirQuality(city) {
        // Call this.airQualityAPI.fetch(city)
        // Return the data or { error: 'Air Quality API failed', data: null }
    }

    async getDashboard(city) {
        // 1. Fetch weather AND air quality in parallel (Promise.all or Promise.allSettled)
        // 2. Combine into: { city, weather: {...}, airQuality: {...}, status: 'complete'|'partial'|'error' }
        // 3. If one API fails, return partial data with status 'partial'
        // 4. If both fail, return status 'error'
    }
}

module.exports = DataAggregator;
