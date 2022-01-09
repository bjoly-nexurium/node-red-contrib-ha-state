/**
 * @type {import("node-red").NodeInitializer}
 */
module.exports = function (RED) {
    /**
     * @type {import("node-red").NodeConstructor}
     */
    function haStateDynamicAction(config) {
        RED.nodes.createNode(this, config)

        const node = this

        node.on('input', function (msg) {

            const thing = RED.nodes.getNode(msg.thing)

            const state = msg.topic

            const value = msg.payload

            if (!thing || !state || !value) {
                node.error("Missing thing, item, or value to update")
                return
            }

            if (typeof value != typeof thing.states[state]) return

            if (msg.silent) {
                thing.states[state] = value
            } else {
                thing.emit(`state:${state}`, value)
            }

        })
    }
    RED.nodes.registerType("haStateDynamicAction", haStateDynamicAction)
}