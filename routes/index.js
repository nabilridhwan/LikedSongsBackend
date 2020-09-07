exports.home = (req, res) => {
    res.render('index', {
        title: `${res.locals.appName} | Home`,
        ngController: "HomeController"
    })
}

exports.profile = (req, res) => {
    let {slug} = req.query;
    res.render('profile', {
        title: `${res.locals.appName} | Profile`,
        ngController: "ProfileController",
        slug: slug
    })
}

exports.me = (req, res) => {
    res.render('profile', {
        title: `${res.locals.appName} | Me`,
        ngController: "ProfileController",
    })
}

exports.search = (req, res) => {
    res.render('search', {
        title: `${res.locals.appName} | Search`,
        ngController: "SearchController",
    })
}

exports.notFound = (req, res) => {
    res.render('404', {
        title: `${res.locals.appName} | Not Found`,
        ngController: "NotFoundController",
    })
}