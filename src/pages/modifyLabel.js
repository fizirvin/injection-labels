const modifyLabel = { query: `mutation
UpdateLabel($_id: ID, $input: NewPlastic ){
    updatePlastic(_id: $_id, input: $input){
            _id
            header
            intRef
            color
            text
            pieces
            machine
        }
    }`
}

export default modifyLabel;