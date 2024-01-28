module.exports = {
    async redirects() {
      return [
        {
          source: '/jogar',
          destination: '/jogar', 
          permanent: true,
        },
      ];
    },
  };