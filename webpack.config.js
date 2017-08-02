function buildConfig(env) {
  env = env || "webpack.dev"; 
  return require('./' + env + '.js');
}

module.exports = buildConfig;