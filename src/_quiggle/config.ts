const defaults = {
  host: '127.0.0.1'
}

const CONFIG = {
  host: process.env.HOST_IP || defaults.host,
  db: {
    uri: process.env.MONGO_URI || process.env.MONGO_DEV || `mongodb://${ defaults.host }:27017/no-db`
  }
}

export { CONFIG }