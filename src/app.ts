/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import session from 'express-session';

const app = express();

const sess = {
  secret: 'keyboard cat',
  cookie: { secure: false }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

/**
 * @link https://github.com/expressjs/session
 * The default server-side session storage, MemoryStore,
 * is purposely not designed for a production environment.
 * It will leak memory under most conditions,
 * does not scale past a single process,
 * and is meant for debugging and developing.
 */
app.use(session(sess));
