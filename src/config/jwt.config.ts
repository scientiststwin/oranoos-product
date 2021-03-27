export default (): Record<string, unknown> => ({
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '6000s' },
  },
})
