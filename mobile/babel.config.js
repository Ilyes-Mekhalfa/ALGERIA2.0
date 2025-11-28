module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // 1. NativeWind must be before Reanimated
      "nativewind/babel",

      // 2. Reanimated plugin must be LAST
      "react-native-reanimated/plugin",
    ],
  };
};
