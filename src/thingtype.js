/**
 * @type {import("node-red").NodeInitializer}
 */
module.exports = function (RED) {

    /**
     * @type {import("node-red").NodeConstructor}
     */
    function haStateThingType(config) {
        RED.nodes.createNode(this, config)
        this.name = config.name
        this.attributes = config.attributes
        this.states = config.states
    }
    RED.nodes.registerType("haStateThingType", haStateThingType)
}