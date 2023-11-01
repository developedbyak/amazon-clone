<h2>Let's see how to setup the amazon clone application in local enviroment.</h2>
<strong>Tech i used: </strong><br>
NextJS, Webhooks, Stripe, Firestore, NextAuth, TailwindCSS

<br>

_step 1_<br>
Install all the packages with this command :

```
npm install
```

_step 2_<br>
Set up the environment variables using the `.env.local.example` file and rename it to `.env.local`.<br><br>
For google api keys - <br>[https://console.cloud.google.com/apis/credentials]<br>
For stripe api keys - <br>[https://stripe.com/en-in]<br>
For firebase keys create a project here - <br> [https://firebase.google.com/]
<br>

_step 3_<br>
Now you are ready to run the project run this command :

```
npm run dev
```

to start webhook in local - `stripe listen --forward-to localhost:3000/api/webhook`

You can access it on : http://localhost:3000

Have fun with this project 🤍🎇.

<h2>Fake card details</h2>
you can use it to test how payment methode will look -

Email: your login mail<br>
address: United Kingdom, `Note india will not work use UK`<br>

card number : 4242 4242 4242 4242<br>
expire date : 04/24 <br>
pin : 424
