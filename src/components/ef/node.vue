<template>
    <div
            ref="node"
            :style="nodeContainerStyle"
            @click="clickNode"
            @mouseup="changeNodeSite"
            :class="nodeContainerClass"
    >
        <!-- 最左侧的那条竖线 -->
        <div class="ef-node-left"></div>
        <!-- 节点类型的图标 -->
        <div class="ef-node-left-ico flow-node-drag">
            <i :class="nodeIcoClass"></i>
        </div>
        <!-- 节点名称 -->
        <div class="ef-node-text" :show-overflow-tooltip="true">
            {{node.name}}
        </div>
        <!-- 节点状态图标 -->
        <div class="ef-node-right-ico">
            <i class="el-icon-circle-check el-node-state-success" v-show="node.state === 'success'"></i>
            <i class="el-icon-circle-close el-node-state-error" v-show="node.state === 'error'"></i>
            <i class="el-icon-warning-outline el-node-state-warning" v-show="node.state === 'warning'"></i>
            <i class="el-icon-loading el-node-state-running" v-show="node.state === 'running'"></i>
        </div>

        <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-table :data="nodeList">
                <el-table-column property="node.name" label="任务名称" width="150"></el-table-column>
                <el-table-column property="node.info" label="任务描述" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
            lalala

        </el-dialog> -->



    </div>
</template>

<script>
    export default {
        props: {
            node: Object,
            activeElement: Object
        },
        data() {
            return {
                // dialogTableVisible: false
                
            }
        },
        computed: {
            nodeContainerClass() {
                return {
                    'ef-node-container': true,
                    'ef-node-active': this.activeElement.type == 'node' ? this.activeElement.nodeId === this.node.id : false
                }
            },
            // 节点容器样式
            nodeContainerStyle() {
                return {
                    top: this.node.top,
                    left: this.node.left
                }
            },
            nodeIcoClass() {
                var nodeIcoClass = {}
                nodeIcoClass[this.node.ico] = true
                // 添加该class可以推拽连线出来
                nodeIcoClass['flow-node-drag'] = true
                console.log('nodeIcoClass')
                return nodeIcoClass
            }

        },
        methods: {
            // 点击节点
            clickNode() {
                this.$emit('clickNode', this.node.id)
                // this.$alert(this.node.info,this.node.name, {
                // confirmButtonText: '确定',
                // callback: action => {
                //     this.$message({
                //     type: 'info',
                //     message: `action: ${ action }`
                //     });
                // }
                // });
                this.dialogTableVisible = true;
            },
            // 鼠标移动后抬起
            changeNodeSite() {
                // 避免抖动
                if (this.node.left == this.$refs.node.style.left && this.node.top == this.$refs.node.style.top) {
                    return;
                }
                this.$emit('changeNodeSite', {
                    nodeId: this.node.id,
                    left: this.$refs.node.style.left,
                    top: this.$refs.node.style.top,
                })
            }
        }
    }
</script>
