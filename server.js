const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const FAST2SMS_API_KEY = 'xn6EKbyj89eiWZPwO7SLlTvpNoDIYzU2GV0XaQdqF5JCARfB4uTWuq4bl9gHY6I7wMUaQszP2JNVjLtk';

app.post('/send-sms', async (req, res) => {

    try {

        const { phone, message } = req.body;

        const response = await axios.post(
            'https://www.fast2sms.com/dev/bulkV2',
            {
                route: 'q',
                message: message,
                language: 'english',
                numbers: phone
            },
            {
                headers: {
                    authorization: xn6EKbyj89eiWZPwO7SLlTvpNoDIYzU2GV0XaQdqF5JCARfB4uTWuq4bl9gHY6I7wMUaQszP2JNVjLtk,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({
            success: true,
            response: response.data
        });

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log('SMS server running on port 3000');
});
