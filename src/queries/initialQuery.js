const initialQuery = { query: `query{
    labels {
      _id
      header
      intRef
      clientRef
      certification
      pieces
      color
      text
      machine
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
  
}`};

export default initialQuery