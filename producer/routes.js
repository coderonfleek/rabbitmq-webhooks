const express = require('express');
let amqp = require('amqplib/callback_api');

const router = express.Router();

router.post("/ingest-hooks", function(req, res) {

    amqp.connect('amqp://localhost:5672', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error, channel) {
            if (error) {
                throw error;
            }
            var queue = 'shopify-webhooks';

            channel.assertQueue(queue, {
                durable: false
            });
            console.log(req.body);
            //let data = req.body;
            let data = {
                "name" : "Shopify webHook",
                "product" : "Rolex Watch",
                "price" : 10.00,
                "total_price" : 20.00
            }
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
            

            res.send("Added to Queue");
        });
    });
  
});

module.exports = router;