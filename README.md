# node-red-contrib-ha-state

observable things in node red

## Install

via the manage palette menu

or manually:

```bash
cd <NODE_RED_PATH>
npm install node-red-contrib-ha-state
```

# Functionality

1. Create a type of a device with a **Thing Type Node**, which has 2 settings:
   1. attributes: constants that are specific to a thing
   2. states: properties that can change over time
2. Store a device state in a **Thing node**
3. Fire an event when the value of a state changes using an **Event node**
4. Compare the values with custom rules in a **Gate node**
5. Output the value to another flow with a **Value node**
6. Change a state via an **Action node**

e.g. if you have smart thermostats:

1. create the Thermostat **Thing type**:
   1. add attribute id
   2. add temperature, target and battery as states
2. create a living room **Thing** of type Thermostat (this represents the actual device)
   1. set the id for the device
3. manipulate the living room thermostat via the **action node**, and listen to changes via the event node

> Note: a **Thing** is just a virtual representation of the device, any connection to a real device must be done seperately