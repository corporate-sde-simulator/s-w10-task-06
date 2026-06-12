# Beginner Explanatory Guide: DATA-204: Build Weather Dashboard Data Aggregator

> **Task Type**: Service Task  
> **Domain/Focus**: API Integration, Data Aggregation

---

## 1. The Goal (In-Depth Beginner Explanation)

### The Core Problem
The task at hand is to build a service that aggregates data from two different APIs: one providing weather information and the other offering air quality data. Currently, the application lacks a mechanism to fetch and combine this data into a single, user-friendly dashboard response. This is problematic because users need a comprehensive view of both weather and air quality conditions in their city, which helps them make informed decisions about their daily activities, such as outdoor exercise or travel plans.

Without this service, users may have to check multiple sources separately, leading to a fragmented experience. The goal of this task is to create a seamless integration that not only fetches data from both APIs but also handles potential errors gracefully. This means that if one API fails, the service should still return whatever data it can retrieve from the other API, ensuring that users receive the most complete information possible.

### Jargon Buster (Key Terms Explained)
* **API (Application Programming Interface)**: An API is a set of rules that allows different software applications to communicate with each other. For example, when our service requests weather data from a weather API, it sends a specific request format, and the API responds with the weather information in a structured format, usually JSON.

* **Promise**: In JavaScript, a Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. For instance, when we fetch data from an API, we use a Promise to handle the response once it arrives, allowing our code to continue executing without waiting for the API response.

* **Error Handling**: This refers to the process of responding to and managing errors that occur during the execution of a program. In our case, if the weather API fails to respond, we need to ensure that our application can still function correctly by providing a fallback response instead of crashing.

* **Data Aggregation**: This is the process of collecting and combining data from different sources into a single, unified view. In our task, we are aggregating weather and air quality data into one response that users can easily understand.

### Expected Outcome
After implementing the solution, the system should behave as follows:

**Before**: Users have to check two separate APIs to get weather and air quality data, which can lead to confusion and a poor user experience.

**After**: Users can request data for a specific city, and the service will return a single response that includes both weather and air quality information. If one of the APIs fails, the service will still return the available data, indicating whether the response is complete, partial, or if there was an error.

---

## 2. Related Coding Concepts & Syntax (50% Theory, 50% Practice)

### Concept 1: Asynchronous Programming with Promises
#### 📘 Theoretical Overview (50%)
* **Why it exists**: Asynchronous programming allows our application to perform tasks without blocking the main thread. This is crucial when dealing with operations like API calls, which can take time to complete. If we didn't use asynchronous programming, our application would freeze while waiting for a response, leading to a poor user experience.

* **Key Mechanisms**: Promises are a core part of asynchronous programming in JavaScript. When we make an API call, we create a Promise that represents the future value of that call. The Promise can be in one of three states: pending (waiting for the operation to complete), fulfilled (the operation completed successfully), or rejected (the operation failed). We can use `.then()` to handle fulfilled promises and `.catch()` to handle rejections.

#### 💻 Syntax & Practical Examples (50%)
* **Language Syntax**:
  ```javascript
  // Creating a new Promise
  const myPromise = new Promise((resolve, reject) => {
      // Simulate an asynchronous operation
      setTimeout(() => {
          const success = true; // Simulate success or failure
          if (success) {
              resolve('Operation succeeded!');
          } else {
              reject('Operation failed.');
          }
      }, 1000);
  });

  // Using the Promise
  myPromise
      .then(result => console.log(result)) // Logs: Operation succeeded!
      .catch(error => console.error(error)); // Logs: Operation failed.
  ```

* **Real-World Application**:
  ```javascript
  async function fetchData(apiUrl) {
      try {
          const response = await fetch(apiUrl); // Fetch data from API
          const data = await response.json(); // Parse JSON response
          return data; // Return the data
      } catch (error) {
          console.error('Error fetching data:', error); // Handle error
          return null; // Return null on error
      }
  }
  ```

---

## 3. Step-by-Step Logic & Walkthrough

1. **Step 1: Locate and Analyze the Target File**
   * Navigate to the `dataAggregator.js` file in the `s-w10-task-06` folder. This file contains the `DataAggregator` class where we will implement our logic.
   * Focus on the methods `getWeather`, `getAirQuality`, and `getDashboard`. These methods are where we will write the code to fetch and combine data from the APIs.

2. **Step 2: Input Verification & Validation**
   * Before making API calls, ensure that the `city` parameter passed to the methods is valid (not null, empty, or undefined). This prevents unnecessary API calls and potential errors.

3. **Step 3: Core Implementation / Modification**
   * In the `getWeather` method, use `try...catch` to handle errors when fetching data from the weather API. If the fetch fails, return an object with an error message.
   * Similarly, implement the `getAirQuality` method to fetch data from the air quality API with error handling.
   * In the `getDashboard` method, use `Promise.allSettled` to fetch both weather and air quality data in parallel. Combine the results into a single object, setting the status based on whether the API calls succeeded or failed.

4. **Step 4: Output Verification & Testing**
   * After implementing the methods, run the tests defined in `test_aggregator.js` to ensure that all scenarios (both APIs succeed, one fails, both fail) are handled correctly. Use a testing framework like Jest to execute the tests and verify that the output matches the expected results.

---

## 4. Detailed Walkthrough of Test Cases

### Test Case 1: Standard / Success Case
* **Description**: This test checks the scenario where both the weather and air quality APIs return successful responses.
* **Inputs**:
  ```json
  {
      "city": "London"
  }
  ```
* **Step-by-Step Execution Trace**:
  1. The `getDashboard` method is called with the input city "London".
  2. The method initiates API calls to both the weather and air quality APIs using `Promise.allSettled`.
  3. Both API calls succeed, returning valid data.
  4. The method combines the data into a single object with the status set to 'complete'.
* **Expected Output**: 
  ```json
  {
      "city": "London",
      "weather": {
          "temp": 22,
          "humidity": 65,
          "condition": "Partly Cloudy"
      },
      "airQuality": {
          "aqi": 42,
          "level": "Good",
          "pollutant": "PM2.5"
      },
      "status": "complete"
  }
  ```

### Test Case 2: Edge Case / Validation Fail
* **Description**: This test checks the scenario where both APIs fail to return data.
* **Inputs**:
  ```json
  {
      "city": "London"
  }
  ```
* **Step-by-Step Execution Trace**:
  1. The `getDashboard` method is called with the input city "London".
  2. The method initiates API calls to both the weather and air quality APIs using `Promise.allSettled`.
  3. Both API calls fail, triggering the error handling in each method.
  4. The method combines the results, setting the status to 'error' since both API calls failed.
* **Expected Output**: 
  ```json
  {
      "city": "London",
      "weather": {
          "error": "Weather API failed",
          "data": null
      },
      "airQuality": {
          "error": "Air Quality API failed",
          "data": null
      },
      "status": "error"
  }
  ```