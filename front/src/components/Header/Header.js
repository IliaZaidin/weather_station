import './Header.css';

function Header(props) {
  const { forecast } = props;

  return (
    <header className='header'>
      <h1 className='header__title'>Weather Station</h1>
      <h2 className='header__forecast'>{`Zambretti Forecast: ${forecast}`}</h2>
    </header>
  )
}

export default Header;