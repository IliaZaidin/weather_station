import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h2 className="footer__title">&copy; {year} <a className='footer__link' href='https://github.com/IliaZaidin' target='_blank' rel="noreferrer">Ilia Zaidin</a></h2>
    </footer>
  )
}

export default Footer;