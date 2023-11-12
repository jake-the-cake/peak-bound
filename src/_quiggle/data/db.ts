import mongoose from "mongoose"
import { CONFIG } from "../config"

console.log('data')

class QuiggleDatabase {
  uri: string

  constructor(uri: string) {
    this.uri = uri ? this.parseUri(uri) : CONFIG.db.uri
    console.log(this)
  }

  parseUri(uri: string): string {
    if (uri.charAt(0) === '+') {
      const splitUri = uri.split('/')
      switch (splitUri[0].slice(1)) {
        case 'host':
          return 'mongodb://' + CONFIG.host + ':27017/' + splitUri.slice(1).join('/')
        default:
          return uri
      }
    }
    return uri
  }

  serve(message?: string, ...callbacks: Function[]) {
    mongoose.connect(this.uri)
      .then(() => {
        if (message) console.log(message)
        callbacks.forEach(callback => callback())
      })
  }
}

export {
  QuiggleDatabase
}