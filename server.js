const
express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

app.use(function(req, res, next) {
    if (req.headers["x-forwarded-proto"] === "https") {
        res.redirect(`http://${req.hostname}${req.url}`);
    } else {
        next();
    }
});

app.listen(PORT, () => {
  console.log(`Application launched on port:${PORT}`);
});
