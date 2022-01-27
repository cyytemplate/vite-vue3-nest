export default () => ({
  PORT: +process.env.PORT || 3000,
  MONGODB_URI: 'mongodb://localhost/auth',
})
