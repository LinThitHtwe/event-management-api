const {
    createOrganizer,
    getOrganizers,
    getOrganizerById,
    updateOrganizer,
    manageOrganizerLevel,
    manageOrganizerStatus,
    changeEmail,
    changePhoneNumber,    
} = require('../controllers/organizerController');
const express = require('express');
const router = express.Router();

router.post('/create', createOrganizer);
router.patch('/update/:id', updateOrganizer);
router.patch('/update_level/:id/:level', manageOrganizerLevel);
router.patch('/update_status/:id/:status', manageOrganizerStatus);
router.patch('/update_phone/:id/:phone', changePhoneNumber);
router.patch('/update_email/:id/:email', changeEmail);
router.get('/get_all', getOrganizers);
router.get('/:id', getOrganizerById);

module.exports = router;