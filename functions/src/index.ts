import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

//const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const stripe = require("stripe")(functions.config().stripe.testkey);

exports.createStripeCustomer = functions.auth.user().onCreate(event => {
  // user auth data
  const user = event;

  // register Stripe user
  return stripe.customers
    .create({
      email: user.email
    })
    .then(customer => {
      /// update database with stripe customer id

      const data = { customerId: customer.id };

      const updates = {};
      updates[`/customers/${customer.id}`] = user.uid;
      updates[`/users/${user.uid}/customerId`] = customer.id;

      return admin
        .database()
        .ref()
        .update(updates);
    });
});

exports.createSubscription = functions.database
  .ref("/users/{userId}/pro-membership/token")
  .onWrite((event, context) => {
    const tokenId = event.after.val();
    const userId = context.params.userId;
    //console.log('Token: '+tokenId);
    if (!tokenId) throw new Error("Bro token missing");

    return admin
      .database()
      .ref(`/users/${userId}`)
      .once("value")
      .then(snapshot => snapshot.val())
      .then(user => {
        return stripe.customers.update(user.customerId, {
          source: tokenId
        }).then(customer => {
          //console.log('source updated : '+ customer);
          return user;
        })
      })
      .then(user => {
        return stripe.subscriptions.create({
          customer: user.customerId,
          items: [
            {
              plan: "pro-membership"
            }
          ]
        });
      })
      .then(sub => {
        return admin
          .database()
          .ref(`/users/${userId}/pro-membership`)
          .update({ status: "active" });
      })
      .catch(err => console.log(err));
  });

exports.recurringPayment = functions.https.onRequest((req, res) => {
  const hook = req.body.type;
  const data = req.body.data.object;

  if (!data) throw new Error("missing data");

  return admin
    .database()
    .ref(`/customers/${data.customer}`)
    .once("value")
    .then(snapshot => snapshot.val())
    .then(userId => {
      const ref = admin.database().ref(`/users/${userId}/pro-membership`);

      // Handle successful payment webhook
      if (hook === "invoice.payment_succeeded") {
        return ref.update({ status: "active" });
      }
      // Handle failed payment webhook
      else if (hook === "invoice.payment_failed") {
        return ref.update({ status: "pastDue" });
      }
      // Else
      else {
        return {};
      }
    })
    .then(() => res.status(200).send(`successfully handled ${hook}`))
    .catch(err => res.status(400).send(`error handling ${hook}`));
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
