// Исходные учебные данные: 12 помещений, 28 устройств, 4 инцидента
// tb/cb - "обычные" температура и CO2 помещения, от них строится история для z-score
const ROOMS_SEED = [
 {id:"A-101",building:"Корпус A",floor:1,type:"Компьютерный класс",temperature:24.3,co2:780,energy:3.6,baseline:3.5,occupancy:18,tb:24,cb:750},
 {id:"A-102",building:"Корпус A",floor:1,type:"Лекционная",temperature:23.1,co2:640,energy:2.4,baseline:2.5,occupancy:40,tb:23,cb:650},
 {id:"A-205",building:"Корпус A",floor:2,type:"Лекционная",temperature:25.8,co2:1620,energy:3.1,baseline:3.0,occupancy:95,tb:25,cb:800},
 {id:"A-210",building:"Корпус A",floor:2,type:"Лаборатория",temperature:24.9,co2:910,energy:4.2,baseline:4.0,occupancy:12,tb:24.5,cb:900},
 {id:"B-101",building:"Корпус B",floor:1,type:"Компьютерный класс",temperature:26.2,co2:1120,energy:3.9,baseline:3.5,occupancy:22,tb:25.5,cb:1000},
 {id:"B-102",building:"Корпус B",floor:1,type:"Серверная",temperature:32.4,co2:540,energy:6.8,baseline:4.5,occupancy:0,tb:23,cb:500},
 {id:"B-204",building:"Корпус B",floor:2,type:"Аудитория",temperature:22.7,co2:700,energy:2.2,baseline:2.3,occupancy:28,tb:22.8,cb:700},
 {id:"B-301",building:"Корпус B",floor:3,type:"Лаборатория",temperature:23.8,co2:830,energy:3.7,baseline:3.6,occupancy:15,tb:23.5,cb:820},
 {id:"C-101",building:"Корпус C",floor:1,type:"Библиотека",temperature:22.4,co2:590,energy:2.8,baseline:2.9,occupancy:34,tb:22.5,cb:600},
 {id:"C-110",building:"Корпус C",floor:1,type:"Административное",temperature:24.1,co2:730,energy:1.9,baseline:2.0,occupancy:6,tb:24,cb:720},
 {id:"C-201",building:"Корпус C",floor:2,type:"Аудитория",temperature:23.5,co2:680,energy:5.2,baseline:2.4,occupancy:0,tb:23.5,cb:680},
 {id:"C-305",building:"Корпус C",floor:3,type:"Лаборатория",temperature:27.9,co2:980,energy:4.4,baseline:4.0,occupancy:9,tb:27,cb:950}
];
const OFFLINE_SEED = ["CO2-C-110-01","TEMP-B-301-01","ENRG-C-201-01"];
const INCIDENTS_SEED = [
 {id:1,title:"Высокий уровень CO2",room:"A-205",priority:"high",status:"open",assignee:"Инженер",comment:"Переполненная лекционная"},
 {id:2,title:"Перегрев серверной",room:"B-102",priority:"high",status:"progress",assignee:"Администратор",comment:"Проверить кондиционер"},
 {id:3,title:"Датчик не отвечает",room:"B-301",priority:"medium",status:"open",assignee:"Оператор",comment:""},
 {id:4,title:"Не работает проектор",room:"A-102",priority:"low",status:"done",assignee:"Инженер",comment:"Заменена лампа"}
];
