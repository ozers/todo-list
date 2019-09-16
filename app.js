var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 3000

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var plans = ["do something", "do something else"];
var completed = ["completed plan", "done plan"];
var removed = ["removed plan", "removed thing"];

app.use(express.static("public"));

app.post('/addplan', function (req, res) {
    var newPlan = req.body.newplan;

    plans.push(newPlan);
    res.redirect("/");
});

app.post('/plandone', function (req, res) {
    var completedPlan = req.body.check;

    if (typeof completedPlan == "string") {
        completed.push(completedPlan);
        plans.splice(plans.indexOf(completedPlan), 1);
    } else if (typeof completedPlan == "object") {
        for (var i = 0; i < completedPlan.length; i++) {
            completed.push(completedPlan[i]);
            plans.splice(plans.indexOf(completedPlan[i]), 1);
        }
    }
    res.redirect("/");

});

app.post('/removeplan', function (req, res) {
    var removedPlans = req.body.check;

    if (typeof removedPlans == "string") {
        removed.push(removedPlans);
        plans.splice(plans.indexOf(removedPlans), 1);
    } else if (typeof removedPlans == "object") {
        for (var i = 0; i < removedPlans.length; i++) {
            removed.push(removedPlans[i]);
            plans.splice(plans.indexOf(removedPlans[i]), 1);
        }
    }
    res.redirect("/")
});

app.post('/returntodo', function (req, res) {
    var returnPlan = req.body.removecheck;

    if (typeof returnPlan == "string") {
        plans.push(returnPlan);
        removed.splice(removed.indexOf(returnPlan), 1);
    } else if (typeof returnPlan == "object") {
        for (var i = 0; i < returnPlan; i++) {
            plans.push(returnPlan);
            removed.splice(removed.indexOf(returnPlan[i]), 1);
        }
    }
    res.redirect("/");
});

app.get("/", function (req, res) {
    res.render("index", {
        plans: plans,
        completed: completed,
        removed: removed
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
