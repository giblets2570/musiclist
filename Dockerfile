FROM node:6.9.5
ENV HOME=/usr/src/app
COPY ./package.json $HOME/
WORKDIR $HOME
RUN npm install --quiet
RUN npm install -g nodemon --quiet
VOLUME $HOME/node_modules
EXPOSE 8000
CMD npm run dev
