// Local Storage Controller
const StorageCtrl = (function () {

  const setUserProfile = function (data) {

    if (typeof (data) === "object") {

      const dataStr = JSON.stringify(data)

      localStorage.setItem('Profile', dataStr)

    } else {

      console.warn(
        "Data passed in setUserProfile isn't Object Type and for that reason, the data wasn't saved into local storage"
      );

    }
  }

  const userProfile = function () {

    let profile = localStorage.getItem('Profile')

    if (profile !== 'undefined' && profile !== 'null') {

      profile = JSON.parse(profile)

      return profile
    }
  }

  const checkUserProfile = function () {

    let profile = localStorage.getItem('Profile')

    profile = (
      profile === 'undefined'
      || profile === 'null'
      || profile === null
      || profile === undefined
    )

    return profile
  }

  const dataExample = function () {
    const example = {
      fullName: 'Gbolade Festus',
      callName: 'Elpis',
      age: 15,
      gender: 'Male',
      proffesion: 'Student',
      employmentStatus: 'UnEmployed',
      locationO: {
        continent: 'Africa',
        country: 'Nigeria',
        state: 'Lagos'
      },
      locationL: {
        continent: 'Africa',
        country: 'Nigeria',
        state: 'Lagos'
      },
      wealth: 'Average',
      lookingForJob: true,
      monthlyIncome: 500,
      dailySpendings: 30,
      sport: 'none',
      relationship: 'single',
      birthDay: '13-September',
      bio: "I'm a cool headed guy",
      hobbies: [
        {
          name: 'Cooking',
          description: "Not Provided"
        },
        {
          name: 'Killing',
          description: "Not Provided"
        },
        {
          name: 'Fucking',
          description: "Not Provided"
        },
        {
          name: 'Drinking',
          description: "It is an art if dring beer"
        }
      ],
      work: [
        { type: 'Student', place: 'Royal Academy' },
        { type: 'Banker', place: 'First Bank' },
        { type: 'CameraMan', place: 'Anywhere' },
      ],
      timeline: {
        school: {
          type: 'daily',
          month: ['February'],
          days: ['Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          time: ['08:30', '14:30']
        },
        work: {
          type: 'daily',
          month: ['March'],
          days: ['Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Sunday'],
          time: ['08:30', '14:30']
        }
      }
    }

    return example
  }

  return {
    setUserProfile: (data) => setUserProfile(data),

    userProfile: () => userProfile(),

    checkUserProfile: () => checkUserProfile(),

    dataExample: () => dataExample()
  }
})();


// Time Controller
const TimeCtrl = (function () {

  const getNoDays = function (number, year) {

    switch (number) {
      case 1:
        if (year) {

          if (year % 4 === 0) {

            return 29

          } else {

            return 28

          }

        } else {

          return 28

        }
        break

      case 4:
      case 0:
      case 2:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31
        break;

      case 3:
      case 5:
      case 8:
      case 10:
        return 30
        break;

      default:
        break;
    }

  }

  const secondstoTimeStr = function (number, x) {

    let answer = number / 3600

    const hour = Math.floor(answer)

    answer = answer - hour

    answer = answer * 60

    const minute = Math.floor(answer)

    answer = answer - minute

    answer = answer * 60

    const second = Math.floor(answer)

    let stamp = hour >= 12 ? `pm` : `am`

    const newMinute = String(minute).length === 2 ? minute : `0${minute}`

    let newHour = hour > 12 ? (hour - 12) : hour

    newHour = hour === 0 ? 12 : newHour

    stamp = hour === 24 ? `am` : stamp

    return x === undefined ?
      `${newHour}:${newMinute}${stamp}` :
      `${newHour}:${newMinute}:${second}${stamp}`
  }

  const timeListToMilSeconds = function (theList) {

    theList.map((a) => {
      return isNaN(parseInt(a)) ? a : parseInt(a)
    })

    let milliSec = 0

    if (theList.length === 3) {

      milliSec += theList[0] * 60 * 60 * 1000

      milliSec += theList[1] * 60 * 1000

      milliSec += theList[2] * 1000

    } else {

      let hr

      if (theList[3] === 'am') {
        if (theList[0] === 12) {
          hr = 0
        } else {
          hr = theList[0]
        }
      } else {
        if (theList[0] === 12) {
          hr = 24
        } else {
          hr = theList[0] + 12
        }
      }

      milliSec += hr * 60 * 60 * 1000

      milliSec += theList[1] * 60 * 1000

      milliSec += theList[2] * 1000

    }

    const returnValue = milliSec

    return returnValue
  }

  const secondstoTimeList = function (number) {

    let answer = number / 3600

    const hour = Math.floor(answer)

    answer = answer - hour

    answer = answer * 60

    const minute = Math.floor(answer)

    answer = answer - minute

    answer = answer * 60

    const second = Math.floor(answer)

    return [hour, minute, second]
  }

  const timetoSeconds = function (theDate) {
    const dateArray = [
      theDate.getHours() * 3600,
      theDate.getMinutes() * 60,
      theDate.getSeconds()
    ]

    let answer = 0

    for (const item of dateArray) {
      answer += item
    }

    return answer
  }

  const getMonth = function (number) {

    switch (number) {
      case 0:
        return 'January'
        break;

      case 1:
        return 'February'
        break;

      case 2:
        return 'March'
        break;

      case 3:
        return 'April'
        break;

      case 4:
        return 'May'
        break;

      case 5:
        return 'June'
        break;

      case 6:
        return 'July'
        break;

      case 7:
        return 'August'
        break;

      case 8:
        return 'September'
        break;

      case 9:
        return 'October'
        break;

      case 10:
        return 'November'
        break;

      case 11:
        return 'December'
        break;

      default:
        break;
    }

  }

  const getMonthNumber = function (month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]

    return months.indexOf(month)
  }

  const makeCalender = function (date, monthE, yearE, bodyE) {

    const today = new Date()

    const year = date.getFullYear()

    const month = TimeCtrl.getMonth(date.getMonth())

    const noOfDays = TimeCtrl.getNoDays(date.getMonth(), date.getFullYear())

    let firstDay = new Date(year, date.getMonth(), 1)

    firstDay = firstDay.getDay()

    let prevMonth = new Date(year, date.getMonth() - 1, date.getDate())

    prevMonth = TimeCtrl.getNoDays(prevMonth.getMonth(), prevMonth.getFullYear())

    let countStarted = 0;

    let countEnded = 'No';

    let daysCount = 0;

    const makeCalende = function (date, datetr) {

      let calender = `
      <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>

      <tr>
      `

      for (let j = 0; j < 7; j++) {

        const startCount = j >= firstDay ? 'yes' : 'no'

        if (j === firstDay) { countStarted = j }

        if (startCount === 'yes') {

          daysCount++

          if (daysCount === date) {

            calender += `
            <td class="active">${j + 1 - countStarted}</td>
            `

          } else if (daysCount === datetr) {

            calender += `
            <td class="xactive">${j + 1 - countStarted}</td>
            `

          } else {

            calender += `
            <td>${j + 1 - countStarted}</td>
            `

          }

        } else {
          calender += `
          <td class="clouded before">${prevMonth - firstDay + 1 + j}</td>
          `
        }

      }

      calender += `
      </tr>

      <tr>
      `

      for (let j = 0; j < 7; j++) {

        daysCount++

        if (daysCount === date) {

          calender += `
          <td class="active">${daysCount}</td>
          `

        } else if (daysCount === datetr) {

          calender += `
          <td class="xactive">${daysCount}</td>
          `

        } else {

          calender += `
          <td>${daysCount}</td>
          `

        }

      }

      calender += `
      </tr>

      <tr>
      `

      for (let j = 0; j < 7; j++) {

        daysCount++

        if (daysCount === date) {

          calender += `
          <td class="active">${daysCount}</td>
          `

        } else if (daysCount === datetr) {

          calender += `
          <td class="xactive">${daysCount}</td>
          `

        } else {

          calender += `
          <td>${daysCount}</td>
          `

        }
      }

      calender += `
      </tr>

      <tr>
      `


      for (let j = 0; j < 7; j++) {

        daysCount++

        if (daysCount > noOfDays) { countEnded = 'Yes' }

        if (countEnded === 'Yes') {
          calender += `
            <td class="clouded after">${daysCount - noOfDays}</td>
          `
        } else {

          if (daysCount === date) {

            calender += `
            <td class="active">${daysCount}</td>
            `

          } else if (daysCount === datetr) {

            calender += `
            <td class="xactive">${daysCount}</td>
            `

          } else {

            calender += `
            <td>${daysCount}</td>
            `

          }
        }
      }

      calender += `
      </tr>
      `

      if (daysCount < noOfDays) {

        calender += `
        <tr>
        `

        for (let j = 0; j < 7; j++) {

          daysCount++

          if (daysCount > noOfDays) { countEnded = 'Yes' }

          if (countEnded === 'Yes') {
            calender += `
            <td class="clouded after">${daysCount - noOfDays}</td>
          `
          } else {

            if (daysCount === date) {

              calender += `
              <td class="active">${daysCount}</td>
              `

            } else if (daysCount === datetr) {

              calender += `
              <td class="xactive">${daysCount}</td>
              `

            } else {

              calender += `
              <td>${daysCount}</td>
              `

            }
          }
        }

        calender += `
        </tr>`
      }

      if (daysCount < noOfDays) {

        calender += `
        <tr>
        `

        for (let j = 0; j < 7; j++) {

          daysCount++

          if (daysCount > noOfDays) { countEnded = 'Yes' }

          if (countEnded === 'Yes') {
            calender += `
            <td class="clouded after">${daysCount - noOfDays}</td>
          `
          } else {

            if (daysCount === date) {

              calender += `
            <td class="active">${daysCount}</td>
            `

            } else if (daysCount === datetr) {

              calender += `
            <td class="xactive">${daysCount}</td>
            `

            } else {

              calender += `
            <td>${daysCount}</td>
            `

            }
          }
        }

        calender += `
        </tr>`
      }

      return calender
    }

    monthE.innerText = month

    yearE.innerText = year

    if (
      `${date.getFullYear() + ' ' + date.getMonth()}`
      ===
      `${today.getFullYear() + ' ' + today.getMonth()}`
    ) {

      bodyE.innerHTML = makeCalende(today.getDate(), date.getDate())

    } else {

      bodyE.innerHTML = makeCalende(0, date.getDate())

    }

  }

  const addDateSuffix = function (dateX) {

    let date = dateX.toString()

    if (['11', '12', '13'].indexOf(date) !== -1) {
      date = date + 'th'
    } else if (date[date.length - 1] > '3') {
      date = date + 'th'
    } else if (date[date.length - 1] === '0') {
      date = date + 'th'
    } else if (date[date.length - 1] === '1') {
      date = date + 'st'
    } else if (date[date.length - 1] === '2') {
      date = date + 'nd'
    } else if (date[date.length - 1] === '3') {
      date = date + 'rd'
    }

    if (isNaN(parseInt(dateX))) { return dateX } else { return date }
  }

  const getDayNumber = function (day) {

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednessday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    return days.indexOf(day)

  }

  const getDay = function (number) {

    num = parseInt(number)

    const days = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednessday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }

    return days[num]

  }

  const datetoTimeStr = function (theDate) {

    const acSeconds = timetoSeconds(theDate)

    const acTime = secondstoTimeStr(acSeconds)

    return acTime

  }

  const datetoFullTimeStr = function (theDate) {

    const acSeconds = timetoSeconds(theDate)

    const acTime = secondstoTimeStr(acSeconds, 3)

    return acTime

  }

  const getLeisureDate = function (date, theDate) {

    let returnValue

    if (date.getTime() === theDate.getTime()) {

      returnValue = 'Now'

    } else if (theDate.getTime() > date.getTime()) {

      const beginDate = (
        new Date(date.getTime() - (TimeCtrl.timetoSeconds(date) * 1000))
      ).getTime() - 1000

      if (theDate.getTime() < (beginDate + 86400000)) {

        returnValue = 'Today'

      } else if (
        theDate.getTime() > (beginDate + 86400000) &&
        theDate.getTime() < (beginDate + (86400000 * 2))
      ) {

        returnValue = 'Tommorow'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 2)) &&
        theDate.getTime() < (beginDate + (86400000 * 3))
      ) {

        returnValue = 'Two Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 3)) &&
        theDate.getTime() < (beginDate + (86400000 * 4))
      ) {

        returnValue = 'Three Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 4)) &&
        theDate.getTime() < (beginDate + (86400000 * 5))
      ) {

        returnValue = 'Four Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 5)) &&
        theDate.getTime() < (beginDate + (86400000 * 6))
      ) {

        returnValue = 'Five Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 6)) &&
        theDate.getTime() < (beginDate + (86400000 * 7))
      ) {

        returnValue = 'Six Days'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 7)) &&
        theDate.getTime() < (beginDate + (86400000 * 14))
      ) {

        returnValue = 'Two Weeks'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 14)) &&
        theDate.getTime() < (beginDate + (86400000 * 21))
      ) {

        returnValue = 'Three Weeks'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 21)) &&
        theDate.getTime() < (beginDate + (86400000 * 28))
      ) {

        returnValue = 'Four Weeks'

      } else if (
        theDate.getTime() > (beginDate + (86400000 * 28))
      ) {

        returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`

      } else {
        returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
      }


    } else if (theDate.getTime() < date.getTime()) {

      const beginDate = (
        new Date(date.getTime() - (TimeCtrl.timetoSeconds(date) * 1000))
      ).getTime() - 1000

      if (
        theDate.getTime() < (beginDate + 86400000) &&
        theDate.getTime() > (beginDate)
      ) {

        returnValue = 'Today'

      } else if (
        theDate.getTime() < (beginDate) &&
        theDate.getTime() > (beginDate - 86400000)
      ) {

        returnValue = 'Yesterday'

      } else if (
        theDate.getTime() < (beginDate - 86400000) &&
        theDate.getTime() > (beginDate - (86400000 * 2))
      ) {

        returnValue = 'Two Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 2)) &&
        theDate.getTime() > (beginDate - (86400000 * 3))
      ) {

        returnValue = 'Three Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 3)) &&
        theDate.getTime() > (beginDate - (86400000 * 4))
      ) {

        returnValue = 'Four Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 4)) &&
        theDate.getTime() > (beginDate - (86400000 * 5))
      ) {

        returnValue = 'Five Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 5)) &&
        theDate.getTime() > (beginDate - (86400000 * 6))
      ) {

        returnValue = 'Six Days Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 6)) &&
        theDate.getTime() > (beginDate - (86400000 * 13))
      ) {

        returnValue = 'Two Weeks Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 13)) &&
        theDate.getTime() > (beginDate - (86400000 * 20))
      ) {

        returnValue = 'Three Weeks Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 20)) &&
        theDate.getTime() > (beginDate - (86400000 * 27))
      ) {

        returnValue = 'Four Weeks Ago'

      } else if (
        theDate.getTime() < (beginDate - (86400000 * 27))
      ) {

        returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`

      } else {
        returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
      }


    } else {
      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
    }

    return returnValue

  }

  return {
    getNoDays: (number, year) => getNoDays(number, year),

    timeListToMilSeconds: (theList) => timeListToMilSeconds(theList),

    getDayNumber: (day) => getDayNumber(day),

    getLeisureDate: (date, theDate) => getLeisureDate(date, theDate),

    secondstoTimeStr: (number) => secondstoTimeStr(number),

    timetoSeconds: (theDate) => timetoSeconds(theDate),

    datetoTimeStr: (theDate) => datetoTimeStr(theDate),

    datetoFullTimeStr: (theDate) => datetoFullTimeStr(theDate),

    getMonth: (number) => getMonth(number),

    getDay: (number) => getDay(number),

    getMonthNumber: (month) => getMonthNumber(month),

    secondstoTimeList: (number) => secondstoTimeList(number),

    addDateSuffix: (dateX) => addDateSuffix(dateX),

    makeCalender: (date, monthE, yearE, bodyE) => makeCalender(date, monthE, yearE, bodyE)
  }

}())


// User Controller
const UserCtrl = (function () {

  const setData = function (dataName, Data) {

    let profile;

    if (!StorageCtrl.checkUserProfile()) {

      profile = StorageCtrl.userProfile()

    } else {

      profile = {}

    }

    switch (dataName) {

      case "fullName":

        profile.fullName = Data

        break;

      case "callName":

        profile.callName = Data

        break;

      case "age":

        profile.age = Data

        break;

      case "gender":

        profile.gender = Data

        break;

      case "biography":

        profile.biography = Data

        break;

      case "birthday":

        profile.birthday = Data

        break;

      case "hobby":

        if (profile.hobbies === undefined) {
          profile.hobbies = []
        }

        profile.hobbies.push(Data)

        break;

      case "sport":

        if (profile.sports === undefined) {
          profile.sports = []
        }

        profile.sports.push(Data)

        break;

      case "monthly income":

        profile.monthlyIncome = Data

        break;

      case "daily spendings":

        profile.dailySpendings = Data

        break;

      case "wealth status":

        profile.wealthStatus = Data

        break;

      case "employ status":

        profile.employStatus = Data

        break;

      case "look job":

        profile.lookJob = Data

        break;

      case "work":

        if (profile.works === undefined) {
          profile.works = []
        }

        profile.works.push(Data)

        break;

      case "country origin":

        if (profile.locationOrigin === undefined) {
          profile.locationOrigin = {}
          profile.locationOrigin.country = Data
        } else {
          profile.locationOrigin.country = Data
        }

        break;

      case "state origin":

        if (profile.locationOrigin === undefined) {
          profile.locationOrigin = {}
          profile.locationOrigin.state = Data
        } else {
          profile.locationOrigin.state = Data
        }

        break;

      case "country current":

        if (profile.locationCurrent === undefined) {
          profile.locationCurrent = {}
          profile.locationCurrent.country = Data
        } else {
          profile.locationCurrent.country = Data
        }

        break;

      case "state current":

        if (profile.locationCurrent === undefined) {
          profile.locationCurrent = {}
          profile.locationCurrent.state = Data
        } else {
          profile.locationCurrent.state = Data
        }

        break;

      case "timeline":

        if (profile.timeline === undefined) {
          profile.timeline = []
        }

        profile.timeline.push(Data)

        break;

      case "task":

        if (profile.tasks === undefined) {
          profile.tasks = []
        }

        profile.tasks.push(Data)

        break;

      case "quotes":

        profile.quotes = Data

        break;

      case "lastTimeQuote":

        profile.lastTimeQuote = Data

        break;

      case "lastTimeIncome":

        profile.lastTimeIncome = Data

        break;

      default:
        break;
    }

    StorageCtrl.setUserProfile(profile)

  }

  const getData = function (dataName) {

    let profile;

    if (!StorageCtrl.checkUserProfile()) {

      profile = StorageCtrl.userProfile()

    } else {

      profile = 'No Profile'

    }

    let data;

    if (profile !== 'No Profile') {

      switch (dataName) {

        case "fullName":

          data = profile.fullName

          break;

        case "callName":

          data = profile.callName

          break;

        case "age":

          data = profile.age

          break;

        case "gender":

          data = profile.gender

          break;

        case "biography":

          data = profile.biography

          break;

        case "birthday day":

          try {

            data = parseInt(profile.birthday.split('-')[0])

          } catch {

            data = ''

          }

          break;

        case "birthday month":
          try {

            data = profile.birthday.split('-')[1]

          } catch {

            data = ''

          }

          break;

        case "birthday":

          data = profile.birthday

          break;

        case "hobby":

          data = profile.hobbies

          if (data === undefined || data === null) {
            data = []
          }

          break;

        case "sport":

          data = profile.sports

          if (data === undefined || data === null) {
            data = []
          }

          break;

        case "monthly income":

          data = profile.monthlyIncome

          break;

        case "daily spendings":

          data = profile.dailySpendings

          break;

        case "wealth status":

          data = profile.wealthStatus

          break;

        case "employ status":

          data = profile.employStatus

          break;

        case "look job":

          data = profile.lookJob

          break;

        case "work":

          data = profile.works

          if (data === undefined || data === null) {
            data = []
          }

          break;

        case "country origin":

          if (profile.locationOrigin === undefined) {
            data = ''
          } else {
            data = profile.locationOrigin.country
          }

          break;

        case "state origin":

          if (profile.locationOrigin === undefined) {
            data = ''
          } else {
            data = profile.locationOrigin.state
          }

          break;

        case "country current":

          if (profile.locationCurrent === undefined) {
            data = ''
          } else {
            data = profile.locationCurrent.country
          }

          break;

        case "state current":

          if (profile.locationCurrent === undefined) {
            data = ''
          } else {
            data = profile.locationCurrent.state
          }

          break;

        case "timeline":

          data = profile.timeline

          if (data === undefined || data === null) {
            data = []
          }

          break;

        case "task":

          data = profile.tasks

          if (data === undefined || data === null) {
            data = []
          } else {
            data = data.sort((a, b) => {
              return (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
            })
          }

          break;

        case "quotes":

          data = profile.quotes

          if (data === undefined || data === null) {
            data = []
          }

          break;

        case "lastTimeQuote":

          data = profile.lastTimeQuote

          if (data === undefined || data === null) {
            data = { date: 1, string: "" }
          }

          break;

        case "lastTimeIncome":

          data = profile.lastTimeIncome

          if (data === undefined || data === null) {
            data = 1
          }

          break;

        default:

          data = undefined

          break;
      }

      if (data === undefined) {

        return ''

      } else {

        return data

      }

    } else {

      return ''

    }
  }

  const removeListData = function (dataName, index) {

    let profile;

    if (!StorageCtrl.checkUserProfile()) {

      profile = StorageCtrl.userProfile()

    } else {

      profile = 'No Profile'

    }

    if (profile !== 'No Profile') {

      switch (dataName) {

        case 'hobby':

          try {
            profile.hobbies.splice(index, 1)
          } catch {
            console.log('Error');
          }

          break;

        case 'sport':

          try {
            profile.sports.splice(index, 1)
          } catch {
            console.log('Error');
          }

          break;

        case 'work':

          try {
            profile.works.splice(index, 1)
          } catch {
            console.log('Error');
          }

          break;

        case 'timeline':

          try {
            profile.timeline.splice(index, 1)
          } catch {
            console.log('Error');
          }

          break;

        case 'task':

          try {

            let data = profile.tasks.sort((a, b) => {
              return (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
            })

            profile.tasks = data

            profile.tasks.splice(index, 1)
          } catch {
            console.log('Error');
          }

          break;

        default:
          break;
      }

      StorageCtrl.setUserProfile(profile)

    }

  }

  return {
    setData: (dataName, Data) => setData(dataName, Data),

    getData: (dataName) => getData(dataName),

    removeListData: (dataName, index) => removeListData(dataName, index),

  }

})()


// Global Functions
const GlobalCtrl = (function () {

  const removeListItem = function (itemName, item, tag) {

    UserCtrl.removeListData(itemName, item)

    UICtrl.fillList(itemName, UserCtrl.getData(itemName), UICtrl.findElement(tag))

  }

  const toggleItemClass = function (item, clas) {

    const xItem = UICtrl.findElement(item)

    UICtrl.toggleClass(xItem, clas)

  }

  return {
    removeListItem: (itemName, item, tag) => removeListItem(itemName, item, tag),

    toggleItemClass: (item, clas) => toggleItemClass(item, clas)

  }

})()


// API Controller
const APICtrl = (function () {

  const getMessageJson = async function () {

    const response = await fetch("json/messages.json");

    const responseJson = await response.json();

    return responseJson;
  }

  const getRandomApi = async function (url) {

    const response = await fetch(url)

    const responseJson = await response.json()

    return responseJson
  }

  const getMessage = async function (id) {
    const msgJson = await getMessageJson()

    let found;

    for (const item of msgJson) {
      if (item.id === id) {
        found = item.message
      }
    }

    return found
  }

  return {
    getMessageJson: () => getMessageJson(),

    getRandomApi: (url) => getRandomApi(url),

    getMessage: id => getMessage(id),
  }
})();


// DOM Manipulation Controller
const UICtrl = (function () {

  const findElement = function (tag) {
    return document.querySelector(tag)
  }

  const findElements = function (tag) {
    return document.querySelectorAll(tag)
  }

  const addClass = function (element, clas) {
    element.classList.add(clas)
  }

  const toggleClass = function (element, clas) {

    if (element.classList.contains(clas)) {
      removeClass(element, clas)
    } else {
      addClass(element, clas)
    }

  }

  const removeClass = function (element, clas) {
    element.classList.remove(clas)
  }

  const resetState = function () {
    removeClass(UIVars.home, 'show')
    removeClass(UIVars.alertAdvice, 'show')
    removeClass(UIVars.toDoTime, 'show')
    removeClass(UIVars.saySomet, 'show')
    removeClass(UIVars.settingsP, 'show')

    UIVars.navHome.classList.remove('active')
    UIVars.navAle.classList.remove('active')
    UIVars.navSay.classList.remove('active')
    UIVars.navSet.classList.remove('active')
    UIVars.navTod.classList.remove('active')
  }

  const showElipses = function (elipses) {
    const target = elipses.lastElementChild

    addClass(target, 'show')
  }

  const hideElipses = function (elipses) {
    const target = elipses.lastElementChild

    removeClass(target, 'show')
  }

  const sendMessage = function (message) {

    UIVars.message.innerHTML = message

    addClass(UIVars.messageHolder, 'show')

  }

  const removeMessage = function () {

    removeClass(UIVars.messageHolder, 'show')

  }

  const sendSmallMessage = function (message, time) {

    UIVars.smallMessage.innerHTML = message

    addClass(UIVars.smallMessageHolder, 'show')

    if (time) {

      setTimeout(() => {
        removeSmallMessage()
      }, time);

    }

  }

  const removeSmallMessage = function () {

    removeClass(UIVars.smallMessageHolder, 'show')

  }

  const sendXMessage = function (message) {

    UIVars.message.innerHTML = message

    addClass(UIVars.messageHolder, 'x-show')

  }

  const removeXMessage = function () {

    removeClass(UIVars.messageHolder, 'x-show')

  }

  const insertSVG = function (element) {

    if (element === undefined) {

      return [
        findElements('.js-circle-check'),

        findElements('.js-question'),

        findElements('.js-arrow-left'),

        findElements('.js-elipses'),

        findElements('.js-arrow-right'),

        findElements('.js-calender'),

        findElements('.js-circle-check'),

        findElements('.js-dark-message'),

        findElements('.js-whatsapp'),

        findElements('.js-linkedin'),

        findElements('.js-twitter'),

        findElements('.js-instagram'),

        findElements('.js-phone'),
      ]

    } else {

      if (element.classList.contains('js-question')) {
        const elementa = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"/></svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-arrow-left')) {
        const elementa = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path xmlns="http://www.w3.org/2000/svg" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/>
      </svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-elipses')) {
        const elementa = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
      <path
        d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
      </svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-arrow-right')) {
        const elementa = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path xmlns="http://www.w3.org/2000/svg" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"/>
      </svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-calender')) {
        const elementa = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"/>
      </svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-circle-check')) {
        const elementa = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-dark-message')) {
        const elementa = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-whatsapp')) {
        const elementa = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-linkedin')) {
        const elementa = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-twitter')) {
        const elementa = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-instagram')) {
        const elementa = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
      `;
        element.innerHTML = elementa
      }
      else if (element.classList.contains('js-phone')) {
        const elementa = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/></svg>
      `;
        element.innerHTML = elementa
      }

    }

  }

  const tabilize = function (tabHolder, elementHolder, tabName, elementName) {

    const tabChildren = tabHolder.children

    const elementChildren = elementHolder.children

    tabHolder.addEventListener('click', (e) => {

      if (e.target.classList.contains(tabName)) {

        const caughtNum = `${elementName}-${e.target.id.split('-')[1]}`

        for (let i = 0; i < tabChildren.length; i++) {
          const element = tabChildren[i];

          removeClass(element, 'active')

        }

        addClass(e.target, 'active')

        for (let i = 0; i < elementChildren.length; i++) {
          const element = elementChildren[i];

          removeClass(element, 'show')

          if (element.id === caughtNum) {
            addClass(element, 'show')
          }
        }
      }

    })

  }

  function fillList(listName, data, location) {

    let stuff;

    switch (listName) {

      case 'hobby':

        stuff = '';

        data.forEach((item, index) => {

          stuff += `
          <li><p>
          <span>${item.name}
          <i id="hobby-${index}" class="js-question alert-me normset-imp store-find">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
          </i></span>
          <span onclick="GlobalCtrl.removeListItem('hobby',${index}, '.horb')" class="del">X</span>
          </p></li>
          `

        })

        location.innerHTML = stuff
        break;

      case 'sport':

        stuff = '';

        data.forEach((item, index) => {

          stuff += `
          <li><p>
          <span>${item.name}
          <i id="sport-${index}" class="js-question alert-me normset-imp store-find">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
          </i></span>
          <span onclick="GlobalCtrl.removeListItem('sport',${index}, '.smorp')" class="del">X</span>
          </p></li>
          `

        })

        location.innerHTML = stuff
        break;

      case 'work':

        stuff = '';

        data.forEach((item, index) => {

          stuff += `
          <li><p>
            <span>${item.type} at ${item.place}</span>
            <span onclick="GlobalCtrl.removeListItem('work', ${index}, 'ul.work')" class="del">X</span>
          </p></li>
          `

        })

        location.innerHTML = stuff
        break;

      case 'timeline':

        stuff = '';

        data.forEach((item, index) => {

          stuff += `
          <li><p>
            <span>${item.name}
            <i id="timeline-${index}" class="js-question alert-me normset-imp store-find">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
            </i></span>
            <span onclick="GlobalCtrl.removeListItem('timeline',${index}, '.envnt')" class="del">X</span>
          </p></li>
          `

        })

        location.innerHTML = stuff
        break;

      case 'task':

        stuff = '';

        data.forEach((item, index) => {

          stuff += `
          <li><p>
            <span>${item.name}
            <i id="task-${index}" class="js-question alert-me normset-imp store-find">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
            </i></span>
            <span onclick="GlobalCtrl.removeListItem('task',${index}, '.tmnks')" class="del">X</span>
          </p></li>
          `

        })

        location.innerHTML = stuff
        break;

      default:
        break;
    }

  }

  const UIVars = {

    // Rest Elements
    body: findElement('body'),
    html: findElement('html'),


    // Navigation Elements
    topNav: findElement('.top-nav'),
    navHome: findElement('#nav-home'),
    navAle: findElement('#nav-ale'),
    navTod: findElement('#nav-tod'),
    navSay: findElement('#nav-say'),
    navSet: findElement('#nav-set'),


    // All States Elements
    home: findElement('.home'),
    alertAdvice: findElement('.alert-advice'),
    toDoTime: findElement('.to-do-timeline'),
    saySomet: findElement('.say-something'),
    settingsP: findElement('.settings-p'),


    // Home Navigations Elements
    homeAle: findElement('#home-ale'),
    homeTod: findElement('#home-tod'),
    homeSay: findElement('#home-say'),
    homeSet: findElement('#home-set'),


    // Message & XMessage Elements
    message: findElement('.message'),
    messageHolder: findElement('.message-holder'),
    msgX: findElement('#mess-cancel'),
    msgBlur: findElement('.message-blur'),


    // Small Message Elements
    smallMessageHolder: findElement('.small-message-holder'),
    smallMessage: findElement('.small-message'),
    smallMsgX: findElement('#small-mess-cancel'),
    smallMsgBlur: findElement('.small-message-blur'),


    // Element placeholders that fetch from database
    putName: findElements('#put-name'),


    // i Elements that contains SVG Elements
    jsQuestion: findElements('i.js-question'),
    jsElipses: findElements('i.js-elipses'),
    jsLeftArrow: findElements('i.js-arrow-left'),
    jsRightArrow: findElements('i.js-arrow-right'),
    jsCalender: findElements('i.js-calender'),


    // Form Stuffs
    showBelowForm: findElements('.show-bform'),
    myDataLists: findElement('#my-datalists'),


    // Timeline Bar Elements
    timeline: findElement('.timeline'),
    coveredTimeline: findElement('.covered-timeline'),
    hiddenTimeline: findElement('.hidden-timeline'),
    hoverTime: findElement('div.hover-timeline span'),

    // Timeline Calender Elements
    caleIcon: findElement('#calender-icon'),
    caleHolder: findElement('.calen-holder'),
    caleMonth: findElement('.calen-month'),
    caleYear: findElement('.calen-year'),
    calender: findElement('.the-calender tbody'),
    caleInputHolder: findElement('.calen-monyea-inp'),
    caleMonthInput: findElement('.calen-month-input input'),
    caleYearInput: findElement('.calen-year-input input'),
    prevDayTimeline: findElement('.prevday-timeline'),
    nextDayTimeline: findElement('.nextday-timeline'),
    resetTimeline: findElement('#reset-timeline'),

    // Time and Date Detail Elements
    detailDate: findElement('#detail-date'),
    detailDay: findElement('#detail-day'),
    detailMonth: findElement('#detail-month'),
    detailYear: findElement('#detail-year'),
    detailZone: findElement('#detail-zone'),
    detailTime: findElement('#detail-time'),

    // Task and Date Elements
    taskTable: findElement('#task-table'),
    timelineTable: findElement('#timeline-table'),
    taskTimeTab: findElement('.tasktime-tabs'),
    taskTabl: findElement('.timetables-holder'),

    // My Voice Quote Elements
    insertQuotes: findElement('.insert-quotes'),
    quoteSection: findElement('.quote-section-ul'),
    impQuoteSection: findElement('.imp-quote-section-ul'),

    // Small Nav
    smallNav: findElement('.small-nav'),
    smallNavTime: findElement('.small-nav-time'),
    smallNavCalender: findElement('.small-nav-calender'),
    smallNavCalenMonth: findElement('.sn-calen-month'),
    smallNavCalenYear: findElement('.sn-calen-year'),
    smallNavCalenBody: findElement('.sn-the-calender tbody'),
    smallNavCalen: findElement('.sn-calender'),
    smallNavMailBox: findElement('.sn-mail-box'),
    smallNavContact: findElement('.small-nav-contact'),
    smallNavForm: findElement('.sn-mail-form form'),
  }

  return {
    UIVars: () => UIVars,

    findElement: (tag) => findElement(tag),

    findElements: (tag) => findElements(tag),

    addClass: (element, clas) => addClass(element, clas),

    toggleClass: (element, clas) => toggleClass(element, clas),

    removeClass: (element, clas) => removeClass(element, clas),

    showElipses: (elipses) => showElipses(elipses),

    hideElipses: (elipses) => hideElipses(elipses),

    sendMessage: (message) => sendMessage(message),

    removeMessage: () => removeMessage(),

    resetState: () => resetState(),

    sendSmallMessage: (message, time) => sendSmallMessage(message, time),

    removeSmallMessage: () => removeSmallMessage(),

    sendXMessage: (message) => sendXMessage(message),

    removeXMessage: () => removeXMessage(),

    insertSVG: (element) => insertSVG(element),

    fillList: (listName, data, location) => fillList(listName, data, location),

    tabilize: (tabHolder, elementHolder, tabName, elementName) =>
      tabilize(tabHolder, elementHolder, tabName, elementName),
  }
})();
