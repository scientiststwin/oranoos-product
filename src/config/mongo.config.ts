export default (): Record<string,unknown> =>({
    mongo:{
        host: process.env.MONGODB_HOST,
        name: process.env.MONGODB_NAME,
    }
})