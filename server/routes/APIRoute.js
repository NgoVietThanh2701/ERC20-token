'use strict';
import * as controller from '../controllers/APIcontroller.js';

export const router = (app) => {
   app.post('/api/withdraw', controller.withdraw)
}