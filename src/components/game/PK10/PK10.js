const PK10DataGameBall = {
    177:{
        name: '猜名次',
        the_way:'sum',
        prizeSet:"",//赔率
        ball:{
            labels: ['冠军', '亚军', '季军', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'],
            ballsName:'PK10quick',
            balls:[
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
            ],
            
        },
        listTable:{
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
        }
    },
    175:{
        name: '冠亚和',
        the_way:'sum',
        prizeSet:"",//赔率
        ball:{
            labels: [''],
            ballsName:'PK10common',
            balls: {
                start: 3,
                end: 20
            },
            control: false,
        },
        listTable: {
            title: ['奖期', '冠 亚', '和值'],
            ballClass: ['curr', 'curr'],
            hasTail: true,
            tail: [{
                isCondition: false,
                func: 'getSumByNum',
                position: [0, 1]
            }],
        }
    },
    178:{
        name: '龙虎',
        the_way:'sum',
        prizeSet:"",//赔率
        ball:{
            labels: ['1 V 10', '2 V 9', '3 V 8', '4 V 7', '5 V 6'],
            ballsName:'PK10qiu',
            balls:[
                {
                    case: [
                        {
                            value:"1",
                            name:"龙",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"虎",
                            isable:false
                        },
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"龙",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"虎",
                            isable:false
                        },
                    ],
                    control: false,
                },
                {
                    case: [
                        {
                            value:"1",
                            name:"龙",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"虎",
                            isable:false
                        },
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"龙",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"虎",
                            isable:false
                        },
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"龙",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"虎",
                            isable:false
                        },
                    ],
                    control: false,
                }, 
            ],
        },
        listTable: {
            title: ['奖期', '1V10', '2V9', '3V8', '4V7', '5V6'],
            ballClass: [],
            hasTail: true,
            tail: [
                {
                    isCondition: false,
                    func: 'longhu',
                    position: [0, 9]
                }, {
                    isCondition: false,
                    func: 'longhu',
                    position: [1, 8]
                }, {
                    iisCondition: false,
                    func: 'longhu',
                    position: [2, 7]
                }, {
                    iisCondition: false,
                    func: 'longhu',
                    position: [3, 6]
                }, {
                    iisCondition: false,
                    func: 'longhu',
                    position: [4, 5]
                }
            ],
        }
    },
    396:{
        name: '精确前二 单式',
        the_way:'danshi',
        prizeSet:"",//赔率
        ball:{
            ballsName:'PK10noteList',
            xing:2,
            balls:null,
        },
        listTable: {
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            ballClass: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'curr', 'curr'],
            hasTail: false,
            tmpl: 'historyList_pk10_1'
        }
    },
    398:{
        name: '精确后二 单式',
        the_way:'danshi',
        prizeSet:"",//赔率
        ball:{
            ballsName:'PK10noteList',
            xing:2,
            balls:null
        },
        listTable: {
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            ballClass: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'curr', 'curr'],
            hasTail: false,
            tmpl: 'historyList_pk10_1'
        }
    },
    397:{
        name: '精确前三 单式',
        the_way:'danshi',
        prizeSet:"",//赔率
        ball:{
            ballsName:'PK10noteList',
            xing:3,
            balls:null
        },
        listTable: {
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            ballClass: ['curr', 'curr', 'curr', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal'],
            hasTail: false,
            tmpl: 'historyList_pk10_1'
        }
    },
    399:{
        name: '精确后三 单式',
        the_way:'danshi',
        prizeSet:"",//赔率
        ball:{
            ballsName:'PK10noteList',
            xing:3,
            balls:null
        },
        listTable: {
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            ballClass: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'curr', 'curr', 'curr'],
            hasTail: false,
            tmpl: 'historyList_pk10_1'
        }
    },
    172:{
        name: '精确前二 复式',
        prizeSet:"",//赔率
        ball:{
            labels: ['冠军', '亚军'],
            ballsName:'PK10quick',
            balls:[
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
            ],
            
        },
        listTable:{
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            ballClass: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'curr', 'curr'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
        }
    },
    394:{
        name: '精确后二 复式',
        prizeSet:"",//赔率
        ball:{
            labels: ['第九名', '第十名'],
            ballsName:'PK10quick',
            balls:[
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
            ],
            
        },
        listTable:{
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            ballClass: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'curr', 'curr'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
        }
    },
    173:{
        name: '精确前三 复式',
        prizeSet:"",//赔率
        ball:{
            labels: ['冠军', '亚军', '季军'],
            ballsName:'PK10quick',
            balls:[
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
            ],
        },
        listTable:{
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            ballClass: ['normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'curr', 'curr', 'curr'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
        }
    },
    395:{
        name: '精确后三 复式',
        prizeSet:"",//赔率
        ball:{
            labels: ['第八名', '第九名', '第十名'],
            ballsName:'PK10quick',
            balls:[
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
                    {
                        case: {
                            start: 1,
                            end: 11
                        },
                        control: false
                    },
            ],
           
        },
        listTable:{
            title: ['奖期', '冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
            ballClass: ['curr', 'curr', 'curr', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
        }
    },
    176:{
        name:'两面 大小单双',
        the_way:'sum',
        prizeSet:"",//赔率
        ball:{
            labels: ['和值'],
            ballsName:'PK10qiu',//此处是render对象
            balls:[
                {
                    value:"1",
                    name:"大",
                    isable:false
                },
                {
                    value:"0",
                    name:"小",
                    isable:false
                },
                {
                    value:"3",
                    name:"单",
                    isable:false
                },
                {
                    value:"2",
                    name:"双",
                    isable:false
                }
            ],
            control: false,
        },
        listTable: {
            title: ['奖期', '冠 亚', '和值', '大小', '单双'],
            ballClass: ['curr', 'curr'],
            hasTail: true,
            tail: [{
                isCondition: false,
                func: 'getSumByNum',
                position: [0, 1]
            }, {
                isCondition: false,
                func: 'getDaxiaoPK10',
                position: [0, 1]
            }, {
                iisCondition: false,
                func: 'getDanshuangPK10',
                position: [0, 1]
            }],
            tmpl: 'historyList'
        }
    },
    487:{
        name: '两面 按名次',
        the_way:'sum',
        prizeSet:"",//赔率
        listTable:{
            title: ['期号','冠', '亚', '季', '四', '五','六','七','八','九','十'],
        },
        ball:{
            labels: ['冠军', '亚军', '季军', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'],
            ballsName:'PK10qiu',
            balls:[
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
                {
                    case: [
                        {
                            value:"1",
                            name:"大",
                            isable:false
                        },
                        {
                            value:"0",
                            name:"小",
                            isable:false
                        },
                        {
                            value:"3",
                            name:"单",
                            isable:false
                        },
                        {
                            value:"2",
                            name:"双",
                            isable:false
                        }
                    ],
                    control: false,
                }, 
        ],
        }
    }
}

export default PK10DataGameBall;