const vacationsDal = require('../dal/vacation-dal');
const pushLogic = require('../logic/push-logic');


async function getAllVacations() {
    let vacations = await vacationsDal.getAllVacations();
    return vacations;
}

async function addVacation(vacation) {
    await vacationsDal.addVacation(vacation);
    let vacations = await vacationsDal.getAllVacations();
    pushLogic.broadcast("add-vacation", vacations);
    return vacation;
}

async function deleteVacation(deleteId) {
    await vacationsDal.deleteFkPointer(deleteId);
    await vacationsDal.deleteVacation(deleteId);
    let vacations = await vacationsDal.getAllVacations();
    pushLogic.broadcast("delete-vacation", vacations);
    return;
}

async function editVacation(vacation) {
    await vacationsDal.editVacation(vacation);
    let vacations = await vacationsDal.getAllVacations();
    pushLogic.broadcast("edit-vacation", vacations);
    return vacations;
}

module.exports = {
    getAllVacations,
    addVacation,
    deleteVacation,
    editVacation
}