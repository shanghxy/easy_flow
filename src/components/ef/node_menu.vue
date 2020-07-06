<template>
    <div class="flow-menu" ref="tool">
        <div v-for="menu  in  menuList" :key="menu.id">
            <span class="ef-node-pmenu" @click="menu.open = !menu.open"><i :class="{'el-icon-caret-bottom': menu.open,'el-icon-caret-right': !menu.open}"></i>&nbsp;{{menu.name}}</span>
            <ul v-show="menu.open" class="ef-node-menu-ul">
                <draggable @end="end" @start="move" v-model="menu.children" :options="draggableOptions">
                    <li v-for="subMenu in menu.children" class="ef-node-menu-li" :key="subMenu.id" :type="subMenu.type">
                        <i :class="subMenu.ico"></i> {{subMenu.name}}
                    </li>
                </draggable>
            </ul>
        </div>
         <i class="el-icon-star-off" style="margin: 0.5rem;padding: 1rem;">&nbsp;
                    <span style="color: green; font-size: 14px;">提示 : </span> 
                    1. 拖动任务节点<br><br>至画布即可新建任务节点<br><br>2. 点击画布中任务节点左
                    <br><br>侧图标即可画任务流程线
                    </i>

        <!-- <el-button type="primary" @click="saveAllAndPost" >上传<i class="el-icon-check el-icon--right"></i></el-button> -->
    </div>
</template>
<script>
    import draggable from 'vuedraggable'

    var mousePosition = {
        left: -1,
        top: -1
    }

    export default {
        data() {
            return {
                activeNames: '1',
                // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
                draggableOptions: {
                    preventOnFilter: false,
                    sort: false,
                    disabled: false,
                    ghostClass: 'tt',
                    // 不使用H5原生的配置
                    forceFallback: true,
                    // 拖拽的时候样式
                    // fallbackClass: 'flow-node-draggable'
                },
                // 默认打开的左侧菜单的id
                defaultOpeneds: ['1', '2'],



                menuList: [
                    {
                        id: '1',
                        type: 'group',
                        name: '开始节点',
                        ico: 'el-icon-video-play',
                        open: true,
                        children: [
                            {
                                id: '11',
                                type: 'user1',
                                name: '样式1',
                                ico: 'el-icon-user-solid',
                                // 自定义覆盖样式
                                style: {}
                            }, {
                                id: '12',
                                type: 'user2',
                                name: '样式2',
                                ico: 'el-icon-s-custom',
                                // 自定义覆盖样式
                                style: {}
                            }
                        ]
                    },
                    {
                        id: '2',
                        type: 'group',
                        name: '任务节点',
                        ico: 'el-icon-video-play',
                        open: true,
                        children: [
                            {
                                id: '11',
                                type: 'timer',
                                name: '样式1',
                                ico: 'el-icon-time',
                                // 自定义覆盖样式
                                style: {}
                            }, {
                                id: '12',
                                type: 'task',
                                name: '样式2',
                                ico: 'el-icon-odometer',
                                // 自定义覆盖样式
                                style: {}
                            }
                        ]
                    },
                    {
                        id: '3',
                        type: 'group',
                        name: '结束节点',
                        ico: 'el-icon-video-pause',
                        open: true,
                        children: [
                            {
                                id: '21',
                                type: 'end',
                                name: '样式3',
                                ico: 'el-icon-trophy',
                                // 自定义覆盖样式
                                style: {}
                            }, {
                                id: '22',
                                type: 'over',
                                name: '样式4',
                                ico: 'el-icon-wind-power',
                                // 自定义覆盖样式
                                style: {}
                            }
                        ]
                    }
                ],
                nodeMenu: {}
            }
        },
        components: {
            draggable
        },
        created() {
            /**
             * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
             * @param event
             */
            if (this.isFirefox()) {
                document.body.ondrop = function (event) {
                    // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
                    mousePosition.left = event.layerX
                    mousePosition.top = event.clientY - 50
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        },
        methods: {
            // 根据类型获取左侧菜单对象
            getMenuByType(type) {
                for (let i = 0; i < this.menuList.length; i++) {
                    let children = this.menuList[i].children;
                    for (let j = 0; j < children.length; j++) {
                        if (children[j].type === type) {
                            return children[j]
                        }
                    }
                }
            },
            // 拖拽开始时触发
            move(evt, a, b, c) {
                var type = evt.item.attributes.type.nodeValue
                this.nodeMenu = this.getMenuByType(type)
            },
            // 拖拽结束时触发
            end(evt, e) {
                this.$emit('addNode', evt, this.nodeMenu, mousePosition)
            },
            // 是否是火狐浏览器
            isFirefox() {
                var userAgent = navigator.userAgent
                if (userAgent.indexOf("Firefox") > -1) {
                    return true
                }
                return false
            },
            // saveAllAndPost() {
            //     console.log('我要post给后端')
            //     this.$emit('downloadData')
            //     // this.$confirm('确定要下载该流程数据吗？', '提示', {
            //     //     confirmButtonText: '确定',
            //     //     cancelButtonText: '取消',
            //     //     type: 'warning',
            //     //     closeOnClickModal: false
            //     // }).then(() => {
            //     //     var datastr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, '\t'));
            //     //     var downloadAnchorNode = document.createElement('a')
            //     //     downloadAnchorNode.setAttribute("href", datastr);
            //     //     downloadAnchorNode.setAttribute("download", 'data.json')
            //     //     downloadAnchorNode.click();
            //     //     downloadAnchorNode.remove();
            //     //     this.$message.success("正在下载中,请稍后...")
            //     // }).catch(() => {
            //     // })

            // }
        }
    }
</script>
