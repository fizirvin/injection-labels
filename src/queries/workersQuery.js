const workersQuery = { query: `query
  ProfilesLabels($team: String){
    profilesLabels(team:$team){
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