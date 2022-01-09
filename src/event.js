/**
 * @type {import("node-red").NodeInitializer}
 */
module.exports = function (RED) {
    /**
     * @type {import("node-red").NodeConstructor}
     */
    function haStateEvent(config) {
        RED.nodes.createNode(this, config)
        this.thing = RED.nodes.getNode(config.thing)
        this.state = config.state
        var node = this

        if (!this.thing) return

        this.type = typeof this.thing.states[this.state]

        const event = `state:${this.state}`

        const cb = (val) => {
            node.send({
                payload: val,
                thing: {
                    attributes: this.thing.attributes,
                    states: this.thing.states
                },
                state: this.state
            })
        }

        this.thing.on(event, cb)

        node.on("close", () => {
            this.thing.off(event, cb)
        })
    }
    RED.nodes.registerType("haStateEvent", haStateEvent)

}