FROM node:latest

#####################################################################
# RETRIEVE THE BUILD ARGUMENTS
#####################################################################
ARG BUILD_TOKEN

#####################################################################
# INSTALL CHROME
#####################################################################
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    --no-install-recommends \
    && curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y \
    google-chrome-stable \
    --no-install-recommends

#####################################################################
# SET UP THE BUILD ENVIRONMENT VARIABLES
#####################################################################
ENV BUILD_FOLDER=/opt/build/

#####################################################################
# SET UP WORKING ENVIRONMENT
#####################################################################
RUN mkdir -p $BUILD_FOLDER

#####################################################################
# COPY JUST THE PACKAGE JSON AND LOCK TO AID CACHING
#####################################################################
COPY package.json $BUILD_FOLDER

#####################################################################
# SET CURRENT DIRECTORY TO THE BUILD FOLDER
#####################################################################
WORKDIR ${BUILD_FOLDER}

#####################################################################
# INSTALL PRODUCTION AND DEVELOPMENT DEPENDENCES
#####################################################################
RUN npm install

#####################################################################
# COPY SOURCE FOR TESTS
#####################################################################
COPY src/ $BUILD_FOLDER/src/

#####################################################################
# RUN AXE TESTS WHEN CONTAINER STARTS
#####################################################################
CMD npm run test:axe
