import './Header.css';

function Header(props) {
  const { forecast } = props;

  return (
    <header className='header'>
      <h1 className='header__title'>Weather Station</h1>
      <a className='header__subtitle' href='https://communities.sas.com/t5/Streaming-Analytics/Zambretti-Algorithm-for-Weather-Forecasting/td-p/679487' target="_blank" rel="noreferrer">Zambretti Forecast:</a>
      <h2 className='header__forecast'>{`${forecast}`}</h2>
    </header>
  )
}

export default Header;