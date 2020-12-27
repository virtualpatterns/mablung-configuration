import { createRequire as _createRequire } from "module";import '@virtualpatterns/mablung-source-map-support/install';

const Require = _createRequire(import.meta.url);

async function main() {

  try {

    let path = Require.resolve('./ta.js');
    let module = await import(path);


  } catch (error) {
    console.error(error);
  }

}

main();
//# sourceMappingURL=so.js.map