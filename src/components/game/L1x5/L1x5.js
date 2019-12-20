const L1x5DataGameBall = {
    112:{
        name: '三码 前三直选复式',
        the_way:"jingquefushi3",
        prizeSet:"",//赔率
        ball:{
            labels: ['一位', '二位', '三位'],
            ballsName:'L1x5quick',
            balls:[
                    {
                        case: {
                            start: 1,
                            end: 12
                        },
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 12
                        },
                        control: false
                    },
                    {
                        case: {
                            start: 1,
                            end: 12
                        },
                        control: false
                    },
            ],
           
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    111:{
        name: '二码 前二直选复式',
        the_way:"jingquefushi2",
        prizeSet:"",//赔率
        ball:{
            labels: ['一位', '二位'],
            ballsName:'L1x5quick',
            balls:[
                    {
                        case: {
                            start: 1,
                            end: 12
                        },
                        control: false
                    },
                    {
                        case: {
                            start: 1,
                            end: 12
                        },
                        control: false
                    },
            ],
           
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    107:{
        name: '二码 前二组选复式',
        the_way:"zuxuanpailieC",
        lottoryMix:2,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['前二'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    108:{
        name: '三码 前三组选复式',
        the_way:"zuxuanpailieC",
        lottoryMix:3,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['前三'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    122:{
        name: '前三不定位',
        the_way:"zuxuanpailieC",
        lottoryMix:1,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['前三'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    110:{
        name: '趣味型 猜中位',
        the_way:"zuxuanpailieC",
        lottoryMix:1,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['猜中位'],
            ballsName:'L1x5quick',
            balls: {
                start: 3,
                end: 10
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    106:{
        name: '一星不定位',
        the_way:'sum',
        prizeSet:"",//赔率
        ball:{
            labels: ['一位', '二位', '三位', '四位', '五位'],
            ballsName:'L1x5quick',
            balls:[
                {
                    case: {
                        start: 1,
                        end: 12
                    },
                    control: false,
                }, 
                {
                    case: {
                        start: 1,
                        end: 12
                    },
                    control: false
                },
                {
                    case: {
                        start: 1,
                        end: 12
                    },
                    control: false,
                }, 
                {
                    case: {
                        start: 1,
                        end: 12
                    },
                    control: false
                },
                {
                    case: {
                        start: 1,
                        end: 12
                    },
                    control: false
                },
        ],
            
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    109:{
        name: '趣味型 定单双',
        the_way:'L1x5sum',
        prizeSet:"",//赔率
        ball:{
            labels: [''],
            ballsName:'L1x5qiu',
            balls: [
                {
                    value:"5",
                    name:"5单0双",
                    isable:false
                },
                {
                    value:"4",
                    name:"4单1双",
                    isable:false
                },
                {
                    value:"3",
                    name:"3单2双",
                    isable:false
                },
                {
                    value:"2",
                    name:"2单3双",
                    isable:false
                },
                {
                    value:"1",
                    name:"1单4双",
                    isable:false
                },
                {
                    value:"0",
                    name:"0单5双",
                    isable:false
                },
            ],
            control: false,
        },
        listTable: {
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    98:{
        name: '任选复式 任选一中一复式',
        the_way:"zuxuanpailieC",
        lottoryMix:1,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['选1中1'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    99:{
        name: '任选复式 任选二中二复式',
        the_way:"zuxuanpailieC",
        lottoryMix:2,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['选2中2'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    100:{
        name: '任选复式 任选三中三复式',
        the_way:"zuxuanpailieC",
        lottoryMix:3,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['选3中3'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    101:{
        name: '任选复式 任选4中4复式',
        the_way:"zuxuanpailieC",
        lottoryMix:4,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['选4中4'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    102:{
        name: '任选复式 任选5中5复式',
        the_way:"zuxuanpailieC",
        lottoryMix:5,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['选5中5'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    103:{
        name: '任选复式 任选6中5复式',
        the_way:"zuxuanpailieC",
        lottoryMix:6,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['选6中5'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    104:{
        name: '任选复式 任选7中5复式',
        the_way:"zuxuanpailieC",
        lottoryMix:7,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['选7中5'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    105:{
        name: '任选复式 任选8中5复式',
        the_way:"zuxuanpailieC",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['选8中5'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    380:{
        name: '猜1不出',
        the_way:"zuxuanpailieC",
        lottoryMix:1,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['一个号'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    381:{
        name: '猜2不出',
        the_way:"zuxuanpailieC",
        lottoryMix:2,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['二个号'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    382:{
        name: '猜3不出',
        the_way:"zuxuanpailieC",
        lottoryMix:3,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['三个号'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    383:{
        name: '猜4不出',
        the_way:"zuxuanpailieC",
        lottoryMix:4,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['四个号'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    384:{
        name: '猜5不出',
        the_way:"zuxuanpailieC",
        lottoryMix:5,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['五个号'],
            ballsName:'L1x5quick',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    113:{
        name: '任选 任选二中二胆拖',
        the_way:"renxuandantuo",
        lottoryMix:2,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['胆码', '拖码'],
            ifhave:[false,true],
            ballsName:'L1x5hunhe',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    114:{
        name: '任选 任选三中三胆拖',
        the_way:"renxuandantuo",
        lottoryMix:3,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['胆码', '拖码'],
            ifhave:[false,true],
            ballsName:'L1x5hunhe',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    115:{
        name: '任选 任选四中四胆拖',
        the_way:"renxuandantuo",
        lottoryMix:4,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['胆码', '拖码'],
            ifhave:[false,true],
            ballsName:'L1x5hunhe',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    116:{
        name: '任选 任选五中五胆拖',
        the_way:"renxuandantuo",
        lottoryMix:5,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['胆码', '拖码'],
            ifhave:[false,true],
            ballsName:'L1x5hunhe',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    117:{
        name: '任选 任选六中五胆拖',
        the_way:"renxuandantuo",
        lottoryMix:6,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['胆码', '拖码'],
            ifhave:[false,true],
            ballsName:'L1x5hunhe',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    118:{
        name: '任选 任选七中五胆拖',
        the_way:"renxuandantuo",
        lottoryMix:7,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['胆码', '拖码'],
            ifhave:[false,true],
            ballsName:'L1x5hunhe',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    119:{
        name: '任选 任选八中五胆拖',
        the_way:"renxuandantuo",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            labels: ['胆码', '拖码'],
            ifhave:[false,true],
            ballsName:'L1x5hunhe',
            balls: {
                start: 1,
                end: 12
            },
            control: false,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tail: [{
                isCondition: false,
                func: 'none'
            }],
            tmpl: 'historyList'
        }
    },
    /**
     * 单式
     */
    95:{
        name: '前三直选单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:3,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    97:{
        name: '前三组选单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:3,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    94:{
        name: '前二直选单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:2,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    96:{
        name: '前二组选单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:2,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    86:{
        name: '任选一中一单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:1,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    87:{
        name: '任选二中二单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:2,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    88:{
        name: '任选三中三单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:3,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    89:{
        name: '任选四中四单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:4,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    90:{
        name: '任选五中五单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:5,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    91:{
        name: '任选六中五单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:6,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    92:{
        name: '任选七中五单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:7,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
    93:{
        name: '任选八中五单式',
        the_way:"danshi",
        lottoryMix:8,//排列选择5个一注
        prizeSet:"",//赔率
        ball:{
            ballsName:'L1x5noteList',
            xing:8,
            balls:null,
        },
        listTable:{
            title: ['奖期', ' ',' ','开奖 ',' ',' '],
            ballClass: ['circle', 'circle', 'circle', 'circle', 'circle'],
            hasTail: false,
            tmpl: 'historyList'
        }
    },
}
export default L1x5DataGameBall;