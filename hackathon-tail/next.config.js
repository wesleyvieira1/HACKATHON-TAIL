module.exports = {
    //Permite o refresh na rotação das páginas
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: '/',
        },
      ];
    },
  };