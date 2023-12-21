// src/server.ts
import app from './index';
import { HOST, PORT } from './utils/constants';


app.listen(PORT, () => {
  console.log(`
- API REST E-COMMERCE TP-TS-EXPRESS
*************************************
- Version: 1.0.0
- Author: MOUYAHADA Ismail
- Postman : https://www.getpostman.com/
- URL de base :  http://localhost:${PORT}
  `);
});
