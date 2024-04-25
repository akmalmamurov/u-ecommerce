import "./Test.scss"
const Test = () => {
  return (
    <div className="navbar">
      <a href="#home">Home</a>
      <div className="subnav">
        <button className="subnavbtn">
          About <i className="fa fa-caret-down" />
        </button>
        <div className="subnav-content">
          <a href="#company">Company</a>
          <a href="#team">Team</a>
          <a href="#careers">Careers</a>
        </div>
      </div>
      <div className="subnav">
        <button className="subnavbtn">
          Services <i className="fa fa-caret-down" />
        </button>
        <div className="subnav-content">
          <a href="#bring">Bring</a>
          <a href="#deliver">Deliver</a>
          <a href="#package">Package</a>
          <a href="#express">Express</a>
        </div>
      </div>
      <div className="subnav">
        <button className="subnavbtn">
          Partners <i className="fa fa-caret-down" />
        </button>
        <div className="subnav-content">
          <a href="#link1">Link 1</a>
          <a href="#link2">Link 2</a>
          <a href="#link3">Link 3</a>
          <a href="#link4">Link 4</a>
        </div>
      </div>
      <a href="#contact">Contact</a>
    </div>
  );
};

export default Test;
