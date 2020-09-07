from node:14.8.0

RUN useradd --user-group --create-home --shell /bin/false nodejs

ENV HOME=/home/nodejs
ENV NODE_ENV=production

COPY package.json $HOME
RUN chown -R nodejs:nodejs $HOME/*
User nodejs
WORKDIR $HOME/app
RUN npm install

CMD ["node", "index.js"]