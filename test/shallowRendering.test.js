import TestUtils from 'react-addons-test-utils'
import expect from 'expect'

const CoolComponent=({greeting})=>(
    <div>
        <h1>Hello from Megumin</h1>
        <div>{greeting}</div>
    </div>
)
describe("CoolComponent is Up", ()=>{
    it('should.... :-)', ()=>{
        const renderer= TestUtils.createRenderer()
            renderer.render(<CoolComponent greeting="2D girls is BEST"/>)
            const output= renderer.getRenderOutput()
        expect(output.type).toBe('div')
        const greetingDiv= output.props.children[1]
        expect(greetingDiv.props.children).toBe("2D girls is BEST")
    })
})