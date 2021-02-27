const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_your_private');

router.get('/', (req, res) =>{
    res.render('index');
});

router.post('/checkout', async (req, res) =>{
    console.log(req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
    });
    const charge = await stripe.charges.create({
        amount: '3000',
        currency: 'EUR',
        customer: customer.id,
        description: 'Esta comprando un modulo'
    });
    console.log(charge.id);
    // Final Show
    res.render('download');
});

module.exports = router;