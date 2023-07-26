

function EquationInput ({ setInput }: { setInput: (input: string) => void }) {

    return (
        <input onChange={(e) => setInput(e.target.value)}></input>
    )

}

export default EquationInput;