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

# Ideology and thought process:

I separated the issue into 2 parts. One for Problem 1 (Cost estimation). Another one for Problem 2(Time estimation). However, both share the same codebase as problem 2 will share part of the logic from the first part.
<br>
<br>

## Cost Estimation:

One of the important factors in this part is to enable us to easily make changes to the **base delivery cost calculation** and the **offer code**.

So i separated the **base delivery cost calculation** into a separated function. We can inject any function to the "Estimator" in case we wanted to test out any new formula.

Besides, i also separated the **offer code** into different module, enabled us to add new offer codes or make any changes to anything related to **discount**.

I also make sure the data structure of the **offer**, so that it can cater for different comparison of the value whether it's inclusive or exclusive.
<br>
<br>

## Time Estimation:

Part 2 become quite a challenging task.

First, use **TripPlanner** to plan the trip. Here, will fullfil all the delivery criteria depends on the priority of each criteria. Finally will return list of optimized **trips** for the Estimator's usage.

Next, the **Estimator** will loop through each trip. During each trip, the Estimator get the next available vehicle to perform delivery. After each delivery, the vehicle will return a list of **DeliveryRecords** to consists of the delivery time for each package within the trip.

After finished all the trips, all packages' delivery time will be recorded in **DeliveryRecords**.
<br>
<br>

_ps: may refer comments of function to understand the usage and purpose of the function_
