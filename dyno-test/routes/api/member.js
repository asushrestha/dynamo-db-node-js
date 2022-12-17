const { debug } = require('console');
const express = require('express')
const {getMembers, addMember, deleteMember, getMemberById,queryByMember} = require('../../service/dynamoCRUD')


const router = express.Router();


router.get('/', async (req, res) => {
    try {
            const members = await getMembers()
            res.json(members)
    } catch (error) {
            console.error(error)
            res.status(500).json({err: `Something went wrong`})
    }
})

router.post('/add', async (req, res) => {
    const member = req.body
    try {
            const newMember = await addMember(member)
            console.log(newMember)
            res.json(newMember)
    } catch (error) {
            console.error(error)
            res.status(500).json({err: `Something went wrong`})
    }
})

router.put('/update/:id', async (req, res) => {
    const member = req.body
    const { id } = req.params
    member.id = id
    try {
            const updatedMember = await addMember(member)
            res.json(updatedMember)
    } catch (error) {
            console.error(error)
            res.status(500).json({err: `Something went wrong`})
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
            const deletedMember = await deleteMember(id)
            res.json(deletedMember)
    } catch (error) {
            console.error(error)
            res.status(500).json({err: `Something went wrong`})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
            const members = await getMemberById(id)
            res.json(members)
    } catch (error) {
            console.error(error)
            res.status(500).json({err: `Something went wrong`})
    }
})


router.get('/query/:member', async (req, res) => {
    const member = req.params.member
    try {
            const members = await queryByMember(member)
            res.json(members)
    } catch (error) {
            console.error(error)
            res.status(500).json({err: `Something went wrong`})
    }
})

module.exports = router