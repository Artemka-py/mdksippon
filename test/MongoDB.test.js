const config = require('config')
const mongoose = require('mongoose')
const User = require('../models/User')
const Link = require('../models/Link')

const PORT = config.get('port') || 5000

describe('insertUser', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        db = await connection.db
    })

    beforeEach(async () => {
        await User.deleteMany({})
    })

    it('should insert a doc into collection', async () => {
        const mockUser = {email: 'test8@mail.ru', password: 'Artem532905'}
        const user = new User(mockUser)
        await user.save()

        const insertedUser = await User.findOne({email: mockUser.email})
        const x = {
            email: insertedUser.email,
            password: insertedUser.password
        }
        expect(x).toEqual(mockUser)
    })

    afterAll(async ()=>{
        await connection.close()
    })
})

// describe('insertLink', () => {
//     let connection;
//     let db;
//
//     beforeAll(async () => {
//         connection = await mongoose.connect(config.get('mongoUri'), {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true
//         })
//         db = await connection.db
//     })
//
//     beforeEach(async () => {
//         await Link.deleteMany({})
//     })
//
//     it('should insert Link in collection', async () => {
//         // const mockLink = {from: 'https://cloud.mongodb.com/', to: 'http://localhost:5000/t/mjNGmw2El', owner:{"$oid":"5ea4301c8640d43508a0a828"}}
//         // const link = new Link(mockLink)
//         // await link.save()
//
//         // const insertedLink = await User.findOne({from: mockLink.owner})
//         // const x = {
//         //     from: insertedLink.email,
//         //     date: insertedLink.date
//         // }
//         const informUpdated = {from: 'https://materializecss.com/'}
//         const linkForUpdate = await Link.findOne({from: 'https://materializecss.com/navbar.html'})
//         linkForUpdate.update({from: informUpdated.from})
//         linkForUpdate.from = informUpdated.from
//         await linkForUpdate.save()
//
//         const updatedLink = await Link.findOne(informUpdated.from)
//
//         const x = { from: informUpdated.from}
//
//         expect(x).toEqual(updatedLink)
//     })
//
//     afterAll(async ()=>{
//         await connection.close()
//     })
// })




