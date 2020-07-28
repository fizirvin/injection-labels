const initialQuery = { query: `query
  TeamLabels($amealco: String, $varias: String ){
    amealco: configs(team:$amealco){
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
      quantity {
        _id
        quantity
      }
    }
    varias: configs(team:$varias){
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
      quantity {
        _id
        quantity
      }
    }
    plastics {
      _id
      header
      intRef
      pieces
      color
      text
      machine
    }
  }`
};

export default initialQuery