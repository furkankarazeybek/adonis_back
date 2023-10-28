







import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname)
  .httpServer()
  .start()









/* import 'reflect-metadata'
import sourceMapSupport from 'source-map-support';
import { join } from 'path';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import { Ignitor } from '@adonisjs/core/build/src/Ignitor';

sourceMapSupport.install({ handleUncaughtExceptions: false }) */



/* const privateKey = readFileSync(join(__dirname + '/selfsigned.key'), 'utf8');
const certificate = readFileSync(join(__dirname + '/selfsigned.crt'), 'utf8');
const credentials = {key: privateKey, cert: certificate}; */

/* new Ignitor(__dirname)
  .httpServer()
  .start((handle) => {
    return createServer(credentials, handle);
  })
  .catch(console.error) */