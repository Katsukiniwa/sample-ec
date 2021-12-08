import express from 'express';
import session from 'express-session';
import { ProductRouter } from './module/product/presentation/ProductRouter';

const app = express();

const sess = {
  secret: 'keyboard cat',
  cookie: { secure: false },
  resave: true,
  saveUninitialized: true
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(ProductRouter);

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
})

app.listen(8080, () => {
  console.log('listen on 8080');
})

app.use(session(sess));
