# aXe-core - Accessibility tests

This project is an example of the set up to run automated accessibility test with aXe-core.

The project contains an example spec that you can simply update the URL and page attributes to get started.

# Getting started
The tests are currently configured to run against the Gov.uk homepage.
`git clone` this project and then run `npm install`.
Update the `demo1.spec.js` file to point towards your application.
To run the tests in the terminal run `npm run test:axe`

# Running tests in Docker

Ensure you have cloned this project and in a separate terminal window run:
```
docker build -f Dockerfile -t test:axe .
```
Followed by
```
docker run --network="host" test:axe
```
The tests will by default run in `headless Chrome`.

This repository contains a `Dockerfile` which will run the automated axe-core accessibility tests in a docker container against an example URL which is set to `https://www.gov.uk/`.
