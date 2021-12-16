# Interview Scheduler

**Interview Scheduler** keeps tracks of your appointments for the week. Easily choose an open slot, enter a name, and choose an interviewer to book your appointment. With Interview Scheduler, you'll never again overbook your week!

**Create**, **edit**, and **delete** your appointments with ease! This single page application keeps everything simple and clean.

## Features
See your weekly appointments and empty slots
![A screenshot of the interface](/data/errorcheck.gif "A screenshot of the interface")

### Create appointments:
![How to create an appointment](/data/errorcheck.gif "How to create an appointment")
Interview Scheduler will also error check before submitting

### Edit appointments
![How to edit an appointment](/data/edit.gif "How to edit an appointment")

### Delete appointments
![How to delete an appointment](/data/delete.gif "How to delete an appointment")

## Stack
- [`ReactJS`](https://reactjs.org/)
- [`WebPack`](https://webpack.js.org/)
- [`Babel`](https://babeljs.io/)
- [`Axios`](https://github.com/axios/axios)
- [`WebSockets`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [`PostgreSQL`](https://www.postgresql.org/)

## Setup

Install dependencies with `npm install`.

## Running The Server

```sh
npm start
```

## Testing
This project was developed with testing in [`Storybook`](https://storybook.js.org/), [`Jest`](https://jestjs.io/en/), [`Cypress`](https://www.cypress.io/), and [`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro).

## Other Details

This project was created from a **Lighthouse Labs** [template](https://github.com/lighthouse-labs/scheduler/) as a study project.

**Interview Scheduler** was designed to be a single page application. It was written using **ReactJS** and uses **Axios** to send and retrieve **PostgreSQL** database data from an API server.