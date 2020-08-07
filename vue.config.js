module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['sequelize', 'sqlite3'],
      nodeModulesPath: ['./node_modules'],
      nodeIntegration: true,
      builderOptions: {
        extraResources: ['src/database.sqlite'],
      },
    },
  },
};
