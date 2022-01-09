/**
 * @type {import("node-red").NodeInitializer}
 */
module.exports = function (RED) {
    function checkRules(node, msg) {

        function getValue(type, value) {
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

        function compare(op, a, b) {
            switch (op) {
                case 'eq': return a === b
                case 'neq': return a !== b
                case 'lt': return ((typeof a == 'number') && (a < b))
                case 'lte': return ((typeof a == 'number') && (a <= b))
                case 'gt': return ((typeof a == 'number') && (a > b))
                case 'gte': return ((typeof a == 'number') && (a >= b))
                case 'cont': return (a + "").indexOf(b) !== -1
                case 'regex': return b.test(a + "")
                case 'true': return a === true
                case 'false': return a === false
            }
        }

        function checkRule({ thing: thingID, state, operator, value, type }) {
            const thing = RED.nodes.getNode(thingID)
            return thing !== undefined && compare(operator, thing.states[state], getValue(type, value))
        }

        if (node.checkall) {
            return node.rules.every(checkRule)
        } else {
            return node.rules.some(checkRule)
        }
    }

    /**
     * @type {import("node-red").NodeConstructor}
     */
    function haStateGate(config) {
        RED.nodes.createNode(this, config)
        this.name = config.name
        this.rules = config.rules
        this.checkall = config.checkall
        var node = this

        node.on('input', function (msg) {
            if (checkRules(node, msg)) {
                node.send([msg, null])

            } else {
                node.send([null, msg])
            }
        })
    }
    RED.nodes.registerType("haStateGate", haStateGate)
}