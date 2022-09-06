# courier-service

## Prerequisite Requirements

- Node
- NPM

## How to run the application

1. Clone the repo via the command below:

```
git clone https://github.com/lwei88/courier-service.git
```

2. Start the application by running the command below in Terminal:

For Problem 1:

```
node src/app.1.js
```

For Problem 2:

```
node src/app.2.js
```

## How to perform test

Run the test command

```
npm test
```

### Sample Data can used to pasted into Terminal:

For Problem 1:

```
100 3
PKG1 5 5 OFR001
PKG2 15 5 OFR002
PKG3 10 100 OFR003
```

For Problem 2:

```
100 5
PKG1 50 30 OFR001
PKG2 75 125 OFR008
PKG3 175 100 OFR003
PKG4 110 60 OFR002
PKG5 155 95 NA
2 70 200
```

_Reminder: Hit CTRL-D after finished input the data into the Terminal_

#

#

# Ideology and thought process:

I separated the issue into 2 parts. One for Problem 1 (Cost estimation). Another one for Problem 2(Time estimation). However, both share the same codebase as problem 2 will share part of the logic from the first part.

## Cost Estimation:

One of the important factors in this part is to enable us to easily make changes to the **base delivery cost calculation** and the **offer code**.

So i separated the **base delivery cost calculation** into a separated function. We can inject any function to the "Estimator" in case we wanted to test out any new formula.

Besides, i also separated the **offer code** into different module, enabled us to add new offer codes or make any changes to anything related to **discount**.

I also make sure the data structure of the **offer**, so that it can cater for different comparison of the value whether it's inclusive or exclusive.

## Time Estimation:

Part 2 become quite a challenging task.

First, i make a recursive function to find out all the different combination of packages. Then, filter out all the packages that exceeded the defined weight. Next, sort it by weight. Using a while loop, pop out the first trip's packages. Then remove the packages that existed within the array. The loop will break when the array become empty.

Now we have all the packages combination ordered to be picked by delivery vehicle.

Next, we needed to tackle how the each package's delivery time to be calculated. So, a ledger of accumulated after each trip was confirmed.

So, i used a reduce method for each trip, instantiate a beginning state for each vehicle depends on how many are available. For example: 2 vehicle the instantiated state will looked like the json below:

```
[
    [
        { id: null, hr: 0, pckCombDeliveryHr: [] }, // Vehicle 1
        { id: null, hr: 0, pckCombDeliveryHr: [] }  // Vehicle 2
    ]
]
```

As we loop through the "trips", we will update the ledger above. For example: vehicle 1 picked the first delivery trip. the ledger will updated become something like this:

```
[
    [
        {
            "id": "PKG4-PKG2",
            "hr": 3.56,
            "pckCombDeliveryHr": [
            { "pkgId": "PKG4", "deliveryHr": 0.85 },
            { "pkgId": "PKG2", "deliveryHr": 1.78 }
            ]
        },
        { "id": null, "hr": 0, "pckCombDeliveryHr": [] }
    ]
]
```

By the end, we should be able to get a ledger looked like this:

```
[
  [
    { "id": null, "hr": 0, "pckCombDeliveryHr": [] },
    { "id": null, "hr": 0, "pckCombDeliveryHr": [] }
  ],
  [
    {
      "id": "PKG4-PKG2",
      "hr": 3.56,
      "pckCombDeliveryHr": [
        { "pkgId": "PKG4", "deliveryHr": 0.85 },
        { "pkgId": "PKG2", "deliveryHr": 1.78 }
      ]
    },
    { "id": null, "hr": 0, "pckCombDeliveryHr": [] }
  ],
  [
    {
      "id": "PKG4-PKG2",
      "hr": 3.56,
      "pckCombDeliveryHr": [
        { "pkgId": "PKG4", "deliveryHr": 0.85 },
        { "pkgId": "PKG2", "deliveryHr": 1.78 }
      ]
    },
    { "id": "PKG3", "hr": 2.84, "pckCombDeliveryHr": [{ "pkgId": "PKG3", "deliveryHr": 1.42 }] }
  ],
  [
    {
      "id": "PKG4-PKG2",
      "hr": 3.56,
      "pckCombDeliveryHr": [
        { "pkgId": "PKG4", "deliveryHr": 0.85 },
        { "pkgId": "PKG2", "deliveryHr": 1.78 }
      ]
    },
    { "id": "PKG5", "hr": 5.54, "pckCombDeliveryHr": [{ "pkgId": "PKG5", "deliveryHr": 4.19 }] }
  ],
  [
    { "id": "PKG1", "hr": 4.4, "pckCombDeliveryHr": [{ "pkgId": "PKG1", "deliveryHr": 3.98 }] },
    { "id": "PKG5", "hr": 5.54, "pckCombDeliveryHr": [{ "pkgId": "PKG5", "deliveryHr": 4.19 }] }
  ]
]
```

So what is **hr**?

It is the return time used for each trip. It's calculated based on the max distance of the package \* 2 / maxspeed.

So how do we determine which vehicle to update, when we append to the ledger, we determine by the previous min value of **hr** among all the vehicle.

For each package, we just needed to add the time used for each trip on top of last **hr**.

Once we got the completed ledger, we can use reduce function to get individual package with their delivery time.
