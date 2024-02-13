import { useState, useRef } from 'react'

import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, PolarArea, Line, Doughnut } from 'react-chartjs-2'

import { toast } from 'react-toastify'

// import
// {
//   useGetFootTrafficDataMutation,
//   useGetKeyInfoQuery
// } from '../../slices/footTrafficApiSlice'

import DataFile from '../../Data/DataFile'

import { Sidebar } from '../upperComponents/Sidebar'

import '../css/HomeScreen.css'

const HomeScreen = () =>
{

  // KEY INFO QUERY


  // const {
  //   data,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // } = useGetKeyInfoQuery()

  // let keyData

  // if (isLoading)
  // {
  //   keyData = <p>Loading...</p>
  // } else if (isSuccess)
  // {
  //   console.log(data)
  // } else if (isError)
  // {
  //   keyData = <p>{ error }</p>
  // }



  // END QUERY

  const [ venueName, setVenueName ] = useState('')
  const [ venueAddress, setVenueAddress ] = useState('')
  const [ Data, setData ] = useState()
  const [ sidebarData, setSidebarData ] = useState()

  // const [ getVenueData ] = useGetFootTrafficDataMutation()

  const formHandler = async (e) =>
  {
    e.preventDefault()

    setData(DataFile.analysis)
    setSidebarData(DataFile.venue_info)

    toast.success('Data Found Successfully')

    // try
    // {
    //   const res = await getVenueData({ venueName, venueAddress }).unwrap()

    //   setData(res.analysis)
    //   setSidebarData(res.venue_info)

    //   toast.success('Data Found Successfully')

    // } catch (err)
    // {
    //   toast.error('Venue Data Not Found')
    // }
  }

  // Func() To Calc Time
  const timeValue = (time) =>
  {
    let timeValue

    if (time > 0 && time <= 12)
    {
      timeValue = "" + time
    } else if (time > 12)
    {
      timeValue = "" + (time - 12)
    } else if (time == 0)
    {
      timeValue = "12"
    }

    timeValue += (time >= 12) ? " PM" : " AM"

    return timeValue
  }

  const averageOfArray = (Data, num) =>
  {
    let arr = new Array
    Data.map(data => (
      data.hour_analysis.map(hour =>
      {
        if (hour.hour === num && hour.intensity_nr !== '999')
        {
          arr.push(hour.intensity_nr)
        }
      })
    ))

    let sum = 0
    arr.map(num => sum += num)
    let res = sum / arr.length
    return res
  }

  const reverseDayRank = (rank) =>
  {
    if (rank === 1)
    {
      return 7
    } else if (rank === 2)
    {
      return 6
    } else if (rank === 3)
    {
      return 5
    } else if (rank === 5)
    {
      return 3
    } else if (rank === 6)
    {
      return 2
    } else if (rank === 7)
    {
      return 1
    } else
    {
      return rank
    }
  }

  const returnDayText = (Data) =>
  {
    let arr = new Array
    Data.map(data =>
    {
      if (data.day_info.day_rank_mean < 4)
      {
        arr.push(data.day_info.day_text)
      }
    })

    return arr
  }

  const returnDayMean = (Data) =>
  {
    let arr = new Array
    Data.map(data =>
    {
      if (data.day_info.day_rank_mean < 4)
      {
        arr.push(data.day_info.day_rank_mean)
      }
    })

    let reverseArr = new Array
    arr.map(i => { reverseArr.push(reverseDayRank(i)) })

    return reverseArr
  }

  return (
    <div className='HomeScreen flex justify-start align-start'>

      <Sidebar
        venueName={ {
          state: venueName,
          handler: setVenueName
        } }
        venueAddress={ {
          state: venueAddress,
          handler: setVenueAddress
        } }
        submitHandler={ formHandler }
        venueInfo={ sidebarData }
      />

      <div className='charts flex justify-start align-start flex-wrap gap-5'>

        {
          Data &&
          <>
            <div className='flex justify-center align-center flex-column w-25 gap-4'>
              <div className='chart flex justify-center align-center flex-column gap-2 w-100'>
                <h3 className='w-100 underline text-center'>Hours of Operation</h3>
                <div className='flex justify-start align-start w-100'>
                  <div className='flex justify-even align-start flex-column w-50 gap-1'>

                    {
                      Data.map((data, i) => (
                        <p key={ i }>{ data.day_info.day_text }</p>
                      ))
                    }

                  </div>
                  <div className='flex justify-even align-start flex-column w-50 gap-1'>

                    {
                      Data.map((data, i) => (
                        <p key={ i }>{ timeValue(new Date(0, 0, 0, data.day_info.venue_open, 0, 0).getHours())
                          +
                          '-'
                          +
                          timeValue(new Date(0, 0, 0, data.day_info.venue_closed, 0, 0).getHours()) }
                        </p>
                      ))
                    }

                  </div>
                </div>
              </div>

              <div className='chart flex justify-center align-center flex-column gap-2 w-100'>
                <h3 className='w-100 underline text-center'>Peak Business Hours</h3>
                <div className='flex justify-start align-start w-100'>
                  <div className='flex justify-even align-start flex-column w-50 gap-1'>

                    {
                      Data.map((data, i) => (
                        <p key={ i }>{ data.day_info.day_text }</p>
                      ))
                    }

                  </div>
                  <div className='flex justify-even align-start flex-column w-50 gap-1'>

                    {
                      Data.map((data, i) => (
                        data.peak_hours.length ?
                          <p key={ i }>{ timeValue(new Date(0, 0, 0, data.peak_hours[ 0 ].peak_start, 0, 0).getHours())
                            +
                            '-'
                            +
                            timeValue(new Date(0, 0, 0, data.peak_hours[ 0 ].peak_end, 0, 0).getHours()) }
                          </p>

                          :

                          <p key={ i }>N/A</p>
                      ))
                    }

                  </div>
                </div>
              </div>
            </div>

            <div className='chart flex justify-center align-center w-75'>

              <Line
                data={ {
                  labels: Data[ 0 ].hour_analysis.map(hour =>
                  {
                    return timeValue(new Date(0, 0, 0, hour.hour, 0, 0).getHours())
                  }),
                  datasets: [
                    {
                      label: 'Average Intensity By The Hour',
                      data:
                        Data[ 0 ].hour_analysis.map(data =>
                        {
                          if (data.intensity_nr !== '999')
                          {
                            return averageOfArray(Data, data.hour)
                          }
                        }),
                      borderColor: '#b19d56',
                      borderWidth: 2
                    }
                  ]
                } }
              />

            </div>

            <div className='chart flex justify-center align-center w-100'>
              <Bar
                data={ {
                  labels: Data.map(data => (
                    data.day_info.day_text
                  )),
                  datasets: [
                    {
                      label: 'Median Foot Traffic',
                      data: Data.map(data => data.day_info.day_mean),
                      backgroundColor: '#b19d5675',
                      hoverBackgroundColor: '#b19d56',
                      borderColor: '#b19d56',
                      borderWidth: 2,
                      borderRadius: 10
                    },
                    {
                      label: 'Max Foot Traffic',
                      data: Data.map(data => data.day_info.day_max),
                      backgroundColor: '#d52a0b75',
                      hoverBackgroundColor: '#d52a0b',
                      borderColor: '#d52a0b',
                      borderWidth: 2,
                      borderRadius: 10
                    }
                  ]
                } }
              />
            </div>

            <div className='chart flex justify-center align-center w-50'>
              <PolarArea
                data={ {
                  labels: Data.map(data => (
                    data.day_info.day_text
                  )),
                  datasets: [ {
                    label: 'Day Rank',
                    data: Data.map(data => (
                      reverseDayRank(data.day_info.day_rank_mean)
                    ))
                  } ]
                } }
              />
            </div>

            <div className='chart flex justify-center align-center w-50'>
              <Doughnut
                data={ {
                  labels: returnDayText(Data),
                  datasets: [
                    {
                      label: 'Busiest Days',
                      data: returnDayMean(Data)
                    }
                  ]
                } }
              />
            </div>
          </>
        }

      </div >
    </div >
  )
}

export { HomeScreen }