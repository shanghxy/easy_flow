var data_B = {
    name: '流程B',
    nodeList: [
        {
            id: 'nodeA',
            name: '市场部-客户进入',
            type: 'task',
            left: '18px',
            top: '223px',
            ico: 'el-icon-user-solid',
            state: 'success',
            inCharge:'momo',
            timeStart:'2020-07-02',
            timeEnd:'2020-07-03',
            info:'我是节点A的详细信息',
            new:[
                {
                    mylabel:'新变量名1',
                    value:'哈哈哈'
                },
                {
                    mylabel:'新变量名2',
                    value:'啦啦啦' 
                }
            ]
        },
        {
            id: 'nodeB',
            type: 'task',
            name: '市场部-市场调研',
            left: '351px',
            top: '96px',
            ico: 'el-icon-goods',
            state: 'error',
            inCharge:'momo',
            timeStart:'2020-07-02',
            timeEnd:'2020-07-03',
            info:'我是节点B的详细信息',
            new:[
                {
                    mylabel:'新变量名1',
                    value:'哈哈哈'
                },
                {
                    mylabel:'新变量名2',
                    value:'啦啦啦' 
                }
            ]
        },
        {
            id: 'nodeC',
            name: '市场部-沟通产品',
            type: 'task',
            left: '354px',
            top: '250px',
            ico: 'el-icon-present',
            state: 'warning',
            inCharge:'momo',
            timeStart:'2020-07-02',
            timeEnd:'2020-07-03',
            info:'我是节点C的详细信息',
            new:[
                {
                    mylabel:'新变量名1',
                    value:'哈哈哈'
                },
                {
                    mylabel:'新变量名2',
                    value:'啦啦啦' 
                }
            ]
        },
        {
            id: 'nodeD',
            name: '市场部-了解需求',
            type: 'task',
            left: '354px',
            top: '351px',
            ico: 'el-icon-present',
            state: 'warning',
            inCharge:'momo',
            timeStart:'2020-07-02',
            timeEnd:'2020-07-03',
            info:'我是节点D的详细信息',
            new:[
                {
                    mylabel:'新变量名1',
                    value:'哈哈哈'
                },
                {
                    mylabel:'新变量名2',
                    value:'啦啦啦' 
                }
            ]
        },
        {
            id: 'nodeE',
            name: '市场部-签订协议',
            type: 'task',
            left: '723px',
            top: '215px',
            ico: 'el-icon-present',
            state: 'running',
            inCharge:'momo',
            timeStart:'2020-07-02',
            timeEnd:'2020-07-03',
            info:'我是节点E的详细信息',
            new:[
                {
                    mylabel:'时间',
                    value:'7-02'
                },
                {
                    mylabel:'负责人',
                    value:'拉拉' 
                }
            ]
        }
    ],
    lineList: [{
        from: 'nodeA',
        to: 'nodeB',
        label: '条件A',
        connector: 'Bezier',
        anchors: ['Bottom', 'Left']
    }, {
        from: 'nodeA',
        to: 'nodeC',
        label: '条件B',
        connector: 'Bezier',
        anchors: ['Bottom', 'Left']
    }, {
        from: 'nodeB',
        to: 'nodeE',
        connector: 'Bezier',
        anchors: ['Bottom', 'Left']
    }, {
        from: 'nodeC',
        to: 'nodeE',
        connector: 'Bezier',
        anchors: ['Bottom', 'Left']
    },{
        from: 'nodeD',
        to: 'nodeE',
        connector: 'Bezier',
        anchors: ['Bottom', 'Left']
    },{
        from: 'nodeA',
        to: 'nodeD',
        label: '条件C',
        connector: 'Bezier',
        anchors: ['Bottom', 'Left']
    },
    ]
}

export function getDataB() {
    return data_B
}
