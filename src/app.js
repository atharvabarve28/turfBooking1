const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates");
const { login1, slotbooking1 } = require("./mongodb");
const e = require("express");
const { error } = require("console");

app.use(express.json())
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/finalBooking", (req, res) => {
    res.render("finalBooking");
})

// turf1
app.get("/grdZero", (req, res) => {
    res.render("groundZero");
});

//turf2
app.get("/sahTurf", (req, res) => {
    res.render("Sahyadri_Turf");
});

//turf3
app.get("/tGoldenB", (req, res) => {
    res.render("The_Golden_Boot");
});

//turf4
app.get("/patlClub", (req, res) => {
    res.render("Patliputra_Sports_Club");
});

//turf5
app.get("/turfup", (req, res) => {
    res.render("Turf_Up");
});

//turf6
app.get("/WSpCl", (req, res) => {
    res.render("Wings_Sports_Club");
});

app.get("/loginPageReload", (req, res) => {
    res.render("login");
});

app.get("/homePageReload", (req, res) => {
    res.render("index");
});

app.get("/bookPageReload", (req, res) => {
    res.render("book");
});

app.get("/contactUsPageReload", (req, res) => {
    res.render("contactus");
});

app.get("/logout", (req, res) => {
    res.render("login");
})

app.post("/slotBookingForm", async (req, res) => {
    try {
        const checkSlot = await slotbooking1.findOne({ selectedSlot: req.body.finalBooking });
        const checkTid = await slotbooking1.findOne({ upiTransactionId: req.body.finalBooking });
        const checkDate = await slotbooking1.findOne({ dateOfBooking: req.body.finalBooking });

        if (checkSlot) {
            return res.send("Slot already booked. Please select another slot.");
        }
        if (checkTid) {
            return res.send("Already Paid.");
        }

        // if (checkDate) {
        //     return res.send("Pick another date.");
        // }

        const slotBooking = {
            selectedTurfGround: req.body.selectedTurf,
            selectedSlot: req.body.groundZero,
            name: req.body.EnterName,
            contactNumber: req.body.ConNum,
            upiTransactionId: req.body.upi_t_id,
            dateOfBooking: req.body.selectedDate
        };

        await slotbooking1.insertMany([slotBooking]);
        res.send("Slot booked successfully");

    } catch (error) {
        console.error("Error in /slotBookingForm:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {

    // const data = {
    //     username: req.body.username,
    //     password: req.body.password
    // }

    // await login1.insertMany([data]);

    try {
        const check = await login1.findOne({ username: req.body.username })
        if (check.password === req.body.password) {
            res.render("adminHome")
        } else {
            res.send("incorrect password")
        }
    } catch {
        res.send("incorrect username")
    }

})


app.listen(3000, () => {
    console.log("port connected 3000");
})