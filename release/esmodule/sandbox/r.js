import Path from 'path';

import Configuration from './configuration/r';

(async () => {

  try {

    console.log(`process.cwd()='${process.cwd()}'`);
    console.log(`process.argv[2]='${process.argv[2]}'`);
    console.log(`Path.resolve(process.argv[2])='${Path.resolve(process.argv[2])}'`);

    let configuration = require(Path.resolve(process.argv[2]));

    console.dir(configuration);
    console.dir(Configuration);


  } catch (error) {
    console.error(error);
  }

})();

//# sourceMappingURL=r.js.map