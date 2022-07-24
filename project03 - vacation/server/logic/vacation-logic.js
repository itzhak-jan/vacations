const vacationsDal = require('../dal/vacation-dal');


async function getAllVacations() {
    let vacations = await vacationsDal.getAllVacations();
    return vacations;
}

async function addVacation(vacation) {
    await vacationsDal.addVacation(vacation);
    let vacations = await vacationsDal.getAllVacations();
    return vacation;
}

async function deleteVacation(deleteId) {
    await vacationsDal.deleteFkPointer(deleteId);
    await vacationsDal.deleteVacation(deleteId);
    let vacations = await vacationsDal.getAllVacations();
    return;
}

async function editVacation(vacation) {
    await vacationsDal.editVacation(vacation);
    let vacations = await vacationsDal.getAllVacations();
    return vacations;
}

module.exports = {
    getAllVacations,
    addVacation,
    deleteVacation,
    editVacation
}