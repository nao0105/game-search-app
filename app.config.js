module.exports = () => {
  require('dotenv').config();

  return {
    expo: {
      name: 'Game Search App',
      slug: 'game-search-app',
      version: '1.0.0',
      orientation: 'portrait',
      userInterfaceStyle: 'light',
      splash: {
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          backgroundColor: '#ffffff',
        },
      },
      extra: {
        rawgApiKey: process.env.EXPO_PUBLIC_RAWG_API_KEY,
      },
    },
  };
};
