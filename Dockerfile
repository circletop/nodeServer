FROM node:latest

RUN mkdir /home/node

WORKDIR /home/node

COPY ./dist /home/node

ENV HOST 0.0.0.0
ENV PORT 3001

EXPOSE 3001

RUN npm install

ENTRYPOINT ["npm", "run"]

CMD ["start"]
