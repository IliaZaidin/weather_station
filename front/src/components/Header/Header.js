import './Header.css';

function Header(props) {
  const { forecast, currentDate } = props;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateToPresent = `Last updated on ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours()}:${currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()}`

  return (
    <header className='header'>
      <div className='header__title'>
        <h1 className='header__title_name'>Weather Station</h1>
        <h2 className='header__title_date'>{dateToPresent}</h2>
      </div>
      <a className='header__subtitle' href='https://communities.sas.com/t5/Streaming-Analytics/Zambretti-Algorithm-for-Weather-Forecasting/td-p/679487' target="_blank" rel="noreferrer">Zambretti Forecast:</a>
      <h3 className='header__forecast'>{`${forecast}`}</h3>
    </header>
  )
}

export default Header;