# ChatHacks

## Inspiration
Technology is meant to aid people in communication. Conventional messaging applications such as GroupMe, WhatsApp, Facebook Messenger, and more work great for communicating with contacts you already have all over the world. But what about the people near you? People attending events such as large classes, sporting events, conferences, or even hackathons now have a way to communicate with one another. 

## What it does
ChatHacks uses a user's location to determine chat "rooms" nearby. A user can create a room with a default proximity of 100 meters. Anyone within that proximity is able to join the room. 

## How we built it
The app is built with the Ionic Framework. Ionic is a framework that sits on top of Angular that allows native mobile applications to be written with a web technology stack: HTML, CSS, and Typescript (Javascript with type support). The backend is powered by Google's Firebase, which is a Backend/ Database as a Service. This allows us to have a real time database for the messaging service with large amounts of concurrent users. Additionally, we are able to store and query geopoints using the GeoFire library. 

## Challenges we ran into
While we were all pretty familiar with git, all working on the codebase at the exact same time and working through merge conflicts proved challenging at times. Additionally, the support for locations and the cron job for room expiration was a challenge to make. Google authentication was also tricky because of native device support. 

## Accomplishments that we're proud of
- A hidden easter egg :)
- Making an app from scratch!
- A usable product.

## What we learned
We learned how to build an app, and especially how to integrate that with firebase using geoqueries. Location services was a huge hurdle. 

## What's next for ChatHacks
- Squash a few more bugs.
- Deploying to app store.
- Adding direct message support.
- Google Maps API for places.
- Adjustable proximities.
- Encryption.