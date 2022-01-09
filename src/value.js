/**
 * @type {import("node-red").NodeInitializer}
 */
module.exports = function (RED) {

    /**
     * @type {import("node-red").NodeConstructor}
     */
    function haStateValue(config) {
        RED.nodes.createNode(this, config)
        this.thing = RED.nodes.getNode(config.thing)
        this.state = config.state
        this.field = config.field
        this.fieldType = config.fieldType
        this.thingInfo = config.thingInfo

        const node = this

        if (!this.thing) return

        node.on("input", (msg) => {

            const value = node.thing.states[node.state]

            const out = node.thingInfo ? {
                value,
                thing: {
                    id: node.thing.id,
                    attributes: node.thing.attributes,
                    states: node.thing.states
                },
            } : value

            switch (node.fieldType) {
                case 'flow':
                    node.context().flow.set(node.field, out)
                    break
                case 'global':
                    node.context().global.set(node.field, out)
                    break
                case 'msg':
                    msg[node.field] = out
                    break
            }

            node.send(msg)
        })
    }
    RED.nodes.registerType("haStateValue", haStateValue)
}