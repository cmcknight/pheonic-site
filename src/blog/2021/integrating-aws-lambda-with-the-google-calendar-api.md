---
title: Integrating AWS Lambda with the Google Calendar API
permalink: /blog/2021/{{title | slugify }}/
layout: blog-article-layout.njk
date: 2021-04-05
breadcrumbs:
  - label: Home
    url: /
  - label: Blog
    url: /blog/
  - label: Integrating AWS Lambda with the Google Calendar API
tags:
  - posts
---

<!-- Excerpt Start -->

A funny thing happened on the way to reaching code complete on the Farmer Frog website. I needed to integrate an AWS Lambda function with the Google Calendar API. Now, you might ask yourself why I would need to do that, and it's a fair question. The short answer is that the website needs to be able to retrieve and display the public events without taking the user away from the website.

<!-- Excerpt End -->

The particular calendar that I needed to integrate with is set up as a public service-type Calendar which only requires an API key and knowledge of the endpoint instead of the usual OAuth 2 authentication. Having just finished getting the contact form working thanks to Kyle Galbraith's [_How to Host, Secure, and Deliver Static Websites on Amazon Web Services_](https://kylegalbraith.com/learn-aws/), I thought it would be a simple matter of essentially writing a microservice. I was somewhat correct and somewhat naive (okay, I was wrong, geez!). Here follows the bloody saga of getting the microservice written and operational.

My first task was to get the API key and the public endpoint for the calendar. Having secured those, I set about writing a test handler in Node.js. I found and article by Jason Dark, [_How to connect to the G Suite APIs using a service account key with Node.js_](https://medium.com/@jason_dark/how-to-connect-to-the-g-suite-apis-using-a-service-account-key-with-node-js-659e97981a04), that pretty much summed up the approach I was thinking of following. after some slight modifications, the code from that iteration was:

```
const { google } = require('googleapis');
// const apiKey = process.env.APIKEY
// const endpoint = process.env.ENDPOINT

const apiKey = '<YOUR-API-KEY-GOES-HERE';
const calendarId = 'YOUR-GOOGLE-CALENDAR-ENDPOINT-GOES HERE';

const cal = google.calendar({
    version: 'v3',
    auth: apiKey
});


//--------------- Utility Functions --------------------
function lastDayInMonth(month, year) {
  const daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31,30, 31 ];
  return ((month == 1) &&
          (((year % 4 == 0) && (year %100 != 0)) || (year % 400 == 0)))
          ? daysInMonth[month] + 1
          : daysInMonth[month]
}

function handler (month, year) {

    var headers = {
        'Access-Control-Allow-Headers' : 'Content-Type, X-Amz-Date, Authorization, X.Api-Key, X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Origin': '*'
    };

    // test for bad dates
    if (month == -1 || year == -1) {
        response.body = JSON.stringify('Bad dates')
        console.log(response)
    } else {
        // set up the call to the Google Calendar API
        const startDate = new Date(year, month, 1, 0, 0, 0).toISOString();
        const endDate = new Date(year, month, lastDayInMonth(month, year),23,59,59).toISOString();
        const userTimeZone = 'America/Los_Angeles'

        console.log('Just before calling Google Calendar events.list')
        let res_parms = {
          timeMin: startDate,
          timeMax: endDate,
          timeZone: userTimeZone,
          calendarId: calendarId
        }
        console.log(res_parms);

       cal.events.list(res_parms )
        .then((result) => {
            console.log('Call was successful')
            const response = {
                statusCode: 200,
                headers,
                body: JSON.stringify(result)
            }
            console.log(response);
            // callback(null, response)
        })
        .catch((e) => {
            console.log('call failed')
            const response = {
                statusCode: 500,
                headers,
                body: JSON.stringify(e)
            }
            console.log(e);
            // callback(null, response);
        })
    }
};

handler(3, 2021); // test the handler
```

Voíla, I thought! I knew _somebody_ out there had to have already solved this problem (remember, I'm lazy and I've been doing this long enough that I'm pretty sure there are no new problems and that somebody else has already solved my problem). The code worked, for the most part although I did need to do a few adjustments based on what I was doing.

Then it was off to plug the code into a brand, spanking new AWS Lambda function using the REST API. That's when I discovered **new** things about the AWS Lambda function that I did not know before. The latest version of Node.js that is supported on Lambda is 14.x. Hmm, okay, no problem I quickly installed that version of Node.js and retested my function. Fortunately, I wasn't doing anything particular version dependent so it worked. Whew! One bullet dodged.

I then copied my code into the Lambda function code editor and noticed that the Node module for the Google APIs was not loading. Or seen. Off to Google to see what was needed to correct this situation. After a bit of searching, I discovered that I could create a custom zip file with any npm modules that were required and load them into a "layer" on the Lambda function. Off I went to do so and that problem was solved.

Thinking that the hard part was over, I set up my AWS API Gateway to test the function through the Lambda Proxy. And it failed...

Looking at the response I got the good news that my call to the Google Calendar API wa successful, but that somehow my code was not creating the proper response resulting in the _"Dreaded Malformed Lambda Proxy Response"_ error.

Sigh...

OK, back to Google. Lots and lots of searching later, I found what part of the problem might be and that was that apparently you get the error I was seeing if you use an HTTP GET method (which I naively thought was all that I needed) instead of an HTTP POST method with the parameters in the body of the request.

I tried to execute the code again as a POST but I still got the _"Dreaded Malformed Lambda Proxy Response"_ error. Now what?

More Googling, more testing, more frustration.

I posted my question on StackOverflow. No joy there.

I posted my question on the AWS Developer Forums. No response there.

So I decided to try writing the code from scratch using the Hello Lambda code as a starting point. Doing so pointed me to a couple of issues that being relatively new to Javscript programming I did not immediately notice.

Issue number one was solved by realizing that I could avoid the Malformed Proxy Response by simply returning a response rather than going through the callback function.

Issue number two was solved by remembering that I could use _await_ ahead of the fetch call (like I said, I'm relatively new to Javascript programming).

With those two changes made I cautiously launched the test at the API Gateway and wonder of wonders, I got not only the 200 response I was hoping for, I also saw all of the data. Whew!

With the Lambda function working at the API Gateway, the rest was sort of anticlimactic as hooking the client-side code into the integration was child's play. The final code on the Lambda function is:

```
const { google } = require('googleapis')
const apiKey = process.env.APIKEY
const calendarId = process.env.CALENDAR_ID
const cal = google.calendar({
    version: 'v3',
    auth: apiKey
})

//--------------- Utility Functions --------------------
function lastDayInMonth(month, year) {
  const daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31,30, 31 ];
  return ((month == 1) &&
          (((year % 4 == 0) && (year %100 != 0)) || (year % 400 == 0)))
          ? daysInMonth[month] + 1 // account for leap year
          : daysInMonth[month]
}

//--------- Handler to call Google Calendar API ---------
exports.handler = async (event, context, callback) => {
    // retrieve the month and year
    const { month, year } = JSON.parse(event.body)

    // set up the headers for the response
    var headers = {
        'Access-Control-Allow-Headers' : 'Content-Type, X-Amz-Date, Authorization, X.Api-Key, X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Origin': '*'
    }

    // set up the base response fields
    const response = {
        "statusCode": 200,
        "headers": headers,
        "body": ''
    }

    // set the start date for the beginning of the of the first day of the month
    const startDate = new Date(year, month, 1, 0, 0, 0).toISOString()

    // set the start date for the end of the of the last day of the month
    const endDate = new Date(year, month, lastDayInMonth(month, year), 23, 59, 59).toISOString()

    // set the time zone
    const timeZone = 'Americad/Los_Angeles'

    // set up the parameters for the call to the Google Calendar API
    const res_params = {
        'timeMin': startDate,
        'timeMax': endDate,
        'timeZone': timeZone,
        'calendarId': calendarId,
        'singleEvents': true,
        'orderBy': 'startTime'
    }

    await cal.events.list(res_params)
    .then(result => {
        response.body = JSON.stringify(result)
    })
    .catch(e => {
        response.body = 'Error in retrieving events'
    })

    return response
}
```

There are a couple of things to note in the code above. The first is the use of envirnonment variables to hold the values of the API key (APIKEY) and the endpoint (CALENDAR_ID). This is more of a security measure so that those don't get checked in with the code to Github. I'm somewhat sure that the API key is a read-only key, but the site owner was unable to verify that so better safe than sorry.

The second thing was that I chose to use the native Javascript Date methods and a quick utility function to determine the last day of the month (there might be something simmilar in the Date methods, but I didn't find it). It's a relatively simple function that accounts for the extra day in February during a leap year. I just didn't think it was worth loading a library like [_moment.js_](https://momentjs.com) or [_luxon_](https://moment.github.io/luxon/) to handle those tasks.

In any case, the code above expects a body with the format of:

```
{
  "month": month,
  "year" : year
}
```

It sort of bothers me that I can't use the HTTP GET method because that is, in my mind, the more appropriate method but what the heck, this works and now I have wound up writing my first AWS Lambda microservice!
