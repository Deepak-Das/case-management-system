const path = require('path');

require('dotenv').config({
  path: path.resolve(process.cwd(), 'src', 'config', '.env'),
});