# Team Planning Tool - Accessibility tests

This repository contains a `Dockerfile` which will run the automated axe-core accessibility tests in a docker container against an instance of `edwfp`, ideally the `edwfp-full-stack`.

## TODO Add stage to run `edwfp-full-stack` in CI pipeline

The main goal of this repo is to provide the ability to run the containerised tests in the CI pipeline for the `edwfp` services. Once they run successfully the image for the said services will be pushed up to Gitlab's container registry.

# Getting started

To get the axe test container running on your local machine:
Clone the [edwfp-full-stack](https://gitlab.itsshared.net/employee-deal/edwfp-full-stack) repo and follow the README to get that running.
Then in a separate terminal window clone this repo and run:
```
docker build -f Dockerfile -t tptaxe .
```
Followed by
```
docker run --network="host" tptaxe
```
The above command will only work if you are running against `https://localhost`
The tests will by default run in `headless Chrome`.
