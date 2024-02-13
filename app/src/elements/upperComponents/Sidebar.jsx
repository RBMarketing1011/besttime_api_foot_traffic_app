import { useState, useRef } from 'react'

import { FaBarsStaggered, FaXmark } from 'react-icons/fa6'

import '../css/Sidebar.css'

const Sidebar = ({ venueName, venueAddress, submitHandler, venueInfo }) =>
{
  const [ menuOpen, setMenuOpen ] = useState(true)

  return (
    <div style={ menuOpen ? { width: '300px', padding: '1rem 1.5rem' } : { width: '0', padding: '0' } } className='Sidebar flex justify-start align-start flex-column gap-5'>

      <div className='flex align-center gap-5'>
        <h5 className={ menuOpen ? 'large color-accent show' : 'hide' }>Foot Traffic Data</h5>
        <div className='menu hover-pointer flex justify-center align-center'>

          {
            menuOpen ?
              <FaXmark onClick={ () => setMenuOpen(!menuOpen) } className='color-accent' size={ 25 } />

              :

              <FaBarsStaggered onClick={ () => setMenuOpen(!menuOpen) } className='color-accent' size={ 25 } />
          }

        </div>
      </div>

      <form onSubmit={ (e) => submitHandler(e) } className={ menuOpen ? 'flex justify-center align-start flex-column gap-3 show' : 'hide' }>

        <div className='flex justify-center align-start flex-column gap-2'>
          <label htmlFor="name" className='medium fw-700 color-accent'>Venue Name</label>
          <input id='name' value={ venueName.state } type="text" onChange={ (e) => venueName.handler(e.target.value) } />
        </div>

        <div className='flex justify-center align-start flex-column gap-2'>
          <label htmlFor="address" className='medium fw-700 color-accent'>Venue Location</label>
          <input id='address' value={ venueAddress.state } type="text" onChange={ (e) => venueAddress.handler(e.target.value) } />
        </div>

        <div className='btn-group w-50'>
          <button className='btn btn-solid btn-primary hover-pointer'>Submit</button>
        </div>

      </form>

      {
        venueInfo &&
        <div className={ menuOpen ? 'flex align-start flex-column gap-3 w-100 show' : 'hide' }>

          <h4 className='large color-accent fw-700 underline w-100'>Venue Info</h4>

          <div className='flex justify-center align-start flex-column gap-3'>

            <div className='flex justify-center align-start flex-column gap-1'>
              <p className='medium color-light fw-700 underline'>Name</p>
              <p className='medium color-accent fw-700'>{ venueInfo.venue_name }</p>
            </div>

            <div className='flex justify-center align-start flex-column gap-1'>
              <p className='medium color-light fw-700 underline'>Address</p>
              <p className='medium color-accent fw-700'>{ venueInfo.venue_address }</p>
            </div>

            <div className='flex justify-center align-start flex-column gap-1'>
              <p className='medium color-light fw-700 underline'>Timezone</p>
              <p className='medium color-accent fw-700'>{ venueInfo.venue_timezone }</p>
            </div>

            <div className='flex justify-center align-start flex-column gap-1'>
              <p className='medium color-light fw-700 underline'>Type</p>
              <p className='medium color-accent fw-700'>{ venueInfo.venue_type }</p>
            </div>

          </div>

        </div>
      }

    </div>
  )
}

export { Sidebar }