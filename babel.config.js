module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
       plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: 'keys.env',
        safe: false,
        allowUndefined: true,
      }]
    ],
    };
  };