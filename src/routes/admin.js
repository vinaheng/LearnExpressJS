const express = require('express')
const router = express.Router()
const AdminController = require('../app/controllers/AdminCoursesController')
router.get('/create',AdminController.create)
router.get('/stored/:page',AdminController.storedcourses)
router.post('/store',AdminController.store)
// router.get(/)
router.get('/:id/edit',AdminController.edit)
// update course
router.put('/:id',AdminController.update)
// delete soft
router.delete('/destory/:id',AdminController.destroy)
// restor courses
router.patch('/:id/restor',AdminController.restor)
// Get Trash
router.get('/trash',AdminController.trash)
// delete foceDestroy
router.delete('/:id/forceDestroy',AdminController.forceDestroy)
// cheked select delete All 
router.post('/checked_all_for_delete',AdminController.checkedAllForDelete)
// checked select retor
router.post('/select_restor',AdminController.selectRestor)
// update active show or hide
router.patch('/:id/activeUpdate',AdminController.activeSwitch)
module.exports = router