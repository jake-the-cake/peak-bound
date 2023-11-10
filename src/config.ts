import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  conn: {
    port: process.env?.SERVER_PORT ?? process.env?.PORT ??  6047
  }
}

export { CONFIG }