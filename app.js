var express     = require("express")
    app         = express()
    bodyParser  = require("body-parser")
    mongoose    = require("mongoose")
    passport    = require("passport")
    LclStrategy = require("passport-local")
    mthdOveride = require("method-override")
    Blog        = require("./models/blog")
    Comment     = require("./models/comment")
    User        = require("./models/user")
    marked      = require("marked")
    keys        = require('./config')

var indexRoutes = require("./routes/index")
var commentRoutes = require("./routes/comments")
var blogRoutes = require("./routes/blogs")

mongoose.connect(keys.mongoUrl, {useNewUrlParser: true,  useUnifiedTopology: true}, function() {
    console.log("MongoDB Connected")
});

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true})) 
app.use(mthdOveride("_method"))

// ----PASSPORT CONFIG--------
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUnitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LclStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// -----------------------------
app.use(function(req, res, next){             
    res.locals.currentUser = req.user
    next()
})

app.use(indexRoutes)
app.use(commentRoutes)
app.use(blogRoutes)

//-------------LISTEN ON PORT 5000--------------
app.listen(process.env.PORT || 5000, function() {
    console.log("server is running at http://localhost:5000")
})