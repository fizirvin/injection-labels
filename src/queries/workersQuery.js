const workersQuery = { query: `query
  ProfilesLabels($amealco: String, $varias: String ){
    amealco: profilesLabels(team:$amealco){
      _id
      number
      firstname
      lastname
      gender
      team
      position
      active
      picture_URL
    }
    varias: profilesLabels(team:$varias){
      _id
      number
      firstname
      lastname
      gender
      team
      position
      active
      picture_URL
    }
  }`,
};

export default workersQuery