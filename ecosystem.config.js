const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  apps: [
    {
      name: 'node-server',
      script: './build/server.js',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      exec_mode: 'fork',
      env: { NODE_ENV },
    },
  ],
};
