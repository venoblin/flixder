import './Home.css'

const Home = (props) => {
  return (
    <div className="Home">
      <div className="profile-card">
        <img
          src={props.currentProfile.profile_pic}
          alt={`${props.currentProfile.name} profile`}
        />
        <div className="profile-info"></div>
      </div>
    </div>
  )
}

export default Home
