/**
 * @type {import("node-red").NodeInitializer}
 */
module.exports = function (RED) {
    function getValue(node, msg, type, value) {
        switch (type) {
            case 'num': return Number(value)
            case 'str': return value + ""
            case 'bool': return (value === 'true')
            case 'json': return JSON.parse(value)
            case 're': return new RegExp(value)
            case 'flow': return node.context().flow.get(value)
            case 'global': return node.context().global.get(value)
            case 'env': return process.env[value]
            case 'msg': return RED.util.getMessageProperty(msg, value)
        }
    }
    /**
     * @type {import("node-red").NodeConstructor}
     */
    function haStateAction(config) {
        RED.nodes.createNode(this, config)
        this.thing = RED.nodes.getNode(config.thing)
        this.state = config.state
        this.value = config.value
        this.valueType = config.valueType
        this.silent = config.silent

        var node = this

        if (!this.thing) return

        node.on('input', function (msg) {

            const v = getValue(node, msg, node.valueType, node.value)

            if (typeof v != typeof node.thing.states[node.state]) return

            if (node.silent) {
                node.thing.states[node.state] = v
            } else {
                node.thing.emit(`state:${node.state}`, v)
            }

        })
    }
    RED.nodes.registerType("haStateAction", haStateAction)
}