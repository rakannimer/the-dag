const json = require("comment-json");
const tsc = require("typescript");
const fs = require("fs");

module.exports = {
  process(src, path) {
    if (path.endsWith(".ts") || path.endsWith(".tsx")) {
      const tsConfig = json.parse(
        fs.readFileSync("./tsconfig.json").toString()
      );
      return tsc.transpile(src, tsConfig.compilerOptions, path, []);
    }
    return src;
  }
};
