import '../css/Header.css'
import ocbLogo from '/ocb.svg'

const Header = () =>
{
  return (
    <div className='Header flex justify-center align-center bg-dark'>
      <div className='flex justify-center align-center flex-column gap-1'>
        <a href='/'>
          <img src={ ocbLogo } alt="Omni Coffee Brands Logo" />
        </a>
        <p className='small color-accent w-100'>Omni Coffee Brands</p>
      </div>
    </div>
  )
}

export { Header }