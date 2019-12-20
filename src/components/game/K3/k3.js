
const K3DataGameBall = {
    160:{
        name: '二同号单选',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: ['同号', '不同号'],
            ballsName:'k3common',
            balls:[
                    {
                        case: [
                            {
                                value:"1",
                                name:"11",
                                isable:false
                            },
                            {
                                value:"2",
                                name:"22",
                                isable:false
                            },
                            {
                                value:"3",
                                name:"33",
                                isable:false
                            },
                            {
                                value:"4",
                                name:"44",
                                isable:false
                            },
                            {
                                value:"5",
                                name:"55",
                                isable:false
                            },
                            {
                                value:"6",
                                name:"66",
                                isable:false
                            },
                        ],
                        control: false,
                    }, 
                    {
                        case: {
                            start: 1,
                            end: 7
                        },
                        control: false
                    }
            ],
            
        },
        prizeSet:""
    },
    161:{
        name: '二同号复选',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',
            balls:[
                {
                    value:"1",
                    name:"11*",
                    isable:false
                },
                {
                    value:"2",
                    name:"22*",
                    isable:false
                },
                {
                    value:"3",
                    name:"33*",
                    isable:false
                },
                {
                    value:"4",
                    name:"44*",
                    isable:false
                },
                {
                    value:"5",
                    name:"55*",
                    isable:false
                },
                {
                    value:"6",
                    name:"66*",
                    isable:false
                }
            ],
            control: false,
        },
        prizeSet:""//赔率
    },
    157:{
        name:'和值',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',//此处是render对象
            balls:{
                start: 3,
                end: 19
            },
            control: false,
        },
        prizeSet:""//赔率
    },
    158:{
        name: '三同号单选',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',
            balls:[
                {
                    value:"1",
                    name:"111",
                    isable:false
                },
                {
                    value:"2",
                    name:"222",
                    isable:false
                },
                {
                    value:"3",
                    name:"333",
                    isable:false
                },
                {
                    value:"4",
                    name:"444",
                    isable:false
                },
                {
                    value:"5",
                    name:"555",
                    isable:false
                },
                {
                    value:"6",
                    name:"666",
                    isable:false
                }
            ],
            control: false,
        },
        prizeSet:""//赔率
    },
    159:{
        name: '三同号通选',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',
            balls:[
                {
                    value:"1",
                    name:"通选",
                    isable:false
                }
            ],
            control: false,
        },
        prizeSet:""//赔率
    },
    162:{
        name:'三不同号',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',//此处是render对象
            balls:{
                start: 1,
                end: 7
            },
            control: false,
        },
        fun:function(pream){
            let ball = pream.ball.split("|");
            if(ball.length>=3){
                return true
            }else{
                return false
            }
        },
        prizeSet:""//赔率
    },
    163:{
        name:'二不同号',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',//此处是render对象
            balls:{
                start: 1,
                end: 7
            },
            fun:function(pream){
                let ball = pream.ball.split("|");
                if(ball.length>=2){
                    return true
                }else{
                    return false
                }
            },
            control: false,
        },
        prizeSet:""//赔率
    },
    164:{
        name: '三连号通选',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',
            balls:[
                {
                    value:"1",
                    name:"通选",
                    isable:false
                }
            ],
            control: false,
        },
        prizeSet:""//赔率
    },
    167:{
        name:'猜必出',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',//此处是render对象
            balls:{
                start: 1,
                end: 7
            },
            control: false,
        },
        prizeSet:""//赔率
    },
    375:{
        name:'猜1不出',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',//此处是render对象
            balls:{
                start: 1,
                end: 7
            },
            control: false,
            effectiveNum:1,
        },
        prizeSet:""//赔率
    },
    376:{
        name:'猜2不出',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',//此处是render对象
            balls:{
                start: 1,
                end: 7
            },
            control: false,
            effectiveNum:2,
        },
        prizeSet:""//赔率
    },
    377:{
        name:'猜3不出',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',//此处是render对象
            balls:{
                start: 1,
                end: 7
            },
            control: false,
            effectiveNum:3,
        },
        prizeSet:""//赔率
    },
    378:{
        name: '颜色 全红',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',
            balls:[
                {
                    value:"1",
                    name:"全红",
                    isable:false
                }
            ],
            control: false,
        },
        prizeSet:""//赔率
    },
    379:{
        name: '颜色 全黑',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',
            balls:[
                {
                    value:"1",
                    name:"全黑",
                    isable:false
                }
            ],
            control: false,
        },
        prizeSet:""//赔率
    },
    486:{
        name:'大小单双',
        listTable: {
            title: ['奖期', '开奖号码', '和值', '大小', '单双'],
        },
        ball:{
            labels: [''],
            ballsName:'k3common',//此处是render对象
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
        prizeSet:""
    },
    
};

export default K3DataGameBall;