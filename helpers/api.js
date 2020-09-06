exports.readResponse = (req, res, error, data) => {
    if (error) {
        res.status(400).json({
            error: error ? true : false,
            data: data,
            date: new Date().toISOString()
        })
    }

    res.status(200).json({
        error: error ? true : false,
        data: data,
        date: new Date().toISOString()
    })
}