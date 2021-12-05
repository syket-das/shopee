const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv')
dotenv.config({ path: 'backend/config/config.env' })


// Connect to database
connectDatabase()

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT || 5000} in ${process.env.NODE_ENV} mode`)
}
)