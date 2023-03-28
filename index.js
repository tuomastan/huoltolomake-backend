const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit-form', async (req, res) => {
    try {
        const formData = {
            companyID: 0,
            dueDateTime: '2023-04-30T00:00:00',
            priority: 2,
            status: 5,
            title: 'Tuomas testaa',
            queueID: 29682969, 
            description: req.body.email      
        }

        const response = await axios.post('https://webservices19.autotask.net/atservicesrest/v1.0/Tickets', formData, {
        headers: {
            'ApiIntegrationCode': '',
            'UserName': 'epxl66kmjqa5ght@kauko.com',
            'Secret': '',
            'Content-Type': 'application/json'
        }
        });
        res.send(response.data);
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

