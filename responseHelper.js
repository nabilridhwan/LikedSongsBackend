exports.BuildResponse = (error, data) => {
    return {
        error: error ? true : false,
        data: data,
        date: new Date().toISOString()
    }
}