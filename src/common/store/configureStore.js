if (process.env.NODE_ENV!=='production'){
    module.exports= required('./configureStore.dev')
}