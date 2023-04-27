import './Header.css';

function Header(props) {
  const { readings } = props;
  // const currentDate = readings[readings.length-1].date.substr(0,5);

  return (
    <header className='header'>
      <h1 className='header__title'>Weather Station</h1>
      {/* <h2>Today is {currentDate}</h2> */}
    </header>
  )
}

export default Header;