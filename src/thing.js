/**
 * @type {import("node-red").NodeInitializer}
 */
module.exports = function (RED) {
    /**
     * @type {import("node-red").NodeConstructor}
     */
    function haStateThing(config) {
        RED.nodes.createNode(this, config)

        this.thingType = RED.nodes.getNode(config.thingType)
        this.name = config.name
        this.attributes = config.attributes
        this.states = config.states
        var node = this

        if (!this.thingType) return

        this.listeners = Object.keys(this.states).map(i => {
            const event = `state:${i}`
            const cb = (val) => {
                this.states[i] = val // set the new value locally
            }

            this.on(event, cb)

            return [event, cb]
        })

        node.on('close', function () {
            this.listeners.forEach(([e, cb]) => {
                node.off(e, cb)
            })
        })
    }
    RED.nodes.registerType("haStateThing", haStateThing)
}