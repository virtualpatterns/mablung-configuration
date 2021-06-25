
ifeq ($(origin projectPath),undefined)
export projectPath := $(CURDIR)
endif

include $(projectPath)/node_modules/@virtualpatterns/mablung-makefile-environment/makefile

# "scripts": {
#   "refresh": "rm -Rf node_modules package-lock.json && npm install",
#   "upgrade:10": "npm-check-updates --upgrade",
#   "upgrade:20": "shx rm -f package-lock.json",
#   "upgrade:30": "npm install",
#   "upgrade": "run-s --silent upgrade:*",
#   "clean:10": "shx rm -Rf coverage release/commonjs release/esmodule",
#   "clean": "run-s --silent clean:*",
#   "lint:10": "eslint --ignore-path .gitignore source",
#   "lint:20": "check-dependency",
#   "lint": "run-s --silent lint:*",
#   "build:10": "cross-env NODE_ENV=commonjs babel source --copy-files --extensions .js --ignore source/test/library/www,source/sandbox/www                       --out-dir release/commonjs --out-file-extension .cjs --source-maps",
#   "build:20": "cross-env NODE_ENV=esmodule babel source --copy-files --extensions .js --ignore source/test/library/www,source/sandbox/www --keep-file-extension --out-dir release/esmodule                           --source-maps",
#   "build": "run-s --silent clean lint build:*",
#   "test:10": "c8 ava",
#   "test": "run-s --silent build \"test:10 {@}\" --",
#   "run:10": "node --no-warnings --unhandled-rejections=strict",
#   "run": "run-s --silent build \"run:10 {@}\" --",
#   "pre:push:10": "git add coverage release/commonjs release/esmodule",
#   "pre:push:20": "git commit --message=\"post-test\"",
#   "pre:push": "run-s --silent test pre:push:*",
#   "push:10": "npm version prerelease",
#   "push:20": "git push origin master",
#   "push": "run-s --silent pre:push push:*"
# },
