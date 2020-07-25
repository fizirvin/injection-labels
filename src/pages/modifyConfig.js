const modifyConfig = { query: `mutation
    UpdateConfig($_id: ID, $input: ConfigInput ){
        updateConfig(_id: $_id, input: $input){
            _id
            team
            operators {
            _id
            operator
            }
            inspectors {
            _id
            inspector
            }
        }
    }`
}

export default modifyConfig;