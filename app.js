// App Controller
const App = (function (UICtrl, APICtrl, StorageCtrl) {

  const firstTimeState = {
    home: 0,
    important: 0,
    timeline: 0,
    voice: 0,
    settings: 0,
    timeConstants: undefined,
    alertTimeouts: { tasks: [0], timeline: [0] }
  }

  // Load Event Listeners
  const loadEventListeners = function () {

    const stateChangers = [

      UICtrl.UIVars().homeTod,

      UICtrl.UIVars().homeAle,

      UICtrl.UIVars().homeSay,

      UICtrl.UIVars().homeSet,

      UICtrl.UIVars().navTod,

      UICtrl.UIVars().navAle,

      UICtrl.UIVars().navSay,

      UICtrl.UIVars().navSet,

      UICtrl.UIVars().navHome,

    ]

    stateChangers.forEach(element => {

      element.addEventListener('click', showElip)

    });

    document.addEventListener('click', sendMessage)

    UICtrl.UIVars().msgX.addEventListener('click', removeMessage)

    UICtrl.UIVars().msgBlur.addEventListener('click', removeMessage)

    UICtrl.UIVars().smallMsgBlur.addEventListener('click', removeSmallMessage)

    UICtrl.UIVars().smallMsgX.addEventListener('click', removeSmallMessage)

  }

  // Startup Initializer
  const firstInit = async function () {

    if (StorageCtrl.checkUserProfile()) {

      const message9 = await APICtrl.getMessage(9)

      const message10 = await APICtrl.getMessage(10)

      const message11 = await APICtrl.getMessage(11)

      const message12 = await APICtrl.getMessage(12)

      const message13 = await APICtrl.getMessage(13)


      class Data {

        constructor() {
          this.fullName = '';
          this.callName = '';
          this.age = '';
          this.gender = 'Male';
          this.reFullName = /^([A-Za-z\- ]+){2}/;
          this.reCallName = /^[A-Za-z\-]+(( [A-Za-z\-]+){1})?$/;
        }

        sendMessage(id) {

          switch (id) {
            case 9:
              UICtrl.sendXMessage(message9)

              let sStart = UICtrl.findElement('#get-started')

              this.EventPlus(sStart, (id + 1), 'click')

              break;

            case 10:
              UICtrl.sendXMessage(message10)

              let sFullName = UICtrl.findElement('#start-fullname')
              let sCallName = UICtrl.findElement('#start-callname')

              let sForm = UICtrl.findElement('.get-s-form')
              let sPrev = UICtrl.findElement('.sa-box a')

              sFullName.value = this.fullName
              sCallName.value = this.callName

              sFullName.pattern = `^([A-Za-z\- ]+){2}`
              sCallName.pattern = `^[A-Za-z\-]+( [A-Za-z\-]+)?`

              this.EventPlus(sForm, (id + 1), 'submit', 'name', [sFullName, sCallName])
              this.EventPlus(sPrev, (id - 1), 'click', 'name', [sFullName, sCallName])
              break;

            case 11:
              UICtrl.sendXMessage(message11)

              let sAge = UICtrl.findElement('#start-age')

              let ssForm = UICtrl.findElement('.get-s-form')
              let ssPrev = UICtrl.findElement('.sa-box a')

              sAge.value = this.age

              sAge.min = 5;
              sAge.max = 95;

              this.EventPlus(ssForm, (id + 1), 'submit', 'age', [sAge])
              this.EventPlus(ssPrev, (id - 1), 'click', 'age', [sAge])
              break;

            case 12:
              UICtrl.sendXMessage(message12)

              let sMale = UICtrl.findElement('#start-mgender')
              let sFemale = UICtrl.findElement('#start-fgender')
              let sOthers = UICtrl.findElement('#start-ogender')


              switch (this.gender) {
                case 'Male':
                  sMale.defaultChecked = true;
                  break;

                case 'Female':
                  sFemale.defaultChecked = true;
                  break;

                case 'Others':
                  sOthers.defaultChecked = true;
                  break;

                default:
                  break;
              }

              let sssForm = UICtrl.findElement('.get-s-form')
              let sssPrev = UICtrl.findElement('.sa-box a')

              this.EventPlus(sssForm, (id + 1), 'submit', 'genderx', [sMale, sFemale, sOthers])
              this.EventPlus(sssPrev, (id - 1), 'click', 'gender', [sMale, sFemale, sOthers])

              break;

            case 13:

              UICtrl.sendXMessage(message13)

              this.saveToDatabase()

              break;

            default:
              break;
          }

        }

        EventPlus(element, id, type, value, list) {
          element.addEventListener(type, (e) => {
            e.preventDefault();
            if (value !== 'genderx') {

              this.sendMessage(id)

            } else {

              let status = ['good', 13]

              if (!this.reFullName.test(this.fullName)) {

                status = ['bad', 10]

              } else if (!this.reCallName.test(this.callName)) {

                status = ['bad', 10]

              } else if (this.age < 5 || this.age > 95) {

                status = ['bad', 11]

              }

              if (status[0] === 'bad') {
                this.sendMessage(status[1])
                UICtrl.sendSmallMessage('Please, validate your data')
              } else {
                this.sendMessage(id)
              }
            }
          })

          switch (value) {
            case 'age':
              list[0].addEventListener('input', () => {
                this.age = list[0].value

                if (list[0].value < 5 || list[0].value > 95) {
                  list[0].parentElement.classList.add('bad')
                } else {
                  list[0].parentElement.classList.remove('bad')
                }
              })
              break;

            case 'name':

              list[0].addEventListener('input', () => {
                this.fullName = list[0].value

                if (this.reFullName.test(list[0].value)) {
                  list[0].parentElement.classList.remove('bad')
                } else {
                  list[0].parentElement.classList.add('bad')
                }
              })

              list[1].addEventListener('input', () => {
                this.callName = list[1].value

                if (this.reCallName.test(list[1].value)) {
                  list[1].parentElement.classList.remove('bad')
                } else {
                  list[1].parentElement.classList.add('bad')
                }
              })

              break;

            case 'genderx':
            case 'gender':

              list[0].addEventListener('input', () => {
                if (list[0].checked === true) {
                  this.gender = 'Male'
                }
              })

              list[1].addEventListener('input', () => {
                if (list[1].checked === true) {
                  this.gender = 'Female'
                }
              })

              list[2].addEventListener('input', () => {
                if (list[2].checked === true) {
                  this.gender = 'Others'
                }
              })

              break;

            default:
              break;
          }
        }

        saveToDatabase() {

          const finisher = UICtrl.findElement('#get-started-finish')

          finisher.addEventListener('click', (e) => {

            e.preventDefault();

            UserCtrl.setData('fullName', this.fullName)

            UserCtrl.setData('callName', this.callName)

            UserCtrl.setData('age', this.age)

            UserCtrl.setData('gender', this.gender)

            loadInit()

            UICtrl.removeXMessage()
          })

        }
      }

      const sessionData = new Data();

      sessionData.sendMessage(9)

    }

  }

  // Load Initilizer
  const loadInit = function () {
    if (!StorageCtrl.checkUserProfile()) {

      changeState(UICtrl.UIVars().home)

      // Insert User Name
      UICtrl.UIVars().putName.forEach((element) => {

        element.innerHTML = UserCtrl.getData('callName')

      })

      // Insert all SVG
      UICtrl.insertSVG().forEach((nodlist) => {

        nodlist.forEach((elemen) => {

          UICtrl.insertSVG(elemen)

        })

      })

      // Manage Small Nav
      smallNavManager()
    }
  }

  // State Changer
  const changeState = function (newState) {

    UICtrl.resetState()

    if (newState.classList.contains('home')) {

      activateHomeState(newState)

    } else if (newState.classList.contains('alert-advice')) {

      activateImportantState(newState)

    } else if (newState.classList.contains('to-do-timeline')) {

      activateTimelineState(newState)

    } else if (newState.classList.contains('say-something')) {

      activateSayState(newState)

    } else if (newState.classList.contains('settings-p')) {

      activateSettingsState(newState)

    }
  }

  // Small Nav Manager
  const smallNavManager = function () {

    const navTime = UICtrl.UIVars().smallNavTime

    // Set Small Nav Time
    const workTime = function () {

      let today = new Date()

      navTime.innerText = TimeCtrl.datetoTimeStr(today)

      const tOut = 61000 - (today.getSeconds() * 1000)

      setTimeout(() => {

        let today = new Date()

        navTime.innerText = TimeCtrl.datetoTimeStr(today)

        setInterval(() => {

          let today = new Date()

          navTime.innerText = TimeCtrl.datetoTimeStr(today)


        }, 61000)

      }, tOut)

    }

    workTime()


    // Set Small Nav Calender
    const workCalender = function () {

      UICtrl.UIVars().smallNavCalender.addEventListener('mouseover', () => {

        UICtrl.addClass(UICtrl.UIVars().smallNavCalen, 'show')

      })

      UICtrl.UIVars().smallNavCalender.addEventListener('mouseout', () => {

        UICtrl.removeClass(UICtrl.UIVars().smallNavCalen, 'show')

      })

      const today = new Date()

      const endToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

      const timeDiff = endToday.getTime() - today.getTime() + 5000

      TimeCtrl.makeCalender(
        today,
        UICtrl.UIVars().smallNavCalenMonth,
        UICtrl.UIVars().smallNavCalenYear,
        UICtrl.UIVars().smallNavCalenBody
      )

      setTimeout(() => {

        let today = new Date()

        TimeCtrl.makeCalender(
          today,
          UICtrl.UIVars().smallNavCalenMonth,
          UICtrl.UIVars().smallNavCalenYear,
          UICtrl.UIVars().smallNavCalenBody
        )

        setInterval(() => {

          let today = new Date()

          TimeCtrl.makeCalender(
            today,
            UICtrl.UIVars().smallNavCalenMonth,
            UICtrl.UIVars().smallNavCalenYear,
            UICtrl.UIVars().smallNavCalenBody
          )

        }, 86400000)

      }, timeDiff)

    }

    workCalender()


    // Set Small Nav Contact
    const workContact = function () {

      UICtrl.UIVars().smallNavContact.addEventListener('click', () => {

        UICtrl.toggleClass(UICtrl.UIVars().smallNavMailBox, 'show')

        UICtrl.toggleClass(UICtrl.UIVars().smallNav, 'show')

      })

      UICtrl.UIVars().smallNavForm.addEventListener('submit', (e) => {

        e.preventDefault();

        let mailLink = 'mailto:elpis407@gmail.com?cc='

        mailLink += UICtrl.UIVars().smallNavForm.children[1].lastElementChild.value

        mailLink += "&subject="

        mailLink += encodeURIComponent(UICtrl.UIVars().smallNavForm.children[0].lastElementChild.value)

        mailLink += "&body="

        mailLink += encodeURIComponent(UICtrl.UIVars().smallNavForm.children[2].lastElementChild.value)

        window.open(mailLink)

      })
    }

    workContact()
  }


  // Event Functions Definitions
  const showElip = function (e) {

    const checkHomeShow = /^home/
    const checkNavShow = /^nav/

    const id = e.target.id;

    if (e.target.classList.contains('elipses')) {

      const elip = e.target

      UICtrl.showElipses(elip)

      const remoEli = function (e) {
        UICtrl.hideElipses(elip)

        setTimeout(() => {
          document.removeEventListener('click', remoEli)
        }, 1);
      }

      setTimeout(() => {
        document.addEventListener('click', remoEli)
      }, 1);

    } else if (checkHomeShow.test(id) || checkNavShow.test(id)) {

      switch (id) {
        case 'nav-ale':
        case 'home-ale':

          changeState(UICtrl.UIVars().alertAdvice)

          break;

        case 'nav-tod':
        case 'home-tod':

          changeState(UICtrl.UIVars().toDoTime)

          break;

        case 'nav-say':
        case 'home-say':

          changeState(UICtrl.UIVars().saySomet)

          break;

        case 'nav-set':
        case 'home-set':

          changeState(UICtrl.UIVars().settingsP)

          break;

        case 'nav-home':

          changeState(UICtrl.UIVars().home)

          break;

        default:

          console.log(`State of ${e.target} not identified`);

          break;
      }

    }
  }

  const removeMessage = function (e) {
    UICtrl.removeMessage()

    e.target.parentElement.classList.add('bubble')

    setTimeout(() => {
      e.target.parentElement.classList.remove('bubble')
    }, 100);
  }

  const removeSmallMessage = function (e) {
    UICtrl.removeSmallMessage()
  }

  const sendMessage = async function (e) {
    if (e.target.classList.contains('alert-me')) {

      let message;

      if (e.target.classList.contains('store-find')) {

        const identifier = e.target.id.split('-')[0]

        switch (identifier) {

          case 'hobby':

            message = parseInt(e.target.id.split('-')[1])

            message = UserCtrl.getData('hobby')[message].description

            message = `Description: ${message}`

            break;

          case 'sport':

            message = parseInt(e.target.id.split('-')[1])

            message = UserCtrl.getData('sport')[message].description

            message = `Description: ${message}`

            break;

          case 'timeline':

            message = parseInt(e.target.id.split('-')[1])

            const description =
              UserCtrl.getData('timeline')[message].description

            const name =
              UserCtrl.getData('timeline')[message].name

            let months =
              UserCtrl.getData('timeline')[message].months

            months = months.map(item => ' ' + item)

            let days =
              UserCtrl.getData('timeline')[message].days.map((s) => TimeCtrl.addDateSuffix(s))

            days = days.map(item => ' ' + item)

            const time =
              UserCtrl.getData('timeline')[message].time

            message = `
            <strong>Event</strong><br>${name}<br>
            <strong>Time</strong><br>${time[0].hour}:${time[0].minute}${time[0].stamp} - ${time[1].hour}:${time[1].minute}${time[1].stamp}<br>
            <strong>Days</strong><br>${days}<br>
            <strong>Months</strong><br>${months}<br>
            <strong>Description</strong><br>${description}
            `

            break;

          case 'task':

            message = parseInt(e.target.id.split('-')[1])

            const tdescription =
              UserCtrl.getData('task')[message].description

            const tname =
              UserCtrl.getData('task')[message].name

            let tdate =
              UserCtrl.getData('task')[message].date

            let tStatus =
              UserCtrl.getData('task')[message].status

            tdate = new Date(tdate).toLocaleString()


            message = `
            <strong>Event</strong><br>${tname}<br>
            <strong>Date</strong><br>${tdate}<br>
            <strong>Status</strong><br>${tStatus}<br>
            <strong>Description</strong><br>${tdescription}
            `

            break;


          default:
            break;
        }

      } else {

        let itemID = e.target.id

        itemID = parseInt(itemID)

        switch (`${itemID}`) {
          case `${NaN}`:
            message = `You have ${e.target.innerHTML} unread notifications from this section`
            break;

          default:
            message = await APICtrl.getMessage(itemID)
            break;
        }

      }

      UICtrl.sendMessage(message)
    }
  }

  const activateHomeState = function (newState) {

    UICtrl.addClass(UICtrl.UIVars().navHome, 'active')

    UICtrl.removeClass(UICtrl.UIVars().topNav, 'show')

    UICtrl.UIVars().putName.forEach((element) => {

      element.innerHTML = UserCtrl.getData('callName')

    })

    UICtrl.addClass(newState, 'show')

    // Settings Counter
    const settingsCounter = function () {

      const profile = StorageCtrl.userProfile()

      const completeProfileList = [
        profile.age,
        profile.biography,
        profile.birthday,
        profile.callName,
        profile.dailySpendings,
        profile.employStatus,
        profile.fullName,
        profile.gender,
        profile.hobbies,
        profile.locationCurrent,
        profile.locationOrigin,
        profile.lookJob,
        profile.monthlyIncome,
        profile.quotes,
        profile.sports,
        profile.tasks,
        profile.timeline,
        profile.wealthStatus,
        profile.works
      ]

      let counter = 0

      completeProfileList.forEach(item => {

        if (typeof item === "undefined") {
          counter++
        } else if (typeof item === "string") {
          if (item === "") {
            counter++
          }
        } else if (typeof item === "number") {
          if (item === "" || isNaN(item)) {
            counter++
          }
        } else if (typeof item === "object") {
          if (Array.isArray(item)) {
            if (item.length === 0) {
              counter++
            }
          }
        }

      });

      UICtrl.findElement('#sett-noti').innerText = counter

      if (counter === 0) {
        UICtrl.findElement('#sett-noti').style.display = 'none'
      } else {
        UICtrl.findElement('#sett-noti').style.display = ''
      }

    }
    settingsCounter()

    // Listen to Me Counter
    const sayListenCounter = function () {

      let quotes = UserCtrl.getData('quotes')

      let counter = 0;

      if (quotes.length === 0) {

        quotes = [
          {
            name: 'Life Advice',
            status: 'Subscribed',
            number: '2',
            link: 'json/lifeAdvice.json'
          },
          {
            name: 'Life Inspiration',
            status: 'Subscribed',
            number: '2',
            link: 'json/lifeInspire.json'
          },
          {
            name: 'Motivational Inspiration',
            status: 'Subscribed',
            number: '2',
            link: 'json/motivaInspire.json'
          },
          {
            name: 'Conqueror',
            status: 'Subscribed',
            number: '2',
            link: 'json/motivaConquer.json'
          },
          {
            name: 'Old Quotes',
            status: 'Subscribed',
            number: '2',
            link: 'json/motivaConquer.json'
          },
        ]

        UserCtrl.setData('quotes', quotes)

      }

      quotes = quotes.filter(item => item.status === 'Subscribed')

      quotes = quotes.map(item => parseInt(item.number))

      quotes.forEach(item => { counter = counter + item })

      UICtrl.findElement('#saylis-noti').innerText = counter

      if (
        (new Date((new Date()).setHours(0, 0, 0, 0)).getTime() >
          UserCtrl.getData('lastTimeQuote').date)
      ) {
        UICtrl.findElement('#saylis-noti').style.display = ''
      } else {
        UICtrl.findElement('#saylis-noti').style.display = 'none'
      }

    }
    sayListenCounter()

    // Timeline Counter
    const timeCounter = function () {

      const date = new Date()

      let counter = 0;

      let allTasks = UserCtrl.getData('task')

      const allTimelines = UserCtrl.getData('timeline')

      const doOtherWork = function () {

        let am = allTasks.length

        allTasks = allTasks.filter((s) => {
          return (new Date(s.date)).getTime() > new Date().getTime()
        })

        am = am - allTasks.length

        let tasksString = ''

        firstTimeState.alertTimeouts.tasks.forEach(item => {
          clearTimeout(item)
        })

        firstTimeState.alertTimeouts.tasks = [0]

        for (let i = 0; i < allTasks.length; i++) {
          const task = allTasks[i];

          const taskDate = TimeCtrl.getLeisureDate(new Date(), (new Date(task.date)))

          if (taskDate === 'Today') { counter++ }

          const itsTime = new Date(task.date).getTime() - new Date().getTime()

          if (itsTime < 216000000 && itsTime > 0) {

            const bren =
              setTimeout(() => {

                UICtrl.sendMessage(`
                Task Alert
                <br>
                <br>
                It's time for "${task.name}"
                `)

              }, itsTime)

            firstTimeState.alertTimeouts.tasks.push(bren)

          }

        }

        UICtrl.UIVars().taskTable.innerHTML = tasksString

      }

      const startTimelines = function () {

        const returnValue = []

        for (let z = 0; z < allTimelines.length; z++) {

          const allXXX = allTimelines[z];

          let dateMonth = TimeCtrl.getMonth(date.getMonth())

          const listOfDays = []; let addYear = 0

          let firstMonthFull = false

          for (let j = 0; j < allXXX.months.length; j++) {

            const tmonth = allXXX.months[j];

            if (dateMonth === tmonth) {

              for (let k = 0; k < TimeCtrl.getNoDays(date.getMonth()); k++) {

                if (k + 1 >= date.getDate()) {

                  const theDate = new Date(date.getFullYear(),
                    date.getMonth(), k + 1);

                  for (const item of allXXX.days) {

                    if (theDate.getDay() === TimeCtrl.getDayNumber(item)) {

                      const newTime = (() => {
                        return allXXX.time.map((item) => {

                          let x = Object.values(item)

                          let s = x.pop()

                          x.push(0)
                          x.push(s)

                          return TimeCtrl.timeListToMilSeconds(x)
                        })
                      })()

                      const newList = {
                        name: allXXX.name,
                        time: newTime,
                        date: theDate.getTime(),
                        id: z
                      }

                      listOfDays.push(newList)

                      if (listOfDays.length >= 5) { break }

                    } else if (!isNaN(item)) {
                      if (theDate.getDate() === parseInt(item)) {

                        const newTime = (() => {
                          return allXXX.time.map((item) => {

                            let x = Object.values(item)

                            let s = x.pop()

                            x.push(0)
                            x.push(s)

                            return TimeCtrl.timeListToMilSeconds(x)
                          })
                        })()

                        const newList = {
                          name: allXXX.name,
                          time: newTime,
                          date: theDate.getTime(),
                          id: z
                        }

                        listOfDays.push(newList)


                        if (listOfDays.length >= 5) { break }

                      }
                    }


                    if (listOfDays.length >= 5) { break }
                  }

                  if (listOfDays.length >= 5) { break }
                }

                if (k + 1 === TimeCtrl.getNoDays(date.getMonth())) {
                  firstMonthFull = true
                  if (listOfDays.length >= 5) { break }
                }

                if (listOfDays.length >= 5) { break }
              }

              if (listOfDays.length >= 5) { break }

            } else {

              if (firstMonthFull) {

                let dateX = new Date(date.getTime())

                dateX.setFullYear(dateX.getFullYear() + addYear, TimeCtrl.getMonthNumber(tmonth))


                for (let k = 0; k < TimeCtrl.getNoDays(dateX.getMonth()); k++) {

                  const theDate = new Date(dateX.getFullYear(),
                    dateX.getMonth(), k + 1);

                  for (const item of allXXX.days) {

                    if (theDate.getDay() === TimeCtrl.getDayNumber(item)) {

                      const newTime = (() => {
                        return allXXX.time.map((item) => {

                          let x = Object.values(item)

                          let s = x.pop()

                          x.push(0)
                          x.push(s)

                          return TimeCtrl.timeListToMilSeconds(x)
                        })
                      })()

                      const newList = {
                        name: allXXX.name,
                        time: newTime,
                        date: theDate.getTime(),
                        id: z
                      }

                      listOfDays.push(newList)


                      if (listOfDays.length >= 5) { break }
                    } else if (!isNaN(item)) {
                      if (theDate.getDate() === parseInt(item)) {

                        const newTime = (() => {
                          return allXXX.time.map((item) => {

                            let x = Object.values(item)

                            let s = x.pop()

                            x.push(0)
                            x.push(s)

                            return TimeCtrl.timeListToMilSeconds(x)
                          })
                        })()

                        const newList = {
                          name: allXXX.name,
                          time: newTime,
                          date: theDate.getTime(),
                          id: z
                        }

                        listOfDays.push(newList)


                        if (listOfDays.length >= 5) { break }

                      }
                    }

                    if (listOfDays.length >= 5) { break }
                  }


                  if (listOfDays.length >= 5) { break }
                }

                if (listOfDays.length >= 5) { break }

              }

              if (listOfDays.length >= 5) { break }
            }


            if (listOfDays.length >= 5) { break }

            if (tmonth === allXXX.months[allXXX.months.length - 1]) {

              j = -1;

              firstMonthFull = true;

              addYear++
            }

            if (listOfDays.length >= 5) { break }

          }

          returnValue.push(listOfDays)

        }

        return returnValue

      }

      const finishTimelines = function () {

        firstTimeState.alertTimeouts.timeline.forEach(item => {
          clearTimeout(item)
        })

        firstTimeState.alertTimeouts.timeline = [0]


        let craftedTimelines = []

        startTimelines().forEach((item) => {
          craftedTimelines = craftedTimelines.concat(item)
        })

        craftedTimelines.sort((a, b) => {
          return (a.date + a.time[0]) - (b.date + b.time[0])
        })

        let timelineString = '';

        for (let i = 0; i < craftedTimelines.length; i++) {
          const timeline = craftedTimelines[i];

          const timeDate = TimeCtrl.getLeisureDate(
            date, new Date(timeline.date + timeline.time[0])
          )

          const timeStart = parseInt(
            new Date(timeline.date + timeline.time[0]).getTime()
          )

          const timeEnd = parseInt(
            new Date(timeline.date + timeline.time[1]).getTime()
          )

          if ((timeline.date + timeline.time[1]) > date.getTime()) {
            if (timeDate === 'Today') { counter++ }

            const itsTime = timeStart - new Date().getTime()
            const itsTimeX = timeEnd - new Date().getTime()

            if (itsTime < 216000000 && itsTime > 0) {

              const bren =
                setTimeout(() => {

                  UICtrl.sendMessage(`
                  Timeline Alert
                  <br>
                  <br>
                  "${timeline.name}" is starting now
                  `)

                }, itsTime)

              firstTimeState.alertTimeouts.timeline.push(bren)

            }

            if (itsTimeX < 216000000 && itsTimeX > 0) {

              const bren =
                setTimeout(() => {

                  UICtrl.sendMessage(`
                  Timeline Alert
                  <br>
                  <br>
                  "${timeline.name}" is ending now
                  `)

                }, itsTimeX)

              firstTimeState.alertTimeouts.timeline.push(bren)

            }
          }


        }

        UICtrl.UIVars().timelineTable.innerHTML = timelineString
      }

      doOtherWork()

      finishTimelines()

      UICtrl.findElement('#tod-noti').innerText = counter

      if (counter === 0) {
        UICtrl.findElement('#tod-noti').style.display = 'none'
      } else {
        UICtrl.findElement('#tod-noti').style.display = ''
      }

    }
    timeCounter()

    // Important Counter
    const importantCounter = function () {

      let counter = 1;

      let allTasks = UserCtrl.getData('task')

      const doOtherWork = function () {

        let am = allTasks.length

        allTasks = allTasks.filter((s) => {
          return (new Date(s.date)).getTime() > new Date().getTime()
        })

        am = am - allTasks.length

        let tasksString = ''

        for (let i = 0; i < allTasks.length; i++) {
          const task = allTasks[i];

          const taskDate = TimeCtrl.getLeisureDate(new Date(), (new Date(task.date)))

          if (taskDate === 'Today' && task.status === 'Important') { counter++ }

        }

        UICtrl.UIVars().taskTable.innerHTML = tasksString

      }

      doOtherWork()

      UICtrl.findElement('#imp-noti').innerText = counter

      if (counter === 0) {
        UICtrl.findElement('#imp-noti').style.display = 'none'
      } else {
        UICtrl.findElement('#imp-noti').style.display = ''
      }
    }
    importantCounter()

    // Query for Income and Store
    const settleIncome = function () {

      const lastChecked = parseInt(UserCtrl.getData('lastTimeIncome'))

      const todayBegin = new Date().setHours(0, 0, 0, 0)

      if (todayBegin > lastChecked) {

        UICtrl.sendXMessage(`
        <form class="get-s-form" id="spentForm-3x3">

          <div class="qa-box" style="margin-bottom: 0;">
          
            <label>How Much did you spend yesterday?</label>

            <input type="number" id="spent-3x3">
            
          </div>

          <button class="small-btt" id="get-started">Save</button>
        </form>
        `)

        const theForm = UICtrl.findElement('#spentForm-3x3')

        const theMoney = UICtrl.findElement('#spent-3x3')

        theMoney.value = UserCtrl.getData('daily spendings')

        theForm.addEventListener('submit', (e) => {
          e.preventDefault()

          if (!isNaN(theMoney.value)) {

            let ser = Math.floor((parseInt(UserCtrl.getData('daily spendings')) + parseInt(theMoney.value)) / 2)

            UserCtrl.setData('daily spendings', ser)

            UserCtrl.setData('lastTimeIncome', todayBegin + 1000)

            UICtrl.removeXMessage()
          } else {
            UItrl.sendSmallMessage('Daily Spendings not saved due to incomplete validation')
          }
        })
      }

    }
    settleIncome()

    // Settle Home Animation
    const settleBeginAnimation = function () {

      setTimeout(() => {
        UICtrl.UIVars().home.classList.add('show-1')

        setTimeout(() => {

          UICtrl.UIVars().home.children[1].firstElementChild.style.marginTop = ''

          setTimeout(() => {

            UICtrl.UIVars().home.classList.add('show-2')

            setTimeout(() => {

              UICtrl.UIVars().home.classList.add('show-3')

            }, 2000)
          }, 2000)
        }, 2000);
      }, 500)


    }

    if (firstTimeState.home === 0) { settleBeginAnimation() }

    firstTimeState.home++
  }

  const activateImportantState = function (newState) {

    UICtrl.addClass(UICtrl.UIVars().navAle, 'active')

    UICtrl.addClass(UICtrl.UIVars().topNav, 'show')

    UICtrl.addClass(newState, 'show')


    let allTasks = UserCtrl.getData('task')

    const doTaskWork = function () {

      let am = allTasks.length

      allTasks = allTasks.filter((s) => {
        return (new Date(s.date)).getTime() > new Date().getTime()
      })

      am = am - allTasks.length

      let tasksString = ''

      for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];

        const taskName = task.name

        const taskTime = TimeCtrl.datetoTimeStr(new Date(task.date))

        tasksString +=
          `<li>
          ${taskName} at ${new Date(task.date).toDateString()}, ${taskTime}
          <i id="task-${i + am}" class="js-question alert-me normset-imp store-find">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42   42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
          </i>
        </li>`
      }

      return tasksString

    }

    const handleMoney = function () {

      const theTasks = `<div class="imp-title">Important Tasks</div> <br>` + doTaskWork()

      const monthlyIncome = parseInt(UserCtrl.getData('monthly income'))

      const dailySpendings = parseInt(UserCtrl.getData('daily spendings'))

      let finalAnswer = '<div class="imp-title">Income Information</div> <br> '

      if (isNaN(monthlyIncome) || isNaN(dailySpendings)) {

        finalAnswer += `
        <li>
          You are yet to register your financial data with us. To do so, kindly move to the settings page and do so.
        </li>
        `

        UICtrl.UIVars().impQuoteSection.innerHTML =
          finalAnswer + '\n' + theTasks


      } else {

        if (monthlyIncome > dailySpendings * 30) {

          finalAnswer += `
                <li>
                  Your monthly income is enough to support your daily spendings. <br> Currently, you can increase your spendings by $${Math.floor(((monthlyIncome - (dailySpendings * 30)) / 30))} that is from $${dailySpendings} to  $${Math.floor(((monthlyIncome - (dailySpendings * 30)) / 30) + dailySpendings)}, but if you plan to increase it above that or even just to it, you should consider getting another job. But if you're comfortable with your spendings then there is nothing to worry about.
                </li>
                `

          UICtrl.UIVars().impQuoteSection.innerHTML =
            finalAnswer + '\n' + theTasks


        } else if (monthlyIncome < dailySpendings * 30) {

          finalAnswer += `
                <li>
                  Your monthly income is not enough to support your current budget, you will very likely fall into debt if you don't do at least one of the following: <br>
                  <ul>
                    <li>
                      Reduce your daily spendings by $${Math.abs(Math.floor(((monthlyIncome - (dailySpendings * 30)) / 30)))} that is from $${dailySpendings} to  $${Math.floor(((Math.abs((monthlyIncome - (dailySpendings * 30)) / 30)) * -1) + dailySpendings)} or lower if possible.
                    </li>
                    <li>
                      Increase your monthly income through any of the following means:
                      <ul>
                        <li>Getting a new job that pays more</li>
                        <li>Getting a side job to supplement your current income</li>
                        <li>If entrepreneur, get a loan and expand your business</li>
                        <li>If working under someone, impress your supervisors so as to get a better spot in your place of work</li>
                        <li>Or start your own business</li>
                      </ul>
                    </li>
                    <li>
                      Regardless of what you do, make sure your monthly income rises from $${monthlyIncome} to $${monthlyIncome + Math.abs(Math.floor(((monthlyIncome - (dailySpendings * 30)))))}<br>
                      Use the Form below to test out your options
                      <div class="set-form"><div class="form-half">
                        <div class="set-form">
                          <label for="">Monthly Income</label>
                          <input type="number" id="money-checker-mon">
                        </div>
        
                        <div class="bday set-form">
                          <label for="">Daily Spendings</label>
                          <input type="number" id="money-checker-dai">
                        </div>
        
                      </div></div>
        
                      <span id="money-checker">Input the required data in the fields above</span>
        
                    </div>
                    </li>
                  </ul>
                </li>
                `

          UICtrl.UIVars().impQuoteSection.innerHTML =
            finalAnswer + '\n' + theTasks

          const showResults = document.getElementById('money-checker')

          const inpDaily = document.getElementById('money-checker-dai')

          const inpMonth = document.getElementById('money-checker-mon')

          inpDaily.value = dailySpendings
          inpMonth.value = monthlyIncome

          const compareIncomeValues = function () {

            const dailyValue = parseInt(inpDaily.value)
            const monthlyValue = parseInt(inpMonth.value)

            if (inpDaily.value === '' || inpMonth.value === '') {
              showResults.innerHTML = 'Input the required data in the fields above'
            } else if (isNaN(dailyValue) || isNaN(monthlyValue)) {
              showResults.innerHTML = 'Input the required data in the fields above'
            } else if (inpMonth.value > inpDaily.value * 30) {

              showResults.innerHTML = `You are OK, max budget allowed is $${Math.floor(((monthlyValue - (dailyValue * 30)) / 30) + dailyValue)}`
              showResults.style.color = 'green'

            } else if (inpMonth.value < inpDaily.value * 30) {

              showResults.innerHTML = `You are not OK, reduce your budget to  $${Math.floor(((Math.abs((monthlyValue - (dailyValue * 30)) / 30)) * -1) + dailyValue)}`
              showResults.style.color = 'red'

            } else if (inpMonth.value === inpDaily.value * 30) {

              showResults.innerHTML = `You are OK but try increasing your income or reducing your spendings`

              showResults.style.color = 'green'

            }

          }

          inpDaily.addEventListener('input', () => { compareIncomeValues() })
          inpMonth.addEventListener('input', () => { compareIncomeValues() })
        } else if (monthlyIncome === dailySpendings * 30) {

          finalAnswer += `
                <li>
                  Your monthly income is enough to support your daily spendings. <br> You should consider getting other sources of income in case of emergencies because your income just completes your budget
                </li>
                `

          UICtrl.UIVars().impQuoteSection.innerHTML =
            finalAnswer + '\n' + theTasks


        }



      }
    }

    handleMoney()

  }

  const activateTimelineState = function (newState) {

    UICtrl.addClass(newState, 'show')

    UICtrl.addClass(UICtrl.UIVars().navTod, 'active')

    UICtrl.addClass(UICtrl.UIVars().topNav, 'show')


    // Sectional Functions
    const timelineFunctions = (function () {

      const startTimeline = function (sec) {

        UICtrl.UIVars().coveredTimeline.style.width = `0%`

        setTimeout(() => {

          const dateTimel = Math.round((sec / 86400) * 100)

          UICtrl.UIVars().coveredTimeline.style.width = `${dateTimel}%`

        }, 1);

      }

      const initTimeline = function () {

        if (firstTimeState.timeline === 0) {
          firstTimeState.timeConstants = {
            defaultTimeout: undefined,
            defaultInterval: undefined
          }
        }

        let today = new Date()

        cmakeCalender(today)

        const tOut = 61000 - (today.getSeconds() * 1000)

        clearInitTimline()

        firstTimeState.timeConstants.defaultTimeout =
          setTimeout(() => {

            timelineFunctions.clearInitTimline()

            let today = new Date()

            cmakeCalender(today)

            firstTimeState.timeConstants.defaultInterval =
              setInterval(() => {
                timelineFunctions.clearInitTimline()

                let today = new Date()

                cmakeCalender(today)

              }, 61000)

          }, tOut)

      }

      const clearInitTimline = function () {

        clearInterval(firstTimeState.timeConstants.defaultInterval)

        clearTimeout(firstTimeState.timeConstants.defaultTimeout)

      }

      return {
        startTimeline: (sec) => startTimeline(sec),

        initTimeline: () => initTimeline(),

        clearInitTimline: () => clearInitTimline(),
      }

    })();

    const calenderListeners = function () {

      const calIcListeners = function () {

        UICtrl.UIVars().caleIcon.addEventListener('mouseenter', (e) => {

          UICtrl.addClass(UICtrl.UIVars().caleHolder, 'show')

        })

        UICtrl.UIVars().caleIcon.addEventListener('mouseleave', (e) => {

          UICtrl.removeClass(UICtrl.UIVars().caleHolder, 'show')

        })

        UICtrl.UIVars().caleIcon.addEventListener('click', (e) => {

          UICtrl.toggleClass(UICtrl.UIVars().caleHolder, 'xshow')

          UICtrl.removeClass(UICtrl.UIVars().caleHolder, 'show')

        })

        UICtrl.UIVars().resetTimeline.addEventListener('click', (e) => {

          timelineFunctions.initTimeline()

        })

      }

      const calenListeners = function () {

        UICtrl.UIVars().caleHolder.addEventListener('click', function (e) {

          const item = e.target

          const itemClasses = e.target.classList

          const itemText = e.target.innerText

          let year = parseInt(UICtrl.UIVars().caleYear.innerText)

          let month = UICtrl.UIVars().caleMonth.innerText

          let day = parseInt(itemText)

          month = TimeCtrl.getMonthNumber(month)

          if (itemClasses.contains("clouded")) {

            if (itemClasses.contains("before")) {

              month = month === 0 ? 11 : month - 1

              year = month === 11 ? year - 1 : year

            } else if (itemClasses.contains("after")) {

              month = month === 11 ? 0 : month + 1

              year = month === 0 ? year + 1 : year

            }

          }

          if (itemClasses.contains("calen-month")) {

            let holder = UICtrl.UIVars().caleInputHolder

            UICtrl.toggleClass(holder, 'show-mon')

            if (holder.classList.contains("show-mon")) {

              UICtrl.UIVars().caleMonthInput.value = itemText

              UICtrl.sendSmallMessage('Click on the month written in the calender to save the new month', 1000)

              const removeItem = function (e) {

                if (!e.target.classList.contains('calen-month-input')) {
                  if (!e.target.parentElement.classList.contains('calen-month-input')) {
                    if (!e.target.classList.contains('small-message-blur')) {
                      if (!e.target.classList.contains("show-mon")) {
                        UICtrl.removeClass(holder, 'show-mon')

                        document.removeEventListener('click', removeItem)
                      }
                    }
                  }
                }

              }

              setTimeout(() => {
                document.addEventListener('click', removeItem)
              }, 10);

            } else {

              day = 1

              month = TimeCtrl.getMonthNumber(UICtrl.UIVars().caleMonthInput.value)

            }

          }

          if (itemClasses.contains("calen-year")) {

            let holder = UICtrl.UIVars().caleInputHolder

            UICtrl.toggleClass(holder, 'show-yea')

            if (holder.classList.contains("show-yea")) {

              UICtrl.UIVars().caleYearInput.value = itemText

              UICtrl.sendSmallMessage('Click on the year written in the calender to save the new year', 1000)

              const removeItem = function (e) {

                if (!e.target.classList.contains('calen-year-input')) {
                  if (!e.target.parentElement.classList.contains('calen-year-input')) {
                    if (!e.target.classList.contains('small-message-blur')) {
                      if (!e.target.classList.contains("show-yea")) {
                        UICtrl.removeClass(holder, 'show-yea')

                        document.removeEventListener('click', removeItem)
                      }
                    }
                  }
                }

              }

              setTimeout(() => {
                document.addEventListener('click', removeItem)
              }, 10);

              day = 'sad'

            } else {

              day = 1

              year = parseInt(UICtrl.UIVars().caleYearInput.value)

            }

          }


          // Creation and Testing of Date 
          const theDate = new Date(year, month, day)

          let invalidDate = isNaN(theDate.getTime())

          if (!invalidDate) {
            cmakeCalender(theDate)
          }

        })

        UICtrl.UIVars().prevDayTimeline
          .addEventListener('click', function (e) {

            const item = e.target

            const itemClasses = e.target.classList

            const itemText = e.target.innerText

            let year = parseInt(UICtrl.UIVars().caleYear.innerText)

            let month = UICtrl.UIVars().caleMonth.innerText

            let day = (() => {
              let a, b;

              UICtrl.UIVars().calender.querySelectorAll('*').
                forEach((item) => {
                  if (item.classList.contains('xactive')) {
                    a = item;
                  }
                  if (item.classList.contains('active')) {
                    b = item;
                  }
                })

              let x = a === undefined ? b : a

              return x
            })();

            day = parseInt(day.innerText) - 1

            month = TimeCtrl.getMonthNumber(month)

            const theDate = new Date(year, month, day)

            let invalidDate = isNaN(theDate.getTime())

            if (!invalidDate) {
              cmakeCalender(theDate)
            }

          })

        UICtrl.UIVars().nextDayTimeline
          .addEventListener('click', function (e) {

            const item = e.target

            const itemClasses = e.target.classList

            const itemText = e.target.innerText

            let year = parseInt(UICtrl.UIVars().caleYear.innerText)

            let month = UICtrl.UIVars().caleMonth.innerText

            let day = (() => {
              let a, b;

              UICtrl.UIVars().calender.querySelectorAll('*').
                forEach((item) => {
                  if (item.classList.contains('xactive')) {
                    a = item;
                  }
                  if (item.classList.contains('active')) {
                    b = item;
                  }
                })

              let x = a === undefined ? b : a

              return x
            })();

            day = parseInt(day.innerText) + 1

            month = TimeCtrl.getMonthNumber(month)

            const theDate = new Date(year, month, day)

            let invalidDate = isNaN(theDate.getTime())

            if (!invalidDate) {
              cmakeCalender(theDate)
            }

          })

      }

      const blurTimeline = function () {

        UICtrl.UIVars().timeline.addEventListener('mouseenter', (e) => {

          UICtrl.addClass(UICtrl.UIVars().hoverTime.parentElement, 'show')

        })

        UICtrl.UIVars().timeline.addEventListener('mousemove', (e) => {

          if (!UICtrl.UIVars().hiddenTimeline.classList.contains('stay')) {

            UICtrl.UIVars().hiddenTimeline.style.width = `${e.offsetX}px`

            const pos = (e.offsetX <= 0 ? 0 : e.offsetX)

            const fullWidth = UICtrl.UIVars().timeline.clientWidth

            let newTime = (pos / fullWidth) * 86400

            let newWidth = (pos / fullWidth) * 100

            newTime = TimeCtrl.secondstoTimeStr(newTime)

            UICtrl.UIVars().hoverTime.innerHTML = newTime

            UICtrl.findElement('div.hover-timeline').style.width = `${newWidth}%`

          }
        })

        UICtrl.UIVars().timeline.addEventListener('mouseleave', (e) => {

          if (!UICtrl.UIVars().hiddenTimeline.classList.contains('stay')) {

            UICtrl.UIVars().hiddenTimeline.style.width = `0px`

            UICtrl.removeClass(UICtrl.UIVars().hoverTime.parentElement, 'show')

          }
        })

        UICtrl.UIVars().timeline.addEventListener('click', (e) => {

          UICtrl.toggleClass(UICtrl.UIVars().hiddenTimeline, 'stay')

          UICtrl.UIVars().hiddenTimeline.style.width = `${e.offsetX}px`

          const pos = (e.offsetX <= 0 ? 0 : e.offsetX)

          const fullWidth = UICtrl.UIVars().timeline.clientWidth

          const transTime = (pos / fullWidth) * 86400

          let newWidth = (pos / fullWidth) * 100

          const newTime = TimeCtrl.secondstoTimeStr(transTime)

          UICtrl.UIVars().hoverTime.innerHTML = newTime

          UICtrl.findElement('div.hover-timeline').style.width = `${newWidth}%`

          // Creation and Setting Date Object

          let year = parseInt(UICtrl.UIVars().caleYear.innerText)

          let month = UICtrl.UIVars().caleMonth.innerText

          let day = (() => {
            let a, b;

            UICtrl.UIVars().calender.querySelectorAll('*').
              forEach((item) => {
                if (item.classList.contains('xactive')) {
                  a = item;
                }
                if (item.classList.contains('active')) {
                  b = item;
                }
              })

            let x = a === undefined ? b : a

            return x
          })();

          day = parseInt(day.innerText)

          month = TimeCtrl.getMonthNumber(month)

          const timeList = TimeCtrl.secondstoTimeList(transTime)

          const theDate = new Date(year, month, day)

          if (UICtrl.UIVars().hiddenTimeline.classList.contains('stay')) {

            theDate.setHours(timeList[0], timeList[1], timeList[2])

          } else {

            theDate.setHours(0, 0, 0)

          }
          let invalidDate = isNaN(theDate.getTime())

          if (!invalidDate) {
            cmakeCalender(theDate)
          }

        })

      }

      const tabularFListeners = function () {

        UICtrl.addClass(UICtrl.UIVars().taskTimeTab.firstElementChild, 'active')

        UICtrl.addClass(UICtrl.UIVars().taskTabl.children[0], 'show')

        UICtrl.tabilize(
          UICtrl.UIVars().taskTimeTab, UICtrl.UIVars().taskTabl, 'tasktime-small-tab', 'titab'
        )
      }


      if (firstTimeState.timeline === 0) { tabularFListeners() }

      if (firstTimeState.timeline === 0) { blurTimeline() }

      if (firstTimeState.timeline === 0) { calIcListeners() }

      if (firstTimeState.timeline === 0) { calenListeners() }

    }

    const cmakeCalender = function (date) {

      const today = new Date()

      const beginDate = new Date(
        date.getFullYear(), date.getMonth(), date.getDate())

      const monthElement = UICtrl.UIVars().caleMonth

      const yearElement = UICtrl.UIVars().caleYear

      const bodyElement = UICtrl.UIVars().calender

      const dateX = TimeCtrl.addDateSuffix(date.getDate())

      const dayX = TimeCtrl.getDay(date.getDay())

      const monthX = TimeCtrl.getMonth(date.getMonth())

      const yearX = date.getFullYear()

      const zoneX = /\((.*)\)/.exec(date.toString())[1]

      const timeX = TimeCtrl.datetoTimeStr(date)

      let timeDifference = today.getTime() - beginDate.getTime()

      timeDifference = timeDifference / 1000

      timelineFunctions.startTimeline(timeDifference)

      TimeCtrl.makeCalender(date, monthElement, yearElement, bodyElement)

      UICtrl.UIVars().detailDate.innerText = dateX

      UICtrl.UIVars().detailDay.innerText = dayX

      UICtrl.UIVars().detailMonth.innerText = monthX

      UICtrl.UIVars().detailYear.innerText = yearX

      UICtrl.UIVars().detailZone.innerText = zoneX

      UICtrl.UIVars().detailTime.innerText = timeX

      if (TimeCtrl.datetoTimeStr(date) !== TimeCtrl.datetoTimeStr(today)) {

        timelineFunctions.clearInitTimline()

      }

      fixTimelineList(date)
    }

    const fixTimelineList = function (date) {

      const allTimelines = UserCtrl.getData('timeline')

      const startTimelines = function () {

        const returnValue = []

        for (let z = 0; z < allTimelines.length; z++) {

          const allXXX = allTimelines[z];

          let dateMonth = TimeCtrl.getMonth(date.getMonth())

          const listOfDays = []; let addYear = 0

          let firstMonthFull = false

          for (let j = 0; j < allXXX.months.length; j++) {

            const tmonth = allXXX.months[j];

            if (dateMonth === tmonth) {

              for (let k = 0; k < TimeCtrl.getNoDays(date.getMonth()); k++) {

                if (k + 1 >= date.getDate()) {

                  const theDate = new Date(date.getFullYear(),
                    date.getMonth(), k + 1);

                  for (const item of allXXX.days) {

                    if (theDate.getDay() === TimeCtrl.getDayNumber(item)) {

                      const newTime = (() => {
                        return allXXX.time.map((item) => {

                          let x = Object.values(item)

                          let s = x.pop()

                          x.push(0)
                          x.push(s)

                          return TimeCtrl.timeListToMilSeconds(x)
                        })
                      })()

                      const newList = {
                        name: allXXX.name,
                        time: newTime,
                        date: theDate.getTime(),
                        id: z
                      }

                      listOfDays.push(newList)

                      if (listOfDays.length >= 5) { break }

                    } else if (!isNaN(item)) {
                      if (theDate.getDate() === parseInt(item)) {

                        const newTime = (() => {
                          return allXXX.time.map((item) => {

                            let x = Object.values(item)

                            let s = x.pop()

                            x.push(0)
                            x.push(s)

                            return TimeCtrl.timeListToMilSeconds(x)
                          })
                        })()

                        const newList = {
                          name: allXXX.name,
                          time: newTime,
                          date: theDate.getTime(),
                          id: z
                        }

                        listOfDays.push(newList)


                        if (listOfDays.length >= 5) { break }

                      }
                    }


                    if (listOfDays.length >= 5) { break }
                  }

                  if (listOfDays.length >= 5) { break }
                }

                if (k + 1 === TimeCtrl.getNoDays(date.getMonth())) {
                  firstMonthFull = true
                  if (listOfDays.length >= 5) { break }
                }

                if (listOfDays.length >= 5) { break }
              }

              if (listOfDays.length >= 5) { break }

            } else {

              if (firstMonthFull) {

                let dateX = new Date(date.getTime())

                dateX.setFullYear(dateX.getFullYear() + addYear, TimeCtrl.getMonthNumber(tmonth))


                for (let k = 0; k < TimeCtrl.getNoDays(dateX.getMonth()); k++) {

                  const theDate = new Date(dateX.getFullYear(),
                    dateX.getMonth(), k + 1);

                  for (const item of allXXX.days) {

                    if (theDate.getDay() === TimeCtrl.getDayNumber(item)) {

                      const newTime = (() => {
                        return allXXX.time.map((item) => {

                          let x = Object.values(item)

                          let s = x.pop()

                          x.push(0)
                          x.push(s)

                          return TimeCtrl.timeListToMilSeconds(x)
                        })
                      })()

                      const newList = {
                        name: allXXX.name,
                        time: newTime,
                        date: theDate.getTime(),
                        id: z
                      }

                      listOfDays.push(newList)


                      if (listOfDays.length >= 5) { break }
                    } else if (!isNaN(item)) {
                      if (theDate.getDate() === parseInt(item)) {

                        const newTime = (() => {
                          return allXXX.time.map((item) => {

                            let x = Object.values(item)

                            let s = x.pop()

                            x.push(0)
                            x.push(s)

                            return TimeCtrl.timeListToMilSeconds(x)
                          })
                        })()

                        const newList = {
                          name: allXXX.name,
                          time: newTime,
                          date: theDate.getTime(),
                          id: z
                        }

                        listOfDays.push(newList)


                        if (listOfDays.length >= 5) { break }

                      }
                    }

                    if (listOfDays.length >= 5) { break }
                  }


                  if (listOfDays.length >= 5) { break }
                }

                if (listOfDays.length >= 5) { break }

              }

              if (listOfDays.length >= 5) { break }
            }


            if (listOfDays.length >= 5) { break }

            if (tmonth === allXXX.months[allXXX.months.length - 1]) {

              j = -1;

              firstMonthFull = true;

              addYear++
            }

            if (listOfDays.length >= 5) { break }

          }

          returnValue.push(listOfDays)

        }

        return returnValue

      }

      const finishTimelines = function () {

        let craftedTimelines = []

        startTimelines().forEach((item) => {
          craftedTimelines = craftedTimelines.concat(item)
        })

        craftedTimelines.sort((a, b) => {
          return (a.date + a.time[0]) - (b.date + b.time[0])
        })

        let timelineString = ''; let useNum = 0;

        for (let i = 0; i < craftedTimelines.length; i++) {
          const timeline = craftedTimelines[i];

          const timeDate = TimeCtrl.getLeisureDate(
            date, new Date(timeline.date + timeline.time[0])
          )

          const timeStart = TimeCtrl.datetoTimeStr(
            new Date(timeline.date + timeline.time[0])
          )

          const timeEnd = TimeCtrl.datetoTimeStr(
            new Date(timeline.date + timeline.time[1])
          )

          const timeName = timeline.name

          if ((timeline.date + timeline.time[1]) > date.getTime()) {
            if ((timeline.date + timeline.time[0]) < date.getTime()) {
              // debugger
              timelineString += `
            <tr class="active">
              <td>${i + 1 - useNum}</td>
              <td>${timeName}</td>
              <td>${timeDate}</td>
              <td>${timeStart}</td>
              <td>${timeEnd}</td>
              <td>
              <i id="timeline-${timeline.id}" class="js-question alert-me normset-imp store-find">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42   42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
              </i>
              </td>
            </tr>
            `

            } else {

              timelineString += `
            <tr>
              <td>${i + 1 - useNum}</td>
              <td>${timeName}</td>
              <td>${timeDate}</td>
              <td>${timeStart}</td>
              <td>${timeEnd}</td>
              <td>
              <i id="timeline-${timeline.id}" class="js-question alert-me normset-imp store-find">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42   42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
              </i>
              </td>
            </tr>
            `

            }

          } else { useNum++ }
        }

        if (craftedTimelines.length === 0) {
          timelineString = `Create a new task to view it here`
        }

        UICtrl.UIVars().timelineTable.innerHTML = timelineString
      }


      finishTimelines()

      let allTasks = UserCtrl.getData('task')

      const doOtherWork = function () {

        let am = allTasks.length

        allTasks = allTasks.filter((s) => {
          return (new Date(s.date)).getTime() > date.getTime()
        })

        am = am - allTasks.length

        let tasksString = ''

        for (let i = 0; i < allTasks.length; i++) {
          const task = allTasks[i];

          const taskDate = TimeCtrl.getLeisureDate(date, (new Date(task.date)))

          const taskName = task.name

          const taskTime = TimeCtrl.datetoTimeStr(new Date(task.date))

          tasksString += `
        <tr>
          <td>${i + 1}</td>
          <td>${taskName}</td>
          <td>${taskDate}</td>
          <td>${taskTime}</td>
          <td>
          <i id="task-${i + am}" class="js-question alert-me normset-imp store-find">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42   42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
          </i>
          </td>
        </tr>
        `
        }

        if (allTasks.length === 0 || allTasks === '') {
          tasksString = `Create a new task to view it here`
        }

        UICtrl.UIVars().taskTable.innerHTML = tasksString

      }

      doOtherWork()
    }


    calenderListeners()

    timelineFunctions.initTimeline()

    firstTimeState.timeline++
  }

  const activateSayState = function (newState) {

    UICtrl.addClass(UICtrl.UIVars().navSay, 'active')

    UICtrl.addClass(UICtrl.UIVars().topNav, 'show')

    UICtrl.addClass(newState, 'show')

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    const fillQuoteList = function (quotastera) {

      let quoteListString = '';

      quotastera.forEach((item) => {

        const checkColor = item.status === 'Unsubscribed' ? 'red' : 'green'

        const xStatus = item.status === 'Unsubscribed' ? 'Subscribe' : 'Unsubscribe'

        quoteListString += `
      <li>
        <div>
          <span class="name">${item.name}</span>
          <span class="Number">
            <input type="text" pattern="[0-9]*" class="q-num" value="${item.number}">
          </span>
          <span class="status">${item.status}</span>
          <span class="action">
            <i style="fill: ${checkColor}" class="sus-action js-circle-check">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path></svg>
            </i>
            <span class="tooltixp">
              Click to ${xStatus}
            </span>
          </span>
        </div>
      </li>
      `

      })

      quoteList.innerHTML = quoteListString

      quoteList.querySelectorAll('.sus-action').forEach((item) => {
        item.addEventListener('click', (e) => {

          let itemName = e.target.parentElement.parentElement.querySelector('.name').innerText

          if (e.target.style.fill === 'red') {

            quotes.forEach((x) => {
              if (x.name === itemName) {

                x.status = 'Subscribed'

              }
            })

          } else {

            quotes.forEach((x) => {
              if (x.name === itemName) {

                x.status = 'Unsubscribed'

              }
            })

          }

          fillQuoteList(quotes)

          UserCtrl.setData('quotes', quotes)

        })
      })

      quoteList.querySelectorAll('.q-num').forEach((item) => {
        item.addEventListener('blur', (e) => {

          let itemName = e.target.parentElement.parentElement.querySelector('.name').innerText

          quotes.forEach((x) => {
            if (x.name === itemName) {

              x.number = e.target.value

            }
          })

          fillQuoteList(quotes)

          UserCtrl.setData('quotes', quotes)

        })
      })
    }

    const getAllQuotes = async function (bList) {

      const xquoteURL = bList.filter(item => item.status === 'Subscribed')

      const quoteURL = xquoteURL.map(item => item.link)

      let quoteString = ''; const quoteList = []

      for (let i = 0; i < quoteURL.length; i++) {
        const link = quoteURL[i];

        let apiData = await APICtrl.getRandomApi(link)

        const totalNumber = xquoteURL[i].number;

        shuffleArray(apiData)

        for (let j = 0; j < totalNumber; j++) {
          const collection = apiData[j];

          quoteList.push(`
          <li>
            <span class="quote">${collection.quote}</span>
            <span class="from"> - ${xquoteURL[i].name}</span>
          </li>
          `)
        }

      }

      shuffleArray(quoteList)

      quoteList.forEach((item) => {

        quoteString += item

      })

      if (quoteList.length === 0) {
        quoteString = `Subscribe to a quote to recive quotes`
      }

      const lsItem = {
        date: new Date((new Date()).setHours(0, 0, 0, 0)).getTime(),
        string: quoteString
      }

      UserCtrl.setData('lastTimeQuote', lsItem)

      UICtrl.UIVars().quoteSection.innerHTML = UserCtrl.getData('lastTimeQuote').string

    }

    const quoteList = UICtrl.UIVars().insertQuotes

    let quotes = UserCtrl.getData('quotes')

    if (quotes.length === 0) {

      quotes = [
        {
          name: 'Life Advice',
          status: 'Subscribed',
          number: '2',
          link: 'json/lifeAdvice.json'
        },
        {
          name: 'Life Inspiration',
          status: 'Subscribed',
          number: '2',
          link: 'json/lifeInspire.json'
        },
        {
          name: 'Motivational Inspiration',
          status: 'Subscribed',
          number: '2',
          link: 'json/motivaInspire.json'
        },
        {
          name: 'Conqueror',
          status: 'Subscribed',
          number: '2',
          link: 'json/motivaConquer.json'
        },
        {
          name: 'Old Quotes',
          status: 'Subscribed',
          number: '2',
          link: 'json/motivaConquer.json'
        },
      ]

      UserCtrl.setData('quotes', quotes)

    }

    fillQuoteList(quotes)

    if (
      new Date((new Date()).setHours(0, 0, 0, 0)).getTime() >
      UserCtrl.getData('lastTimeQuote').date
    ) {

      getAllQuotes(quotes)

    } else {

      UICtrl.UIVars().quoteSection.innerHTML = UserCtrl.getData('lastTimeQuote').string

    }

    firstTimeState.voice++
  }

  const activateSettingsState = async function (newState) {

    UICtrl.addClass(newState, 'show')

    UICtrl.addClass(UICtrl.UIVars().navSet, 'active')

    UICtrl.addClass(UICtrl.UIVars().topNav, 'show')

    getField = {

      Ifname: UICtrl.findElement('div#fname input'),

      Icname: UICtrl.findElement('div#cname input'),

      Iage: UICtrl.findElement('div#age input'),

      Igender: UICtrl.findElement('div#gender input'),

      Ibiog: UICtrl.findElement('div#bio-g textarea'),

      Ibmonth: UICtrl.findElement('div#b-day .bmonth input'),

      Ibday: UICtrl.findElement('div#b-day .bday input'),

      Ihobname: UICtrl.findElement('form div#hobbi input'),

      Ihobdes: UICtrl.findElement('form div#hobbi-description textarea'),

      Ihob: UICtrl.findElement('form div#hobbi-save').parentElement,

      Ihobul: UICtrl.findElement('div.my-hobbies .horb'),

      Isporname: UICtrl.findElement('form div#spor input'),

      Ispordes: UICtrl.findElement('form div#spor-description textarea'),

      Ispor: UICtrl.findElement('form div#spor-save').parentElement,

      Isporul: UICtrl.findElement('div.my-sports .smorp'),

      Imonincome: UICtrl.findElement('div#mon-income input'),

      Idailyspen: UICtrl.findElement('div#daily-spen input'),

      Iwealthstatus: UICtrl.findElement('div#wealth-status input'),

      Iemploystat: UICtrl.findElement('div#employ-stat input'),

      Ilookjob: UICtrl.findElement('div#look-job input'),

      Iwortype: UICtrl.findElement('form div#wor-type input'),

      Iworplace: UICtrl.findElement('form div#wor-place input'),

      Iwor: UICtrl.findElement('form div#wor-save').parentElement,

      Iworul: UICtrl.findElement('div.my-works .work'),

      IoriCoun: UICtrl.findElement("div#loc-ori-coun input"),

      IoriSta: UICtrl.findElement("div#loc-ori-sta input"),

      IcurrCoun: UICtrl.findElement("div#loc-curr-coun input"),

      IcurrSta: UICtrl.findElement("div#loc-curr-sta input"),

      Itimlname: UICtrl.findElement('div#timl-name input'),

      Itimldays: UICtrl.findElement('div#timl-days input'),

      Itimlmonths: UICtrl.findElement('div#timl-months input'),

      Itimltime: UICtrl.findElement('div#timl-time input'),

      Itimldes: UICtrl.findElement('div#timl-description textarea'),

      Itimlsave: UICtrl.findElement('form div#timl-save').parentElement,

      Itimlenvnt: UICtrl.findElement('div.my-events .envnt'),

      Itaskname: UICtrl.findElement('div#task-name input'),

      Itaskdate: UICtrl.findElement('div#task-date input'),

      Itasktime: UICtrl.findElement('div#task-time input'),

      Itaskstatus: UICtrl.findElement('div#task-impor input'),

      Itaskdes: UICtrl.findElement('div#task-description textarea'),

      Itasksave: UICtrl.findElement('form div#task-save').parentElement,

      Itaskenvnt: UICtrl.findElement('div.my-tasks .tmnks'),

    }

    getReg = {

      Ifname: /^[A-Z\-\_ ]{2}/i,

      Icname: /^[A-Za-z\-]+(( [A-Za-z\-]+){1})?$/,

    }

    let myDatalist, hobDatalist, sportDatalist, occuDatalist

    const getAllDatalists = async function () {

      myDatalist = await APICtrl.getRandomApi('json/dataList.json')

      hobDatalist = await APICtrl.getRandomApi('json/hobbies.json')

      sportDatalist = await APICtrl.getRandomApi('json/sports.json')

      occuDatalist = await APICtrl.getRandomApi('json/occupations.json')

    }

    function fillFields() {

      getField.Ifname.value = UserCtrl.getData('fullName')

      getField.Icname.value = UserCtrl.getData('callName')

      getField.Iage.value = UserCtrl.getData('age')

      getField.Igender.value = UserCtrl.getData('gender')

      getField.Ibiog.value = UserCtrl.getData('biography')

      getField.Ibmonth.value = UserCtrl.getData('birthday month')

      getField.Ibday.value = UserCtrl.getData('birthday day')

      fillList('hobby', UserCtrl.getData('hobby'), getField.Ihobul)

      fillList('sport', UserCtrl.getData('sport'), getField.Isporul)

      getField.Imonincome.value = UserCtrl.getData('monthly income')

      getField.Idailyspen.value = UserCtrl.getData('daily spendings')

      getField.Iwealthstatus.value = UserCtrl.getData('wealth status')

      getField.Iemploystat.value = UserCtrl.getData('employ status')

      getField.Ilookjob.value = UserCtrl.getData('look job')

      fillList('work', UserCtrl.getData('work'), getField.Iworul)

      getField.IoriSta.value = UserCtrl.getData('state origin')

      getField.IoriCoun.value = UserCtrl.getData('country origin')

      getField.IcurrSta.value = UserCtrl.getData('state current')

      getField.IcurrCoun.value = UserCtrl.getData('country current')

      fillList('timeline', UserCtrl.getData('timeline'), getField.Itimlenvnt)

      fillList('task', UserCtrl.getData('task'), getField.Itaskenvnt)

    }

    function fillList(listName, data, location) {

      UICtrl.fillList(listName, data, location)

    }

    function inputEvents() {

      getField.Ifname.addEventListener('input', (e) => {
        if (getReg.Ifname.test(e.target.value)) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

      getField.Icname.addEventListener('input', (e) => {
        if (getReg.Icname.test(e.target.value)) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

      getField.Iage.addEventListener('input', (e) => {
        if (e.target.value > 5 && e.target.value < 95) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

      getField.Igender.addEventListener('input', (e) => {
        if (myDatalist[0].list.indexOf(e.target.value) !== -1) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

      getField.Ibmonth.addEventListener('input', (e) => {

        if (myDatalist[2].list.indexOf(parseInt(getField.Ibday.value)) === -1) {

          UICtrl.addClass(getField.Ibday.parentElement, 'warn')

        } else if (myDatalist[1].list.indexOf(e.target.value) !== -1) {

          UICtrl.removeClass(e.target.parentElement, 'bad')

          UICtrl.removeClass(getField.Ibday.parentElement, 'warn')

        } else if (myDatalist[1].list.indexOf(e.target.value) === -1) {

          UICtrl.addClass(e.target.parentElement, 'bad')

        }

      })

      getField.Ibday.addEventListener('input', (e) => {

        if (myDatalist[1].list.indexOf(getField.Ibmonth.value) === -1) {

          UICtrl.addClass(getField.Ibmonth.parentElement, 'warn')

        } else if (myDatalist[2].list.indexOf(parseInt(e.target.value)) !== -1) {

          UICtrl.removeClass(e.target.parentElement, 'bad')
          UICtrl.removeClass(e.target.parentElement, 'warn')

        } else if (myDatalist[2].list.indexOf(parseInt(e.target.value)) === -1) {

          UICtrl.addClass(e.target.parentElement, 'bad')

        }
      })

      getField.Imonincome.addEventListener('input', (e) => {
        if (e.target.value >= 0) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

      getField.Idailyspen.addEventListener('input', (e) => {
        if (e.target.value >= 0) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

      getField.Iemploystat.addEventListener('input', (e) => {
        if (myDatalist[4].list.indexOf(e.target.value) !== -1) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

      getField.Ilookjob.addEventListener('input', (e) => {
        if (myDatalist[5].list.indexOf(e.target.value) !== -1) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

      getField.Itimldays.addEventListener('input', (e) => {

        if (e.target.value === 'Every Day') {
          e.target.value = 'Monday, Tuesday, Wednessday, Thursday, Friday, Saturday, Sunday'
        } if (e.target.value === 'Weekends') {
          e.target.value = 'Saturday, Sunday'
        } else if (e.target.value === 'Weekdays') {
          e.target.value = 'Monday, Tuesday, Wednessday, Thursday, Friday'
        }

        let input = e.target.value;

        let dataList = myDatalist[7].list

        input = input.split(',')

        for (let i = 0; i < input.length; i++) {
          input[i] = input[i].replace(/\ /g, '')
        }

        UICtrl.removeClass(e.target.parentElement, 'bad')

        for (const value of input) {

          if (input.length === 1) {

            if (dataList.indexOf(e.target.value) !== -1) {

            } else if (!isNaN(parseInt(e.target.value))) {
              if (e.target.value > 31 || e.target.value < 1) {
                UICtrl.addClass(e.target.parentElement, 'bad')
              }
            } else {
              UICtrl.addClass(e.target.parentElement, 'bad')
            }

          } else if (dataList.indexOf(value) !== -1) {

          } else if (!isNaN(parseInt(value))) {
            if (value > 31 || value < 1) {
              UICtrl.addClass(e.target.parentElement, 'bad')
            }
          } else {
            UICtrl.addClass(e.target.parentElement, 'bad')
          }

        }

      })

      getField.Itimlmonths.addEventListener('input', (e) => {

        if (e.target.value === 'Every Month') {
          e.target.value = 'January, February, March, April, May, June, July, August, September, October, November, December'
        }

        let input = e.target.value;

        let dataList = myDatalist[6].list

        input = input.split(',')

        for (let i = 0; i < input.length; i++) {
          input[i] = input[i].replace(/\ /g, '')
        }

        UICtrl.removeClass(e.target.parentElement, 'bad')

        for (const value of input) {

          if (input.length === 1) {

            if (dataList.indexOf(e.target.value) !== -1) {

            } else {
              UICtrl.addClass(e.target.parentElement, 'bad')
            }

          } else if (dataList.indexOf(value) !== -1) {

          } else {
            UICtrl.addClass(e.target.parentElement, 'bad')
          }

        }

      })

      getField.Itimltime.addEventListener('input', (e) => {

        UICtrl.removeClass(e.target.parentElement, 'bad')

        let input = e.target.value;

        input = input.split('-')

        for (let i = 0; i < input.length; i++) {
          input[i] = input[i].replace(/\ /g, '')
        }

        try {

          for (let i = 0; i < input.length; i++) {

            let newImp = input[i].split(':')

            input[i] = {
              hour: parseInt(newImp[0]),
              minute: parseInt(newImp[1].slice(0, 2)),
              stamp: newImp[1].slice(2, 4)
            }

            const validateTime = (time) => {

              let x = []

              if (`${time.hour}` !== `${NaN}`) {
                x.push('')
              }

              if (time.hour <= 12 && time.hour >= 1) {
                x.push('')
              }

              if (time.minute <= 59 && time.minute >= 0) {
                x.push('')
              }

              if (!isNaN(time.minute)) {
                x.push('')
              }

              if (time.stamp === 'am' || time.stamp === 'pm') {
                x.push('')
              }

              if (x.length === 5) {
                return true
              } else {
                return false
              }
            }

            if (!validateTime(input[i])) {
              UICtrl.addClass(e.target.parentElement, 'bad')
            }
          }

          if (input.length === 2) {

            const validateTimeDiff = (time) => {

              let x = [];

              time1hour =
                time[1].stamp === 'am' ? time[1].hour : time[1].hour + 12;

              time0hour =
                time[0].stamp === 'am' ? time[0].hour : time[0].hour + 12;


              if (time1hour > time0hour) {
                return true
              } else if (time1hour === time0hour) {
                if (time[1].minute > time[0].minute) {
                  return true
                } else {
                  return false
                }
              } else {
                return false
              }
            }

            if (!validateTimeDiff(input)) {
              UICtrl.addClass(e.target.parentElement, 'bad')
            }

          } else {
            UICtrl.addClass(e.target.parentElement, 'bad')
          }

        } catch (error) {

          UICtrl.addClass(e.target.parentElement, 'bad')

        }

      })

      getField.Itasktime.addEventListener('input', (e) => {

        UICtrl.removeClass(e.target.parentElement, 'bad')

        let input = e.target.value;

        input = input.replace(/\ /g, '')

        try {

          let newImp = input.split(':')

          input = {
            hour: parseInt(newImp[0]),
            minute: parseInt(newImp[1].slice(0, 2)),
            stamp: newImp[1].slice(2, 4)
          }

          const validateTime = (time) => {

            let x = []

            if (`${time.hour}` !== `${NaN}`) {
              x.push('')
            }

            if (time.hour <= 12 && time.hour >= 1) {
              x.push('')
            }

            if (time.minute <= 59 && time.minute >= 0) {
              x.push('')
            }

            if (!isNaN(time.minute)) {
              x.push('')
            }

            if (time.stamp === 'am' || time.stamp === 'pm') {
              x.push('')
            }

            if (x.length === 5) {
              return true
            } else {
              return false
            }

          }

          if (!validateTime(input)) {
            UICtrl.addClass(e.target.parentElement, 'bad')
          }

        } catch (error) {

          UICtrl.addClass(e.target.parentElement, 'bad')

        }

      })

      getField.Itaskdate.addEventListener('input', (e) => {

        UICtrl.removeClass(e.target.parentElement, 'bad')

        let input = e.target.value;

        let theDate;

        input = input.split('-')

        for (let i = 0; i < input.length; i++) {
          input[i] = input[i].replace(/\ /g, '')
        }

        // Begin Test
        let bre = 'Valid'


        // Test all inputs
        const tester = function () {

          input[0] = parseInt(input[0])

          input[1] = TimeCtrl.getMonthNumber(input[1])

          input[2] = parseInt(input[2])

          const maxDays = TimeCtrl.getNoDays(input[1], input[2])

          if (input[0] > maxDays || input[1] === -1) {
            bre = 'Invalid'
          }

          for (const inp of input) {
            if (isNaN(inp) || inp < 0) {
              bre = 'Invalid'
            }
          }

        }

        // Creation and testing of Date Object
        const tester2 = function (conti) {

          if (conti === 'Valid') {

            theDate = new Date(input[2], input[1], input[0])

            let today = new Date()

            today = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())

            if (today.getTime() > theDate.getTime()) {
              bre = `Invalid`
            }

          }

        }

        tester()

        tester2(bre)

        if (bre !== 'Valid') {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }

      })

      getField.Itaskstatus.addEventListener('input', (e) => {
        if (myDatalist[10].list.indexOf(e.target.value) !== -1) {
          UICtrl.removeClass(e.target.parentElement, 'bad')
        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }
      })

    }

    function blurEvents() {

      getField.Ifname.addEventListener('blur', (e) => {
        if (getReg.Ifname.test(e.target.value)) {
          UserCtrl.setData('fullName', e.target.value)

          UICtrl.sendSmallMessage(`Name has been saved`, 1000)
        } else {
          UICtrl.sendSmallMessage(`Name is not saved due to incomplete validation`, 1000)
        }
      })

      getField.Icname.addEventListener('blur', (e) => {
        if (getReg.Icname.test(e.target.value)) {

          UserCtrl.setData('callName', e.target.value)

          UICtrl.sendSmallMessage(`Name has been saved`, 1000)

        } else {

          UICtrl.sendSmallMessage(`Name is not saved due to incomplete validation`, 1000)

        }
      })

      getField.Iage.addEventListener('blur', (e) => {
        if (e.target.value > 5 && e.target.value < 95) {

          UserCtrl.setData('age', e.target.value)

          UICtrl.sendSmallMessage(`Age has been saved`, 1000)

        } else {

          UICtrl.sendSmallMessage(`Age is not saved due to incomplete validation`, 1000)

        }
      })

      getField.Igender.addEventListener('blur', (e) => {
        if (myDatalist[0].list.indexOf(e.target.value) !== -1) {

          UserCtrl.setData('gender', e.target.value)

          UICtrl.sendSmallMessage(`Gender has been saved`, 1000)

        } else {

          UICtrl.sendSmallMessage(`Gender is not saved due to incomplete validation`, 1000)

        }
      })

      getField.Ibiog.addEventListener('blur', (e) => {

        UserCtrl.setData('biography', e.target.value)

        UICtrl.sendSmallMessage(`Biography has been saved`, 1000)

      })

      getField.Ibmonth.addEventListener('blur', (e) => {

        if (myDatalist[2].list.indexOf(parseInt(getField.Ibday.value)) === -1) {

          UICtrl.sendSmallMessage(`Birthday is not saved due to incomplete validation`, 1000)

        } else if (myDatalist[1].list.indexOf(e.target.value) !== -1) {

          UserCtrl.setData
            ('birthday', `${getField.Ibday.value}-${getField.Ibmonth.value}`)

          UICtrl.sendSmallMessage(`Birthday has been saved`, 1000)

        } else if (myDatalist[1].list.indexOf(e.target.value) === -1) {

          UICtrl.sendSmallMessage(`Birthday is not saved due to incomplete validation`, 1000)

        }

      })

      getField.Ibday.addEventListener('blur', (e) => {

        if (myDatalist[1].list.indexOf(getField.Ibmonth.value) === -1) {

          UICtrl.sendSmallMessage(`Birthday is not saved due to incomplete validation`, 1000)

        } else if (myDatalist[2].list.indexOf(parseInt(e.target.value)) !== -1) {

          UserCtrl.setData
            ('birthday', `${getField.Ibday.value}-${getField.Ibmonth.value}`)

          UICtrl.sendSmallMessage(`Birthday has been saved`, 1000)

        } else if (myDatalist[2].list.indexOf(parseInt(e.target.value)) === -1) {

          UICtrl.sendSmallMessage(`Birthday is not saved due to incomplete validation`, 1000)

        }
      })

      getField.Imonincome.addEventListener('blur', (e) => {
        if (e.target.value >= 0) {

          UserCtrl.setData('monthly income', e.target.value)

          UICtrl.sendSmallMessage(`Monthly Income has been saved`, 1000)

        } else {
          UICtrl.sendSmallMessage(`Monthly Income is not saved due to incomplete validation`, 1000)
        }
      })

      getField.Idailyspen.addEventListener('blur', (e) => {
        if (e.target.value >= 0) {

          UserCtrl.setData('daily spendings', e.target.value)

          UICtrl.sendSmallMessage(`Daily Spendings has been saved`, 1000)

        } else {
          UICtrl.sendSmallMessage(`Daily Spendings is not saved due to incomplete validation`, 1000)
        }
      })

      getField.Iwealthstatus.addEventListener('blur', (e) => {
        UserCtrl.setData('wealth status', e.target.value)

        UICtrl.sendSmallMessage(`Wealth Status has been saved`, 1000)
      })

      getField.Iemploystat.addEventListener('blur', (e) => {
        if (myDatalist[4].list.indexOf(e.target.value) !== -1) {

          UserCtrl.setData('employ status', e.target.value)

          UICtrl.sendSmallMessage(`Employment Status has been saved`, 1000)

        } else {
          UICtrl.sendSmallMessage(`Employment Status is not saved due to incomplete validation`, 1000)
        }
      })

      getField.Ilookjob.addEventListener('blur', (e) => {
        if (myDatalist[5].list.indexOf(e.target.value) !== -1) {

          UserCtrl.setData('look job', e.target.value)

          UICtrl.sendSmallMessage(`Job Find has been saved`, 1000)

        } else {
          UICtrl.sendSmallMessage(`Job Find is not saved due to incomplete validation`, 1000)
        }
      })

    }

    async function locationHandler() {

      const cosaDatalist = await APICtrl.getRandomApi('json/countryState.json')


      function getCounList() {
        let str = '';

        for (const item of cosaDatalist) {
          str += `
          <option value="${item.name}">${item.name}</option>
          `
        }

        return str
      }

      let divCont = `
      <datalist id="counerth">
        ${getCounList()}
      </datalist>
      `

      UICtrl.UIVars().myDataLists.innerHTML += divCont

      const bringCountry = (name) => {

        let product;

        cosaDatalist.forEach((country) => {
          if (country.name === name) {
            product = country
          }
        })

        if (product === undefined) {
          return [false, {}]
        } else {
          return [true, product]
        }

      }

      const makeDataList = (country) => {

        let str = '';

        for (const item of country.states) {
          str += `
          <option value="${item.name}">${item.name}</option>
          `
        }

        let divCont = `
        <datalist id="${country.name}">
          ${str}
        </datalist>
        `

        UICtrl.UIVars().myDataLists.innerHTML += divCont
      }

      const init = () => {
        if (bringCountry(getField.IoriCoun.value)[0]) {

          let country = bringCountry(getField.IoriCoun.value)[1]

          makeDataList(country)

          getField.IoriSta.setAttribute('list', country.name)

        }

        if (bringCountry(getField.IcurrCoun.value)[0]) {

          let country = bringCountry(getField.IcurrCoun.value)[1]

          makeDataList(country)

          getField.IcurrSta.setAttribute('list', country.name)

        }

      }

      getField.IoriCoun.addEventListener('input', (e) => {

        if (bringCountry(e.target.value)[0]) {

          UICtrl.removeClass(e.target.parentElement, 'bad')

          let country = bringCountry(e.target.value)[1]

          makeDataList(country)

          getField.IoriSta.setAttribute('list', country.name)

        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }

      })

      getField.IoriCoun.addEventListener('blur', (e) => {

        if (bringCountry(e.target.value)[0]) {

          let country = bringCountry(e.target.value)[1]

          UserCtrl.setData('country origin', country.name)

          UICtrl.sendSmallMessage(`Origin Country has been saved`, 1000)

        } else {
          UICtrl.sendSmallMessage(`Origin Country is not saved due to incomplete validation`, 1000)
        }

      })

      getField.IoriSta.addEventListener('blur', (e) => {

        UserCtrl.setData('state origin', e.target.value)

        UICtrl.sendSmallMessage(`Origin State has been saved`, 1000)


      })

      getField.IcurrCoun.addEventListener('input', (e) => {

        if (bringCountry(e.target.value)[0]) {

          UICtrl.removeClass(e.target.parentElement, 'bad')

          let country = bringCountry(e.target.value)[1]

          makeDataList(country)

          getField.IcurrSta.setAttribute('list', country.name)

        } else {
          UICtrl.addClass(e.target.parentElement, 'bad')
        }

      })

      getField.IcurrCoun.addEventListener('blur', (e) => {

        if (bringCountry(e.target.value)[0]) {

          let country = bringCountry(e.target.value)[1]

          UserCtrl.setData('country current', country.name)

          UICtrl.sendSmallMessage(`Current Country has been saved`, 1000)

        } else {
          UICtrl.sendSmallMessage(`Current Country is not saved due to incomplete validation`, 1000)
        }

      })

      getField.IcurrSta.addEventListener('blur', (e) => {

        UserCtrl.setData('state current', e.target.value)

        UICtrl.sendSmallMessage(`Current State has been saved`, 1000)


      })

      init()

    }

    function formEvents() {

      getField.Ihob.addEventListener('submit', (e) => {
        e.preventDefault()

        if (getField.Ihobname.value !== '') {

          const name = getField.Ihobname.value

          let des = getField.Ihobdes.value

          if (des === "") {
            des = 'Not Provided'
          }

          data = { name: name, description: des }

          UserCtrl.setData('hobby', data)

          getField.Ihobname.value = ''
          getField.Ihobdes.value = ''

          fillList('hobby', UserCtrl.getData('hobby'), getField.Ihobul)
        } else {
          UICtrl.sendSmallMessage(`Hobby is not saved due to incomplete validation`, 1000)
        }
      })

      getField.Ispor.addEventListener('submit', (e) => {
        e.preventDefault()

        if (getField.Isporname.value !== '') {

          const name = getField.Isporname.value

          let des = getField.Ispordes.value

          if (des === "") {
            des = 'Not Provided'
          }

          data = { name: name, description: des }

          UserCtrl.setData('sport', data)

          getField.Isporname.value = ''
          getField.Ispordes.value = ''


          fillList('sport', UserCtrl.getData('sport'), getField.Isporul)
        } else {
          UICtrl.sendSmallMessage(`Sport is not saved due to incomplete validation`, 1000)
        }
      })

      getField.Iwor.addEventListener('submit', (e) => {
        e.preventDefault()

        if (getField.Iwortype.value !== '' && getField.Iworplace.value !== '') {

          const name = getField.Iwortype.value

          let des = getField.Iworplace.value

          if (des === "") {
            des = 'Not Provided'
          }

          data = { type: name, place: des }

          UserCtrl.setData('work', data)

          getField.Iwortype.value = ''
          getField.Iworplace.value = ''

          fillList('work', UserCtrl.getData('work'), getField.Iworul)

        } else {
          UICtrl.sendSmallMessage(`Work is not saved due to incomplete validation`, 1000)
        }
      })

      getField.Itimlsave.addEventListener('submit', (e) => {
        e.preventDefault()

        let shouldISave = true

        const verifyName = () => {
          if (getField.Itimlname.value === '') {
            shouldISave = false
          } else {
            return getField.Itimlname.value
          }
        }
        const inputName = verifyName()


        const verifyDays = () => {

          let mm = 'de';

          let input = getField.Itimldays.value;

          let dataList = myDatalist[7].list

          input = input.split(',')

          for (let i = 0; i < input.length; i++) {
            input[i] = input[i].replace(/\ /g, '')
          }

          for (const value of input) {

            if (input.length === 1) {

              if (dataList.indexOf(getField.Itimldays.value) !== -1) {

              } else if (!isNaN(parseInt(getField.Itimldays.value))) {
                if (getField.Itimldays.value > 31 || getField.Itimldays.value < 1) {
                  mm = 'fe'
                  shouldISave = false

                }
              } else {
                mm = 'fe'
                shouldISave = false
              }

            } else if (dataList.indexOf(value) !== -1) {

            } else if (!isNaN(parseInt(value))) {
              if (value > 31 || value < 1) {
                mm = 'fe'
                shouldISave = false
              }
            } else {
              mm = 'fe'
              shouldISave = false
            }

            if (input.indexOf('EveryDay') !== -1 || input.indexOf('Weekdays') !== -1 || input.indexOf('Weekends') !== -1) {
              mm = 'fe'
            }
          }

          if (mm === 'de') {
            return input
          } else {
            shouldISave = false
          }


        }
        const inputDays = verifyDays()


        const verifyMonths = () => {

          let mm = 'de';

          let input = getField.Itimlmonths.value;

          let dataList = myDatalist[6].list

          input = input.split(',')

          for (let i = 0; i < input.length; i++) {
            input[i] = input[i].replace(/\ /g, '')
          }

          for (const value of input) {

            if (input.length === 1) {

              if (dataList.indexOf(getField.Itimlmonths.value) !== -1) {

              } else {
                mm = 'fe';
                shouldISave = false
              }

            } else if (dataList.indexOf(value) !== -1) {

            } else {
              mm = 'fe';
              shouldISave = false
            }

          }

          if (input.indexOf('EveryDay') !== -1) {
            mm = 'fe'
          }

          if (mm === 'de') {
            return input
          } else {
            shouldISave = false
          }
        }
        const inputMonths = verifyMonths()


        const verifyTime = () => {

          let mm = 'de'

          let input = getField.Itimltime.value;

          input = input.split('-')

          for (let i = 0; i < input.length; i++) {
            input[i] = input[i].replace(/\ /g, '')
          }

          try {

            for (let i = 0; i < input.length; i++) {

              let newImp = input[i].split(':')

              input[i] = {
                hour: parseInt(newImp[0]),
                minute: parseInt(newImp[1].slice(0, 2)),
                stamp: newImp[1].slice(2, 4)
              }

              const validateTime = (time) => {

                let x = []

                if (`${time.hour}` !== `${NaN}`) {
                  x.push('')
                }

                if (time.hour <= 12 && time.hour >= 1) {
                  x.push('')
                }

                if (time.minute <= 59 && time.minute >= 0) {
                  x.push('')
                }

                if (!isNaN(time.minute)) {
                  x.push('')
                }

                if (time.stamp === 'am' || time.stamp === 'pm') {
                  x.push('')
                }

                if (x.length === 5) {
                  return true
                } else {
                  return false
                }
              }

              if (!validateTime(input[i])) {
                mm = 'fe'
                shouldISave = false
              }
            }

            if (input.length === 2) {

              const validateTimeDiff = (time) => {

                let x = [];

                time1hour =
                  time[1].stamp === 'am' ? time[1].hour : time[1].hour + 12;

                time0hour =
                  time[0].stamp === 'am' ? time[0].hour : time[0].hour + 12;


                if (time1hour > time0hour) {
                  return true
                } else if (time1hour === time0hour) {
                  if (time[1].minute > time[0].minute) {
                    return true
                  } else {
                    return false
                  }
                } else {
                  return false
                }
              }

              if (!validateTimeDiff(input)) {
                mm = 'fe'
                shouldISave = false
              }

            } else {
              mm = 'fe'
              shouldISave = false
            }

          } catch (error) {

            mm = 'fe'
            shouldISave = false

          }

          if (mm === 'de') {
            return input
          } else {
            shouldISave = false
          }

        }
        const inputTime = verifyTime()


        const verifydescript = () => {
          if (getField.Itimldes.value === '') {
            return 'Not Provided'
          } else {
            return getField.Itimldes.value
          }
        }
        const inputDes = verifydescript()


        if (shouldISave === true) {

          const data = {
            name: inputName,
            days: inputDays,
            months: inputMonths,
            time: inputTime,
            description: inputDes
          }

          UserCtrl.setData('timeline', data)

          fillList('timeline', UserCtrl.getData('timeline'), getField.Itimlenvnt)

          getField.Itimlname.value = '';

          getField.Itimldays.value = '';

          getField.Itimlmonths.value = '';

          getField.Itimltime.value = '';

          getField.Itimldes.value = '';


        } else {
          UICtrl.sendSmallMessage(`New Timeline is not saved due to incomplete validation`, 1000)
        }

      })

      getField.Itasksave.addEventListener('submit', (e) => {

        e.preventDefault()

        let shouldISave = true

        const verifyName = () => {
          if (getField.Itaskname.value === '') {
            shouldISave = false
          } else {
            return getField.Itaskname.value
          }
        }
        const inputName = verifyName()


        const verifyDate = () => {

          let input = getField.Itaskdate.value;

          let theDate;

          input = input.split('-')

          for (let i = 0; i < input.length; i++) {
            input[i] = input[i].replace(/\ /g, '')
          }

          // Begin Test
          let bre = 'Valid'


          // Test all inputs
          const tester = function () {

            input[0] = parseInt(input[0])

            input[1] = TimeCtrl.getMonthNumber(input[1])

            input[2] = parseInt(input[2])

            const maxDays = TimeCtrl.getNoDays(input[1], input[2])

            if (input[0] > maxDays || input[1] === -1) {
              bre = 'Invalid'
            }

            for (const inp of input) {
              if (isNaN(inp) || inp < 0) {
                bre = 'Invalid'
              }
            }

          }

          // Creation and testing of Date Object
          const tester2 = function (conti) {

            if (conti === 'Valid') {

              theDate = new Date(input[2], input[1], input[0])

              let today = new Date()

              today = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())

              if (today.getTime() > theDate.getTime()) {
                bre = `Invalid`
              }

            }

          }

          tester()

          tester2(bre)

          if (bre === 'Valid') {
            return `${theDate}`
          } else {
            shouldISave = false
          }

        }
        const inputDate = verifyDate()


        const verifyTime = (dat) => {

          let mm = 'de'

          let input = getField.Itasktime.value;

          input = input.replace(/\ /g, '')

          try {

            let newImp = input.split(':')

            input = {
              hour: parseInt(newImp[0]),
              minute: parseInt(newImp[1].slice(0, 2)),
              stamp: newImp[1].slice(2, 4)
            }

            const validateTime = (time) => {

              let x = []

              if (`${time.hour}` !== `${NaN}`) {
                x.push('')
              }

              if (time.hour <= 12 && time.hour >= 1) {
                x.push('')
              }

              if (time.minute <= 59 && time.minute >= 0) {
                x.push('')
              }

              if (!isNaN(time.minute)) {
                x.push('')
              }

              if (time.stamp === 'am' || time.stamp === 'pm') {
                x.push('')
              }

              if (x.length === 5) {
                return true
              } else {
                return false
              }

            }

            if (!validateTime(input)) {
              mm = 'fe'
            }

          } catch (error) {
            mm = 'fe'
          }

          if (dat === undefined) {
            mm = 'fe'
          }


          if (mm === 'de') {

            const theDate = new Date(dat)

            input.hour = input.hour === 12 ? input.hour - 12 : input.hour

            if (input.hour === 12) {
              input.stamp = input.stamp === 'am' ? 'pm' : 'am'
            }

            input.hour = input.stamp === 'pm' ? input.hour + 12 : input.hour

            theDate.setHours(input.hour, input.minute)

            const today = new Date()

            if (today.getTime() >= theDate.getTime()) {
              shouldISave = false
            } else {
              return `${theDate}`
            }


          } else {
            shouldISave = false
          }

        }
        const inputTime = verifyTime(inputDate)


        const verifyStatus = () => {
          if (myDatalist[10].list.indexOf(getField.Itaskstatus.value) === -1) {
            shouldISave = false
          } else {
            return getField.Itaskstatus.value
          }
        }
        const inputSta = verifyStatus()

        const verifydescript = () => {
          if (getField.Itaskdes.value === '') {
            return 'Not Provided'
          } else {
            return getField.Itaskdes.value
          }
        }
        const inputDes = verifydescript()


        if (shouldISave === true) {

          const data = {
            name: inputName,
            date: inputTime,
            status: inputSta,
            description: inputDes
          }

          UserCtrl.setData('task', data)

          fillList('task', UserCtrl.getData('task'), getField.Itaskenvnt)

          getField.Itaskname.value = '';

          getField.Itaskdate.value = '';

          getField.Itasktime.value = '';

          getField.Itaskstatus.value = '';

          getField.Itaskdes.value = '';


        } else {
          UICtrl.sendSmallMessage(`New Task is not saved due to incomplete validation`, 1000)
        }

      })

    }

    async function insertDatalists() {

      await getAllDatalists()

      let divCont = '';

      function getMyList(list) {
        let str = '';

        for (const item of list) {
          str += `
          <option value="${item}">${item}</option>
          `
        }

        return str
      }

      function getHobList() {
        let str = '';

        for (const item of hobDatalist) {
          str += `
          <option value="${item.name.replace(/(^\w{1})|(\s{1}\w{1})/g, m => m.toUpperCase())
            }">${item.name.replace(/(^\w{1})|(\s{1}\w{1})/g, m => m.toUpperCase())
            }</option>
          `
        }

        return str
      }

      function getSportList() {
        let str = '';

        for (const item of sportDatalist) {
          str += `
          <option value="${item.name.replace(/(^\w{1})|(\s{1}\w{1})/g, m => m.toUpperCase())
            }">${item.name.replace(/(^\w{1})|(\s{1}\w{1})/g, m => m.toUpperCase())
            }</option>
          `
        }

        return str
      }

      function getOccuList() {
        let str = '';

        for (const item of occuDatalist) {
          str += `
          <option value="${item.name.replace(/(^\w{1})|(\s{1}\w{1})/g, m => m.toUpperCase())
            }">${item.name.replace(/(^\w{1})|(\s{1}\w{1})/g, m => m.toUpperCase())
            }</option>
          `
        }

        return str
      }


      for (const daLi of myDatalist) {
        divCont += `
        <datalist id="${daLi.id2}">
          ${getMyList(daLi.list)}
        </datalist>
        `
      }

      divCont += `
      <datalist id="hoberth">
        ${getHobList()}
      </datalist>
      `

      divCont += `
      <datalist id="spoerth">
        ${getSportList()}
      </datalist>
      `

      divCont += `
      <datalist id="occuerth">
        ${getOccuList()}
      </datalist>
      `


      UICtrl.UIVars().myDataLists.innerHTML += divCont
    }

    function hiddenFormsEvent() {
      const allBtns = UICtrl.UIVars().showBelowForm

      allBtns.forEach(btn => {

        btn.addEventListener('click', function (e) {
          UICtrl.toggleClass(e.target.nextElementSibling, 'show')

          if (e.target.innerHTML === 'Add') {
            e.target.innerHTML = 'Hide Form'
          } else {
            e.target.innerHTML = 'Add'
          }
        })

      })
    }

    fillFields()

    if (firstTimeState.settings === 0) { hiddenFormsEvent() }

    if (firstTimeState.settings === 0) { insertDatalists() }

    if (firstTimeState.settings === 0) { inputEvents() }

    if (firstTimeState.settings === 0) { formEvents() }

    if (firstTimeState.settings === 0) { blurEvents() }

    if (firstTimeState.settings === 0) { locationHandler() }

    firstTimeState.settings++
  }

  return {
    init: function () {
      loadEventListeners()

      firstInit()

      loadInit()

      console.log('Application is succesfully running...');
    }
  }
})
  (UICtrl, APICtrl, StorageCtrl);


// Initialize Application
document.addEventListener('DOMContentLoaded', App.init())
