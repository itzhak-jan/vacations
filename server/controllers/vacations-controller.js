const express = require("express");
const router = express.Router();
const vacationsLogic = require('../logic/vacation-logic');



router.get("/", async (request, response) => {
    try {
        let user = request.data
        let vacations = await vacationsLogic.getAllVacations(user);
        response.json(vacations);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.post("/add", async (request, response) => {
    let vacation = request.body;
    try {
        await vacationsLogic.addVacation(vacation);
        response.json(vacation);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.delete("/:id", async (request, response)  => {
    let deleteId = request.params.id
    try {
        await vacationsLogic.deleteVacation(deleteId);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.put("/", async (request, response) => {
    let vacation = request.body;
    console.log(vacation);
    try {
        let vacations = await vacationsLogic.editVacation(vacation);
        response.json(vacations);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});


module.exports = router;